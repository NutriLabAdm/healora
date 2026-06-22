# Протокол: Питание (Nutrition Hub)
### ID: `PTL_NUTRITION`

### Category: Базовый

---

## 1. Цель

Обеспечение нутритивной поддержки через системный подбор микронутриентов, диеты и режима питания. Служит связующим звеном между диагностикой дефицитов, диетическими протоколами и планами лечения.

---

## 2. Области применимости

Коррекция дефицитов, подбор диеты, нутритивное сопровождение лекарственной терапии, метаболический синдром, ожирение, пищевая непереносимость.

---

## 3. Структура домена

```
nutrition/
├── minerals/         # 13 минералов (Ca, Mg, Zn, Fe, Se, I…)
├── vitamins/         # 16 витаминов (A–K, включая B-комплекс)
├── vitamin_like/     # 21 витаминоподобное (CoQ10, NAC, NAD+…)
├── diets/            # 10 диетических протоколов
└── food/             # 2 методологии (описание блюд, анализ фото)
```

Смежные: `nutrition/diet_preferences/` (предпочтения), `nutrition/diet_restrictions/` (ограничения).

---

## 4. Типовые сценарии

| Сценарий | Задействованные разделы | Пример |
|----------|------------------------|--------|
| Дефицит минерала | `nutrition/minerals/` + `supplements/` | Mg → суплементация |
| Подбор диеты | `nutrition/diets/` + `nutrition/diet_preferences/` | Средиземноморская + без глютена |
| Сопровождение GLP-1 | `nutrition/vitamins/` + `nutrition/minerals/` + `drugs/` | B12, Mg, D на фоне семаглутида |
| Анализ рациона | `nutrition/food/` + `nutrition/minerals/` + `nutrition/vitamins/` | Фото еды → покрытие микронутриентов |
| Метаболический синдром | `nutrition/diets/` + `protocols/protocol_metabolic_cardio_risks.md` | DASH + контроль гликемии |

---

## 5. Кросс-ссылки

| Из | В | Связь |
|----|---|-------|
| `nutrition/minerals/` | `drugs/` | Дефицит на фоне препарата |
| `nutrition/vitamins/` | `drugs/` | Дефицит на фоне препарата |
| `nutrition/vitamin_like/` | `drugs/` | Взаимодействие (CoQ10 + статины) |
| `nutrition/diets/` | `protocol_obecity/` | Диета как компонент протокола ожирения |
| `nutrition/food/` | `diary/` | Анализ фото → дневник питания |
| `nutrition/` | `treatment_plans/` | Нутриенты → план коррекции |

---

## 6. Протоколы, использующие Nutrition Hub

- `protocol_obecity/protocol_obecity.md` — ссылается на `nutrition/diets/` для TRE, Mediterranean, DASH
- `protocols/protocol_glycemic_control.md` — ссылается на `nutrition/minerals/` (хром, магний)
- `protocols/protocol_cardiovascular_health.md` — ссылается на `nutrition/diets/` (DASH)
- `protocols/protocol_hormonal_endocrine.md` — ссылается на `nutrition/vitamins/` (витамин D, йод)
- `protocols/protocol_miin_deficits.md` — комплексная карта дефицитов
