---
id: RELEVANCE_TABLE
name: Сводная таблица релевантности — протоколы, параметры Цифрового Двойника, интервенции
name_ru: Сводная таблица релевантности
category: meta
tags:
  - relevance
  - mapping
  - cross_reference
status: done
created: 2026-05-15
updated: 2026-05-15
---

# Сводная таблица релевантности: Протоколы ожирения ↔ Параметры Цифрового Двойника ↔ Интервенции

## Назначение

Матрица связей между протоколами лечения ожирения, измеряемыми параметрами цифрового двойника (ЦД) с пороговыми значениями, и набором поведенческих/медицинских интервенций из каталога.

Поля ЦД ссылаются на структуру `healora_10_synthetic_digital_twin_profiles.json`:
- `demographics.*`, `anthropometrics.*`, `vitals.*`, `prototype_experiment.*`, `labs.*`, `lifestyle.*`, `genetics.*`, `medical_history.*`, `digital_twin_scores.*`

---

## 1. Диетические протоколы

### TRE_168 — Time-Restricted Eating 16:8

| Направление | Связь |
|-------------|-------|
| **Параметры ЦД (показания)** | `anthropometrics.bmi` ≥25; `anthropometrics.waist_cm` >80 (F) / >94 (M); `labs.glucose_mg_dl` >100; `labs.hba1c_percent` >5.7; `lifestyle.diet` = "standard"/"high_carb" |
| **Параметры ЦД (мониторинг)** | `anthropometrics.weight_kg` ↓; `labs.glucose_mg_dl` → норма; `labs.hba1c_percent` → <5.7; `lifestyle.sleep_hours` → ≥7 |
| **Интервенции (каталог)** | `FD_IF` — интервальное голодание; `FD_EAT` — ранние приёмы пищи; `FD_CAL` — ограничение калорий; `SL_BED` — фикс. время сна; `SL_HYG` — гигиена сна; `FD_SUG` — снижение сахара; `FD_WATER` — водный режим |
| **Поведенческая психология** | `BEH_03` — дневник самоконтроля (окно питания); `BEH_01` — КПТ (при срывах режима) |

### ADF — Alternate Day Fasting

| Направление | Связь |
|-------------|-------|
| **Параметры ЦД (показания)** | `anthropometrics.bmi` ≥30; `anthropometrics.waist_cm` >88 (F) / >102 (M); `labs.glucose_mg_dl` >100; `labs.hba1c_percent` >5.7; `digital_twin_scores.health_risk_score` >50 |
| **Параметры ЦД (мониторинг)** | `anthropometrics.weight_kg` ↓ 3-8% за 8-12 нед; `labs.glucose_mg_dl` → <100; `vitals.systolic_bp_mmhg` → <130; `lifestyle.stress_level_0_10` — контроль переедания в дни питания |
| **Интервенции (каталог)** | `FD_IF` — интервальное голодание; `FD_CAL` — ограничение калорий; `FD_WATER` — водный режим; `FD_ELEC` — баланс электролитов; `FD_FIB` — клетчатка в дни питания; `PH_AER` — аэробные (в дни питания); `MN_MDT` — медитация (контроль голода) |
| **Поведенческая психология** | `BEH_03` — дневник голодания/питания; `BEH_05` — поведенческая активация в дни питания; `BEH_07` — релаксация при остром чувстве голода |

### IF_52 — 5:2 Diet

| Направление | Связь |
|-------------|-------|
| **Параметры ЦД (показания)** | `anthropometrics.bmi` ≥25; `anthropometrics.waist_cm` >80 (F) / >94 (M); `labs.glucose_mg_dl` >100; `lifestyle.diet` — неструктурированное питание |
| **Параметры ЦД (мониторинг)** | `anthropometrics.weight_kg` ↓; `labs.glucose_mg_dl` → <100; `digital_twin_scores.streak_days` — adherence |
| **Интервенции (каталог)** | `FD_IF` — интервальное голодание (2 дня/нед); `FD_CAL` — 500-600 ккал в дни голодания; `FD_WATER` — водный режим; `FD_FIB` — клетчатка; `PH_AER` — аэробные (5 дней обычного питания) |
| **Поведенческая психология** | `BEH_03` — дневник; `BEH_01` — КПТ (планирование разгрузочных дней) |

### OMAD — One Meal A Day (draft)

