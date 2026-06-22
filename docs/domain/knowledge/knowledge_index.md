# Индекс базы знаний Healora

**Всего:** 314 `.md` файлов в 26 категориях  
**Дата генерации:** 2026-06-14  
**Стандарт:** `knowledge_description_rules.md`

---

## Статистика

| Метрика | Значение |
|---------|----------|
| `.md` файлов | 314 |
| Категорий (директорий) | 24 |
| `_index.md` по соглашению | 8 из 24 |
| Черновиков (`draft`) | 4 |
| Пустых директорий | 2 (`protocols/jsons`, `supplements/` root) |
| Доменов без выделенной директории | 3 (microbiome, stress, sleep) |
| Охват промптами | 295 / 314 (279 inline + 16 redirect в prompts.md) |
| `data.json` | 1 (drugs/) |

---

## Полнота по доменам

| Домен | Статус | Где описан |
|-------|--------|------------|
| **obesity** (ожирение) | ✅ Полный | `protocol_obecity/` — 21 протокол, 105 источников |
| **nutrition** (питание) | ✅ Собран | `nutrition/` — 8 поддиректорий (minerals, vitamins, vitamin_like, diets, food, superfoods, diet_preferences, diet_restrictions) + `supplements/` |
| **longevity** (долголетие) | ✅ Есть | `protocols/protocol_longevity.md`, `treatment_plans/longevity.md` |
| **stress** (стресс) | ❌ Нет директории | Разрозненно: `behavior_design/`, `protocols/protocol_depression.md` |
| **sleep** (сон) | ❌ Нет директории | Разрозненно: `protocols/protocol_sleep_hygiene.md`, БАДы для сна |
| **microbiome** (микробиом) | ❌ Нет директории | Отсутствует полностью |
| **environment_design** (среда) | ✅ Полный | `environment_design/` — 6 документов |
| **habits** (привычки) | ✅ Полный | `behavior_design/` — 5 документов |
| **literature** (литература) | ❌ Нет директории | Только `_sources.md` для obesity |

---

## Структура по категориям

### Питание (`nutrition/`)

#### nutrition/minerals/ — 13 файлов
Минералы и микроэлементы. Каждый: категория, RDA, UL, функции, дефицит, избыток, продукты, биодоступность.

- [min_Ca_calcium.md](nutrition/minerals/min_Ca_calcium.md) — Кальций
- [min_Cl.md](nutrition/minerals/min_Cl.md) — Хлор
- [min_Cr.md](nutrition/minerals/min_Cr.md) — Хром
- [min_Cu.md](nutrition/minerals/min_Cu.md) — Медь
- [min_Fe_iron.md](nutrition/minerals/min_Fe_iron.md) — Железо
- [min_I_iodine.md](nutrition/minerals/min_I_iodine.md) — Йод
- [min_K.md](nutrition/minerals/min_K.md) — Калий
- [min_Mg_magnesium.md](nutrition/minerals/min_Mg_magnesium.md) — Магний
- [min_Mn.md](nutrition/minerals/min_Mn.md) — Марганец
- [min_Na.md](nutrition/minerals/min_Na.md) — Натрий
- [min_P.md](nutrition/minerals/min_P.md) — Фосфор
- [min_Se_selenium.md](nutrition/minerals/min_Se_selenium.md) — Селен
- [min_Zn_zinc.md](nutrition/minerals/min_Zn_zinc.md) — Цинк

**Полнота:** ✅ 13 из 13 основных минералов.

#### nutrition/vitamins/ — 16 файлов
Витамины. Структура как у минералов.

