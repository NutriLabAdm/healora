import json, os, re

SCRIPT_DIR = r"E:\_dev\55.Skoltech\56.AIMLEI-2026\healora.ru\docs\development\Food_CV"
FOOD_CATALOG = r"E:\_dev\55.Skoltech\56.AIMLEI-2026\healora.ru\www\dev.healora.ru\src\assets\data\food_catalog.json"

with open(FOOD_CATALOG, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Build map: original raw name -> (ndi, ext)
ndi_map = {}
for fn, entry in data.items():
    ndi = entry.get('nutrition', {}).get('ndi', '')
    ext = '.jpg' if '.jpg' in fn else '.png'
    # extract the number prefix
    m = re.match(r'(_?\d+)', fn)
    num_prefix = m.group(1) if m else ''
    ndi_map[fn] = (ndi, ext, num_prefix)

# Get current files
current_files = [f for f in os.listdir(SCRIPT_DIR) if f.endswith('.md') and f not in ('INDEX.md', 'PROMPT_ANALYSIS.md', 'generate_docs.py')]

print("Current MD files:")
for f in sorted(current_files):
    print(f"  {f}")

print("\n--- Renaming ---")

rename_map = {}  # old -> new

for old_name in current_files:
    if old_name in ('INDEX.md', 'PROMPT_ANALYSIS.md', 'generate_docs.py'):
        continue
    # Find matching catalog entry
    for fn, (ndi, ext, num_prefix) in ndi_map.items():
        # extract the part of the old filename after number
        old_base = old_name.replace('.md', '')
        # check if the old base ends with or contains the ndi already
        if old_base.endswith(str(ndi)):
            continue  # already has ndi
        
        # build expected new name: num_NDI__rest.md
        # get the rest after the number prefix from the old name
        # old name format: 01__котлеты_с_макаронами_и_салат.md
        # new name format: 01_6.5__котлеты_с_макаронами_и_салат.md
        
        # find the number prefix in the old name
        m_old = re.match(r'(_?\d+)__?(.*)', old_base)
        if m_old:
            old_num = m_old.group(1)
            rest = m_old.group(2)
        else:
            continue
        
        # check if num_prefix matches
        if old_num == num_prefix:
            new_name = f"{num_prefix}_{ndi}__{rest}.md"
            if new_name != old_name:
                rename_map[old_name] = new_name
                print(f"  {old_name} -> {new_name}")
            break

print(f"\nTotal to rename: {len(rename_map)}")

# Execute renaming
for old, new in rename_map.items():
    old_path = os.path.join(SCRIPT_DIR, old)
    new_path = os.path.join(SCRIPT_DIR, new)
    if os.path.exists(old_path):
        os.rename(old_path, new_path)
        print(f"  Renamed: {old} -> {new}")
    else:
        print(f"  NOT FOUND: {old}")
