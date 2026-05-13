# Библиотека шаблонов планов лечения (Treatment Plan Templates)

Каждый шаблон соответствует протоколу HEALORA и содержит:
- **Заключение** (summary) — краткое описание назначения
- **Список интервенций** — перечень действий с периодичностью
- **Категорию** — nutritional / medical / wellness

## Протоколы

| Код | Название | Категория | Файл |
|-----|----------|-----------|------|
| 1.1 | Гликемический контроль | nutritional | [glycemic_control.md](glycemic_control.md) |
| 1.2 | Циркадное питание | nutritional | [circadian_nutrition.md](circadian_nutrition.md) |
| 1.3 | Гигиена сна | nutritional | [sleep_hygiene.md](sleep_hygiene.md) |
| 1.4 | Гидратация | nutritional | [hydration.md](hydration.md) |
| 1.5 | Базовые добавки | nutritional | [basic_supplements.md](basic_supplements.md) |
| 2.1 | Метаболические риски | medical | [metabolic_risks.md](metabolic_risks.md) |
| 2.2 | Гормональные нарушения | medical | [hormonal_disorders.md](hormonal_disorders.md) |
| 2.3 | Воспалительные состояния | medical | [inflammatory.md](inflammatory.md) |
| 3.1 | Сердечно-сосудистое здоровье | wellness | [cardiovascular.md](cardiovascular.md) |
| 3.2 | Когнитивное здоровье | wellness | [cognitive.md](cognitive.md) |
| 3.3 | Долголетие | wellness | [longevity.md](longevity.md) |

## Использование

Шаблоны загружаются в `planTemplates` (src/assets/data/plan_templates.js) и доступны через селектор в форме создания плана.