- [index.md](nutrition/vitamins/index.md)
- [vit_A_retinol.md](nutrition/vitamins/vit_A_retinol.md) — A
- [vit_B1_thiamin.md](nutrition/vitamins/vit_B1_thiamin.md) — B1
- [vit_B2_riboflavin.md](nutrition/vitamins/vit_B2_riboflavin.md) — B2
- [vit_B3_niacin.md](nutrition/vitamins/vit_B3_niacin.md) — B3
- [vit_B5_pantothenic.md](nutrition/vitamins/vit_B5_pantothenic.md) — B5
- [vit_B6_pyridoxine.md](nutrition/vitamins/vit_B6_pyridoxine.md) — B6
- [vit_B7_biotin.md](nutrition/vitamins/vit_B7_biotin.md) — B7
- [vit_B9_folate.md](nutrition/vitamins/vit_B9_folate.md) — B9
- [vit_B12_cobalamin.md](nutrition/vitamins/vit_B12_cobalamin.md) — B12
- [vit_C_ascorbic.md](nutrition/vitamins/vit_C_ascorbic.md) — C
- [vit_D_calciferol.md](nutrition/vitamins/vit_D_calciferol.md) — D
- [vit_E_tocopherol.md](nutrition/vitamins/vit_E_tocopherol.md) — E
- [vit_K_phylloquinone.md](nutrition/vitamins/vit_K_phylloquinone.md) — K
- [vitamin_prompt.md](nutrition/vitamins/vitamin_prompt.md) — шаблон промпта (пустой)
- [vitamin_prompt_big_pickle.md](nutrition/vitamins/vitamin_prompt_big_pickle.md) — BigPickle-промпт

**Полнота:** ✅ 13 из 13 основных витаминов.

#### nutrition/vitamin_like/ — 21 файл
Витаминоподобные вещества и коферменты.

- [vitamin_like_index.md](nutrition/vitamin_like/vitamin_like_index.md)
- [alpha_lipoic_acid.md](nutrition/vitamin_like/alpha_lipoic_acid.md)
- [biotin.md](nutrition/vitamin_like/biotin.md)
- [carnitine.md](nutrition/vitamin_like/carnitine.md)
- [choline.md](nutrition/vitamin_like/choline.md)
- [coq10_ubiquinone.md](nutrition/vitamin_like/coq10_ubiquinone.md)
- [curcumin.md](nutrition/vitamin_like/curcumin.md) — Куркумин
- [epigallocatechin_gallate.md](nutrition/vitamin_like/epigallocatechin_gallate.md)
- [hesperidin.md](nutrition/vitamin_like/hesperidin.md)
- [inositol.md](nutrition/vitamin_like/inositol.md)
- [nac_n_acetylcysteine.md](nutrition/vitamin_like/nac_n_acetylcysteine.md) — N-ацетилцистеин (NAC)
- [nad_nicotinamide_adenine_dinucleotide.md](nutrition/vitamin_like/nad_nicotinamide_adenine_dinucleotide.md) — NAD⁺
- [omega-3.md](nutrition/vitamin_like/omega-3.md)
- [orotic_acid.md](nutrition/vitamin_like/orotic_acid.md)
- [paba.md](nutrition/vitamin_like/paba.md)
- [pangamic_acid.md](nutrition/vitamin_like/pangamic_acid.md)
- [polyphenols.md](nutrition/vitamin_like/polyphenols.md)
- [pycnogenol.md](nutrition/vitamin_like/pycnogenol.md) — Пикногенол
- [quercetin.md](nutrition/vitamin_like/quercetin.md)
- [resveratrol.md](nutrition/vitamin_like/resveratrol.md)
- [rutin.md](nutrition/vitamin_like/rutin.md)

**Полнота:** ✅ 20 веществ. Пробелы закрыты (NAC, NAD+, пикногенол, куркумин).

#### nutrition/diets/ — 10 файлов
Доказательные протоколы диет:

- [anti_inflammatory_diet.md](nutrition/diets/anti_inflammatory_diet.md)
- [dash_diet.md](nutrition/diets/dash_diet.md)
- [elimination_diet.md](nutrition/diets/elimination_diet.md)
- [gluten_free_diet.md](nutrition/diets/gluten_free_diet.md)
- [intermittent_fasting.md](nutrition/diets/intermittent_fasting.md)
- [keto_diet.md](nutrition/diets/keto_diet.md)
- [low_carb_diet.md](nutrition/diets/low_carb_diet.md)
- [low_fodmap.md](nutrition/diets/low_fodmap.md)
- [mediterranean_diet.md](nutrition/diets/mediterranean_diet.md)

