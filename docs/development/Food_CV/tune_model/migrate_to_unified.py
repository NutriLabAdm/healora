import json, os, re, sys
from datetime import datetime

TUNE_DIR = r"E:\_dev\55.Skoltech\56.AIMLEI-2026\healora.ru\docs\development\Food_CV\tune_model"
CATALOG_PATH = r"E:\_dev\55.Skoltech\56.AIMLEI-2026\healora.ru\www\dev.healora.ru\src\assets\data\food_catalog.json"

sys.stdout.reconfigure(encoding='utf-8')

with open(CATALOG_PATH, 'r', encoding='utf-8') as f:
    catalog = json.load(f)

model_config = {
    'gpt4o':   {'name': 'GPT-4o',            'title': 'GPT-4o'},
    'claude':  {'name': 'Claude 3.5 Sonnet',  'title': 'Claude 3.5 Sonnet'},
    'gemini':  {'name': 'Gemini 2.0 Pro',     'title': 'Gemini 2.5 Flash'},
    'deepseek':{'name': 'DeepSeek-V3',        'title': 'DeepSeek-V3'},
    'qwen':    {'name': 'Qwen2.5-VL',         'title': 'Qwen2.5-VL'},
    'healora': {'name': 'Healora Nutrition',  'title': 'Healora Nutrition'},
}

models_ordered = list(model_config.keys())
model_ids_pattern = '|'.join(models_ordered)

def get_dish_id(catalog_key):
    m = re.match(r'_?(\d+)', catalog_key)
    return m.group(1).zfill(2) if m else None

def empty_dish(dish_id, catalog_key, entry):
    return {
        "dish_id": dish_id,
        "dish_name": entry.get('dish_name') or entry.get('title', ''),
        "image_file": catalog_key,
        "gold_standard": {
            "calories": entry.get('nutrition', {}).get('calories'),
            "protein_g": entry.get('nutrition', {}).get('protein'),
            "fat_g": entry.get('nutrition', {}).get('fat'),
            "carbs_g": entry.get('nutrition', {}).get('carbs'),
            "fiber_g": entry.get('nutrition', {}).get('fiber'),
            "ndi": entry.get('nutrition', {}).get('ndi'),
            "ingredients": entry.get('ingredients', [])
        },
        "response": {
            "ingredients_recognized": [],
            "ingredient_match_pct": None,
            "calories_predicted": None,
            "protein_predicted": None,
            "fat_predicted": None,
            "carbs_predicted": None,
            "confidence": None,
            "pros": None,
            "cons": None,
            "recommendations": None
        },
        "calculated_metrics": {
            "cal_mae_pct": None,
            "pro_mae_pct": None,
            "fat_mae_pct": None,
            "carbs_mae_pct": None
        },
        "tune_status": "pending",
        "date_analyzed": None
    }

def stub_to_dish(data):
    resp = data.get('response', {})
    return {
        "dish_id": data['dish_id'],
        "dish_name": data.get('dish_name', ''),
        "image_file": data.get('image_file', ''),
        "gold_standard": data.get('gold_standard', {}),
        "response": {
            "ingredients_recognized": resp.get('ingredients_recognized', []),
            "ingredient_match_pct": resp.get('ingredient_match_pct'),
            "calories_predicted": resp.get('calories_predicted'),
            "protein_predicted": resp.get('protein_predicted'),
            "fat_predicted": resp.get('fat_predicted'),
            "carbs_predicted": resp.get('carbs_predicted'),
            "confidence": resp.get('confidence'),
            "pros": resp.get('pros'),
            "cons": resp.get('cons'),
            "recommendations": resp.get('recommendations') or resp.get('recs')
        },
        "calculated_metrics": data.get('calculated_metrics', {}),
        "tune_status": data.get('tune_status', 'pending'),
        "date_analyzed": data.get('date_analyzed')
    }

# Build base dish list from catalog
all_dish_ids = []
for fn, entry in catalog.items():
    did = get_dish_id(fn)
    if did:
        all_dish_ids.append((did, fn, entry))
all_dish_ids.sort(key=lambda x: int(x[0]))

print(f"Found {len(all_dish_ids)} dishes in catalog")

# Read all stub files
stub_data = {}  # (dish_id, model_id) -> dish dict
all_files = [f for f in os.listdir(TUNE_DIR) if f.endswith('.json') and f != 'gemini_flash_10dishes.json' and f != 'INDEX.md']

for fname in all_files:
    m = re.match(r'(\d+)__(' + model_ids_pattern + r')_(.+)\.json', fname)
    if not m:
        continue
    dish_id, model, _ = m.groups()
    if model not in models_ordered:
        continue
    fpath = os.path.join(TUNE_DIR, fname)
    try:
        with open(fpath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        stub_data[(dish_id, model)] = stub_to_dish(data)
    except Exception as e:
        print(f"  Error reading {fname}: {e}")

print(f"Read {len(stub_data)} stubs with data")

# Build unified per-model JSONs
for model in models_ordered:
    cfg = model_config[model]
    dishes_obj = {}
    for did, fn, entry in all_dish_ids:
        key = (did, model)
        if key in stub_data:
            dishes_obj[did] = stub_data[key]
        else:
            dishes_obj[did] = empty_dish(did, fn, entry)

    unified = {
        "model_id": model,
        "model_name": cfg['name'],
        "model_title": cfg['title'],
        "date_created": datetime.now().strftime('%Y-%m-%d'),
        "date_updated": datetime.now().strftime('%Y-%m-%d'),
        "notes": "",
        "dishes": dishes_obj
    }

    out_path = os.path.join(TUNE_DIR, f"{model}.json")
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(unified, f, ensure_ascii=False, indent=2)

    done = sum(1 for d in dishes_obj.values() if d['tune_status'] == 'done')
    print(f"  {model}.json: {done}/23 done")

print("\nMigration complete: 6 unified files created")
