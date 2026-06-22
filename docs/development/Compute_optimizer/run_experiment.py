"""
Эксперимент: снижение COMPUTE при накоплении ответов
Симуляция 4 фаз с разными стратегиями оркестратора
"""

import json, random, math, csv, os
from datetime import datetime

random.seed(42)

# ─── Загрузка вопросов ───
with open(os.path.join(os.path.dirname(__file__), "nutrition_questions.json"), encoding="utf-8") as f:
    questions = json.load(f)

print(f"Загружено вопросов: {len(questions)}")

# ─── Параметры эксперимента ───

# Профили COMPUTE по фазам
PHASES = [
    {"name": "Холодный старт",         "start": 0,     "end": 200,   "compute_base": 5.0, "score_base": 93, "cache_hit": 0.00, "ensemble": 5, "personal_rag": False},
    {"name": "Накопление кэша",        "start": 201,   "end": 1000,  "compute_base": 3.5, "score_base": 90, "cache_hit": 0.25, "ensemble": 3, "personal_rag": False},
    {"name": "Персонализация",         "start": 1001,  "end": 5000,  "compute_base": 2.0, "score_base": 88, "cache_hit": 0.45, "ensemble": 2, "personal_rag": True},
    {"name": "Насыщение",              "start": 5001,  "end": 10000, "compute_base": 1.0, "score_base": 86, "cache_hit": 0.65, "ensemble": 1, "personal_rag": True},
]

# ─── Профили пользователей ───
USER_PROFILES = {
    "new":   {"repeat_prob": 0.1, "personal_context": 0.0, "ltv_weeks": 0},
    "casual": {"repeat_prob": 0.3, "personal_context": 0.2, "ltv_weeks": 2},
    "regular": {"repeat_prob": 0.5, "personal_context": 0.5, "ltv_weeks": 8},
    "active": {"repeat_prob": 0.7, "personal_context": 0.8, "ltv_weeks": 16},
    "loyal":  {"repeat_prob": 0.85, "personal_context": 1.0, "ltv_weeks": 24},
}

# ─── Сложность вопросов ───
DIFFICULTY_COMPUTE = {"easy": 0.6, "medium": 1.0, "hard": 1.6}
DIFFICULTY_SCORE   = {"easy": 1.05, "medium": 1.0, "hard": 0.92}

# ─── Категории ───
CATEGORY_COMPUTE = {
    "Основы нутрициологии": 1.0,
    "Макронутриенты": 1.0,
    "Микронутриенты и витамины": 1.2,
    "Заболевания и питание": 1.4,
    "Диеты и режимы": 1.1,
    "Спортивное питание": 1.0,
    "БАДы и добавки": 1.3,
    "Общие вопросы": 0.8,
}

# ─── Состояние эксперимента ───
cache = {}
user_history = {}   # user_id -> list of question hashes
user_profiles = {}  # user_id -> profile label
logs = []
query_pool = questions.copy()

