import json, os
from PIL import Image

CATALOG_PATH = r"E:\_dev\55.Skoltech\56.AIMLEI-2026\healora.ru\www\dev.healora.ru\src\assets\data\food_catalog.json"
SRC_DIR = r"E:\!prj\07.nutrichat\static\user_data\food"
OUT_DIR = r"E:\_dev\55.Skoltech\56.AIMLEI-2026\healora.ru\docs\development\Food_CV\images"
MAX_WIDTH = 500

os.makedirs(OUT_DIR, exist_ok=True)

with open(CATALOG_PATH, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Map catalog filenames to source files
# JPG files are directly in SRC_DIR, PNG files are in Set02/
source_map = {}

for fn in data.keys():
    if fn in ('_04. яишница с овощами.jpg',):
        src = os.path.join(SRC_DIR, '_04. яишница с овощами.jpg')
        if os.path.exists(src):
            source_map[fn] = src
            continue
    
    if fn.endswith('.jpg'):
        # Try direct match first
        src = os.path.join(SRC_DIR, fn)
        if os.path.exists(src):
            source_map[fn] = src
            continue
        
        # Try without space after number
        # e.g., "06. киноа..." -> "06.киноа..."
        parts = fn.split('. ', 1)
        if len(parts) > 1:
            alt_no_space = parts[0] + '.' + parts[1]
            src = os.path.join(SRC_DIR, alt_no_space)
            if os.path.exists(src):
                source_map[fn] = src
                continue
        
        # Try set01/
        src = os.path.join(SRC_DIR, 'set01', fn)
        if os.path.exists(src):
            source_map[fn] = src
            continue
        
        # Try set01/ without space
        if len(parts) > 1:
            src = os.path.join(SRC_DIR, 'set01', parts[0] + '.' + parts[1])
            if os.path.exists(src):
                source_map[fn] = src
                continue
        
        print(f"  NOT FOUND: {fn}")
    elif fn.endswith('.png'):
        # PNG files are in Set02/
        # Extract the part after the number to find the file
        parts = fn.split('. ', 1)
        if len(parts) > 1:
            name_part = parts[1].replace('.png', '').lower()
        else:
            name_part = fn.replace('.png', '').lower()
        
        # Search in Set02/
        found = False
        for root, dirs, files in os.walk(SRC_DIR):
            for f in files:
                if f.endswith('.png') and name_part.split(' ')[0] in f.lower():
                    src = os.path.join(root, f)
                    source_map[fn] = src
                    found = True
                    break
            if found:
                break
        
        if not found:
            # Try matching by keywords
            for root, dirs, files in os.walk(SRC_DIR):
                for f in files:
                    f_lower = f.lower().replace('.png', '')
                    keywords = name_part.replace('_', ' ').split(' ')
                    if any(kw in f_lower for kw in keywords if len(kw) > 3):
                        src = os.path.join(root, f)
                        source_map[fn] = src
                        print(f"  Fuzzy match: {f} -> {fn}")
                        found = True
                        break
                if found:
                    break
            
            if not found:
                print(f"  NOT FOUND: {fn}")

print(f"\nTotal to process: {len(source_map)}")

# Copy and resize
for catalog_fn, src_path in sorted(source_map.items()):
    ext = os.path.splitext(catalog_fn)[1]
    dst_name = catalog_fn  # keep the same filename
    dst_path = os.path.join(OUT_DIR, dst_name)
    
    try:
        img = Image.open(src_path)
        print(f"  {catalog_fn}: {img.size} -> ", end='')
        
        # Convert RGBA to RGB for JPEG
        if img.mode in ('RGBA', 'LA', 'P'):
            img = img.convert('RGB')
        
        # Resize if width > MAX_WIDTH
        w, h = img.size
        if w > MAX_WIDTH:
            new_h = int(h * (MAX_WIDTH / w))
            img = img.resize((MAX_WIDTH, new_h), Image.LANCZOS)
            print(f"({MAX_WIDTH}, {new_h})")
        else:
            print(f"kept ({w}, {h})")
        
        # Save as JPEG to save space
        save_ext = '.jpg' if ext.lower() in ('.jpg', '.jpeg') else '.png'
        if save_ext == '.jpg':
            img.save(dst_path, 'JPEG', quality=85, optimize=True)
        else:
            # For PNG, still save as PNG but resized
            if ext.lower() == '.png':
                img.save(dst_path, 'PNG', optimize=True)
            else:
                img.save(dst_path, 'JPEG', quality=85, optimize=True)
                
        print(f"    -> saved {os.path.getsize(dst_path)//1024} KB")
    except Exception as e:
        print(f"  ERROR {catalog_fn}: {e}")

# Check source_map for the Set02 files
print("\n--- PNG mapping check ---")
for root, dirs, files in os.walk(SRC_DIR):
    for f in files:
        if 'Set02' in root or 'set02' in root:
            print(f"  {root}\\{f}")

print(f"\nDone! Images saved to {OUT_DIR}")
print(f"Total: {len(source_map)} files processed")
