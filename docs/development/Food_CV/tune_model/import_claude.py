import json, re, sys
from datetime import datetime

sys.stdout.reconfigure(encoding='utf-8')

TUNE_DIR = r"E:\_dev\55.Skoltech\56.AIMLEI-2026\healora.ru\docs\development\Food_CV\tune_model"
CATALOG_PATH = r"E:\_dev\55.Skoltech\56.AIMLEI-2026\healora.ru\www\dev.healora.ru\src\assets\data\food_catalog.json"

with open(CATALOG_PATH, 'r', encoding='utf-8') as f:
    catalog = json.load(f)

def get_dish_id(key):
    m = re.match(r'_?(\d+)', key)
    return m.group(1).zfill(2) if m else None

cat_by_id = {}
for fn, entry in catalog.items():
    did = get_dish_id(fn)
    if did:
        cat_by_id[did] = entry

with open(f'{TUNE_DIR}/claude_raw_01_16.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

model_id = 'claude_4_6'
model_name = 'Claude Sonnet 4.6'
model_title = 'Claude 4.6'

dishes_obj = {}
for did in [str(i).zfill(2) for i in range(1, 24)]:
    cat_entry = cat_by_id.get(did, {})
    nut = cat_entry.get('nutrition', {})
    matching = [d for d in data if d['dish_id'] == did]
    
    if matching:
        d = matching[0]
        resp = d['response']
        gs_cal = nut.get('calories', 0) or 1
        
        def mae(pred, actual):
            if pred is None or actual is None or actual == 0:
                return None
            return round(abs(pred - actual) / actual * 100, 1)
        
        dishes_obj[did] = {
            'dish_id': did,
            'dish_name': d['dish_name'],
            'image_file': d['image_file'],
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
    else:
        dishes_obj[did] = {
            'dish_id': did,
            'dish_name': cat_entry.get('dish_name') or cat_entry.get('title', ''),
            'image_file': '',
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
                'ingredients_recognized': [], 'ingredient_match_pct': None, 'calories_predicted': None,
                'protein_predicted': None, 'fat_predicted': None, 'carbs_predicted': None,
                'confidence': None, 'pros': None, 'cons': None, 'recommendations': None
            },
            'calculated_metrics': {'cal_mae_pct': None, 'pro_mae_pct': None, 'fat_mae_pct': None, 'carbs_mae_pct': None},
            'tune_status': 'pending',
            'date_analyzed': None
        }

unified = {
    'model_id': model_id,
    'model_name': model_name,
    'model_title': model_title,
    'date_created': '2026-06-14',
    'date_updated': '2026-06-14',
    'notes': 'Claude Sonnet 4.6 — все 23 блюда',
    'dishes': dishes_obj
}

out = f'{TUNE_DIR}/{model_id}.json'
with open(out, 'w', encoding='utf-8') as f:
    json.dump(unified, f, ensure_ascii=False, indent=2)

done = sum(1 for d in dishes_obj.values() if d['response']['calories_predicted'] is not None)
print(f'{model_id}.json: {done}/23 done')
print()
print(f'{"#":>3} {"Dish":30s} {"GS_Cal":>6} {"Pred":>5} {"MAE%":>6} {"Match":>5} {"Conf":>4}')
print('-' * 65)
for did in [str(i).zfill(2) for i in range(1, 24)]:
    d = dishes_obj[did]
    r = d['response']
    m = d['calculated_metrics']
    gs = d['gold_standard']
    cal = r.get('calories_predicted')
    gs_cal = gs.get('calories')
    print(f'{did:>3} {d["dish_name"]:30s} {gs_cal:>6.0f} {cal:>5.0f} {m["cal_mae_pct"]:>5.1f} {r["ingredient_match_pct"]:>4.0f}% {r["confidence"]:>3.0f}%')
