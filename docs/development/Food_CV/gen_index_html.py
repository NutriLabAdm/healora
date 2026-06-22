import json, os

CATALOG_PATH = r"E:\_dev\55.Skoltech\56.AIMLEI-2026\healora.ru\www\dev.healora.ru\src\assets\data\food_catalog.json"
FOOD_IMAGES_DIR = r"images"
OUTPUT_PATH = r"E:\_dev\55.Skoltech\56.AIMLEI-2026\healora.ru\docs\development\Food_CV\index.html"

with open(CATALOG_PATH, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Define analysis data for each dish
dish_analysis = {
    "01. котлеты с макаронами и салат.jpg": {
        "ndi": 6.5,
        "calories": "~580 ккал",
        "bju": "Б: 24 г | Ж: 26 г | У: 60 г",
        "pros": "Хорошее количество белка; присутствие свежих овощей помогает усвоению тяжелой мясной пищи.",
        "cons": "Макароны, скорее всего, из мягких сортов пшеницы; котлеты содержат скрытый жир (и, возможно, белый хлеб в фарше).",
        "recs": "Выбирать макароны строго из твердых сортов (Al Dente); запекать котлеты в духовке, а не жарить; уменьшить порцию углеводов."
    },
    "02. обед с фруктами и мантами.jpg": {
        "ndi": 7.0,
        "calories": "~580 ккал",
        "bju": "Б: 28 г | Ж: 20 г | У: 65 г",
        "pros": "Разнообразие продуктов; мясо в мантах — источник белка; фрукты дают витамины и клетчатку.",
        "cons": "Тесто мантов — быстрые углеводы; виноград — высокий ГИ; сочетание теста+мяса — тяжелое для пищеварения.",
        "recs": "Уменьшить количество мантов до 3-4 шт; заменить виноград на ягоды с низким ГИ; добавить овощи вместо фруктов."
    },
    "03. сосиски с оливье.jpg": {
        "ndi": 4.5,
        "calories": "~520 ккал",
        "bju": "Б: 18 г | Ж: 30 г | У: 42 г",
        "pros": "Быстрое приготовление; знакомый вкус; содержит яйца и горошек (витамины группы B).",
        "cons": "Избыток насыщенных жиров (майонез + сосиски); дефицит клетчатки; переработанное мясо; много соли.",
        "recs": "Заменить майонез на греческий йогурт с горчицей; заменить сосиски на отварную курицу; добавить свежие овощи."
    },
    "_04. яишница с овощами.jpg": {
        "ndi": 8.0,
        "calories": "~280 ккал",
        "bju": "Б: 20 г | Ж: 18 г | У: 8 г",
        "pros": "Отличный стартовый белок и жиры из яичного желтка для долгой сытости; обилие свежих сезонных овощей.",
        "cons": "Жарка яиц на масле добавляет лишние насыщенные жиры; для полноценного завтрака не хватает сложных углеводов.",
        "recs": "Добавить цельнозерновой тост; использовать оливковое масло extra virgin; добавить авокадо для полезных жиров."
    },
    "05. гречка с котлетой.jpg": {
        "ndi": 8.2,
        "calories": "~490 ккал",
        "bju": "Б: 30 г | Ж: 16 г | У: 48 г",
        "pros": "Гречка — лучший гарнир с низким ГИ и высоким содержанием клетчатки; котлета — полноценный белок.",
        "cons": "Не хватает свежих овощей для полной гарвардской тарелки; жарка котлеты добавляет насыщенные жиры.",
        "recs": "Добавить порцию свежих овощей (салат, помидоры); приготовить котлету на пару или запечь; добавить квашеную капусту."
    },
    "06. киноа с курице брокколи.jpg": {
        "ndi": 9.0,
        "calories": "~450 ккал",
        "bju": "Б: 38 г | Ж: 12 г | У: 38 г",
        "pros": "Киноа — полный аминокислотный профиль; куриная грудка — постный белок; брокколи — мощный антиоксидант (сульфорафан).",
        "cons": "Практически идеальное блюдо; можно добавить полезные жиры для лучшего усвоения жирорастворимых витаминов.",
        "recs": "Добавить авокадо или оливковое масло; приправить куркумой с чёрным перцем; добавить лимонный сок."
    },
    "07 овощи с йогуртом.jpg": {
        "ndi": 8.5,
        "calories": "~180 ккал",
        "bju": "Б: 12 г | Ж: 6 г | У: 16 г",
        "pros": "Много овощей с клетчаткой; пробиотики из йогурта; низкая калорийность; отличный перекус.",
        "cons": "Недостаточно белка для самостоятельного приёма пищи; мало полезных жиров.",
        "recs": "Использовать греческий йогурт для большего содержания белка; добавить семена льна или чиа для омега-3."
    },
    "08. оливки гречка фасоль.jpg": {
        "ndi": 8.0,
        "calories": "~360 ккал",
        "bju": "Б: 14 г | Ж: 14 г | У: 42 г",
        "pros": "Высокое содержание клетчатки; полезные мононенасыщенные жиры из оливок; растительный белок.",
        "cons": "Маловато белка для обеда; натрий из оливок — умеренно высокий; отсутствие животного белка может не дать длительного насыщения.",
        "recs": "Добавить нут или тофу для увеличения белка; подавать с яйцом-пашот; посыпать тыквенными семечками."
    },
    "09. авокадо шпинат горошек.jpg": {
        "ndi": 8.8,
        "calories": "~340 ккал",
        "bju": "Б: 10 г | Ж: 26 г | У: 18 г",
        "pros": "Очень высокая nutritional density; полезные мононенасыщенные жиры авокадо; рекордное содержание клетчатки (12 г).",
        "cons": "Крайне недостаточно белка (10 г); высокая калорийность за счёт жиров может быть неочевидна.",
        "recs": "Добавить киноа или нут для полноценного белка; подавать с яйцом пашот; посыпать семенами чиа."
    },
    "10. котлеты макароны лук томат.jpg": {
        "ndi": 6.0,
        "calories": "~580 ккал",
        "bju": "Б: 30 г | Ж: 24 г | У: 54 г",
        "pros": "Хороший источник белка; ликопин из томатов — мощный антиоксидант; кверцетин из лука — противовоспалительное.",
        "cons": "Высокая гликемическая нагрузка из-за макарон; недостаток овощей; жарка котлет добавляет насыщенные жиры.",
        "recs": "Уменьшить порцию макарон, увеличить овощи; использовать макароны из твёрдых сортов; котлеты запекать."
    },
    "11. ряженка яблоко хлеб.jpg": {
        "ndi": 7.5,
        "calories": "~290 ккал",
        "bju": "Б: 12 г | Ж: 10 г | У: 38 г",
        "pros": "Пробиотики из ряженки; клетчатка из яблока и хлеба; быстрый и лёгкий завтрак; кальций для костей.",
        "cons": "Недостаточно белка для завтрака; углеводный перекос; мёд добавляет лишний сахар.",
        "recs": "Добавить горсть орехов или семян для белка и жиров; выбрать хлеб с семечками; заменить мёд на ягоды."
    },
    "12. 20260219_204535.jpg": {
        "ndi": 8.5,
        "calories": "~420 ккал",
        "bju": "Б: 34 г | Ж: 10 г | У: 40 г",
        "pros": "Высокое содержание постного белка; бурый рис — медленные углеводы; брокколи — сульфорафан и клетчатка.",
        "cons": "Маловато жиров для полноценного усвоения жирорастворимых витаминов; соевый соус — много натрия.",
        "recs": "Добавить авокадо или кунжутное масло; заменить соевый соус на тамари (без глютена); добавить куркуму."
    },
    "13. гарвардская тарелка.jpg": {
        "ndi": 9.5,
        "calories": "~480 ккал",
        "bju": "Б: 35 г | Ж: 18 г | У: 35 г",
        "pros": "Эталон Гарвардской тарелки; идеальный баланс БЖУ; полный спектр витаминов и антиоксидантов; высокая клетчатка.",
        "cons": "Практически идеально; может не хватать ферментированных продуктов для микробиома.",
        "recs": "Добавить ферментированные овощи (кимчи, квашеная капуста); посыпать тыквенными семечками для цинка."
    },
    "14. rulka.jpg": {
        "ndi": 4.5,
        "calories": "~750-900 ккал",
        "bju": "Б: 45 г | Ж: 65 г | У: 8 г",
        "pros": "Высокое содержание белка и коллагена; наличие свежей зелени и овощей несколько облегчает пищеварение.",
        "cons": "Огромное количество насыщенных жиров и общая высокая калорийность блюда; сильная нагрузка на печень и поджелудочную.",
        "recs": "Срезать жирную кожуру перед употреблением; контролировать размер порции мяса (не более 150 г); утроить порцию овощей."
    },
    "15. сибас.jpg": {
        "ndi": 9.2,
        "calories": "~380 ккал",
        "bju": "Б: 34 г | Ж: 22 г | У: 10 г",
        "pros": "Сибас — источник легкоусвояемого белка, фосфора и Омега-3 жирных кислот; минимальное количество жира при приготовлении.",
        "cons": "Практически идеальное блюдо; для полноценного приёма пищи можно добавить сложные углеводы.",
        "recs": "Подавать с киноа или бурым рисом; чередовать с другими видами рыбы (лосось, треска); использовать минимум соли."
    },
    "16. сибас.jpg": {
        "ndi": 7.8,
        "calories": "~440 ккал",
        "bju": "Б: 32 г | Ж: 24 г | У: 28 г",
        "pros": "Качественный рыбный белок; Омега-3 из сибаса; витамин D.",
        "cons": "Картофельный гарнир повышает ГИ; сметанный соус добавляет насыщенные жиры; маловато овощей.",
        "recs": "Заменить картофель на запечённые овощи (цукини, баклажан); заменить сметану на греческий йогурт; добавить шпинат."
    },
    "17.сельдь под шубой.jpg": {
        "ndi": 5.5,
        "calories": "~350 ккал",
        "bju": "Б: 16 г | Ж: 20 г | У: 24 г",
        "pros": "Сельдь — рекордсмен по витамину D и Омега-3; свёкла — бетаин для печени и нитраты для сосудов.",
        "cons": "Майонез сводит пользу сельди на нет; много соли; недостаточно белка для основного блюда.",
        "recs": "Заменить майонез на смесь греческого йогурта с горчицей; добавить зелёное яблоко; сверху посыпать грецкими орехами."
    },
    "18. Лосось с авокадо и шпинатом.png": {
        "ndi": 9.0,
        "calories": "~420 ккал",
        "bju": "Б: 32 г | Ж: 28 г | У: 8 г",
        "pros": "Лосось — богатейший источник Омега-3 EPA/DHA; авокадо — мононенасыщенные жиры и калий; шпинат — железо и витамин K.",
        "cons": "Высокая калорийность за счёт жиров может быть неочевидна; для кого-то может быть слишком жирно.",
        "recs": "Подавать с киноа для углеводов; добавить лимонно-имбирную заправку; использовать дикий лосось для меньшего содержания токсинов."
    },
    "19. Карри из нута с киноа и овощами.png": {
        "ndi": 9.0,
        "calories": "~480 ккал",
        "bju": "Б: 18 г | Ж: 16 г | У: 52 г",
        "pros": "Богатое клетчаткой вегетарианское блюдо; нут + киноа = полный аминокислотный профиль; куркума — мощный противовоспалительный эффект.",
        "cons": "Растительный белок усваивается хуже животного; высокое содержание углеводов (52 г) может не подойти для низкоуглеводных диет.",
        "recs": "Добавить тофу или темпе для дополнительного белка; подавать с кинзой для детокса; добавить кокосовое молоко для кремовости."
    },
    "20. Борщ.png": {
        "ndi": 7.5,
        "calories": "~320 ккал",
        "bju": "Б: 22 г | Ж: 12 г | У: 28 г",
        "pros": "Свёкла — антиоксиданты и нитраты для сосудов; говядина — гемовое железо; сметана — пробиотики; много овощей и клетчатки.",
        "cons": "Картофель повышает ГИ; сметана добавляет насыщенные жиры; может содержать много соли; долго варить.",
        "recs": "Уменьшить количество картофеля, добавить больше капусты; использовать сметану 10%; подавать с цельнозерновым хлебом."
    },
    "21. Окрошка.png": {
        "ndi": 7.8,
        "calories": "~250 ккал",
        "bju": "Б: 14 г | Ж: 12 г | У: 18 г",
        "pros": "Лёгкий холодный суп на кефире; пробиотики для микрофлоры; свежие овощи — витамины и клетчатка; низкая калорийность.",
        "cons": "Недостаточно белка для обеда (14 г); употребление холодной еды может замедлить пищеварение; мало жиров для сытости.",
        "recs": "Добавить отварное яйцо или курицу для белка; заменить кефир на тан/айран для разнообразия пробиотиков."
    },
    "22. Гамбургер.png": {
        "ndi": 4.5,
        "calories": "~650 ккал",
        "bju": "Б: 32 г | Ж: 36 г | У: 42 г",
        "pros": "Говяжья котлета — хороший источник железа и цинка; сыр — кальций; есть овощи (салат, помидор, лук).",
        "cons": "Избыток насыщенных жиров; булочка из белой муки — быстрые углеводы; мало клетчатки; соусы содержат сахар.",
        "recs": "Заменить булочку на цельнозерновую или листья салада; добавить авокадо; выбрать котлету меньшего размера."
    },
    "23. Плов.png": {
        "ndi": 5.0,
        "calories": "~580 ккал",
        "bju": "Б: 28 г | Ж: 24 г | У: 52 г",
        "pros": "Баранина — железо, цинк, витамин B12; зира улучшает пищеварение; рис даёт энергию; морковь — бета-каротин.",
        "cons": "Высокая калорийность; избыток масла в традиционном рецепте; мало овощей; высокий ГИ из-за белого риса.",
        "recs": "Заменить белый рис на бурый; уменьшить количество масла; подавать с большим овощным салатом; использовать постную баранину."
    }
}

# Build HTML
rows_html = ""
for idx, (fn, entry) in enumerate(data.items(), 1):
    ndi = entry.get('nutrition', {}).get('ndi', 0)
    ndi_float = float(ndi) if ndi else 0
    dish_name = entry.get('dish_name', entry.get('title', fn))
    title = entry.get('title', dish_name)
    meal_type = entry.get('meal_type', 'обед')
    nutrition = entry.get('nutrition', {})
    calories = nutrition.get('calories', '—')
    protein = nutrition.get('protein', '—')
    fat = nutrition.get('fat', '—')
    carbs = nutrition.get('carbs', '—')
    fiber = nutrition.get('fiber', '—')
    ingredients = entry.get('ingredients', [])
    keywords = entry.get('keywords', [])
    
    analysis = dish_analysis.get(fn, {})
    
    # determine NDI level
    if ndi_float >= 8.0:
        ndi_level = "Высокий"
        ndi_bg = "#e8f5e9"
        ndi_color = "#2e7d32"
    elif ndi_float >= 6.0:
        ndi_level = "Средний"
        ndi_bg = "#fff8e1"
        ndi_color = "#f57f17"
    else:
        ndi_level = "Низкий"
        ndi_bg = "#ffebee"
        ndi_color = "#c62828"
    
    ingr_text = ", ".join(ingredients) if ingredients else title
    
    # image path
    ext = '.jpg' if '.jpg' in fn else '.png'
    base_fn = fn
    
    pros = analysis.get("pros", "Нет данных")
    cons = analysis.get("cons", "Нет данных")
    recs = analysis.get("recs", "Нет данных")
    cal = analysis.get("calories", f"~{calories} ккал" if calories != '—' else '—')
    bju = analysis.get("bju", f"Б: {protein} г | Ж: {fat} г | У: {carbs} г")
    
    row = f'''<tr>
  <td class="ndi-cell">
    <div class="ndi-score" style="background:{ndi_bg};color:{ndi_color};border:2px solid {ndi_color}">
      <span class="ndi-value">{ndi}</span>
      <span class="ndi-label">/ 10</span>
    </div>
    <div class="ndi-status" style="color:{ndi_color}">({ndi_level})</div>
  </td>
  <td class="dish-cell">
    <div class="dish-content">
      <div class="dish-photo">
        <img src="{FOOD_IMAGES_DIR}/{base_fn}" alt="{title}" loading="lazy" onerror="this.style.display='none'">
      </div>
      <div class="dish-info">
        <strong>{title}</strong>
        <div class="dish-meta">{meal_type} | {', '.join(keywords) if keywords else ''}</div>
        <div class="dish-ingredients">{ingr_text}</div>
      </div>
    </div>
  </td>
  <td class="nutri-cell">
    <div class="cal-value">{cal}</div>
    <div class="bju-value">{bju}</div>
    <div class="fiber-value">Клетчатка: {fiber} г</div>
  </td>
  <td class="pros-cell">{pros}</td>
  <td class="cons-cell">{cons}</td>
  <td class="recs-cell">{recs}</td>
</tr>'''
    rows_html += row

html = f'''<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Сравнительный нутрициологический анализ рационов | Healora</title>
  <style>
    * {{ margin: 0; padding: 0; box-sizing: border-box; }}
    body {{
      font-family: 'Segoe UI', -apple-system, sans-serif;
      background: #f8f9fa;
      color: #1a1a1a;
      padding: 20px;
    }}
    h1 {{
      font-size: 22px;
      color: #311b92;
      margin-bottom: 8px;
      font-weight: 700;
    }}
    .subtitle {{
      font-size: 13px;
      color: #757575;
      margin-bottom: 24px;
    }}
    .table-container {{
      overflow-x: auto;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    }}
    table {{
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
      min-width: 900px;
    }}
    thead th {{
      background: #311b92;
      color: white;
      padding: 12px 10px;
      text-align: left;
      font-weight: 600;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
    }}
    thead th:first-child {{ border-radius: 12px 0 0 0; }}
    thead th:last-child {{ border-radius: 0 12px 0 0; }}
    tbody tr {{
      border-bottom: 1px solid #f0f0f0;
      transition: background 0.2s;
    }}
    tbody tr:hover {{ background: #fafafa; }}
    tbody tr:last-child {{ border-bottom: none; }}
    td {{
      padding: 12px 10px;
      vertical-align: top;
      line-height: 1.5;
    }}
    .ndi-cell {{
      text-align: center;
      width: 80px;
      min-width: 80px;
    }}
    .ndi-score {{
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      margin: 0 auto;
    }}
    .ndi-value {{
      font-size: 18px;
      font-weight: 700;
      line-height: 1;
    }}
    .ndi-label {{
      font-size: 8px;
      font-weight: 600;
      opacity: 0.7;
    }}
    .ndi-status {{
      font-size: 9px;
      font-weight: 600;
      margin-top: 4px;
    }}
    .dish-cell {{ width: 220px; min-width: 220px; }}
    .dish-content {{
      display: flex;
      gap: 10px;
      align-items: flex-start;
    }}
    .dish-photo {{
      width: 60px;
      height: 60px;
      min-width: 60px;
      border-radius: 8px;
      overflow: hidden;
      background: #f5f5f5;
    }}
    .dish-photo img {{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }}
    .dish-info {{
      flex: 1;
    }}
    .dish-info strong {{
      font-size: 13px;
      color: #1a1a1a;
      display: block;
      margin-bottom: 2px;
    }}
    .dish-meta {{
      font-size: 9px;
      color: #757575;
      margin-bottom: 4px;
    }}
    .dish-ingredients {{
      font-size: 10px;
      color: #666;
      line-height: 1.4;
    }}
    .nutri-cell {{
      width: 150px;
      min-width: 150px;
    }}
    .cal-value {{
      font-size: 15px;
      font-weight: 700;
      color: #311b92;
    }}
    .bju-value {{
      font-size: 11px;
      color: #555;
      margin-top: 2px;
    }}
    .fiber-value {{
      font-size: 10px;
      color: #888;
      margin-top: 2px;
    }}
    .pros-cell, .cons-cell, .recs-cell {{
      font-size: 11px;
      min-width: 200px;
    }}
    .pros-cell {{ color: #2e7d32; }}
    .cons-cell {{ color: #c62828; }}
    .recs-cell {{ color: #1565c0; }}
    .footer {{
      margin-top: 20px;
      font-size: 11px;
      color: #999;
      text-align: center;
    }}
    @media (max-width: 768px) {{
      table {{ font-size: 10px; }}
      td {{ padding: 8px 6px; }}
      .dish-photo {{ width: 40px; height: 40px; min-width: 40px; }}
      .dish-info strong {{ font-size: 11px; }}
    }}
  </style>
</head>
<body>
  <h1>Сравнительный нутрициологический анализ рационов</h1>
  <div class="subtitle">Healora Food CV — {len(dish_analysis)} блюд • Дата анализа: 2026-06-14</div>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>NDI (Health Score)</th>
          <th>Название и состав блюда</th>
          <th>Калорийность и БЖУ</th>
          <th>Плюсы с точки зрения нутрициологии</th>
          <th>Минусы и риски</th>
          <th>Рекомендации по оптимизации</th>
        </tr>
      </thead>
      <tbody>
        {rows_html}
      </tbody>
    </table>
  </div>
  <div class="footer">
    Сгенерировано Healora AI • Источник: food_catalog.json • Фото: images/
  </div>
</body>
</html>'''

os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
    f.write(html)
print(f"Created: {OUTPUT_PATH}")
print(f"Total dishes: {len(data)}")