#### nutrition/food/ — 2 файла (методология) + 26 изображений + 20 JSON
- [FOOD_DESCRIPTION.md](nutrition/food/FOOD_DESCRIPTION.md) — схема описания блюд
- [PROMPT_ANALYSIS.md](nutrition/food/PROMPT_ANALYSIS.md) — промпты для анализа фото еды

#### nutrition/superfoods/ — 2 файла
- [sup_fucus.md](nutrition/superfoods/sup_fucus.md) — Фукус
- [sup_laminaria.md](nutrition/superfoods/sup_laminaria.md) — Ламинария

**Полнота:** ⚠️ Только 2 водоросли. Нет: спирулина, хлорелла, асаи, мака.

#### nutrition/diet_preferences/ — 10 файлов
Предпочтения пользователя:

- [diet_gluten_free.md](nutrition/diet_preferences/diet_gluten_free.md)
- [diet_if.md](nutrition/diet_preferences/diet_if.md)
- [diet_keto.md](nutrition/diet_preferences/diet_keto.md)
- [diet_lactose_free.md](nutrition/diet_preferences/diet_lactose_free.md)
- [diet_low_carb.md](nutrition/diet_preferences/diet_low_carb.md)
- [diet_mediterranean.md](nutrition/diet_preferences/diet_mediterranean.md)
- [diet_no_sugar.md](nutrition/diet_preferences/diet_no_sugar.md)
- [diet_sports.md](nutrition/diet_preferences/diet_sports.md)
- [diet_vegan.md](nutrition/diet_preferences/diet_vegan.md)
- [diet_vegetarian.md](nutrition/diet_preferences/diet_vegetarian.md)

#### nutrition/diet_restrictions/ — 4 файла
- [restriction_allergies.md](nutrition/diet_restrictions/restriction_allergies.md)
- [restriction_disliked.md](nutrition/diet_restrictions/restriction_disliked.md)
- [restriction_other.md](nutrition/diet_restrictions/restriction_other.md)
- [restriction_religious.md](nutrition/diet_restrictions/restriction_religious.md)

#### supplements/ — 82 .md файла (в 5 подкатегориях)
Крупнейшая категория. SPA-приложение через `index.html`.

**ЖКТ** (44):
[sup_aloe](supplements/ЖКТ/sup_aloe.md), [sup_artichoke](supplements/ЖКТ/sup_artichoke.md), [sup_baical_skullcap](supplements/ЖКТ/sup_baical_skullcap.md), [sup_berberine](supplements/ЖКТ/sup_berberine.md), [sup_betaine](supplements/ЖКТ/sup_betaine.md), [sup_bilberry](supplements/ЖКТ/sup_bilberry.md), [sup_boswellia](supplements/ЖКТ/sup_boswellia.md), [sup_bromelain](supplements/ЖКТ/sup_bromelain.md), [sup_calcium](supplements/ЖКТ/sup_calcium.md), [sup_capsaicin](supplements/ЖКТ/sup_capsaicin.md), [sup_chamomile](supplements/ЖКТ/sup_chamomile.md), [sup_chlorella](supplements/ЖКТ/sup_chlorella.md), [sup_cinnamon](supplements/ЖКТ/sup_cinnamon.md), [sup_collagen](supplements/ЖКТ/sup_collagen.md), [sup_colostrum](supplements/ЖКТ/sup_colostrum.md), [sup_curcumin](supplements/ЖКТ/sup_curcumin.md), [sup_echinacea_git](supplements/ЖКТ/sup_echinacea_git.md), [sup_fennel](supplements/ЖКТ/sup_fennel.md), [sup_fenugreek](supplements/ЖКТ/sup_fenugreek.md), [sup_ginger](supplements/ЖКТ/sup_ginger.md), [sup_ginseng](supplements/ЖКТ/sup_ginseng.md), [sup_glutamine](supplements/ЖКТ/sup_glutamine.md), [sup_glutathione](supplements/ЖКТ/sup_glutathione.md), [sup_glycine](supplements/ЖКТ/sup_glycine.md), [sup_goji](supplements/ЖКТ/sup_goji.md), [sup_grapefruit](supplements/ЖКТ/sup_grapefruit.md), [sup_green_tea](supplements/ЖКТ/sup_green_tea.md), [sup_hemp](supplements/ЖКТ/sup_hemp.md), [sup_inulin](supplements/ЖКТ/sup_inulin.md), [sup_ivy](supplements/ЖКТ/sup_ivy.md), [sup_lactobacillus](supplements/ЖКТ/sup_lactobacillus.md), [sup_licorice](supplements/ЖКТ/sup_licorice.md), [sup_maca](supplements/ЖКТ/sup_maca.md), [sup_milk_thistle](supplements/ЖКТ/sup_milk_thistle.md), [sup_nacetylcysteine](supplements/ЖКТ/sup_nacetylcysteine.md), [sup_oregano](supplements/ЖКТ/sup_oregano.md), [sup_peppermint](supplements/ЖКТ/sup_peppermint.md), [sup_probiotics](supplements/ЖКТ/sup_probiotics.md), [sup_psyllium](supplements/ЖКТ/sup_psyllium.md), [sup_quercetin_git](supplements/ЖКТ/sup_quercetin_git.md)... (line truncated to 2000 chars)

