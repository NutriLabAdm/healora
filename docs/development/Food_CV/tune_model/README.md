# Тюнинг CV-моделей: унифицированный формат

## Формат данных

Все ответы моделей хранятся в одном JSON-файле на модель:

```
tune_model/
├── gpt4o.json          # GPT-4o — все 23 блюда
├── claude.json         # Claude 3.5 Sonnet
├── gemini.json         # Gemini 2.5 Flash
├── deepseek.json       # DeepSeek-V3
├── qwen.json           # Qwen2.5-VL
├── healora.json        # Healora Nutrition
└── INDEX.md            # Таблица статуса (авто-генерация)
```

Каждый файл содержит объект `dishes`, где ключ — `dish_id` (01–23):

```json
{
  "model_id": "gemini",
  "model_name": "Gemini 2.5 Flash",
  "date_created": "2026-06-14",
  "date_updated": "2026-06-14",
  "dishes": {
    "04": {
      "dish_id": "04",
      "dish_name": "Яичница с овощами",
      "image_file": "04. яишница с овощами.jpg",
      "gold_standard": {
        "calories": 280,
        "protein_g": 20,
        "fat_g": 18,
        "carbs_g": 8,
        "fiber_g": 3,
        "ndi": 8,
        "ingredients": ["яйца куриные (2 шт)", "помидоры", "болгарский перец", "лук", "зелень", "растительное масло"]
      },
      "response": {
        "ingredients_recognized": ["яйцо куриное (глазунья)", "огурец свежий", "томат свежий", "хлеб пшеничный", "крекеры"],
        "ingredient_match_pct": 92,
        "calories_predicted": 460,
        "protein_predicted": 20.0,
        "fat_predicted": 22.0,
        "carbs_predicted": 45.0,
        "confidence": 92,
        "pros": "Точное определение количества белковых компонентов...",
        "cons": "Из-за угла съемки смазана структура хлебобулочных изделий...",
        "recommendations": "Рекомендовать пользователю ракурс под углом 60-90 градусов..."
      },
      "calculated_metrics": {
        "cal_mae_pct": 2,
        "pro_mae_pct": 0,
        "fat_mae_pct": 5,
        "carbs_mae_pct": 4
      },
      "tune_status": "done",
      "date_analyzed": "2026-06-14"
    }
  }
}
```

## Как добавить новый ответ модели

1. Открой `{model}.json` (или создай, если файла нет — скопируй структуру из `gemini.json`)
2. Найди нужный `dish_id` (01–23)
3. Заполни поля `response.*` и `calculated_metrics.*`
4. Поставь `tune_status: "done"` и `date_analyzed: "YYYY-MM-DD"`
5. Запусти `python gen_index.py` для обновления INDEX.md

## Скрипты

| Скрипт | Назначение |
|--------|-----------|
| `gen_index.py` | Сканирует unified JSON-файлы → обновляет INDEX.md |
| `migrate_to_unified.py` | Конвертирует старые индивидуальные стабы в unified-формат |
| `import_gemini_flash.py` | Импортирует ответы из Gemini Flash unified-фида |

## Статус обработки

Смотри `INDEX.md` — таблица "Реальных / Симул." по каждой модели.
