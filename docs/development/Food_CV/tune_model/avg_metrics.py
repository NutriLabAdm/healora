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

models_ordered = ['gpt4o', 'claude_4_6', 'gemini', 'deepseek', 'qwen', 'healora']
model_labels = {
    'gpt4o': 'GPT',
    'claude_4_6': 'Claude 4.6',
    'gemini': 'Gemini',
    'deepseek': 'DeepSeek',
    'qwen': 'Qwen',
    'healora': 'Нутричат',
}

all_models = {}
for mid in models_ordered:
    path = os.path.join(TUNE_DIR, f'{mid}.json')
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            all_models[mid] = json.load(f)

print('=' * 120)
print('УСРЕДНЁННЫЕ МЕТРИКИ ПО ВСЕМ МОДЕЛЯМ')
print('=' * 120)
print()

# Per-dish table
header = f'{"#":>3} {"Блюдо":30s} {"GS":>5}'
for mid in models_ordered:
    header += f' {model_labels[mid]:>12s}'
header += f' {"Среднее":>8s} {"MAE%":>6s}'
print(header)
print('-' * len(header))

all_cal_maes = []
for did in [str(i).zfill(2) for i in range(1, 24)]:
    cat_entry = cat_by_id.get(did, {})
    nut = cat_entry.get('nutrition', {})
    gs_cal = nut.get('calories')
    dish_name = cat_entry.get('dish_name', '') or cat_entry.get('title', '')
    
    row = f'{did:>3} {dish_name:30s} {gs_cal:>5.0f}' if gs_cal else f'{did:>3} {dish_name:30s} {"—":>5}'
    
    preds = []
    for mid in models_ordered:
        d = all_models.get(mid, {}).get('dishes', {}).get(did, {})
        r = d.get('response', {})
        cal = r.get('calories_predicted')
        if cal is not None:
            preds.append(cal)
            row += f' {cal:>12.0f}'
        else:
            row += f' {"—":>12s}'
    
    if preds and gs_cal:
        avg = sum(preds) / len(preds)
        mae = abs(avg - gs_cal) / gs_cal * 100
        row += f' {avg:>8.1f} {mae:>5.1f}%'
        all_cal_maes.append(mae)
    elif preds:
        avg = sum(preds) / len(preds)
        row += f' {avg:>8.1f} {"—":>6s}'
    else:
        row += f' {"—":>8s} {"—":>6s}'
    
    print(row)

print()
print('=' * 120)
print()

# Per-model summary
print(f'{"Модель":20s} {"Сделано":>8s} {"Ср. MAE%":>10s} {"Медиана MAE%":>12s} {"Мин MAE%":>9s} {"Макс MAE%":>10s}')
print('-' * 75)
for mid in models_ordered:
    md = all_models.get(mid, {})
    dishes = md.get('dishes', {})
    maes = []
    done = 0
    for did, d in dishes.items():
        r = d.get('response', {})
        m = d.get('calculated_metrics', {})
        if r.get('calories_predicted') is not None:
            done += 1
            cal_mae = m.get('cal_mae_pct')
            if cal_mae is not None:
                maes.append(cal_mae)
    if maes:
        avg = sum(maes) / len(maes)
        sorted_maes = sorted(maes)
        med = sorted_maes[len(maes) // 2]
        mn = min(maes)
        mx = max(maes)
        print(f'{model_labels[mid]:20s} {done:>8d} {avg:>9.1f}% {med:>11.1f}% {mn:>8.1f}% {mx:>9.1f}%')
    else:
        print(f'{model_labels[mid]:20s} {done:>8d} {"—":>10s} {"—":>12s} {"—":>9s} {"—":>10s}')

print()
print('=' * 120)

if all_cal_maes:
    overall_avg = sum(all_cal_maes) / len(all_cal_maes)
    print(f'\nОбщая средняя MAE% по калориям (по всем блюдам с данными): {overall_avg:.1f}%')
    
    # Count dishes with data from at least one model
    dishes_with_data = 0
    for did in [str(i).zfill(2) for i in range(1, 24)]:
        for mid in models_ordered:
            d = all_models.get(mid, {}).get('dishes', {}).get(did, {})
            r = d.get('response', {})
            if r.get('calories_predicted') is not None:
                dishes_with_data += 1
                break
    print(f'Блюд с данными хотя бы от одной модели: {dishes_with_data}/23')
    print(f'Всего ответов: {len(all_cal_maes)}')