**Сон и нервная система** (11):
[sup_5htp](supplements/БАДы%20для%20нормализации%20сна%20и%20поддержки%20нервной%20системы/sup_5htp.md), [sup_adaptogens](supplements/БАДы%20для%20нормализации%20сна%20и%20поддержки%20нервной%20системы/sup_adaptogens.md), [sup_ginkgo_biloba](supplements/БАДы%20для%20нормализации%20сна%20и%20поддержки%20нервной%20системы/sup_ginkgo_biloba.md), [sup_gotu_kola](supplements/БАДы%20для%20нормализации%20сна%20и%20поддержки%20нервной%20системы/sup_gotu_kola.md), [sup_hops](supplements/БАДы%20для%20нормализации%20сна%20и%20поддержки%20нервной%20системы/sup_hops.md), [sup_l_theanine](supplements/БАДы%20для%20нормализации%20сна%20и%20поддержки%20нервной%20системы/sup_l_theanine.md), [sup_magnesium_glycinate](supplements/БАДы%20для%20нормализации%20сна%20и%20поддержки%20нервной%20системы/sup_magnesium_glycinate.md), [sup_melatonin](supplements/БАДы%20для%20нормализации%20сна%20и%20поддержки%20нервной%20системы/sup_melatonin.md), [sup_melissa](supplements/БАДы%20для%20нормализации%20сна%20и%20поддержки%20нервной%20системы/sup_melissa.md), [sup_myoinositol](supplements/БАДы%20для%20нормализации%20сна%20и%20поддержки%20нервной%20системы/sup_myoinositol.md), [sup_tryptophan](supplements/БАДы%20для%20нормализации%20сна%20и%20поддержки%20нервной%20системы/sup_tryptophan.md)

**Седативные** (3): [baical_skullcap](supplements/Седативные/sup_sed_baical_skullcap.md), [passiflora](supplements/Седативные/sup_sed_passiflora.md), [valerian](supplements/Седативные/sup_sed_valerian.md)

**Стимуляторы** (6): [echinacea](supplements/Стимуляторы/sup_stim_echinacea.md), [eleutherococcus](supplements/Стимуляторы/sup_stim_eleutherococcus.md), [ginseng](supplements/Стимуляторы/sup_stim_ginseng.md), [leuzea](supplements/Стимуляторы/sup_stim_leuzea.md), [rhodiola](supplements/Стимуляторы/sup_stim_rhodiola.md), [schisandra](supplements/Стимуляторы/sup_stim_schisandra.md)

