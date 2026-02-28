#!/usr/bin/env python3
"""
Script to fix blog post structure by adding navigation, header, footer and fixing paths
"""

import os
import re
from pathlib import Path

def fix_blog_post(filepath):
    """Fix a single blog post file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already fixed (has blog-post-nav class)
    if 'blog-post-nav' in content:
        print(f"Skipping {filepath.name} - already fixed")
        return False
    
    # Fix the head section
    content = re.sub(
        r'<link rel="stylesheet" href="/style\.css">',
        '<link rel="stylesheet" href="../../style.css">\n  <link rel="stylesheet" href="../blog.css">',
        content
    )
    
    # Add header, nav, and navigation before main content
    content = re.sub(
        r'<body>\s*<main id="main-content">',
        '''<body>
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <header></header>
  <nav></nav>
  <main id="main-content" role="main" class="container">
  <div class="blog-post-nav">
    <a href="../blog.html" class="back-to-blog">← Back to Blog</a>
  </div>''',
        content
    )
    
    # Add footer and navigation after main content
    content = re.sub(
        r'</main>\s*<script src="/script\.js"></script>\s*</body>',
        '''  <div class="blog-post-nav">
    <a href="../blog.html" class="back-to-blog">← Back to Blog</a>
  </div>
  </main>
  <footer></footer>
  <script src="../../script.js"></script>
</body>''',
        content
    )
    
    # Write the fixed content back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Fixed {filepath.name}")
    return True

def main():
    """Main function to fix all blog posts"""
    # Get the posts directory
    script_dir = Path(__file__).parent
    posts_dir = script_dir.parent.parent / 'blog' / 'posts'
    
    if not posts_dir.exists():
        print(f"Error: Posts directory not found at {posts_dir}")
        return
    
    # Get all HTML files in posts directory
    html_files = list(posts_dir.glob('*.html'))
    
    print(f"Found {len(html_files)} blog post files")
    print("=" * 50)
    
    fixed_count = 0
    for html_file in sorted(html_files):
        if fix_blog_post(html_file):
            fixed_count += 1
    
    print("=" * 50)
    print(f"Fixed {fixed_count} blog posts")
    print(f"Skipped {len(html_files) - fixed_count} already fixed posts")

if __name__ == '__main__':
    main()
