# Search History Log — Obesity Protocols Finder

## Resume Checklist (читать перед началом каждой сессии)

```
[ ] 1. reserch_log.md прочитан — восстановлена история
[ ] 2. _index.md прочитан — известны все зафиксированные протоколы
[ ] 3. _sources.md прочитан — известны все источники
[ ] 4. Фактическое содержимое папок проверено
[ ] 5. Индекс и _sources.md синхронизированы с файловой системой
[ ] 6. Последний Query #: 9
[ ] 7. План на следующую сессию: начать с alternative
```

## State

| Field | Value |
|-------|-------|
| Last Query # | 12 |
| Current Category | combinatory |
| Categories Completed | dietary (9), behavioral (2), pharmaceutical (3), surgical (1), digital (1), commercial (1), exercise (1), alternative (1), special_populations (1), combinatory (1) — ALL 10 CATEGORIES COMPLETE |
| Total Protocols Found | 21 |
| Total Protocols Done | 19 (2 draft) |
| Total Sources | 99 |
| Cross-reference files | `_relevance_table.md` — mapping 21 protocols → DT parameters (50+ fields, 9 sections) → intervention codes (50 catalog + 7 BEH) |

## Format записи

```markdown
## [YYYY-MM-DD HH:MM] — Query #<N>

### Category
[название категории]

### Query
[текст поискового запроса]

### Results Found
[сколько новых методик/протоколов, какие именно]

### Files Created/Updated
- dietary/draft_IF_168.md — создан
- _index.md — обновлён (+3 записи)

### Status Checklist
[x] Query выполнен
[x] Файлы созданы
[ ] Файлы заполнены (осталось: IF_204, OMAD)
[ ] Верификация источников

### Next Queries Planned
1. Query #N+1: [запрос]
2. Query #N+2: [запрос]
```

## 2026-05-15 17:30 — Query #12

### Category
combinatory

### Query
Combinatory and sequential approaches to obesity management — lifestyle + pharmacotherapy combinations, lifestyle + exercise combinations, sequential stepped-care algorithms (EASO 2025, AACE 2025, Canadian 2025, ADA 2025, NICE 2025), combination pharmacotherapy (dual/triple agonists, multi-drug regimens), surgery + pharmacotherapy sequencing, emerging triple agonists (retatrutide)

### Results Found
1 protocol (combinatory approaches — covers lifestyle+pharma, lifestyle+exercise, stepped-care algorithms, combination pharmacotherapy, surgery sequencing) + 10 new sources (S090–S099)

### Files Created/Updated
- `combinatory/done_combinatory_approaches.md` — создан (complete, covers 5 domains)
- `combinatory/index.md` — создан
- `_index.md` — обновлён (+1)
- `_sources.md` — обновлён (+10)

### Status Checklist
[x] Query выполнен
[x] Файлы созданы
[x] Индекс обновлён
[x] Источники добавлены

### Key Findings
- Lifestyle + GLP-1 RA: −7.13 kg (33 RCTs, n=12028, S086) — additive/synergistic
- GLP-1 RA + exercise: −3.96 kg vs drug alone; preserves fat-free mass (S092)
- Retatrutide (tri-agonist): −24.15 kg at 52wk — approaching surgery-level weight loss (S093)
- EASO 2025 algorithm: first GRADE-based, complication-centric OMM selection algorithm
- AACE/Canadian/ADA/NICE guidelines all converge on stepped-care, complication-centric, long-term approach
- MBS: 28.3% TWL vs GLP-1 RA: 10.3% at 2yr; MACE HR 0.65; cost break-even at 15mo (S087, S088)
- No single intervention sufficient alone — combination is the standard of care for BMI ≥30 or ≥27+complications

### Next Queries Planned
- ALL 12 QUERIES COMPLETE across 10/10 categories
- Next: review for completeness; backfill draft protocols (OMAD, KETO_ADV); verify sources; generate cross-comparison summary table

---

## 2026-05-15 18:00 — Cross-reference: _relevance_table.md

### Type
Meta (cross-reference layer)

### Description
Создан `_relevance_table.md` — сводная таблица релевантности, связывающая каждый протокол из базы знаний с:
1. **Параметрами Цифрового Двойника** (50+ полей из 9 секций: demographics, anthropometrics, vitals, prototype_experiment, labs, lifestyle, genetics, medical_history, digital_twin_scores) с указанием пороговых значений и диапазонов для показаний и мониторинга
2. **Каталожными интервенциями** (50 кодов: FD_*, PH_*, SL_*, MN_*, SP_*, M_*, DG_*) — какие поведенческие/медицинские интервенции применимы к каждому протоколу
3. **Поведенческой психологией** (BEH_01–BEH_07) — какие техники КПТ, мотивационного интервью, самоконтроля и релаксации нужны каждому протоколу