| Направление | Связь |
|-------------|-------|
| **Параметры ЦД (показания)** | `anthropometrics.bmi` ≥30; `labs.glucose_mg_dl` <126 (без диабета); `digital_twin_scores.health_literacy_score` >60 — требует высокой грамотности |
| **Параметры ЦД (мониторинг)** | `labs.glucose_mg_dl` — риск гипогликемии; `lifestyle.stress_level_0_10` — риск срыва; `vitals.resting_hr_bpm` — признак переедания в одно окно |
| **Интервенции (каталог)** | `FD_IF` — интервальное голодание (одно окно); `FD_WATER` — водный режим; `FD_ELEC` — электролиты; `MN_BRTH` — дыхательные при голоде; `SP_MG` — магний (вечером) |
| **Поведенческая психология** | `BEH_03` — строгий дневник; `BEH_07` — релаксация; `BEH_04` — анализ цепей при срывах |

### MED_DIET — Mediterranean Diet

| Направление | Связь |
|-------------|-------|
| **Параметры ЦД (показания)** | `anthropometrics.bmi` ≥25; `labs.total_cholesterol_mg_dl` >200; `labs.ldl_mg_dl` >100; `labs.hba1c_percent` >5.7; `labs.crp_mg_l` >1.0; `medical_history.cardiovascular_disease` = "yes" / family history (+) |
| **Параметры ЦД (мониторинг)** | `labs.total_cholesterol_mg_dl` → <200; `labs.ldl_mg_dl` → <100; `labs.hba1c_percent` → <5.7; `labs.crp_mg_l` → <1.0; `vitals.systolic_bp_mmhg` → <130 |
| **Интервенции (каталог)** | `FD_ANTI` — противовоспалительная диета; `FD_FIB` — клетчатка; `SP_O3` — Омега-3; `FD_SUG` — снижение сахара; `FD_WATER` — вода; `PH_AER` — аэробные (150 мин/нед); `MN_STR` — управление стрессом |
| **Поведенческая психология** | `BEH_03` — дневник питания; `BEH_02` — мотивационное интервью (переход на MED-стиль); `BEH_05` — поведенческая активация (совместные приёмы пищи по MED-традиции) |

### DASH — DASH Diet

| Направление | Связь |
|-------------|-------|
| **Параметры ЦД (показания)** | `vitals.systolic_bp_mmhg` ≥130; `vitals.diastolic_bp_mmhg` ≥80; `anthropometrics.bmi` ≥25; `labs.total_cholesterol_mg_dl` >200; `labs.ldl_mg_dl` >100; `medical_history.hypertension` = "yes" |
| **Параметры ЦД (мониторинг)** | `vitals.systolic_bp_mmhg` → <130; `vitals.diastolic_bp_mmhg` → <80; `labs.total_cholesterol_mg_dl` → <200; `anthropometrics.weight_kg` ↓ |
| **Интервенции (каталог)** | `FD_ANTI` — противовоспалительная диета (низкий Na⁺); `FD_FIB` — клетчатка; `FD_SUG` — снижение сахара; `FD_WATER` — вода; `FD_ELEC` — баланс K⁺/Na⁺; `PH_AER` — аэробные; `MN_STR` — управление стрессом; `M_CAR01` — антигипертензивная терапия (при АД ≥140/90) |
| **Поведенческая психология** | `BEH_03` — дневник Na⁺/K⁺; `BEH_02` — мотивационное интервью (снижение соли); `BEH_07` — релаксация для снижения АД |

### KETO_STD — Standard Ketogenic Diet

| Направление | Связь |
|-------------|-------|
| **Параметры ЦД (показания)** | `anthropometrics.bmi` ≥30; `labs.glucose_mg_dl` >100; `labs.hba1c_percent` >5.7; `labs.triglycerides_mg_dl` >150; `anthropometrics.waist_cm` >88 (F) / >102 (M) |
| **Параметры ЦД (мониторинг)** | `anthropometrics.weight_kg` ↓ 3-9 кг за 6 мес; `labs.glucose_mg_dl` → <100; `labs.hba1c_percent` → <5.7; `labs.triglycerides_mg_dl` → <150; `labs.ldl_mg_dl` — возможен рост (+6.4 mg/dL); `labs.crp_mg_l` — снижение |
| **Интервенции (каталог)** | `FD_CRB` — контроль углеводов (<20-50 г/день); `FD_SUG` — снижение сахара; `FD_CAL` — контроль калорий; `FD_ELEC` — электролиты (кетогрипп); `FD_WATER` — вода ≥3 л; `SP_MG` — магний; `SP_D3` — витамин D; `M_LAB01` — расширенная биохимия (липиды, печень) |
| **Поведенческая психология** | `BEH_03` — дневник кетоза; `BEH_01` — КПТ (преодоление кетогриппа, соц. ситуаций); `BEH_02` — мотивационное интервью (удержание); `BEH_07` — релаксация при keto-flu |

