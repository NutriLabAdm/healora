# Чек-лист исправления www/dev.healora.ru под DESIGN.md

> **Дата:** 08.05.2026 | **Цель:** Убрать эмодзи, заменить на SVG/текст согласно `DESIGN.md`

---

## ❌ Найденные эмодзи в коде

### 1. `src/components/ChatInterface.jsx`
| Строка | Эмодзи | Что заменить | ID_EL |
|--------|--------|----------------|-------|
| 130 | `🧠 Викторина:` | `<span className="icon">🧠</span>` → SVG-иконка `ic_quiz` | `EL_ICON_XXX` |
| 131 | `×` (крестик) | `<button className="close-quiz">×</button>` → SVG `ic_close` | `EL_ICON_XXX` |
| 175 | `✅` (галочка) | `className="message ai-message"` → SVG `ic_check` | `EL_COMP_001` |
| 192-200 | `→ Отправить` | Текст кнопки → `Отправить` (без стрелки) | `EL_COMP_XXX` |

### 2. `src/components/PhoneContainer.jsx`
| Строка | Эмодзи | Что заменить | ID_EL |
|--------|--------|----------------|-------|
| 12 | `⭐ 840 звёзд` | Заменить `⭐` на `<span className="icon">...</span>` со SVG `ic_star` | `EL_COMP_003` |
| 14 | `🔥 5 дней подряд` | Заменить `🔥` на `<span className="mood-indicator mood-happy"></span>` | `EL_COMP_015` |

### 3. `src/components/BottomNav.jsx`
✅ **Уже использует SVG!** (строки 12-15, 22-25, 33-35, 44-50, 59-61)
> Нужно только добавить `ID_EL` в названия: `EL_COMP_010`

### 4. `src/components/ProgressPath.jsx`, `Goals.jsx`, `Profile.jsx`
> Нужно проверить на эмодзи (предположительно есть `🎯`, `🔥`, `🏆`)

---

## 🛠 Как заменить эмодзи на SVG (пример)

### До (эмодзи):
```jsx
<div className="score">
  <span id="total-stars">⭐ 840</span> звёзд
</div>
```

### После (SVG + ID_EL):
```jsx
<div className="score" id="EL_COMP_003">
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" id="EL_ICON_010">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
  <span id="total-stars">840</span>
</div>
```

---

## 📋 Соответствие таблице DESIGN.md

| Файл | Элемент | ID_EL в DESIGN.md | Есть в коде? | Нужно добавить? |
|------|----------|-------------------|--------------|------------------|
| `index.html` | `.font-h1` | `EL_FONT_001` | ❌ | ✅ Добавить `id="EL_FONT_001"` |
| `index.html` | `.font-body` | `EL_FONT_003` | ❌ | ✅ Добавить `id="EL_FONT_003"` |
| `ChatInterface.jsx` | Чат-пузыри | `EL_COMP_001` | ✅ Есть | 🔧 Убрать `✅` эмодзи |
| `PhoneContainer.jsx` | Шапка с очками | `EL_COMP_003` | ✅ Есть | 🔧 Заменить `⭐ 840` на SVG |
| `BottomNav.jsx` | Нижняя навигация | `EL_COMP_010` | ✅ Есть | ✅ Добавить `id="EL_COMP_010"` |

---

## 🎯 Скрипт для проверки эмодзи (bash)

```bash
# Найти все эмодзи в проекте
grep -r -n --color=never '[🎯🏆🔥⭐✅×🌙⚙️💧💦🥗🥣🥬💬📷🔔📅🏆🎖🥺🥶🥵🍵🥴🥷🥸🥹🥲🥳🥺🥻🥼🥽🥾🥿]' "E:\_dev\55.Skoltech\56.AIMLEI-2026\healora.ru\www\dev.healora.ru\src\"
```

---

## ✅ Итоговый чек-лист исправлений

### 1. Убрать эмодзи из `www/dev.healora.ru/src/`
- [ ] `ChatInterface.jsx` — убрать `🧠`, `×`, `✅`, `→`, `←`
- [ ] `PhoneContainer.jsx` — убрать `⭐`, `🔥`, заменить на SVG из `assets/ui_library.html`
- [ ] `ProgressPath.jsx` — проверить, убрать `🎯`, `🔥`
- [ ] `Goals.jsx` — проверить на эмодзи
- [ ] `Profile.jsx` — проверить на эмодзи

### 2. Добавить `id="EL_XXX"` в компоненты
- [ ] `BottomNav.jsx` — добавить `id="EL_COMP_010"`
- [ ] `ChatInterface.jsx` — добавить `id="EL_COMP_001"` к `.message`
- [ ] `PhoneContainer.jsx` — добавить `id="EL_COMP_003"` к `.phone-header`

### 3. Синхронизировать с `DESIGN.md`
- [ ] Проверить, что все `ID_EL` из `DESIGN.md` присутствуют в коде
- [ ] Проверить цвета (`--primary: #4CAF50` и др.) совпадают с CSS в компонентах

---

## 🚀 Быстрая команда для деплоя (когда исправите)

```bash
cd "E:\_dev\55.Skoltech\56.AIMLEI-2026\healora.ru\www\dev.healora.ru"
npm run build  # Сборка
# Затем загрузить dist/ на healora.ru
```

---

> **Следующий шаг:** Откройте `src/components/ChatInterface.jsx` и замените эмодзи на SVG-иконки из `docs/design/assets/ui_library.html`!