### Files Created/Updated
- `_relevance_table.md` — создан (10 разделов по категориям + сводная карта BEH)
- Все 19 `done_*.md` + 2 `draft_*.md` — обновлены (добавлен footer-блок «Связь с Цифровым Двойником и интервенциями» со ссылкой на таблицу)

### Key Features
- Each protocol now shows DT parameter paths (e.g. `anthropometrics.bmi` ≥30) — machine-parseable
- Intervention codes cross-referenced from both intervention catalogs (`interventions_catalog.json` + `practice_behavioral.md`)
- Section 10 maps BEH_01–BEH_07 coverage across all protocols (BEH_03 (дневник) — 20/21; BEH_01 (КПТ) — 14/21; BEH_02 (МИ) — 12/21)
- BEH_06 (экспозиционная терапия) — 0/21 (не применима к ожирению без коморбидного РПП)

---

## 2026-05-15 17:00 — Query #11

### Category
commercial

### Query
Commercial weight loss programs — WW (Weight Watchers), Noom, Nutrisystem, Jenny Craig, Optifast, Medifast — efficacy, adherence, long-term outcomes, cost

### Results Found
1 protocol (commercial programs — covers 6 brands) + 5 new sources (S056–S060)

### Files Created/Updated
- `commercial/done_commercial_programs.md` — создан (complete)
- `commercial/index.md` — создан
- `_index.md` — обновлён (+1)
- `_sources.md` — обновлён (+5)

### Status Checklist
[x] Query выполнен
[x] Файлы созданы
[x] Индекс обновлён
[x] Источники добавлены

### Key Findings
- WW: strongest evidence base (Grade A), −2.6 to −4.4% at 12 mo (S058)
- Jenny Craig: highest weight loss among commercial (−4.9%), HbA1c −0.4 to −0.8%
- Nutrisystem: −3.8% at 3 mo, no long-term RCTs
- Noom: emerging evidence, modest loss, fewer long-term data
- Commercial programs effective but modest vs GLP-1 therapy or surgery
- Best-value tradeoff: cost per kg lost favorable vs self-directed

### Next Queries Planned
1. Query #9: Exercise protocols — HIIT, steady-state, resistance training for weight loss
2. Query #10: Alternative — acupuncture, herbal, traditional medicine

---

## 2026-05-15 15:00 — Query #7

### Category
digital

### Query
Digital health interventions for weight loss — mobile apps, telemedicine, AI coaching, wearables, web-based platforms — efficacy, engagement, scalability

### Results Found
1 protocol (digital/mHealth) + 5 new sources (S051–S055)

### Files Created/Updated
- `digital/done_digital_weight_loss.md` — создан (complete)
- `digital/index.md` — создан
- `_index.md` — обновлён (+1)
- `_sources.md` — обновлён (+5)

### Status Checklist
[x] Query выполнен
[x] Файлы созданы
[x] Индекс обновлён
[x] Источники добавлены

### Key Findings
- Stand-alone digital: SMD 0.26 (~2.6-6.6 kg), moderate evidence (19 RCTs, S055)
- Mobile apps: −1.45 kg (29 RCTs, S053)
- AI coaching: −0.8 kg to −13.9% (wide range, low evidence, S051)
- No stand-alone DLSI reached ≥5% weight loss threshold (S054)
- Hybrid (digital + human): better outcomes but less scalable
- Oviva Direkt (Germany DiGA): −7.0 kg at 6 mo in pragmatic RCT, is prescribed/reimbursed

### Next Queries Planned
1. Query #8: Commercial programs — Weight Watchers (WW), Noom, Nutrisystem, Jenny Craig
2. Query #9: Exercise protocols for weight loss (HIIT, steady-state, resistance training)

---

## 2026-05-15 14:30 — Query #6

### Category
surgical

### Query
Bariatric/metabolic surgery — RYGB, sleeve gastrectomy, BPD-DS, SADI-S, OAGB — weight loss durability, comorbidity remission, safety, revisional surgery

### Results Found
1 protocol (bariatric surgery with all procedure variants) + 5 new sources (S046–S050)

### Files Created/Updated
- `surgical/done_bariatric_surgery.md` — создан (complete, covers 4 procedures)
- `surgical/index.md` — создан
- `_index.md` — обновлён (+1)
- `_sources.md` — обновлён (+5)