### VLCKD — Very Low-Calorie Ketogenic Diet

| Направление | Связь |
|-------------|-------|
| **Параметры ЦД (показания)** | `anthropometrics.bmi` ≥35; `labs.glucose_mg_dl` >126; `labs.hba1c_percent` >6.5; `labs.triglycerides_mg_dl` >150; `digital_twin_scores.health_risk_score` >60 |
| **Параметры ЦД (мониторинг)** | `anthropometrics.weight_kg` ↓ 10-15 кг за 4-12 нед; `labs.glucose_mg_dl` → <100; `labs.hba1c_percent` → <6.0; `labs.ldl_mg_dl` — мониторинг; `labs.crp_mg_l` — снижение; `vitals.resting_hr_bpm` — мониторинг (риск аритмии); `labs.ferritin_ng_ml` — контроль (дефицит Fe на VLCKD) |
| **Интервенции (каталог)** | `FD_CRB` — контроль углеводов; `FD_CAL` — 600-800 ккал/день; `FD_SUG` — ноль сахара; `FD_WATER` — ≥2.5 л; `FD_ELEC` — электролиты; `SP_MG` — магний; `SP_D3` — витамин D; `SP_BC` — B-комплекс; `M_END01` — эндокринолог; `M_LAB01` — расширенная биохимия; `M_LAB02` — гормональный профиль |
| **Поведенческая психология** | `BEH_01` — КПТ 1р/нед обязательно; `BEH_03` — ежедневный дневник; `BEH_04` — анализ цепей при срывах; `BEH_05` — поведенческая активация (поддержание активности на VLCKD) |

### KETO_ADV — Targeted & Cyclical Ketogenic (draft)

| Направление | Связь |
|-------------|-------|
| **Параметры ЦД (показания)** | `anthropometrics.bmi` ≥25; `lifestyle.physical_activity` = "athlete" / "very_active"; `lifestyle.exercise_type` = "strength" / "hiit"; `labs.glucose_mg_dl` <100 (метаболически здоров) |
| **Параметры ЦД (мониторинг)** | `anthropometrics.weight_kg` — композиция (жир ↓, масса тела стабильна); `prototype_experiment.*` — показатели производительности; `lifestyle.daily_steps` — активность |
| **Интервенции (каталог)** | `FD_CRB` — целевые углеводы (до/после тренировки); `FD_CAL` — контроль калорий; `PH_HIIT` — ВИИТ 2-3р/нед; `PH_STR` — силовые 2-3р/нед; `PH_AER` — аэробные; `PH_Z2` — зона 2 (базовая выносливость); `SP_MG` — магний; `FD_WATER` — вода |
| **Поведенческая психология** | `BEH_03` — дневник циклов загрузки; `BEH_05` — поведенческая активация (высокая активность) |

---

## 2. Поведенческие протоколы

### CBT_WL — Cognitive Behavioral Therapy for Weight Loss

| Направление | Связь |
|-------------|-------|
| **Параметры ЦД (показания)** | `anthropometrics.bmi` ≥25; `lifestyle.stress_level_0_10` >6; `lifestyle.sleep_hours` <6; `digital_twin_scores.health_literacy_score` <40 (низкая грамотность → базовая КПТ); `medical_history.*` — расстройства пищевого поведения, тревога, депрессия |
| **Параметры ЦД (мониторинг)** | `lifestyle.stress_level_0_10` ↓; `lifestyle.sleep_hours` → ≥7; `digital_twin_scores.health_literacy_score` ↑; `anthropometrics.weight_kg` ↓ — 1.7 кг (modest); `digital_twin_scores.streak_days` — adherence стратегий |
| **Интервенции (каталог)** | `MN_MDT` — медитация; `MN_BRTH` — дыхательные; `MN_STR` — управление стрессом; `SL_HYG` — гигиена сна; `SL_BED` — режим сна; `MN_DTOX` — цифровой детокс; `FD_CAL` — осознанное ограничение; `FD_SUG` — снижение сахара |
| **Поведенческая психология** | `BEH_01` — КПТ 1р/нед (основная); `BEH_02` — мотивационное интервью 1р/2нед; `BEH_03` — дневник мыслей/поведения ежедневно; `BEH_04` — анализ цепей при срывах; `BEH_05` — поведенческая активация; `BEH_07` — релаксация 10-15 мин/день |

