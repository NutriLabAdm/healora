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

def mae(pred, actual):
    if pred is None or actual is None or actual == 0:
        return None
    return round(abs(pred - actual) / actual * 100, 1)

def import_batch(model_file, batch_file):
    with open(f'{TUNE_DIR}/{model_file}.json', 'r', encoding='utf-8') as f:
        model_data = json.load(f)
    with open(f'{TUNE_DIR}/{batch_file}.json', 'r', encoding='utf-8') as f:
        batch = json.load(f)
    
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
    # count all done dishes for note
    done = sum(1 for d in model_data['dishes'].values() if d.get('tune_status') in ('done', 'analyzed'))
    model_data['notes'] = f'{model_data.get("model_name", model_file)} — {done}/23 блюд'
    
    out = f'{TUNE_DIR}/{model_file}.json'
    with open(out, 'w', encoding='utf-8') as f:
        json.dump(model_data, f, ensure_ascii=False, indent=2)
    
    done = sum(1 for d in model_data['dishes'].values() if d['response']['calories_predicted'] is not None)
    print(f'{model_file}.json: {done}/23 done')
    for entry in batch:
        did = entry['dish_id'].zfill(2)
        d = model_data['dishes'].get(did, {})
        r = d.get('response', {})
        m = d.get('calculated_metrics', {})
        gs = d.get('gold_standard', {})
        cal = r.get('calories_predicted')
        gs_cal = gs.get('calories')
        if cal is not None:
            print(f'  {did} {entry["dish_name"]:35s} GS:{gs_cal:>4.0f} Pred:{cal:>4.0f} MAE:{m["cal_mae_pct"]:>5.1f}% m:{r["ingredient_match_pct"]:>3.0f}%')

import_batch('deepseek', 'deepseek_batch_07_22')
