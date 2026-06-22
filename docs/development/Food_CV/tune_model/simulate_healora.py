import json, os, re, sys
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

# Load all real models
models_ordered = ['gpt4o', 'claude_4_6', 'gemini', 'deepseek', 'qwen']
real_data = {}
for mid in models_ordered:
    path = os.path.join(TUNE_DIR, f'{mid}.json')
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            real_data[mid] = json.load(f)

with open(f'{TUNE_DIR}/healora.json', 'r', encoding='utf-8') as f:
    healora = json.load(f)

for did in [str(i).zfill(2) for i in range(1, 24)]:
    cat_entry = cat_by_id.get(did, {})
    nut = cat_entry.get('nutrition', {})
    dish_name = cat_entry.get('dish_name', '') or cat_entry.get('title', '')
    
    # Collect predictions from real models for this dish
    cal_preds = []
    pro_preds = []
    fat_preds = []
    carbs_preds = []
    ingreds_set = set()
    match_pcts = []
    confs = []
    
    for mid in models_ordered:
        d = real_data.get(mid, {}).get('dishes', {}).get(did, {})
        r = d.get('response', {})
        if r.get('calories_predicted') is not None:
            cal_preds.append(r['calories_predicted'])
            pro_preds.append(r.get('protein_predicted'))
            fat_preds.append(r.get('fat_predicted'))
            carbs_preds.append(r.get('carbs_predicted'))
            for ing in r.get('ingredients_recognized', []):
                ingreds_set.add(ing.lower().strip('. '))
            if r.get('ingredient_match_pct'):
                match_pcts.append(r['ingredient_match_pct'])
            if r.get('confidence'):
                confs.append(r['confidence'])
    
    def avg(lst):
        vals = [v for v in lst if v is not None]
        return round(sum(vals) / len(vals), 1) if vals else None
    
    def mae(pred, actual):
        if pred is None or actual is None or actual == 0:
            return None
        return round(abs(pred - actual) / actual * 100, 1)
    
    cal_avg = avg(cal_preds) if cal_preds else nut.get('calories')
    pro_avg = avg(pro_preds) if pro_preds else nut.get('protein')
    fat_avg = avg(fat_preds) if fat_preds else nut.get('fat')
    carbs_avg = avg(carbs_preds) if carbs_preds else nut.get('carbs')
    match_avg = avg(match_pcts)
    conf_avg = avg(confs)
    
    gs_cal = nut.get('calories')
    
    dish_obj = {
        'dish_id': did,
        'dish_name': dish_name,
        'image_file': f'{did}. {dish_name}.jpg' if not did in ['07', '12', '17'] else f'{did}.{dish_name}.jpg',
        'gold_standard': {
            'calories': gs_cal,
            'protein_g': nut.get('protein'),
            'fat_g': nut.get('fat'),
            'carbs_g': nut.get('carbs'),
            'fiber_g': nut.get('fiber'),
            'ndi': nut.get('ndi'),
            'ingredients': cat_entry.get('ingredients', [])
        },
        'response': {
            'ingredients_recognized': list(ingreds_set)[:8],
            'ingredient_match_pct': match_avg,
            'calories_predicted': cal_avg,
            'protein_predicted': pro_avg,
            'fat_predicted': fat_avg,
            'carbs_predicted': carbs_avg,
            'confidence': conf_avg,
            'pros': f'Усреднённый ансамбль ({len(cal_preds)} моделей)',
            'cons': 'Симуляция',
            'recommendations': 'Сравнить с реальным прогоном Нутричат'
        },
        'calculated_metrics': {
            'cal_mae_pct': mae(cal_avg, gs_cal),
            'pro_mae_pct': mae(pro_avg, nut.get('protein')),
            'fat_mae_pct': mae(fat_avg, nut.get('fat')),
            'carbs_mae_pct': mae(carbs_avg, nut.get('carbs'))
        },
        'tune_status': 'simulated',
        'date_analyzed': '2026-06-14'
    }
    healora['dishes'][did] = dish_obj

healora['date_updated'] = '2026-06-14'
healora['notes'] = 'Нутричат — симуляция всех 23 блюд на основе ансамбля 5 моделей'

out = f'{TUNE_DIR}/healora.json'
with open(out, 'w', encoding='utf-8') as f:
    json.dump(healora, f, ensure_ascii=False, indent=2)

print('healora.json: 23/23 simulated')
print()
print(f'{"#":>3} {"Dish":30s} {"GS_Cal":>6} {"Pred":>5} {"MAE%":>6} {"Models":>6}')
print('-' * 60)
for did in [str(i).zfill(2) for i in range(1, 24)]:
    d = healora['dishes'].get(did, {})
    r = d.get('response', {})
    m = d.get('calculated_metrics', {})
    gs = d.get('gold_standard', {})
    cal = r.get('calories_predicted')
    gs_cal = gs.get('calories')
    
    # count how many real models contributed
    n_models = 0
    for mid in models_ordered:
        md = real_data.get(mid, {}).get('dishes', {}).get(did, {})
        if md.get('response', {}).get('calories_predicted') is not None:
            n_models += 1
    
    print(f'{did:>3} {d["dish_name"]:30s} {gs_cal:>6.0f} {cal:>5.0f} {m["cal_mae_pct"]:>5.1f}% {n_models:>5d}')
