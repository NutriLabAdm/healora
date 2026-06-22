import json, os, re, sys
from datetime import datetime

TUNE_DIR = r"E:\_dev\55.Skoltech\56.AIMLEI-2026\healora.ru\docs\development\Food_CV\tune_model"
CATALOG_PATH = r"E:\_dev\55.Skoltech\56.AIMLEI-2026\healora.ru\www\dev.healora.ru\src\assets\data\food_catalog.json"
OUTPUT = os.path.join(TUNE_DIR, "INDEX.md")

sys.stdout.reconfigure(encoding='utf-8')

models_ordered = ['gpt4o', 'claude_4_6', 'gemini', 'deepseek', 'qwen', 'healora']
model_labels = {
    'gpt4o': 'gpt-5.5-vision',
    'claude_4_6': 'Claude 4.6',
    'gemini': 'Gemini 2.0',
    'deepseek': 'DeepSeek-V3',
    'qwen': 'Qwen2.5-VL',
    'healora': 'Нутричат',
}
model_colors = {
    'gpt4o': '#10a37f',
    'claude_4_6': '#f97316',
    'gemini': '#4285f4',
    'deepseek': '#4f46e5',
    'qwen': '#8b5cf6',
    'healora': '#dc2626',
}

# Load unified per-model JSONs
model_data = {}
for model in models_ordered:
    fpath = os.path.join(TUNE_DIR, f"{model}.json")
    if os.path.exists(fpath):
        with open(fpath, 'r', encoding='utf-8') as f:
            model_data[model] = json.load(f)
    else:
        model_data[model] = None

# Build per-dish table
dishes = []
for did in sorted(set(int(did) for m in model_data.values() if m for did in m['dishes'])):
    did_s = str(did).zfill(2)
    row = {'id': did_s, 'title': '', 'models': {}}
    for model in models_ordered:
        md = model_data.get(model)
        if md and did_s in md['dishes']:
            d = md['dishes'][did_s]
            row['title'] = d['dish_name']
            resp = d['response']
            has_data = resp.get('calories_predicted') is not None
            is_real = d.get('tune_status') in ('done', 'analyzed')
            status = 'done' if (is_real and has_data) else 'simulated' if has_data else 'pending'
            gs = d.get('gold_standard', {})
            row['models'][model] = {
                'status': status,
                'calories': resp.get('calories_predicted'),
                'match': resp.get('ingredient_match_pct'),
                'confidence': resp.get('confidence'),
                'ndi': gs.get('ndi'),
                'ingredients': gs.get('ingredients', []),
                'ingredients_recognized': resp.get('ingredients_recognized', []),
                'pros': resp.get('pros'),
                'cons': resp.get('cons'),
                'recommendations': resp.get('recommendations'),
            }
        else:
            row['models'][model] = {'status': 'missing', 'calories': None, 'match': None, 'confidence': None}
    dishes.append(row)

# Build INDEX.md
now = datetime.now().strftime('%Y-%m-%d %H:%M')
total = len(dishes) * len(models_ordered)
done = sum(1 for d in dishes for m in models_ordered if d['models'][m]['status'] == 'done')
simulated = sum(1 for d in dishes for m in models_ordered if d['models'][m]['status'] == 'simulated')

lines = []
lines.append(f'# Индекс тюнинга CV-моделей')
lines.append('')
lines.append(f'**Статус:** {done}/{total} реальных ответов, +{simulated} симулированных, {total - done - simulated} ожидают')
lines.append(f'**Обновлено:** {now}')
lines.append('')
lines.append('## Легенда')
lines.append('')
lines.append('| Статус | Значение |')
lines.append('|--------|----------|')
lines.append('| ✅ **done** | Реальный ответ модели записан |')
lines.append('| 🔷 **simulated** | Симулированные данные (заготовка gen_stubs) |')
lines.append('| ⬜ pending | Заготовка — ожидает анализа |')
lines.append('| ❌ missing | Файл модели отсутствует |')
lines.append('')
lines.append('## Сводка по моделям')
lines.append('')
lines.append('| Модель | Реальных | Симул. | Прогресс |')
lines.append('|--------|--------:|------:|:---------|')
for model in models_ordered:
    cnt = sum(1 for d in dishes if d['models'][model]['status'] == 'done')
    sim = sum(1 for d in dishes if d['models'][model]['status'] == 'simulated')
    bar_len = 20
    filled = int((cnt+sim) / len(dishes) * bar_len)
    bar = '█' * filled + '░' * (bar_len - filled)
    lines.append(f'| {model_labels[model]:14s} | {cnt:2d} / {len(dishes):2d} | {sim:2d} | {bar} |')
lines.append('')

lines.append('## Детальная таблица')
lines.append('')
lines.append('**Формат ячеек:** `калорииккал m:%совпадения_ингредиентов c:%уверенности N:NDI ⚠:красный_флаг ✏:рекомендация`')
lines.append('')
lines.append('| # | Блюдо | ' + ' | '.join(model_labels[m] for m in models_ordered) + ' |')
lines.append('|---|-------|' + '|'.join(':---:' for _ in models_ordered) + '|')

for d in dishes:
    cells = [d['id'], d['title'][:45]]
    for model in models_ordered:
        rec = d['models'][model]
        cal = rec['calories']
        match = rec['match']
        conf = rec['confidence']
        ndi = rec.get('ndi')
        cons = rec.get('cons') or ''
        recs = rec.get('recommendations') or ''
        
        def short(txt, maxlen=30):
            return txt[:maxlen] + '…' if len(txt) > maxlen else txt
        
        detail = f'{int(cal)}ккал' if cal else ''
        if match:
            detail += f' m:{int(match)}%'
        if conf:
            detail += f' c:{int(conf)}%'
        if ndi is not None:
            detail += f' N:{ndi}'
        if cons:
            detail += f' ⚠:{short(cons, 20)}'
        if recs:
            detail += f' ✏:{short(recs, 20)}'
        
        if rec['status'] == 'done':
            cells.append(f'✅ {detail}')
        elif rec['status'] == 'simulated':
            cells.append(f'🔷 {detail}')
        elif rec['status'] == 'pending':
            cells.append('⬜')
        else:
            cells.append('❌')
    lines.append('| ' + ' | '.join(cells) + ' |')

lines.append('')
lines.append('---')
lines.append(f'*Сгенерировано {now}*')
lines.append('*Формат: один JSON-файл на модель (model.json)*')

with open(OUTPUT, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print(f'INDEX.md created: {done}/{total} done, +{simulated} simulated, {total - done - simulated} pending')