### Status Checklist
[x] Query выполнен
[x] Файлы созданы
[x] Индекс обновлён
[x] Источники добавлены

### Key Findings
- RYGB more durable than SG at 10 yr: %TWL 21% vs 15.4%, regain 13.7% vs 27.9% (S050)
- SADI-S/BPD-DS highest BMI reduction (−18 to −19 kg/m²) in NMA (S047)
- SG lower morbidity, shorter OR time, but significant weight regain long-term
- OAGB comparable to RYGB but higher de novo GERD (OR 2.58) and marginal ulcers (OR 2.7)
- No mortality difference between SG and RYGB in severe obesity (BMI ≥50) (S048)
- Lifestyle intervention + pharmacotherapy recommended as bridge/alternative to surgery

### Next Queries Planned
1. Query #7: Digital solutions — apps, telemedicine, AI coaching, wearables
2. Query #8: Commercial programs — WW, Noom, Nutrisystem

---

## 2026-05-15 14:00 — Query #5

### Category
pharmaceutical

### Query
Pharmacological interventions for obesity — GLP-1 agonists (semaglutide, liraglutide), tirzepatide, orlistat, metformin, phentermine/topiramate, naltrexone/bupropion — efficacy, safety, head-to-head comparisons

### Results Found
3 protocols (GLP-1 agonists, Tirzepatide, Other oral agents) + 11 new sources (S035–S045)

### Files Created/Updated
- `pharmaceutical/done_GLP1_agonists.md` — создан (complete)
- `pharmaceutical/done_tirzepatide.md` — создан (complete)
- `pharmaceutical/done_orlistat_metformin_combos.md` — создан (complete)
- `pharmaceutical/index.md` — создан
- `_index.md` — обновлён (+3)
- `_sources.md` — обновлён (+11)

### Status Checklist
[x] Query выполнен
[x] Файлы созданы
[x] Индекс обновлён
[x] Источники добавлены

### Key Findings
- Tirzepatide: best weight loss among all drugs (−17.8 to −22.5% TBWL), superior to semaglutide (SMD 0.75)
- Semaglutide: −13.9 to −15.8% TBWL, reduces MACE (HR 0.80)
- GLP-1 class: 78.5% achieve ≥5% loss vs 26.5% placebo (OR 11.4)
- Orlistat: only −2.6 to −3.4 kg, but OTC + 20yr safety data
- Phentermine/Topiramate: best non-GLP-1 (−7 to −9 kg), but cognitive side effects
- Metformin: off-label, −2 to −4 kg, cheap, safe, PCOS benefit
- 56 RCTs, 60307 participants (Nature Medicine 2025) — biggest NMA to date

### Next Queries Planned
1. Query #6: Surgical — bariatric (gastric bypass, sleeve, BPD-DS, revisional)
2. Query #7: Digital — apps, telemedicine, AI coaching

---

## 2026-05-15 13:30 — Query #4

### Category
behavioral

### Query
Cognitive behavioral therapy for weight loss, behavioral therapy, mindfulness-based interventions for weight management — efficacy, mechanisms, long-term outcomes

### Results Found
2 protocols (CBT for Weight Loss, Mindful Eating) + 10 new sources (S025–S034)

### Files Created/Updated
- `behavioral/done_CBT_weight_loss.md` — создан (complete)
- `behavioral/done_mindful_eating.md` — создан (complete)
- `behavioral/index.md` — создан
- `_index.md` — обновлён (+2)
- `_sources.md` — обновлён (+10)

### Status Checklist
[x] Query выполнен
[x] Файлы созданы
[x] Индекс обновлён
[x] Источники добавлены

### Key Findings
- CBT: modest weight loss (−1.7 kg), but improves cognitive restraint and reduces emotional eating
- ACT (3rd wave CBT) showed sustained effect >18 months (S028)
- CBT is 1st-line for BED with obesity — superior to behavioral weight loss for binge reduction
- Mindful eating: small-modest effects (g=0.39 weight, g=0.62 BMI), stronger for eating behavior than weight
- MBI for food craving: significant reduction in craving intensity (g=0.28) and rebound intake (g=0.83) (S034)

### Next Queries Planned
1. Query #5: Pharmacological — GLP-1 agonists (semaglutide, tirzepatide), metformin, orlistat, phentermine
2. Query #6: Surgical — bariatric procedures (gastric bypass, sleeve, BPD-DS)

---

## 2026-05-15 13:00 — Query #3

### Category
dietary

### Query
Ketogenic diets (standard, targeted, cyclical) and very low-calorie ketogenic diet (VLCKD) — efficacy, safety, body composition, metabolic outcomes

