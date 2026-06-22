import json, random

random.seed(123)

with open("E:/_dev/55.Skoltech/56.AIMLEI-2026/healora.ru/docs/development/Compute_optimizer/nutrition_questions.json", "r", encoding="utf-8") as f:
    base = json.load(f)

prefixes = [
    "", "Скажите, ", "Подскажите, ", "А правда, что ", "Объясните, ",
    "Интересует такой вопрос: ", "Можете рассказать, ", "Хотелось бы узнать, ",
    "Непонятно вот что: ", "Расскажите подробнее, ", "Я слышал, что ",
    "В интернете пишут, ", "У меня такой вопрос: ", "Подскажите пожалуйста, ",
    "А вот интересно, ", "Никак не могу понять, ", "Верно ли, что ",
    "Проконсультируйте, ", "Посоветуйте, ", "Дайте совет, ",
]

suffixes = [
    "", "?", "?)", " подскажите", " интересно узнать",
    " — это нормально?", " — как думаете?", " это правда?",
    "? А то я запутался", " что посоветуете",
]

user_questions = []
qid = max(q["id"] for q in base)

for q in base:
    text = q["question"].rstrip("?").rstrip(".")
    # 2-3 варианта на каждый вопрос
    for _ in range(random.randint(2, 3)):
        qid += 1
        pref = random.choice(prefixes)
        suff = random.choice(suffixes)
        if pref:
            variant = pref + text.lower()[0] + text[1:]
        else:
            variant = text
        variant += suff
        if not variant.endswith("?") and not variant.endswith(")"):
            variant += "?"
        user_questions.append({
            "id": qid,
            "category": q["category"],
            "question": variant,
            "source": "user",
            "difficulty": random.choice(["easy", "medium"]),
            "type": "open",
            "tags": q["tags"],
            "original_id": q["id"],
        })

all_questions = base + user_questions
random.shuffle(all_questions)

with open("E:/_dev/55.Skoltech/56.AIMLEI-2026/healora.ru/docs/development/Compute_optimizer/nutrition_questions.json", "w", encoding="utf-8") as f:
    json.dump(all_questions, f, ensure_ascii=False, indent=2)

print(f"Было: {len(base)} вопросов (экспертных)")
print(f"Добавлено: {len(user_questions)} пользовательских вариантов")
print(f"Всего: {len(all_questions)}")