### ME_WL — Mindful Eating / Mindfulness-Based Interventions

| Направление | Связь |
|-------------|-------|
| **Параметры ЦД (показания)** | `lifestyle.stress_level_0_10` >5; `lifestyle.sleep_hours` <7; `anthropometrics.bmi` ≥25; `lifestyle.diet` — хаотичное питание; переедание по стрессу |
| **Параметры ЦД (мониторинг)** | `lifestyle.stress_level_0_10` ↓; `anthropometrics.weight_kg` ↓ (g=0.39); `lifestyle.diet` — структурированность; `vitals.hrv_ms` ↑ (снижение стресса) |
| **Интервенции (каталог)** | `MN_MDT` — медитация осознанности; `MN_BRTH` — дыхательные; `MN_STR` — управление стрессом; `FD_CAL` — осознанное питание; `FD_EAT` — ранние приёмы (осознанно); `FD_WATER` — вода; `PH_FLEX` — йога/растяжка |
| **Поведенческая психология** | `BEH_03` — дневник осознанного питания; `BEH_07` — релаксация; `BEH_01` — КПТ (при коморбидности) |

---

## 3. Фармакологические протоколы

### GLP1_RA — GLP-1 Receptor Agonists

| Направление | Связь |
|-------------|-------|
| **Параметры ЦД (показания)** | `anthropometrics.bmi` ≥30 (или ≥27 с коморбидностью); `labs.glucose_mg_dl` >100; `labs.hba1c_percent` >5.7; `anthropometrics.waist_cm` >88 (F) / >102 (M); `medical_history.diabetes` = "yes" / "prediabetes"; `medical_history.cardiovascular_disease` = "yes" (semaglutide: MACE ↓) |
| **Параметры ЦД (мониторинг)** | `anthropometrics.weight_kg` ↓ 13.9-15.8%; `labs.glucose_mg_dl` → <100; `labs.hba1c_percent` → <5.7; `vitals.resting_hr_bpm` — ↑ на 2-4 уд/мин (побочный эффект GLP-1); `labs.crp_mg_l` — снижение; `lifestyle.screen_time_h_day` — GI side effects (адаптация) |
| **Интервенции (каталог)** | `M_END01` — эндокринолог (назначение); `M_END02` — сахароснижающая терапия; `FD_CAL` — ограничение калорий; `FD_CRB` — контроль углеводов; `FD_SUG` — снижение сахара; `FD_FIB` — клетчатка (GI tolerance); `FD_WATER` — вода; `FD_ELEC` — электролиты (при тошноте); `PH_HIIT` — ВИИТ; `PH_Z2` — зона 2; `PH_STR` — силовые (сохранение мышечной массы); `M_LAB01` — расширенная биохимия; `M_LAB02` — гормональный профиль |
| **Поведенческая психология** | `BEH_01` — КПТ (приверженность, адаптация к GI-побочкам); `BEH_02` — мотивационное интервью; `BEH_03` — дневник питания и симптомов; `BEH_04` — анализ цепей при срывах дозирования |

### TZP — Tirzepatide (Dual GIP/GLP-1)

