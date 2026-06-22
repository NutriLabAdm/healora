import json, os, re, sys

TUNE_DIR = r"E:\_dev\55.Skoltech\56.AIMLEI-2026\healora.ru\docs\development\Food_CV\tune_model"
FEED_PATH = os.path.join(TUNE_DIR, "gemini_flash_10dishes.json")

sys.stdout.reconfigure(encoding='utf-8')

with open(FEED_PATH, 'r', encoding='utf-8') as f:
    feed = json.load(f)

model_map = {'gemini_flash_2.6': 'gemini'}
model_name_map = {'gemini_flash_2.6': 'Gemini 2.5 Flash'}

for rec in feed['cv_responses']:
    did = str(rec['dish_id']).zfill(2)
    raw_model = rec['model_id']
    mid = model_map.get(raw_model, raw_model)
    mname = model_name_map.get(raw_model, raw_model)
    dish_name = rec['dish_name']
    img_file = rec['image_file']
    resp = rec['response']

    # Build slug from image filename
    name_part = os.path.splitext(img_file)[0]
    name_clean = re.sub(r'^_?\d+[\.\s]*', '', name_part)
    name_slug = re.sub(r'[^\w\s\-]', '', name_clean).strip().replace(' ', '_')[:60]

    stub = {
        'dish_id': did,
        'model_id': mid,
        'model_name': mname,
        'dish_name': dish_name,
        'image_file': img_file,
        'gold_standard': {
            'calories': None, 'protein_g': None, 'fat_g': None,
            'carbs_g': None, 'fiber_g': None, 'ndi': None,
            'ingredients': resp.get('ingredients_recognized', [])
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
            'recommendations': resp.get('recs'),
        },
        'calculated_metrics': {
            'cal_mae_pct': resp.get('cal_mae_pct'),
            'pro_mae_pct': resp.get('pro_mae_pct'),
            'fat_mae_pct': resp.get('fat_mae_pct'),
            'carbs_mae_pct': resp.get('carbs_mae_pct'),
        },
        'tune_status': 'done',
        'date_analyzed': '2026-06-14',
    }

    fname = f'{did}__{mid}_{name_slug}.json'
    fpath = os.path.join(TUNE_DIR, fname)
    with open(fpath, 'w', encoding='utf-8') as f:
        json.dump(stub, f, ensure_ascii=False, indent=2)

print(f'Imported {len(feed["cv_responses"])} records from unified file')
print(f'Model: {feed["target_model"]}')

# Generate pros/cons comparison
print()
print('=' * 80)
print('         Сравнительный анализ Плюсов / Минусов — Gemini Flash 2.6')
print('=' * 80)

common_pros = {
    'сегментация': ['04', '07', '09'],
    'текстура / границы': ['05', '06', '10'],
    'поштучный подсчёт': ['08', '12'],
    'OCR / этикетки': ['11'],
    'эталонный паттерн': ['13'],
}
common_cons = {
    'ракурс / освещение': ['04'],
    'скрытые ингредиенты': ['05', '06', '08'],
    'неразличимые соусы/заправки': ['07', '10'],
    'упаковка / тара': ['11', '12'],
    'перекрытие объектов': ['09'],
}

print()
print('--- Сильные стороны модели ---')
for topic, dishes in sorted(common_pros.items()):
    print(f'  {topic}: блюда {", ".join(dishes)}')

print()
print('--- Слабые стороны модели ---')
for topic, dishes in sorted(common_cons.items()):
    print(f'  {topic}: блюда {", ".join(dishes)}')

print()
print('--- Детальная таблица ---')
print(f'{"#":>3} {"Блюдо":35s} {"Совп.":>5} {"Ккал":>5} {"Б":>4} {"Ж":>4} {"У":>4} {"Увер.":>5}')
print('-' * 70)
for rec in feed['cv_responses']:
    r = rec['response']
    print(f'{rec["dish_id"]:>3} {rec["dish_name"]:35s} {r["ingredient_match_pct"]:>4}% {r["calories_predicted"]:>5} {r["protein_predicted"]:>4} {r["fat_predicted"]:>4} {r["carbs_predicted"]:>4} {r["confidence"]:>4}%')

print()
print('--- Pros across dishes ---')
for rec in feed['cv_responses']:
    print(f'  #{rec["dish_id"]} ({rec["dish_name"]}): {rec["response"]["pros"]}')

print()
print('--- Cons across dishes ---')
for rec in feed['cv_responses']:
    print(f'  #{rec["dish_id"]} ({rec["dish_name"]}): {rec["response"]["cons"]}')