**Тонизирующие** (17): [aralia](supplements/Тонизирующие/sup_ton_aralia.md), [bee_pollen](supplements/Тонизирующие/sup_ton_bee_pollen.md), [cordyceps](supplements/Тонизирующие/sup_ton_cordyceps.md), [dibazol](supplements/Тонизирующие/sup_ton_dibazol.md), [erythropoietin](supplements/Тонизирующие/sup_ton_erythropoietin.md), [golden_root](supplements/Тонизирующие/sup_ton_golden_root.md), [hawthorn](supplements/Тонизирующие/sup_ton_hawthorn.md), [lycopene](supplements/Тонизирующие/sup_ton_lycopene.md), [magnolia](supplements/Тонизирующие/sup_ton_magnolia.md), [mumiyo](supplements/Тонизирующие/sup_ton_mumiyo.md), [pantocrine](supplements/Тонизирующие/sup_ton_pantocrine.md), [propolis](supplements/Тонизирующие/sup_ton_propolis.md), [royal_jelly](supplements/Тонизирующие/sup_ton_royal_jelly.md), [sodium_dna](supplements/Тонизирующие/sup_ton_sodium_dna.md), [tribulus](supplements/Тонизирующие/sup_ton_tribulus.md), [venom](supplements/Тонизирующие/sup_ton_venom.md), [zymosan](supplements/Тонизирующие/sup_ton_zymosan.md)

**Энергия и концентрация** (1): [adaptogens](supplements/Энергия%20и%20концентрация/sup_adaptogens.md)

### Лекарственные препараты в нутрициологии

#### drugs/ — 17 .md файлов + data.json + prompts.md
Справочник препаратов, влияющих на нутритивный статус: механизмы, дефициты, протоколы сопровождения, таблица совместимости.

- [\_index.md](drugs/_index.md) — индекс, карта дефицитов, матрица совместимости 12×12
- [data.json](drugs/data.json) — машиночитаемый каталог (15 препаратов)
- [prompts.md](drugs/prompts.md) — все промпты в одном файле
- [drug_glp1_agonists.md](drugs/drug_glp1_agonists.md) — GLP-1 агонисты (семаглутид, тирзепатид)
- [drug_metformin.md](drugs/drug_metformin.md) — Метформин
- [drug_statins.md](drugs/drug_statins.md) — Статины (аторвастатин, розувастатин)
- [drug_thyroid_hormones.md](drugs/drug_thyroid_hormones.md) — Левотироксин (L-T4)
- [drug_oral_contraceptives.md](drugs/drug_oral_contraceptives.md) — Оральные контрацептивы (КОК)
- [drug_ppi.md](drugs/drug_ppi.md) — Ингибиторы протонной помпы (ИПП)
- [drug_diuretics.md](drugs/drug_diuretics.md) — Диуретики (тиазидные, петлевые)
- [drug_ssri_snri.md](drugs/drug_ssri_snri.md) — СИОЗС / СИОЗСН (антидепрессанты)
- [drug_nsaids.md](drugs/drug_nsaids.md) — НПВС (ибупрофен, диклофенак)
- [drug_antihypertensives.md](drugs/drug_antihypertensives.md) — Антигипертензивные (иАПФ, БРА, β-блокаторы)
- [drug_sglt2.md](drugs/drug_sglt2.md) — SGLT2 ингибиторы (дапаглифлозин, эмпаглифлозин)
- [drug_corticosteroids.md](drugs/drug_corticosteroids.md) — ГКС (глюкокортикостероиды)
- [drug_anticoagulants.md](drugs/drug_anticoagulants.md) — Антикоагулянты (варфарин, НОАК)
- [drug_antibiotics.md](drugs/drug_antibiotics.md) — Антибиотики (пенициллины, тетрациклины, хинолоны)
- [drug_bisphosphonates.md](drugs/drug_bisphosphonates.md) — Бисфосфонаты (алендронат, золедроновая к-та)

**Полнота:** ✅ 15 классов препаратов (добавлены: антикоагулянты, антибиотики, бисфосфонаты).

### Протоколы

#### protocols/ — 23 файла
Междисциплинарные протоколы для Digital Twin:

