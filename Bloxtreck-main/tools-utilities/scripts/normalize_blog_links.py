"""
Normalize Windows backslashes to forward slashes in generated blog index and post links.
"""
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]
files = list((ROOT / 'blog').rglob('*.html'))
changed = []
for f in files:
    txt = f.read_text(encoding='utf-8')
    new = txt.replace('\\', '/')
    if new != txt:
        f.write_text(new, encoding='utf-8')
        changed.append(str(f.relative_to(ROOT)))
print('Normalized backslashes in', len(changed), 'files')
for p in changed:
    print(p)