def simulate_query(phase, user_id, question, query_idx):
    """Симулирует один запрос, возвращает COMPUTE, SCORE, метаданные."""
    q_hash = hash(question["question"])

    # Определяем профиль пользователя
    profile = user_profiles.get(user_id, "new")
    p = USER_PROFILES[profile]

    # Проверка кэша
    is_cache_hit = q_hash in cache and random.random() < phase["cache_hit"] * (1 + p["personal_context"] * 0.2)

    if is_cache_hit:
        compute = 0.1 * DIFFICULTY_COMPUTE.get(question.get("difficulty", "medium"), 1.0)
        score = phase["score_base"] * DIFFICULTY_SCORE.get(question.get("difficulty", "medium"), 1.0) * random.uniform(0.98, 1.01)
        score = min(100, max(0, score))
        return compute, round(score, 1), is_cache_hit, 0

    # Выбор размера ансамбля
    cat = question.get("category", "Общие вопросы")
    diff = question.get("difficulty", "medium")
    cat_factor = CATEGORY_COMPUTE.get(cat, 1.0)
    diff_factor = DIFFICULTY_COMPUTE.get(diff, 1.0)

    # Сложные категории получают больше моделей
    effective_ensemble = phase["ensemble"]
    if cat_factor > 1.2 and effective_ensemble < 5:
        effective_ensemble = min(5, effective_ensemble + 1)
    if diff == "hard" and effective_ensemble < 3:
        effective_ensemble = max(3, effective_ensemble)

    # Персональный RAG снижает compute
    personal_factor = 1.0
    if phase["personal_rag"] and p["personal_context"] > 0:
        personal_factor = 1.0 - 0.3 * p["personal_context"]

    compute_base = phase["compute_base"]
    # Снижение compute от повторных запросов пользователя
    repeat_factor = 1.0
    history = user_history.get(user_id, [])
    if len(history) > 5:
        repeat_factor = 1.0 - 0.15 * min(1.0, len(history) / 50)

    compute = compute_base * cat_factor * diff_factor * personal_factor * repeat_factor * (effective_ensemble / phase["ensemble"] if phase["ensemble"] > 0 else 1)
    compute = max(0.2, compute)

    # SCORE: зависит от размера ансамбля и сложности
    score_base = phase["score_base"] * DIFFICULTY_SCORE.get(diff, 1.0) * cat_factor**0.3
    ensemble_bonus = 1.0 + 0.02 * (effective_ensemble - 1)
    score = score_base * ensemble_bonus * random.uniform(0.97, 1.02)
    score = min(99, max(0, score))

    # Сохраняем в кэш (вероятность кэширования растёт)
    if random.random() < 0.3 + phase["cache_hit"] * 0.5:
        cache[q_hash] = True

    return round(compute, 2), round(score, 1), is_cache_hit, effective_ensemble


def simulate_experiment():
    """Запускает полный эксперимент — 10 000 запросов."""
    total_queries = 10000
    query_pool = questions.copy()

    # Распределение пользователей
    num_users = 500
    for uid in range(num_users):
        roll = random.random()
        if roll < 0.1:
            user_profiles[uid] = "loyal"
        elif roll < 0.25:
            user_profiles[uid] = "active"
        elif roll < 0.50:
            user_profiles[uid] = "regular"
        elif roll < 0.75:
            user_profiles[uid] = "casual"
        else:
            user_profiles[uid] = "new"

    logs = []
    rolling_compute = []
    rolling_score = []
    phase_stats = {p["name"]: {"compute": [], "score": [], "cache_hits": 0, "total": 0} for p in PHASES}

    # LTV сценарий: 1 активный пользователь делает 1000 запросов
    ltv_user = 0
    user_profiles[ltv_user] = "active"
    ltv_logs = []

    for q_idx in range(total_queries):
        # Определяем фазу
        phase = None
        for p in PHASES:
            if p["start"] <= q_idx <= p["end"]:
                phase = p
                break
        if phase is None:
            phase = PHASES[-1]

        # LTV: все запросы от одного пользователя
        if q_idx < 1000:
            user_id = ltv_user
        else:
            user_id = random.randint(0, num_users - 1)

        # Выбираем вопрос
        if random.random() < 0.3:
            # свежий вопрос
            question = random.choice(query_pool)
        else:
            # повторный (имитация повторяющихся тем)
            question = random.choice(query_pool[:500])

        if user_id not in user_history:
            user_history[user_id] = []
        user_history[user_id].append(hash(question["question"]))

        # Выполняем запрос
        compute, score, is_cache_hit, ensemble = simulate_query(phase, user_id, question, q_idx)

        log_entry = {
            "query_idx": q_idx,
            "phase": phase["name"],
            "user_id": user_id,
            "user_profile": user_profiles.get(user_id, "new"),
            "question": question["question"][:60],
            "category": question.get("category", ""),
            "difficulty": question.get("difficulty", "medium"),
            "source": question.get("source", "expert"),
            "compute": compute,
            "score": score,
            "cache_hit": is_cache_hit,
            "ensemble_size": ensemble,
        }
        logs.append(log_entry)

        if user_id == ltv_user:
            ltv_logs.append(log_entry)

        rolling_compute.append(compute)
        rolling_score.append(score)
        phase_stats[phase["name"]]["compute"].append(compute)
        phase_stats[phase["name"]]["score"].append(score)
        phase_stats[phase["name"]]["total"] += 1
        if is_cache_hit:
            phase_stats[phase["name"]]["cache_hits"] += 1

        # Прогресс
        if (q_idx + 1) % 1000 == 0:
            avg_c = sum(rolling_compute[-200:]) / min(200, len(rolling_compute))
            avg_s = sum(rolling_score[-200:]) / min(200, len(rolling_score))
            print(f"  {q_idx+1:5d}/{total_queries} | COMPUTE: {avg_c:.2f} | SCORE: {avg_s:.1f}")

    return logs, ltv_logs, phase_stats