### Results Found
3 protocols (Standard Keto, VLCKD, TKD/CKD) + 6 new sources (S019–S024)

### Files Created/Updated
- `dietary/done_keto_standard.md` — создан (complete)
- `dietary/done_VLCKD.md` — создан (complete)
- `dietary/draft_keto_advanced.md` — создан (draft — limited evidence)
- `dietary/index.md` — обновлён (+3)
- `_index.md` — обновлён (+3)
- `_sources.md` — обновлён (+6)

### Status Checklist
[x] Query выполнен
[x] Файлы созданы
[x] Индекс обновлён
[x] Источники добавлены

### Key Findings
- VLCKD самая эффективная для быстрого похудения (−10 to −15.6 kg за 4-12 нед) с сохранением мышечной массы
- Keto: −3.7 to −9.1 kg за 6 мес, но LDL +6.4 mg/dL — clinically meaningful (S019)
- Каждые −10% углеводов = −0.64 kg (S023, 110 RCTs)
- TKD/CKD: нет качественных RCT, только анекдоты из бодибилдинга
- Keto #1 в NMA 8 диет для снижения веса (SUCRA 99, S014)

### Next Queries Planned
1. Query #4: Behavioral protocols (CBT, mindful eating, habit-based weight loss)
2. Query #5: Pharmacological — GLP-1 agonists, metformin, orlistat

---

## 2026-05-15 12:30 — Query #2

### Category
dietary

### Query
Mediterranean diet and DASH diet protocols — evidence for weight loss, metabolic effects, CV outcomes, adherence

### Results Found
2 protocols identified (Mediterranean, DASH) + 11 new sources (S008–S018)

### Files Created/Updated
- `dietary/done_mediterranean.md` — создан (complete)
- `dietary/done_DASH.md` — создан (complete)
- `dietary/index.md` — обновлён (+2 записи)
- `_index.md` — обновлён (+2 записи)
- `_sources.md` — обновлён (+11 источников)

### Status Checklist
[x] Query выполнен
[x] Файлы созданы
[x] Индекс обновлён
[x] Источники добавлены в `_sources.md`
[ ] Верификация источников

### Key Findings
- MED: #1 for glycemic control (T2DM), reduces CV mortality −35%, modest weight loss −2.4 kg
- DASH: #1 for blood pressure control (SUCRA 89%), modest weight loss −1.5 kg
- В общем NMA 8 диет (S014): keto и low-carb лучшие для веса, DASH и IF для давления
- MED + exercise даёт −4.0 kg vs −2.4 kg для MED solo (S008)
- Personalization Data section добавлена во все 6 протоколов

### Next Queries Planned
1. Query #3: Keto (standard, targeted, cyclical) and VLCD diets
2. Query #4: Behavioral protocols (CBT, mindful eating)

---

## 2026-05-15 12:00 — Query #1

### Category
dietary

### Query
Evidence-based review of intermittent fasting protocols (16:8 TRE, ADF, 5:2, OMAD) — weight loss outcomes, metabolic effects, adherence, comparison with CER

### Results Found
4 protocols identified (16:8/TRE, ADF, 5:2/WDF, OMAD) + 7 high-quality sources

### Files Created/Updated
- `dietary/done_TRE_168.md` — создан (complete)
- `dietary/done_ADF.md` — создан (complete)
- `dietary/done_5_2_protocol.md` — создан (complete)
- `dietary/draft_OMAD.md` — создан (draft — limited evidence)
- `dietary/index.md` — обновлён (+4 записи)
- `_index.md` — обновлён (+4 записи)
- `_sources.md` — обновлён (+7 источников: S001–S007)

### Status Checklist
[x] Query выполнен
[x] Файлы созданы
[x] Индекс обновлён
[x] Источники добавлены в `_sources.md`
[ ] Файлы заполнены (осталось: OMAD — надо дописать evidence)
[ ] Верификация источников — OK for 16:8, ADF, 5:2; OMAD low evidence

### Key Findings
- ADF показала наибольшую эффективность среди всех IF форм (SUCRA #1)
- Все IF формы сравнимы с CER по снижению веса
- Потеря веса зависит от размера энергетического дефицита, а не от схемы голодания
- Долгосрочная приверженность — главная проблема (снижается после 12 нед)

### Next Queries Planned
1. Query #2: Mediterranean diet and DASH diet protocols — comparison, evidence, adherence
2. Query #3: Ketogenic diet (standard, targeted, cyclical) and VLCD protocols

---