| Направление | Связь |
|-------------|-------|
| **Параметры ЦД (показания)** | `anthropometrics.bmi` ≥30 (или ≥27 с коморбидностью); `labs.hba1c_percent` >6.5; `labs.glucose_mg_dl` >126; `anthropometrics.waist_cm` >102 (M) / >88 (F); `medical_history.diabetes` — T2DM; `medical_history.*` — OSA / MASH (доказанная польза) |
| **Параметры ЦД (мониторинг)** | `anthropometrics.weight_kg` ↓ 17.8-22.5%; `labs.hba1c_percent` → <6.0; `labs.glucose_mg_dl` → <100; `vitals.resting_hr_bpm` — мониторинг; `labs.crp_mg_l` — снижение; `lifestyle.screen_time_h_day` — GI tolerance |
| **Интервенции (каталог)** | `M_END01` — эндокринолог; `M_END02` — сахароснижающая терапия; `FD_CAL` — ограничение калорий; `FD_CRB` — контроль углеводов; `FD_SUG` — снижение сахара; `FD_FIB` — клетчатка; `FD_WATER` — вода; `FD_ELEC` — электролиты; `PH_HIIT` — ВИИТ; `PH_Z2` — зона 2; `PH_STR` — силовые; `M_LAB01` — биохимия; `M_CAR01` — антигипертензивная (при МАСЕ-риске) |
| **Поведенческая психология** | `BEH_01` — КПТ (приверженность); `BEH_03` — дневник; `BEH_02` — мотивационное интервью (удержание на терапии) |

### OLD_AOM — Orlistat, Metformin & Combination Therapies

| Направление | Связь |
|-------------|-------|
| **Параметры ЦД (показания)** | `anthropometrics.bmi` ≥30; `labs.glucose_mg_dl` >100 (метформин); `labs.hba1c_percent` >5.7; `medical_history.diabetes` = "prediabetes"/"T2DM" (метформин); `genetics.fTO_risk_variant` = "risk" (метформин: возможен лучший ответ) |
| **Параметры ЦД (мониторинг)** | `anthropometrics.weight_kg` ↓ 2.6-3.4 кг (орлистат) / 2-4 кг (метформин); `labs.glucose_mg_dl` → <100; `labs.hba1c_percent` → <5.7; `labs.vitamin_d_ng_ml` — ↓ при орлистате (жирорастворимые витамины); `labs.ferritin_ng_ml` — контроль |
| **Интервенции (каталог)** | `M_END01` — эндокринолог; `M_END02` — сахароснижающая терапия; `M_LAB01` — расширенная биохимия; `FD_CAL` — ограничение калорий; `FD_FIB` — клетчатка; `FD_SUG` — снижение сахара; `FD_CRB` — контроль углеводов; `SP_D3` — витамин D (орлистат ↓ всасывание); `SP_BC` — B-комплекс; `PH_AER` — аэробные; `PH_STR` — силовые |
| **Поведенческая психология** | `BEH_03` — дневник (стеаторея при орлистате — приверженность); `BEH_01` — КПТ (преодоление GI-побочек); `BEH_02` — мотивационное интервью |

---

## 4. Хирургические протоколы

### BARI_SX — Bariatric Surgery

| Направление | Связь |
|-------------|-------|
| **Параметры ЦД (показания)** | `anthropometrics.bmi` ≥40 (или ≥35 с коморбидностью); `anthropometrics.waist_cm` — крайне высокие; `labs.glucose_mg_dl` >126; `labs.hba1c_percent` >6.5; `vitals.systolic_bp_mmhg` >140; `medical_history.diabetes` = "yes" (T2DM); `medical_history.cardiovascular_disease` = "yes"; `digital_twin_scores.health_risk_score` >70 |
| **Параметры ЦД (мониторинг)** | `anthropometrics.weight_kg` ↓ 25-35%; `labs.glucose_mg_dl` → <100; `labs.hba1c_percent` → <5.7; `labs.total_cholesterol_mg_dl` → <200; `labs.ldl_mg_dl` → <100; `labs.triglycerides_mg_dl` → <150; `vitals.systolic_bp_mmhg` → <130; `labs.vitamin_d_ng_ml` — ↓ риск дефицита; `labs.ferritin_ng_ml` — ↓ риск анемии; `labs.tsh_miu_l` — контроль (тиреоидная функция) |
| **Интервенции (каталог)** | `M_GAS01` — гастроэнтеролог; `DG_CARD` — кардиолог; `M_END01` — эндокринолог; `M_LAB01` — расширенная биохимия; `M_LAB02` — гормональный профиль; `M_LAB03` — Омега-3 индекс; `DG_CHK` — регулярный чекап; `SP_D3` — витамин D; `SP_BC` — B-комплекс; `SP_MG` — магний; `SP_O3` — Омега-3; `FD_WATER` — вода; `FD_PROTEIN` — белок; `PH_STR` — силовые (сохранение мышечной массы); `PH_AER` — аэробные; `MN_MDT` — медитация |
| **Поведенческая психология** | `BEH_01` — КПТ pre/post (обязательно); `BEH_02` — мотивационное интервью (pre: готовность, post: удержание); `BEH_03` — дневник питания (пожизненно); `BEH_04` — анализ цепей при срывах; `BEH_05` — поведенческая активация (адаптация к новому образу жизни); `BEH_07` — релаксация (адаптация после операции) |