def print_stats(logs, ltv_logs, phase_stats):
    """Печатает итоговую статистику."""
    print("\n" + "="*70)
    print("ИТОГИ ЭКСПЕРИМЕНТА")
    print("="*70)

    # 1. По фазам
    print(f"\n{'Фаза':<22} {'Запросов':<10} {'COMPUTE μ':<12} {'SCORE μ':<10} {'Cache%':<8} {'Ensemble':<8}")
    print("-"*70)
    for p in PHASES:
        s = phase_stats[p["name"]]
        avg_c = sum(s["compute"]) / len(s["compute"]) if s["compute"] else 0
        avg_s = sum(s["score"]) / len(s["score"]) if s["score"] else 0
        cache_pct = s["cache_hits"] / s["total"] * 100 if s["total"] else 0
        print(f"{p['name']:<22} {s['total']:<10} {avg_c:<12.2f} {avg_s:<10.1f} {cache_pct:<8.1f} {p['ensemble']:<8}")

    # 2. COMPUTE по категориям
    print(f"\n--- COMPUTE по категориям ---")
    cat_stats = {}
    for log in logs:
        cat = log["category"]
        if cat not in cat_stats:
            cat_stats[cat] = {"compute": [], "score": []}
        cat_stats[cat]["compute"].append(log["compute"])
        cat_stats[cat]["score"].append(log["score"])
    for cat, st in sorted(cat_stats.items()):
        avg_c = sum(st["compute"]) / len(st["compute"])
        avg_s = sum(st["score"]) / len(st["score"])
        print(f"  {cat:<30} COMPUTE: {avg_c:.2f}  SCORE: {avg_s:.1f}")

    # 3. LTV сценарий
    print(f"\n--- LTV: один пользователь, 1000 запросов ---")
    for chunk in range(5):
        chunk_logs = [l for l in ltv_logs if chunk*200 <= l["query_idx"] < (chunk+1)*200]
        if chunk_logs:
            avg_c = sum(l["compute"] for l in chunk_logs) / len(chunk_logs)
            avg_s = sum(l["score"] for l in chunk_logs) / len(chunk_logs)
            print(f"  Запросы {chunk*200+1}-{(chunk+1)*200}: COMPUTE={avg_c:.2f}  SCORE={avg_s:.1f}")

    # 4. Итоговое снижение
    first_500 = [l for l in logs if l["query_idx"] < 500]
    last_500  = [l for l in logs if l["query_idx"] >= 9500]
    if first_500 and last_500:
        fc = sum(l["compute"] for l in first_500) / len(first_500)
        lc = sum(l["compute"] for l in last_500) / len(last_500)
        fs = sum(l["score"] for l in first_500) / len(first_500)
        ls = sum(l["score"] for l in last_500) / len(last_500)
        print(f"\n{'='*70}")
        print(f"Итоговое снижение COMPUTE: {fc:.2f} → {lc:.2f}  ({((fc-lc)/fc*100):.0f}%)")
        print(f"Итоговый SCORE:           {fs:.1f} → {ls:.1f}  (изменение: {(ls-fs):+.1f})")
        print(f"{'='*70}")


def save_csv(logs):
    """Сохраняет логи в CSV."""
    path = os.path.join(os.path.dirname(__file__), "experiment_results.csv")
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=logs[0].keys())
        w.writeheader()
        w.writerows(logs)
    print(f"\nCSV сохранён: {path}")


if __name__ == "__main__":
    print("Запуск эксперимента...\n")
    logs, ltv_logs, phase_stats = simulate_experiment()
    print_stats(logs, ltv_logs, phase_stats)
    save_csv(logs)
