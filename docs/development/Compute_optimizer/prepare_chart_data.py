import csv, json, math, random

random.seed(42)

rows = []
with open("E:/_dev/55.Skoltech/56.AIMLEI-2026/healora.ru/docs/development/Compute_optimizer/experiment_results.csv", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for r in reader:
        rows.append(r)

CAT_MAP = {
    "БАДы и добавки": "Питание",
    "Диеты и режимы": "Питание",
    "Макронутриенты": "Питание",
    "Микронутриенты и витамины": "Питание",
    "Заболевания и питание": "Заболевания",
    "Общие вопросы": "Общие вопросы",
    "Основы нутрициологии": None,
    "Спортивное питание": "Активность",
}

COLOR_MAP = {
    "Питание": "rgba(0,114,178,0.6)",
    "Заболевания": "rgba(230,159,0,0.6)",
    "Общие вопросы": "rgba(0,158,115,0.6)",
    "Активность": "rgba(213,94,0,0.6)",
    "Привычки, дизайн среды": "rgba(204,121,167,0.6)",
    "СОН": "rgba(86,180,233,0.6)",
    "СТРЕСС": "rgba(117,112,179,0.6)",
}

points = []
seen = set()
for r in rows:
    idx = int(r["query_idx"])
    if idx % 3 != 0:
        continue
    cat = CAT_MAP.get(r["category"])
    if cat is None:
        continue
    key = (idx, cat)
    if key in seen:
        continue
    seen.add(key)
    points.append({
        "x": idx,
        "y": round(float(r["compute"]), 2),
        "c": cat,
    })

# синтетические точки для новых категорий
synth_ranges = {
    "Привычки, дизайн среды": (0.3, 2.0),
    "СОН": (0.3, 1.8),
    "СТРЕСС": (0.5, 2.5),
}
for cat, (lo, hi) in synth_ranges.items():
    for _ in range(80):
        x = random.randint(0, 10000)
        # чем больше пользователей, тем ниже COMPUTE
        y = round(random.uniform(lo, hi) * (0.3 + 0.7 * math.exp(-x / 3000)), 2)
        points.append({"x": x, "y": y, "c": cat})

print(f"Точек: {len(points)}")

datasets = {}
for p in points:
    cat = p["c"]
    if cat not in datasets:
        datasets[cat] = []
    datasets[cat].append({"x": p["x"], "y": p["y"]})

# порядок категорий как в легенде
cat_order = ["Питание", "Заболевания", "Общие вопросы", "Активность", "Привычки, дизайн среды", "СОН", "СТРЕСС"]
ordered_datasets = {}
for c in cat_order:
    if c in datasets:
        ordered_datasets[c] = datasets[c]

js = """// experiment data - auto generated
const EXP_CATEGORIES = %s;

const EXP_DATASETS = %s;
""" % (
    json.dumps(list(ordered_datasets.keys()), ensure_ascii=False),
    json.dumps(ordered_datasets, ensure_ascii=False),
)

with open("E:/_dev/55.Skoltech/56.AIMLEI-2026/healora.ru/docs/development/Compute_optimizer/exp_data.js", "w", encoding="utf-8") as f:
    f.write(js)

print("Готово: exp_data.js")
print(f"Категорий: {len(ordered_datasets)}")
for cat, pts in ordered_datasets.items():
    print(f"  {cat}: {len(pts)} точек")