---

## 5. Цифровые протоколы

### DIGITAL_WL — Digital & mHealth Interventions

| Направление | Связь |
|-------------|-------|
| **Параметры ЦД (показания)** | Любой `anthropometrics.bmi` ≥25; `digital_twin_scores.health_literacy_score` >40 (базовая цифровая грамотность); `lifestyle.screen_time_h_day` >5 (доступ к устройству); `lifestyle.work_schedule` — гибкий/удалённый |
| **Параметры ЦД (мониторинг)** | `anthropometrics.weight_kg` ↓ 2.6-6.6 кг; `lifestyle.daily_steps` ↑; `digital_twin_scores.health_literacy_score` ↑; `digital_twin_scores.streak_days` — engagement метрика |
| **Интервенции (каталог)** | `DG_CHK` — чекап; `PH_HRV` — мониторинг ЧСС/HRV; `PH_AER` — аэробные (трекинг); `PH_Z2` — зона 2 (wearable); `MN_MDT` — медитация (app); `FD_CAL` — трекинг калорий; `FD_WATER` — трекинг воды; `FD_FIB` — трекинг клетчатки; `SL_BED` — трекинг сна; `SL_DUR` — трекинг продолжительности; `MN_STR` — трекинг стресса; `MN_DTOX` — цифровой детокс |
| **Поведенческая психология** | `BEH_03` — дневник (цифровой — основная интервенция); `BEH_02` — мотивационное интервью (чат-бот); `BEH_05` — поведенческая активация (push-уведомления) |

---

## 6. Коммерческие программы

### COMMERCIAL — Commercial Weight Loss Programs

| Направление | Связь |
|-------------|-------|
| **Параметры ЦД (показания)** | `anthropometrics.bmi` ≥25; `digital_twin_scores.health_literacy_score` 40-80 (самостоятельность); `lifestyle.work_schedule` — структурированный (регулярные встречи); `digital_twin_scores.current_stars` — мотивация к геймификации |
| **Параметры ЦД (мониторинг)** | `anthropometrics.weight_kg` ↓ 2.6-4.9%; `lifestyle.daily_steps` ↑; `digital_twin_scores.plan_progress_percent` — adherence; `digital_twin_scores.streak_days` — retention |
| **Интервенции (каталог)** | `FD_CAL` — ограничение калорий (баллы WW); `FD_FIB` — клетчатка; `FD_SUG` — снижение сахара; `FD_WATER` — вода; `PH_AER` — аэробные; `PH_STR` — силовые; `MN_MDT` — медитация; `MN_STR` — управление стрессом; `SL_BED` — режим сна; `SL_DUR` — продолжительность; `SL_HYG` — гигиена сна; `SL_QLT` — качество сна |
| **Поведенческая психология** | `BEH_03` — дневник (встроенный в программу); `BEH_02` — мотивационное интервью (коуч программы); `BEH_01` — КПТ (групповая поддержка); `BEH_05` — поведенческая активация (еженедельные цели) |

---

## 7. Физическая активность

### EXERCISE — Exercise Protocols (AE, HIIT, RT)