- [DTLP_protocols.md](protocols/DTLP_protocols.md)
- [protocol_cardiovascular_health.md](protocols/protocol_cardiovascular_health.md)
- [protocol_circadian_eating.md](protocols/protocol_circadian_eating.md)
- [protocol_cognitive_health.md](protocols/protocol_cognitive_health.md)
- [protocol_depression.md](protocols/protocol_depression.md)
- [protocol_eating_disorders.md](protocols/protocol_eating_disorders.md)
- [protocol_glycemic_control.md](protocols/protocol_glycemic_control.md)
- [protocol_hormonal_endocrine.md](protocols/protocol_hormonal_endocrine.md)
- [protocol_hydration.md](protocols/protocol_hydration.md)
- [protocol_inflammatory_systemic.md](protocols/protocol_inflammatory_systemic.md)
- [protocol_longevity.md](protocols/protocol_longevity.md)
- [protocol_metabolic_cardio_risks.md](protocols/protocol_metabolic_cardio_risks.md)
- [protocol_miin_deficits.md](protocols/protocol_miin_deficits.md)
- [protocol_nutritional_baseline.md](protocols/protocol_nutritional_baseline.md)
- [protocol_ozempic_jumpers.md](protocols/protocol_ozempic_jumpers.md)
- [protocol_pain_management.md](protocols/protocol_pain_management.md)
- [protocol_procurement_control.md](protocols/protocol_procurement_control.md)
- [protocol_rapid_weight_loss.md](protocols/protocol_rapid_weight_loss.md)
- [protocol_recovery_regeneration.md](protocols/protocol_recovery_regeneration.md)
- [protocol_sleep_hygiene.md](protocols/protocol_sleep_hygiene.md)
- [protocol_speech_tomatis.md](protocols/protocol_speech_tomatis.md)
- [protocols_type.md](protocols/protocols_type.md)
- [ozempic_jumpes_protocol.md](protocols/ozempic_jumpes_protocol.md)

#### protocol_obecity/ — 40 .md файлов (5 корень + 35 подкатегории)
Детальная система протоколов ожирения с матрицей релевантности (105 источников).

- [\_index.md](protocol_obecity/_index.md) — мастер-таблица всех 21 протокола
- [\_relevance_table.md](protocol_obecity/_relevance_table.md) — кросс-матрица протоколов
- [\_sources.md](protocol_obecity/_sources.md) — 105 научных источников
- [reserch_log.md](protocol_obecity/reserch_log.md)
- [obecity_protocols_finder.md](protocol_obecity/obecity_protocols_finder.md)

**Подкатегории:**

| Раздел | Протоколы | Статус |
|--------|-----------|--------|
| dietary/ | TRE 168, ADF, 5:2, Mediterranean, DASH, Keto Std, VLCKD, ~~OMAD~~, ~~Keto Adv~~ | 7 done, 2 draft |
| behavioral/ | CBT, Mindful Eating, Lab Shop Habit | 3 done |
| pharmaceutical/ | GLP-1, Tirzepatide, Orlistat+Metformin | 3 done |
| surgical/ | Bariatric Surgery | 1 done |
| digital/ | Digital Weight Loss | 1 done |
| commercial/ | Commercial Programs | 1 done |
| exercise/ | Exercise Protocols | 1 done |
| alternative/ | Alternative Medicine | 1 done |
| special_populations/ | Special Populations | 1 done |
| combinatory/ | Combinatory Approaches, Decision Flow | 2 done |

### Лечение и интервенции

#### treatment_plans/ — 12 файлов
- [index.md](treatment_plans/index.md)
- [basic_supplements.md](treatment_plans/basic_supplements.md)
- [cardiovascular.md](treatment_plans/cardiovascular.md)
- [circadian_nutrition.md](treatment_plans/circadian_nutrition.md)
- [cognitive.md](treatment_plans/cognitive.md)
- [glycemic_control.md](treatment_plans/glycemic_control.md)
- [hormonal_disorders.md](treatment_plans/hormonal_disorders.md)
- [hydration.md](treatment_plans/hydration.md)
- [inflammatory.md](treatment_plans/inflammatory.md)
- [longevity.md](treatment_plans/longevity.md)
- [metabolic_risks.md](treatment_plans/metabolic_risks.md)
- [sleep_hygiene.md](treatment_plans/sleep_hygiene.md)

#### intervention/ — 7 файлов
- [Каталог интервенций.md](intervention/Каталог интервенций.md)
- [intervention_user_response.md](intervention/intervention_user_response.md)
- [cardiology.md](intervention/medcine/cardiology.md)
- [endocrinology.md](intervention/medcine/endocrinology.md)
- [gastroenterology.md](intervention/medcine/gastroenterology.md)
- [laboratory.md](intervention/medcine/laboratory.md)
- [neurology.md](intervention/medcine/neurology.md)

