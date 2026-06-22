import json, os, re, sys

CATALOG_PATH = r"E:\_dev\55.Skoltech\56.AIMLEI-2026\healora.ru\www\dev.healora.ru\src\assets\data\food_catalog.json"
TUNE_DIR = r"E:\_dev\55.Skoltech\56.AIMLEI-2026\healora.ru\docs\development\Food_CV\tune_model"
IMAGES_DIR = r"E:\_dev\55.Skoltech\56.AIMLEI-2026\healora.ru\docs\development\Food_CV\images"

sys.stdout.reconfigure(encoding='utf-8')

with open(CATALOG_PATH, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Build image filename map (by prefix) to use real filenames for slugs
def build_image_map():
    def prefix(name):
        m = re.match(r'(_?\d+)', os.path.splitext(name)[0])
        return m.group(1) if m else name
    img_map = {}
    if os.path.isdir(IMAGES_DIR):
        for f in os.listdir(IMAGES_DIR):
            p = prefix(f)
            img_map[p] = f
            p_norm = p.lstrip('_')
            if p_norm != p:
                img_map[p_norm] = f
    return img_map

image_map = build_image_map()

models = ['gpt4o', 'claude', 'gemini', 'deepseek', 'qwen', 'healora']
model_names = {
    'gpt4o': 'GPT-4o',
    'claude': 'Claude 3.5 Sonnet',
    'gemini': 'Gemini 2.0 Pro',
    'deepseek': 'DeepSeek-V3',
    'qwen': 'Qwen2.5-VL',
    'healora': 'Healora Nutrition',
}

os.makedirs(TUNE_DIR, exist_ok=True)

# Remove old stub JSONs
for f in list(os.listdir(TUNE_DIR)):
    if f.endswith('.json'):
        os.remove(os.path.join(TUNE_DIR, f))

count = 0
for fn, entry in data.items():
    m = re.match(r'_?(\d+)', fn)  # capture digits, discard leading underscore
    dish_id = m.group(1) if m else fn.replace('.jpg','').replace('.png','')
    # zero-pad to 2 digits for sorting
    dish_id = dish_id.zfill(2) if dish_id.isdigit() else dish_id
    title = entry.get('title', fn)
    nutrition = entry.get('nutrition', {})

    # Use real image filename for slug (fallback to catalog key)
    real_fn = image_map.get(dish_id, fn)
    name_part = os.path.splitext(real_fn)[0]
    # Remove leading number prefix (e.g. "01. " or "_04. ") to avoid duplication with dish_id
    name_clean = re.sub(r'^_?\d+[\.\s]*', '', name_part)
    name_slug = re.sub(r'[^\w\s\-]', '', name_clean)
    name_slug = re.sub(r'\s+', '_', name_slug.strip())
    name_slug = name_slug[:60]

    base_cal = float(nutrition.get('calories', 0)) if nutrition.get('calories'   ) else 0
    base_pro = float(nutrition.get('protein', 0)) if nutrition.get('protein') else 0
    base_fat = float(nutrition.get('fat', 0)) if nutrition.get('fat') else 0
    base_carbs = float(nutrition.get('carbs', 0)) if nutrition.get('carbs') else 0
    base_fiber = float(nutrition.get('fiber', 0)) if nutrition.get('fiber') else 0
    ndi = float(nutrition.get('ndi', 0)) if nutrition.get('ndi') else 0
    ingredients = entry.get('ingredients', [])

    for mid in models:
        stub = {
            'dish_id': dish_id,
            'model_id': mid,
            'model_name': model_names[mid],
            'dish_name': title,
            'image_file': real_fn,
            'gold_standard': {
                'calories': base_cal,
                'protein_g': base_pro,
                'fat_g': base_fat,
                'carbs_g': base_carbs,
                'fiber_g': base_fiber,
                'ndi': ndi,
                'ingredients': ingredients,
            },
            'response': {
                'ingredients_recognized': ingredients[:],
                'ingredient_match_pct': None,
                'calories_predicted': None,
                'protein_predicted': None,
                'fat_predicted': None,
                'carbs_predicted': None,
                'confidence': None,
                'pros': None,
                'cons': None,
                'recommendations': None,
            },
            'calculated_metrics': {
                'cal_mae_pct': None,
                'pro_mae_pct': None,
                'fat_mae_pct': None,
                'carbs_mae_pct': None,
            },
            'tune_status': 'pending',
            'date_analyzed': None,
        }

        fname = f'{dish_id}__{mid}_{name_slug}.json'
        fpath = os.path.join(TUNE_DIR, fname)
        with open(fpath, 'w', encoding='utf-8') as f:
            json.dump(stub, f, ensure_ascii=False, indent=2)
        count += 1

print(f'Created {count} stub files in {TUNE_DIR}')
