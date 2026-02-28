"""
Import posts from gamerrobot.com blogs/news pages (page=1..3).
- Requires: requests, beautifulsoup4
- Saves posts under blog/posts/<slug>.html
- Downloads images to assets/images/blog/
- Generates blog/index.html, blog/page2.html, blog/page3.html

This script is conservative and will skip files that already exist.
"""
import os
import re
import sys
from pathlib import Path

try:
    import requests
    from bs4 import BeautifulSoup
except Exception:
    print('Missing dependencies. Please run: pip install requests beautifulsoup4')
    sys.exit(1)

ROOT = Path(__file__).resolve().parents[2]
BLOG_DIR = ROOT / 'blog'
POSTS_DIR = BLOG_DIR / 'posts'
IMG_DIR = ROOT / 'assets' / 'images' / 'blog'

BLOG_DIR.mkdir(parents=True, exist_ok=True)
POSTS_DIR.mkdir(parents=True, exist_ok=True)
IMG_DIR.mkdir(parents=True, exist_ok=True)

HEAD = '''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="/style.css">
  <title>{title}</title>
</head>
<body>
  <main id="main-content">
  <article class="blog-post">
  <h1>{title}</h1>
  <p class="meta">Imported from gamerrobot</p>
'''
FOOT = '''
  </article>
  </main>
  <script src="/script.js"></script>
</body>
</html>
'''

SESSION = requests.Session()
SESSION.headers.update({'User-Agent': 'Site-Importer/1.0 (+https://example.com)'})


def slugify(s):
    s = s.lower()
    s = re.sub(r"[^a-z0-9-]+", '-', s)
    s = re.sub(r"-+", '-', s)
    s = s.strip('-')
    return s[:200]


def download_image(url):
    if not url:
        return None
    url = url.split('?')[0]
    name = Path(url).name
    if not name:
        return None
    dest = IMG_DIR / name
    if dest.exists():
        return '/assets/images/blog/' + name
    try:
        r = SESSION.get(url, timeout=15)
        if r.status_code == 200:
            dest.write_bytes(r.content)
            return '/assets/images/blog/' + name
    except Exception as e:
        print('Failed to download', url, e)
    return None


def import_index(page=1):
    url = f'https://gamerrobot.com/blogs/news?page={page}'
    print('Fetching', url)
    r = SESSION.get(url, timeout=15)
    r.raise_for_status()
    soup = BeautifulSoup(r.text, 'html.parser')
    # find links to posts
    links = []
    for a in soup.find_all('a', href=True):
        href = a['href']
        if '/blogs/news/' in href:
            full = requests.compat.urljoin(url, href)
            title = a.get_text(strip=True)
            if title and full not in links:
                links.append(full)
    # dedupe while preserving order
    seen = set()
    unique = []
    for l in links:
        if l not in seen:
            seen.add(l)
            unique.append(l)
    return unique


def import_post(url):
    print('Importing post', url)
    r = SESSION.get(url, timeout=15)
    if r.status_code != 200:
        print('Failed to fetch', url)
        return None
    soup = BeautifulSoup(r.text, 'html.parser')
    # try to find article content
    article = None
    for tag in ('article', 'main', 'div'):
        candidate = soup.find(tag)
        if candidate and len(candidate.get_text(strip=True)) > 50:
            article = candidate
            break
    if not article:
        article = soup
    # title
    title_tag = soup.find('h1') or soup.find('title')
    title = title_tag.get_text(strip=True) if title_tag else 'Imported Post'

    # images: download any <img> in article
    for img in article.find_all('img'):
        src = img.get('data-src') or img.get('src')
        if not src:
            continue
        img_url = requests.compat.urljoin(url, src)
        local = download_image(img_url)
        if local:
            img['src'] = local
            if 'srcset' in img.attrs:
                del img.attrs['srcset']
            if 'data-src' in img.attrs:
                del img.attrs['data-src']

    slug = slugify(title)
    if not slug:
        slug = 'post-' + str(abs(hash(url)) % (10**8))
    dest = POSTS_DIR / (slug + '.html')
    if dest.exists():
        print('Post exists, skipping', dest)
        return str(dest.relative_to(ROOT))
    content_html = str(article)
    html = HEAD.format(title=title) + content_html + FOOT
    dest.write_text(html, encoding='utf-8')
    print('Wrote', dest)
    return str(dest.relative_to(ROOT))


def build_index(pages):
    # pages: list of lists of post relative paths
    index_html = BLOG_DIR / 'index.html'
    body = '<!doctype html>\n<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/style.css"><title>Blog</title></head><body><main id="main-content"><h1>Blog</h1>'
    for i, page in enumerate(pages, start=1):
        body += f'<section class="blog-page" id="page{i}"><h2>Page {i}</h2><div class="post-grid">'
        for p in page:
            # read post to get title and first img
            ppath = ROOT / p
            if not ppath.exists():
                continue
            text = ppath.read_text(encoding='utf-8')
            psoup = BeautifulSoup(text, 'html.parser')
            title = psoup.find('h1').get_text(strip=True) if psoup.find('h1') else 'Post'
            img = psoup.find('img')
            thumb = img['src'] if img and img.get('src') else ''
            body += f'<article class="post-card"><a href="/{p}">'
            if thumb:
                body += f'<img src="{thumb}" alt="{title} thumbnail">'
            body += f'<h3>{title}</h3></a></article>'
        body += '</div></section>'
    body += '</main><script src="/script.js"></script></body></html>'
    index_html.write_text(body, encoding='utf-8')
    print('Wrote', index_html)


if __name__ == '__main__':
    all_pages = []
    posts_collected = []
    for p in range(1, 4):
        links = import_index(page=p)
        page_posts = []
        for link in links:
            try:
                rel = import_post(link)
                if rel:
                    page_posts.append(rel)
                    posts_collected.append(rel)
            except Exception as e:
                print('Error importing', link, e)
        all_pages.append(page_posts)
    build_index(all_pages)
    print('Imported', len(posts_collected), 'posts')