### Поведение и среда

#### behavior_design/ — 6 файлов
- [\_index.md](behavior_design/_index.md)
- [01_intro.md](behavior_design/01_intro.md)
- [02_tools.md](behavior_design/02_tools.md)
- [03_cravings.md](behavior_design/03_cravings.md)
- [04_force_majeure.md](behavior_design/04_force_majeure.md)
- [05_coaching.md](behavior_design/05_coaching.md)

#### environment_design/ — 7 файлов
- [\_index.md](environment_design/_index.md)
- [01_atomic_habits.md](environment_design/01_atomic_habits.md)
- [02_fogg_behavior_model.md](environment_design/02_fogg_behavior_model.md)
- [03_environment_zones.md](environment_design/03_environment_zones.md)
- [04_digital_environment.md](environment_design/04_digital_environment.md)
- [05_social_environment.md](environment_design/05_social_environment.md)
- [06_implementation_examples.md](environment_design/06_implementation_examples.md)

#### psyhotypes/ — 5 файлов
- [01_classification.md](psyhotypes/01_classification.md)
- [02_identification.md](psyhotypes/02_identification.md)
- [03_motivation.md](psyhotypes/03_motivation.md)
- [04_cjm_therapy_plans.md](psyhotypes/04_cjm_therapy_plans.md)
- [06_02_behavior.md](psyhotypes/06_02_behavior.md)

### Клиентская работа

#### client_care/ — 10 файлов (8 корень + 2 survey_design/)
- [\_index.md](client_care/_index.md)
- [01_formats_and_principles.md](client_care/01_formats_and_principles.md)
- [02_meeting_structure.md](client_care/02_meeting_structure.md)
- [03_recommendation_delivery.md](client_care/03_recommendation_delivery.md)
- [04_tracklist_examples.md](client_care/04_tracklist_examples.md)
- [05_experience_assessment.md](client_care/05_experience_assessment.md)
- [06_test_scenarios.md](client_care/06_test_scenarios.md)
- [07_final_meeting_and_case_study.md](client_care/07_final_meeting_and_case_study.md)
- [survey_design/01_pre_screening_questionnaire.md](client_care/survey_design/01_pre_screening_questionnaire.md)
- [survey_design/_index.md](client_care/survey_design/_index.md)

#### interview_design/ — 6 файлов (2 корень + 4 best_practices/)
- [\_index.md](interview_design/_index.md)
- [01_initial_meeting.md](interview_design/01_initial_meeting.md)
- [best_practices/01_model_miin.md](interview_design/best_practices/01_model_miin.md)
- [best_practices/02_model_nbc_hwc.md](interview_design/best_practices/02_model_nbc_hwc.md) *(draft)*
- [best_practices/03_model_clinical_rd.md](interview_design/best_practices/03_model_clinical_rd.md) *(draft)*
- [best_practices/_index.md](interview_design/best_practices/_index.md)

#### cjm/ — 6 файлов
- [01_cjm_new_user.md](cjm/01_cjm_new_user.md)
- [08.02_cjm_active_user.md](cjm/08.02_cjm_active_user.md)
- [08.03_cjm_clinic_patient.md](cjm/08.03_cjm_clinic_patient.md)
- [08.04_cjm_doctor.md](cjm/08.04_cjm_doctor.md)
- [08.05_cjm_pilot_user.md](cjm/08.05_cjm_pilot_user.md)
- [DIGITAL_TWIN_PLANNING.md](cjm/DIGITAL_TWIN_PLANNING.md)

### Традиционные практики

