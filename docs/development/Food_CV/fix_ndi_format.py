import os, re

SCRIPT_DIR = r"E:\_dev\55.Skoltech\56.AIMLEI-2026\healora.ru\docs\development\Food_CV"
INDEX_PATH = os.path.join(SCRIPT_DIR, "INDEX.md")

# Fix NDI in filenames: replace _7_, _8_, _9_, _6_ with _7.0_, _8.0_, _9.0_, _6.0_
# same for .7_, .8_, .9_, .6_ at end before __

fixes = {
    '_7__': '_7.0__',
    '_8__': '_8.0__',
    '_9__': '_9.0__',
    '_6__': '_6.0__',
}

for f in os.listdir(SCRIPT_DIR):
    if not f.endswith('.md') or f in ('INDEX.md', 'PROMPT_ANALYSIS.md', 'generate_docs.py', 'rename_ndi.py'):
        continue
    
    new_name = f
    for old_part, new_part in fixes.items():
        new_name = new_name.replace(old_part, new_part)
    
    if new_name != f:
        old_path = os.path.join(SCRIPT_DIR, f)
        new_path = os.path.join(SCRIPT_DIR, new_name)
        os.rename(old_path, new_path)
        print(f'{f} -> {new_name}')

# Update INDEX.md
with open(INDEX_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix references in INDEX.md
for old_part, new_part in fixes.items():
    content = content.replace(f'`{old_part}', f'`{new_part}')
    # Also fix cases where NDI appears in the NDI column
    # Replace | 7 | with | 7.0 | etc
    # But only for NDI column values
    content = re.sub(r'\|\s\*\*(\d)\*\*\s\|', lambda m: f'| **{m.group(1)}.0** |' if m.group(1) in '7896' else m.group(0), content)

with open(INDEX_PATH, 'w', encoding='utf-8') as f:
    f.write(content)

print('\nDone fixing.')