| Направление | Связь |
|-------------|-------|
| **Параметры ЦД (показания)** | `anthropometrics.bmi` ≥25; `lifestyle.physical_activity` = "sedentary" / "light"; `vitals.resting_hr_bpm` >70; `prototype_experiment.sit_to_stand_reps` <12 (слабая функциональность); `lifestyle.daily_steps` <5000 |
| **Параметры ЦД (мониторинг)** | `anthropometrics.weight_kg` ↓ 0.89-2.35 кг (modality-dependent); `anthropometrics.waist_cm` ↓ 2.85-5.93 см; `vitals.resting_hr_bpm` ↓; `vitals.hrv_ms` ↑; `prototype_experiment.peak_hr_bpm` — VO2max ↑; `prototype_experiment.hrr60_bpm` — recovery improvement; `prototype_experiment.sit_to_stand_reps` ↑; `lifestyle.daily_steps` ↑; `labs.glucose_mg_dl` ↓ (HIIT); `labs.triglycerides_mg_dl` ↓ (HIIT) |
| **Интервенции (каталог)** | `PH_HIIT` — ВИИТ (85-95% HRmax, 3-5р/нед); `PH_STR` — силовые (60-80% 1RM, 2-3р/нед); `PH_AER` — аэробные (40-60% HRR, 150-300 мин/нед); `PH_Z2` — зона 2 (60-70% HRmax, 3-4р/нед); `PH_FLEX` — гибкость/растяжка; `PH_HRV` — мониторинг HRV (восстановление); `MN_MDT` — медитация (восстановление); `SL_BED` — режим сна (восстановление) |
| **Поведенческая психология** | `BEH_05` — поведенческая активация (ключевая: формирование привычки); `BEH_03` — дневник тренировок; `BEH_02` — мотивационное интервью (преодоление барьеров); `BEH_01` — КПТ (при хронической прокрастинации); `BEH_07` — релаксация (восстановление после тренировок) |

---

## 8. Альтернативная медицина

### ALT_MED — Alternative & Complementary Medicine

| Направление | Связь |
|-------------|-------|
| **Параметры ЦД (показания)** | `anthropometrics.bmi` ≥25; `lifestyle.stress_level_0_10` >5; `digital_twin_scores.health_literacy_score` — высокая (интерес к CAM); `medical_history.*` — хроническая боль, бессонница, тревога; `lifestyle.diet` = "traditional" (культурная приемлемость); `demographics.ethnicity_or_background` — азиатские популяции (TCM/Аюрведа) |
| **Параметры ЦД (мониторинг)** | `anthropometrics.weight_kg` ↓ 0.66-4.73 кг (modality-dependent); `lifestyle.stress_level_0_10` ↓; `lifestyle.sleep_hours` ↑; `vitals.hrv_ms` ↑; `labs.glucose_mg_dl` ↓ (EA + lifestyle); `labs.hba1c_percent` ↓; `labs.crp_mg_l` ↓ |
| **Интервенции (каталог)** | `MN_MDT` — медитация; `MN_BRTH` — дыхательные; `MN_STR` — управление стрессом; `FD_ANTI` — противовоспалительная диета; `SP_ADP` — адаптогены; `SP_O3` — Омега-3; `SP_MG` — магний; `PH_FLEX` — йога/растяжка; `MN_DTOX` — цифровой детокс; `SL_BED` — режим сна; `SL_HYG` — гигиена сна |
| **Поведенческая психология** | `BEH_07` — релаксация (10-15 мин/день — основа акупунктуры/массажа); `BEH_01` — КПТ (интеграция с осознанностью); `BEH_03` — дневник (самонаблюдение при CAM-терапиях) |

---

## 9. Особые популяции

### SPEC_POP — Special Populations (Pediatric, Geriatric, PCOS, Diabetic)

| Направление | Связь |
|-------------|-------|
| **Параметры ЦД (показания)** — **педиатрия** | `demographics.age` <18; `anthropometrics.bmi` ≥95th percentile for age/sex; `lifestyle.physical_activity` = "sedentary" |
| **Параметры ЦД (показания)** — **гериатрия** | `demographics.age` ≥65; `anthropometrics.bmi` ≥30; `prototype_experiment.sit_to_stand_reps` <10 (weakness); `lifestyle.sleep_hours` — poor; `medical_history.*` — sarcopenia, frailty, polypharmacy |
| **Параметры ЦД (показания)** — **СПКЯ** | `demographics.sex` = "female"; `demographics.age` 18-45; `anthropometrics.bmi` ≥25; `labs.glucose_mg_dl` >100; `labs.hba1c_percent` >5.7; `medical_history.*` — PCOS diagnosis |
| **Параметры ЦД (показания)** — **диабет** | `labs.hba1c_percent` >6.5; `labs.glucose_mg_dl` >126; `anthropometrics.bmi` ≥25; `medical_history.diabetes` = "yes" (T2DM); `medical_history.cardiovascular_disease` — risk assessment |
| **Параметры ЦД (мониторинг)** | См. выше по подгруппам + `digital_twin_scores.health_risk_score` ↓ |
| **Интервенции (каталог)** | `M_END01` — эндокринолог; `M_END02` — сахароснижающая; `M_LAB01` — биохимия; `M_LAB02` — гормоны; `DG_CHK` — чекап; `DG_CARD` — кардиолог (Т2DM); `PH_STR` — силовые (гериатрия/СПКЯ); `PH_HIIT` — ВИИТ (СПКЯ); `PH_AER` — аэробные; `FD_CAL` — контроль калорий; `FD_CRB` — контроль углеводов; `FD_SUG` — снижение сахара; `FD_FIB` — клетчатка; `SP_D3` — витамин D; `SP_MG` — магний; `SP_BC` — B-комплекс |
| **Поведенческая психология** | `BEH_01` — КПТ (педиатрия: семейная КПТ; гериатрия: когнитивная поддержка); `BEH_02` — мотивационное интервью (СПКЯ: приверженность терапии); `BEH_03` — дневник (все подгруппы); `BEH_05` — поведенческая активация (гериатрия: физическая активность); `BEH_07` — релаксация (стресс-менеджмент при СПКЯ) |

