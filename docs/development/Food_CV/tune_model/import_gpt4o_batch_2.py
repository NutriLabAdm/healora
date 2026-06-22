import json, sys
sys.stdout.reconfigure(encoding='utf-8')

TUNE_DIR = r"E:\_dev\55.Skoltech\56.AIMLEI-2026\healora.ru\docs\development\Food_CV\tune_model"
CATALOG_PATH = r"E:\_dev\55.Skoltech\56.AIMLEI-2026\healora.ru\www\dev.healora.ru\src\assets\data\food_catalog.json"

with open(CATALOG_PATH, 'r', encoding='utf-8') as f:
    catalog = json.load(f)

import re
def get_dish_id(key):
    m = re.match(r'_?(\d+)', key)
    return m.group(1).zfill(2) if m else None

cat_by_id = {}
for fn, entry in catalog.items():
    did = get_dish_id(fn)
    if did:
        cat_by_id[did] = entry

MODEL = 'gpt4o'
BATCH = 'gpt4o_batch_04_06'

with open(f'{TUNE_DIR}/{MODEL}.json', 'r', encoding='utf-8') as f:
    model_data = json.load(f)

with open(f'{TUNE_DIR}/{BATCH}.json', 'r', encoding='utf-8') as f:
    batch = json.load(f)

def mae(pred, actual):
    if pred is None or actual is None or actual == 0:
        return None
    return round(abs(pred - actual) / actual * 100, 1)

for entry in batch:
    did = entry['dish_id'].zfill(2)
    cat_entry = cat_by_id.get(did, {})
    nut = cat_entry.get('nutrition', {})
    resp = entry['response']

    dish_obj = {
        'dish_id': did,
        'dish_name': entry['dish_name'],
        'image_file': entry['image_file'],
        'gold_standard': {
            'calories': nut.get('calories'),
            'protein_g': nut.get('protein'),
            'fat_g': nut.get('fat'),
            'carbs_g': nut.get('carbs'),
            'fiber_g': nut.get('fiber'),
            'ndi': nut.get('ndi'),
            'ingredients': cat_entry.get('ingredients', [])
        },
        'response': {
            'ingredients_recognized': resp.get('ingredients_recognized', []),
            'ingredient_match_pct': resp.get('ingredient_match_pct'),
            'calories_predicted': resp.get('calories_predicted'),
            'protein_predicted': resp.get('protein_predicted'),
            'fat_predicted': resp.get('fat_predicted'),
            'carbs_predicted': resp.get('carbs_predicted'),
            'confidence': resp.get('confidence'),
            'pros': resp.get('pros'),
            'cons': resp.get('cons'),
            'recommendations': resp.get('recs') or resp.get('recommendations')
        },
        'calculated_metrics': {
            'cal_mae_pct': mae(resp.get('calories_predicted'), nut.get('calories')),
            'pro_mae_pct': mae(resp.get('protein_predicted'), nut.get('protein')),
            'fat_mae_pct': mae(resp.get('fat_predicted'), nut.get('fat')),
            'carbs_mae_pct': mae(resp.get('carbs_predicted'), nut.get('carbs'))
        },
        'tune_status': 'analyzed',
        'date_analyzed': '2026-06-14'
    }
    model_data['dishes'][did] = dish_obj

model_data['date_updated'] = '2026-06-14'
model_data['notes'] = 'GPT — анализ 6 блюд (01-06)'

out = f'{TUNE_DIR}/{MODEL}.json'
with open(out, 'w', encoding='utf-8') as f:
    json.dump(model_data, f, ensure_ascii=False, indent=2)

done = sum(1 for d in model_data['dishes'].values() if d['response']['calories_predicted'] is not None)
print(f'{MODEL}.json: {done}/23 done')
