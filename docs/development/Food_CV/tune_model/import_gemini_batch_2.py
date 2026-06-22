import json, re, sys
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

with open(f'{TUNE_DIR}/gemini.json', 'r', encoding='utf-8') as f:
    gemini = json.load(f)

with open(f'{TUNE_DIR}/gemini_batch_14_23.json', 'r', encoding='utf-8') as f:
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

    if did in gemini['dishes']:
        d = gemini['dishes'][did]
        gs = d.get('gold_standard', {})
    else:
        gs = {}

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
        'tune_status': 'done',
        'date_analyzed': '2026-06-14'
    }
    gemini['dishes'][did] = dish_obj

gemini['date_updated'] = '2026-06-14'
gemini['notes'] = 'Gemini Flash 2.6 — 20 блюд (04-23), 01-03 pending'

out = f'{TUNE_DIR}/gemini.json'
with open(out, 'w', encoding='utf-8') as f:
    json.dump(gemini, f, ensure_ascii=False, indent=2)

done = sum(1 for d in gemini['dishes'].values() if d['response']['calories_predicted'] is not None)
print(f'gemini.json: {done}/23 done')
print()
print(f'{"#":>3} {"Dish":30s} {"GS_Cal":>6} {"Pred":>5} {"MAE%":>6} {"Match":>5} {"Conf":>4}')
print('-' * 65)
for did in [str(i).zfill(2) for i in range(14, 24)]:
    d = gemini['dishes'].get(did, {})
    r = d.get('response', {})
    m = d.get('calculated_metrics', {})
    gs = d.get('gold_standard', {})
    cal = r.get('calories_predicted')
    gs_cal = gs.get('calories')
    if cal is not None and gs_cal is not None:
        print(f'{did:>3} {d["dish_name"]:30s} {gs_cal:>6.0f} {cal:>5.0f} {m["cal_mae_pct"]:>5.1f} {r["ingredient_match_pct"]:>4.0f}% {r["confidence"]:>3.0f}%')
    else:
        print(f'{did:>3} {d["dish_name"]:30s} {"—":>6} {"—":>5} {"—":>5} {"—":>4} {"—":>3}')
