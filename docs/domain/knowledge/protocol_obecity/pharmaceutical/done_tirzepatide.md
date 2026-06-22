---
id: TZP
name: Tirzepatide (Dual GIP/GLP-1 Agonist) for Weight Loss
name_ru: Тирзепатид (двойной агонист GIP/GLP-1)
category: pharmaceutical
tags:
  - glp1
  - gip
  - dual_agonist
  - injectable
  - high_evidence
  - novel
status: done
evidence_level: high
created: 2026-05-15
updated: 2026-05-15
sources:
  - S035
  - S036
  - S040
  - S041
  - S042
---

## Description

Tirzepatide (Mounjaro/Zepbound) is a first-in-class dual GIP and GLP-1 receptor agonist. Simultaneously activates both incretin pathways, producing superior weight loss compared to GLP-1 mono-agonists (semaglutide). FDA-approved for obesity (Zepbound) and T2DM (Mounjaro).

## Protocol Details

- **Dose range**: 5, 10, or 15 mg SC once weekly
- **Escalation**: 2.5→5→7.5→10→12.5→15 mg over 16-20 weeks (monthly increments)
- **Duration**: Continuous chronic therapy; 72-week SURMOUNT trials; weight regain on discontinuation
- **Adherence**: ~70% completion in RCTs; GI tolerability improved over semaglutide at equivalent weight loss
- **Maintenance**: SURMOUNT-4 showed continued treatment maintained loss vs placebo regain

## Evidence

| Outcome | Effect | Certainty | Source |
|---------|--------|-----------|--------|
| TBWL% 15 mg (72 wk) nondiabetic | −20.9 to −22.5% (vs placebo −2.4%) | High | S035, S037, S040 |
| TBWL% 15 mg (40 wk) T2DM | −9.5 kg (72% lost ≥5%) | High | S038 |
| Superiority vs semaglutide | SMD 0.75 favoring tirzepatide (SURMOUNT-5) | High | S042 |
| ≥5% weight loss OR vs placebo | OR ~12-15 | High | S036 |
| ≥15% weight loss | ~50-60% of nondiabetic patients | High | S040 |
| Sleep apnea remission | Significant improvement (SURMOUNT-OSA) | High | S035 |
| MASH resolution | Significant vs placebo (SYNERGY-NASH) | High | S035 |
| HbA1c reduction (T2DM) | −2.0 to −2.5% | High | S038 |

## Pros

- Highest weight loss among all approved anti-obesity medications
- Superior to semaglutide head-to-head (SURMOUNT-5)
- Once-weekly dosing
- Improves MASH, sleep apnea, HF outcomes
- Better GI tolerability than semaglutide at comparable efficacy
- Normoglycemia restoration in prediabetes
- Reduces HF hospitalization

## Cons

- Very high cost ($1,000-1,500/month)
- GI side effects: nausea, diarrhea, vomiting (common but manageable)
- Dose titration required (slow escalation over 4+ months)
- Weight regain on discontinuation
- Injectable (self-administered SC)
- Thyroid C-cell tumor risk (black box)
- Pancreatitis risk (rare)
- Gallbladder disease (increased risk with rapid weight loss)
- Limited long-term data (>2 years)
- Supply shortages (intermittent)

## Personalization Data Needed

- **BMI, weight history, obesity-related complications** — indication
- **T2DM status** — HbA1c (tirzepatide very effective, may achieve remission)
- **Previous GLP-1 experience** — may improve tolerability
- **OSA, MASH, HF status** — tirzepatide approved for these
- **Gallbladder ultrasound** — screen for stones before rapid loss
- **History of pancreatitis, MTC, MEN-2** — contraindications
- **Pregnancy/breastfeeding** — contraindicated
- **Insurance formulary** — prior authorization, step therapy (try GLP-1 first?)
- **Cost tolerance** — out-of-pocket options (vials from Lilly Direct: $399-549/month)
- **Needle phobia** — single-use pens

## Who It's For

- Adults with BMI ≥30 or BMI ≥27 + comorbidity
- First-choice pharmacotherapy for maximum weight loss
- T2DM with obesity (superior HbA1c reduction)
- Obesity with MASH, OSA, or HF
- Patients who failed or had insufficient response to semaglutide
- Contraindicated: MTC/MEN-2, pancreatitis history, pregnancy, severe GI disease

## Cost & Availability

- Very high: $1,000-1,500/month (Zepbound $1,059, Mounjaro $1,032)
- Lilly Direct savings: vials $399-549/month (self-pay)
- Insurance coverage: improving (60% for obesity, 80% for T2DM)
- Savings card available (as low as $25/month with commercial insurance)
- Supply: intermittent shortages (2023-2024); improving 2025
- Telehealth: Ro, Calibrate, Sequence, Push Health

## References

- S035: Nature Medicine 2025 — NMA 56 RCTs, tirzepatide >10% TBWL
- S036: PMC 2025 — GLP-1 agents NMA, tirzepatide SUCRA 91.2%
- S037: Ann Intern Med 2025 — 26 RCTs, tirzepatide −17.8 to −20.9%
- S040: Int J Obesity 2025 — 10 RCTs, tirzepatide meta-analysis stratified by diabetes
- S041: SciDirect 2024 — NMA 7 GLP-1 agonists, retatrutide+tirzepatide top
- S042: PubMed 2025 — Tirzepatide vs semaglutide direct comparison, SMD 0.75


---

## Связь с Цифровым Двойником и интервенциями

| Направление | Ссылка |
|-------------|--------|
| Параметры ЦД (показания и диапазоны) | См. [\_relevance_table.md](\_relevance_table.md) — колонка «Параметры ЦД (показания)» с пороговыми значениями |
| Интервенции (каталог) | См. [\_relevance_table.md](\_relevance_table.md) — колонка «Интервенции (каталог)» с кодами FD_*, PH_*, SL_*, MN_*, SP_*, M_*, DG_* |
| Поведенческая психология | См. [\_relevance_table.md](\_relevance_table.md) — колонка «Поведенческая психология» с кодами BEH_01–BEH_07 и сводная карта в разделе 10 |


## Промпты для презентации

### Для клиента
> **Заголовок:** «Без названия: план действий для улучшения здоровья»
>
> **Теория:**
> - Цель протокола: улучшение показателей здоровья
> - Кому подходит и когда начинать
> - Основные шаги и их последовательность
> - Ожидаемые результаты и сроки
>
> **Практика:**
> - Пошаговый план на неделю/месяц
> - Чек-лист ежедневных действий
> - Трекер прогресса (что записывать)
> - Когда ждать первых результатов
>
> **Дисклеймер:** Протокол носит ознакомительный характер. Индивидуальная программа составляется специалистом.

### Для специалиста
> **Заголовок:** «Без названия: клинический протокол ведения»
>
> **Теория:**
> - Обоснование протокола (биологические механизмы)
> - Показания и противопоказания (стратификация пациентов)
> - Доказательная база и уровни рекомендаций
>
> **Практика:**
> - Алгоритм: скрининг → стратификация → интервенция → мониторинг
> - 
> - Критерии эффективности и точки коррекции
> - Протокол безопасности (побочные эффекты, лабораторный контроль)
>
> **Дисклеймер:** Референсные протоколы. Адаптируются под конкретного пациента.