---

## 10. Комбинированные подходы

### COMBINATORY — Combinatory & Sequential Approaches

| Направление | Связь |
|-------------|-------|
| **Параметры ЦД (показания)** | Любая комбинация вышеуказанных параметров; стратегия выбора по EASO 2025 (complication-centric): `medical_history.*` — определяет выбор OMM/комбинации; `anthropometrics.bmi` — ступенчатый подход; `digital_twin_scores.health_risk_score` — тяжесть; `digital_twin_scores.plan_progress_percent` — ответ на терапию (<5% за 3 мес → интенсификация) |
| **Параметры ЦД (мониторинг)** | Комбинация параметров выбранных протоколов; ключевые: `anthropometrics.weight_kg` ↓; `labs.*` — метаболический профиль; `lifestyle.*` — приверженность; `digital_twin_scores.streak_days` — удержание; `digital_twin_scores.health_literacy_score` ↑ |
| **Интервенции (каталог)** | Полный набор в зависимости от выбранной комбинации. Базовый минимум: `FD_CAL` + `PH_AER`/`PH_STR` + `MN_MDT` + `SL_BED` + `FD_WATER`. При неэффективности: step-up → `M_END01` (AOM) → `M_GAS01` (surgery). |
| **Поведенческая психология** | `BEH_01` — КПТ (сквозная — «клей» всех протоколов); `BEH_02` — мотивационное интервью (каждый шаг step-up); `BEH_03` — дневник (сквозной мониторинг); `BEH_04` — анализ цепей при срывах; `BEH_05` — поведенческая активация (поддержание активности); `BEH_07` — релаксация (адаптация к новой терапии) |

---

## Сводная карта: Интервенции категории «Поведенческая психология» (BEH_01–BEH_07)

| Код | Название | Применяемость (# протоколов) | Основные протоколы |
|-----|----------|------------------------------|-------------------|
| BEH_01 | Когнитивно-поведенческая терапия | 14/21 | VLCKD, BARI_SX, CBT_WL, GLP1_RA, COMBINATORY, ME_WL, COMMERCIAL, SPEC_POP, KETO_STD, TZP, IF_52, ALT_MED, DIGITAL_WL, OLD_AOM |
| BEH_02 | Мотивационное интервьюирование | 12/21 | VLCKD, KETO_STD, MED_DIET, DASH, GLP1_RA, COMMERCIAL, EXERCISE, SPEC_POP, COMBINATORY, DIGITAL_WL, TZP, OLD_AOM |
| BEH_03 | Техники самоконтроля (дневник) | 20/21 | Все протоколы, кроме ME_WL (имплицитно — осознанность вместо дневника) |
| BEH_04 | Анализ цепей поведения | 7/21 | CBT_WL, VLCKD, OMAD, BARI_SX, GLP1_RA, COMBINATORY, KETO_STD |
| BEH_05 | Поведенческая активация | 10/21 | ADF, EXERCISE, COMMERCIAL, MED_DIET, SPEC_POP, COMBINATORY, DIGITAL_WL, KETO_ADV, BARI_SX, VLCKD |
| BEH_06 | Экспозиционная терапия | 0/21 | Не применима напрямую к протоколам ожирения; только при коморбидных РПП |
| BEH_07 | Тренинг релаксации | 10/21 | OMAD, ADF, CBT_WL, ME_WL, DASH, KETO_STD, EXERCISE, ALT_MED, SPEC_POP, COMBINATORY |