#### med_traditional_practices/ — 13 файлов
- [practice_ayurveda.md](med_traditional_practices/practice_ayurveda.md)
- [practice_behavioral.md](med_traditional_practices/practice_behavioral.md)
- [practice_biomarkers.md](med_traditional_practices/practice_biomarkers.md)
- [practice_chinese_medicine.md](med_traditional_practices/practice_chinese_medicine.md)
- [practice_cultural.md](med_traditional_practices/practice_cultural.md)
- [practice_folk.md](med_traditional_practices/practice_folk.md)
- [practice_guidelines.md](med_traditional_practices/practice_guidelines.md)
- [practice_integrative.md](med_traditional_practices/practice_integrative.md)
- [practice_maya.md](med_traditional_practices/practice_maya.md)
- [practice_nutriciology.md](med_traditional_practices/practice_nutriciology.md)
- [practice_personalized.md](med_traditional_practices/practice_personalized.md)
- [practice_rki.md](med_traditional_practices/practice_rki.md)
- [practice_shamanism.md](med_traditional_practices/practice_shamanism.md)

#### diary/ — 1 файл
- [Дневник_питания_и_образа_жизни.md](diary/Дневник_питания_и_образа_жизни.md)

### Прочее

- [genetics/index.md](genetics/index.md) — заметка
- [plans_per_twin/README.md](plans_per_twin/README.md) — планы Digital Twin
- [knowledge_description_rules.md](knowledge_description_rules.md) — правила оформления

---

## Пробелы и проблемы

### 🔴 Высокий приоритет

1. **`microbiome/` — отсутствует.** Ни одного документа о микробиоме, пробиотиках, пребиотиках (упоминания есть в `sup_probiotics.md`, но нет системного описания).
2. **`literature/` — отсутствует.** Нет системы отслеживания научной литературы. `_sources.md` покрывает только протоколы ожирения.
3. **`protocols/` — нет `_index.md`.** 22 протокола без единой навигации.
4. **19 `.md` файлов без промптов** (преимущественно `_index.md`, `medcine/`, `interview_design/`, `survey_design/`).

### 🟡 Средний приоритет

5. **`_index.md` не везде.** Из 24 директорий `_index.md` есть только в 8. В 3 случаях — неправильное имя (`index.md` вместо `_index.md`).
6. **`stress/` и `sleep/` — нет выделенных директорий.** Информация разбросана по протоколам и БАДам.
7. **Нет статуса `review`.** Ни один файл не имеет `status: review`, хотя стандарт его определяет.
8. **4 черновика (`draft`):** OMAD, Keto Adv, NBC-HWC, Clinical RD.

### 🟢 Низкий приоритет

9. **`supplements/`** — SPA на HTML, нет `.md` файлов на корневом уровне (исключение по правилам); пустая корневая директория.
10. **`nutrition/food/`** — методологии описания блюд и анализа фото, но нет статей-знаний о продуктах.
11. **Нет директории `cases/`** (кейсы) — упомянута в `knowledge_description_rules.md` как тип раздела.

---

## Кросс-ссылки между категориями

| Из | В | Тип связи |
|----|----|-----------|
| protocols/ | treatment_plans/ | Протокол → план лечения |
| protocols/ | intervention/ | Протокол → интервенции |
| protocols/ | drugs/ | Протокол → сопровождение препаратов |
| diet_preferences/ | nutrition/diets/ | Предпочтение → доказательная диета |
| nutrition/minerals/ + nutrition/vitamins/ | supplements/ | Вещество → БАД |
| nutrition/minerals/ + nutrition/vitamins/ | drugs/ | Нутриент → дефицит на фоне препарата |
| behavior_design/ | environment_design/ | Поведение → среда |
| psyhotypes/ | cjm/ | Психотип → CJM |
| client_care/ | interview_design/ | Ведение → интервью |
| drugs/ | supplements/ | Препарат → нутрицевтическая коррекция |
| drugs/ | protocols/ | Препарат → клинический протокол |
| drugs/ | treatment_plans/ | Препарат → план лечения |

---

## Команды для проверки

```bash
# Файлы без промптов (ни inline, ни redirect)
grep -rL "Промпты для презентации" --include="*.md" . | grep -v node_modules
# Черновики
grep -rl "status:\s*draft\|draft_" --include="*.md" .
# Индексы
ls -d */_index.md 2>/dev/null
# Количество .md
find . -name '*.md' -not -path '*/node_modules/*' | wc -l
```

---

*Индекс сгенерирован автоматически. Все ссылки — относительные, от корня `docs/domain/knowledge/`.*
