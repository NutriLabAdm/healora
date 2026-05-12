#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SRC_DIR="$PROJECT_ROOT/src"
DIST_DIR="$PROJECT_ROOT/www/healora.ru/prototype"

echo "=============================================="
echo "  Build Healora Prototype"
echo "=============================================="

# Create dist directory
mkdir -p "$DIST_DIR"

# Read components
PHONE_HEADER=$(cat "$SRC_DIR/components/phone-header.html")
BOTTOM_NAV=$(cat "$SRC_DIR/components/bottom-nav.html")
SOURCES_PANEL=$(cat "$SRC_DIR/components/sources-panel.html")
INFO_PANEL=$(cat "$SRC_DIR/components/info-panel.html")
CONTEXT_TIPS=$(cat "$SRC_DIR/components/context-tips.html")

# Function to build a page
build_page() {
    local output=$1
    local screen_content=$2
    local screen_id=$3
    local active_nav=$4
    local page_title=$5
    
    cat > "$DIST_DIR/$output" << EOF
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Healora - $page_title</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; min-height: 100vh; padding: 20px; display: flex; justify-content: center; align-items: flex-start; gap: 30px; }
        
        /* Phone */
        .phone-container { flex-shrink: 0; }
        .phone { width: 390px; height: 844px; background: #fff; border-radius: 40px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); overflow: hidden; position: relative; border: 12px solid #1a1a1a; display: flex; flex-direction: column; }
        
        .phone-header { background: linear-gradient(135deg, #78909c, #607d8b); padding: 15px 20px; color: #fff; flex-shrink: 0; }
        .phone-header h2 { font-size: 20px; font-weight: 700; margin-bottom: 5px; }
        .phone-header .subtitle { font-size: 12px; opacity: 0.9; }
        .phone-header .score { font-size: 28px; font-weight: 800; display: flex; align-items: center; gap: 8px; }
        .phone-header .progress { font-size: 12px; margin-top: 5px; opacity: 0.9; }
        .phone-header .streak { font-size: 12px; margin-top: 3px; }
        
        .screen { display: flex; flex-direction: column; flex: 1; overflow: hidden; }
        
        .chat { flex: 1; padding: 15px; overflow-y: auto; background: #eceff1; }
        
        .message { display: flex; margin-bottom: 15px; animation: slideIn 0.3s ease; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        
        .message.ai { flex-direction: row; }
        .message.user { flex-direction: row-reverse; }
        
        .avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .message.ai .avatar { background: #cfd8dc; margin-right: 10px; }
        .message.user .avatar { background: #bbdefb; margin-left: 10px; }
        
        .bubble { max-width: 280px; padding: 12px 16px; border-radius: 18px; font-size: 14px; line-height: 1.4; }
        .message.ai .bubble { background: #fff; border: 2px solid #b0bec5; border-bottom-left-radius: 4px; }
        .message.ai .bubble.done { background: #f5f5f5; border-color: #78909c; opacity: 0.7; text-decoration: line-through; }
        .message.user .bubble { background: #607d8b; color: #fff; border-bottom-right-radius: 4px; }
        
        .task-card { background: #fff; border: 2px solid #b0bec5; border-radius: 12px; padding: 15px; margin-top: 8px; display: flex; align-items: center; gap: 12px; cursor: pointer; transition: all 0.3s; }
        .task-card:hover { border-color: #607d8b; }
        .task-card.completed { border-color: #78909c; background: #eceff1; }
        .task-card .checkbox { width: 24px; height: 24px; border: 2px solid #b0bec5; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 14px; }
        .task-card.completed .checkbox { background: #78909c; border-color: #78909c; color: #fff; }
        .task-card .content { flex: 1; }
        .task-card .content .title { font-size: 14px; font-weight: 600; color: #37474f; }
        .task-card .content .points { font-size: 12px; color: #607d8b; font-weight: 600; margin-top: 4px; }
        .task-card .content .category { font-size: 10px; color: #78909c; margin-top: 3px; }
        
        .points-popup { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #607d8b; color: #fff; padding: 20px 40px; border-radius: 50px; font-size: 24px; font-weight: 800; animation: popUp 1s ease forwards; z-index: 1000; }
        @keyframes popUp { 0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); } 50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); } 100% { opacity: 0; transform: translate(-50%, -120%) scale(1); } }
        
        /* Filter Badges */
        .filter-bar { display: flex; gap: 8px; padding: 10px 15px; background: #fff; border-bottom: 1px solid #b0bec5; flex-wrap: wrap; }
        .filter-badge { padding: 3px 8px; border-radius: 12px; font-size: 10px; font-weight: 600; cursor: pointer; transition: all 0.3s; border: 1px solid #b0bec5; background: #fff; color: #78909c; }
        .filter-badge:hover { border-color: #607d8b; color: #37474f; }
        .filter-badge.active { background: #607d8b; border-color: #607d8b; color: #fff; }
        
        /* Intervention Buttons */
        .intervention-bar { padding: 10px 15px; background: #fff; border-top: 1px solid #b0bec5; display: flex; gap: 8px; flex-wrap: wrap; flex-shrink: 0; }
        .intervention-btn { padding: 8px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.3s; border: 2px solid #607d8b; background: #fff; color: #607d8b; }
        .intervention-btn:hover { background: #eceff1; }
        .intervention-btn:active { background: #607d8b; color: #fff; }
        
        /* Bottom Navigation */
        .bottom-nav { position: sticky; bottom: 0; left: 0; right: 0; background: #fff; border-top: 1px solid #b0bec5; display: flex; justify-content: space-around; padding: 8px 0; z-index: 10; flex-shrink: 0; }
        .nav-item { display: flex; flex-direction: column; align-items: center; gap: 4px; cursor: pointer; padding: 8px 16px; border-radius: 8px; transition: all 0.3s; background: none; border: none; font-family: inherit; text-decoration: none; color: inherit; }
        .nav-item.active { background: #cfd8dc; }
        .nav-item svg { width: 24px; height: 24px; }
        .nav-item span { font-size: 10px; color: #78909c; font-weight: 500; }
        .nav-item.active span { color: #37474f; font-weight: 600; }
        
        /* Profile Screen */
        .profile-content { flex: 1; padding: 15px; overflow-y: auto; background: #eceff1; }
        .profile-section { background: #fff; border-radius: 16px; padding: 15px; margin-bottom: 12px; }
        .profile-section h3 { font-size: 14px; color: #607d8b; margin-bottom: 10px; font-weight: 600; }
        .param-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eceff1; font-size: 12px; }
        .param-row:last-child { border-bottom: none; }
        .param-name { color: #78909c; flex: 1; }
        .param-value { color: #37474f; font-weight: 600; }
        .param-status { width: 8px; height: 8px; border-radius: 50%; margin-left: 8px; flex-shrink: 0; margin-top: 3px; }
        .status-good { background: #4caf50; }
        .status-warning { background: #ff9800; }
        .status-bad { background: #f44336; }
        
        /* Sources Panel (Left) */
        .sources-panel { width: 200px; background: #fff; border-radius: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); padding: 20px; flex-shrink: 0; }
        .sources-panel h3 { font-size: 16px; color: #37474f; margin-bottom: 15px; font-weight: 700; }
        .source-item { display: flex; align-items: center; gap: 10px; padding: 12px; background: #f5f5f5; border-radius: 12px; margin-bottom: 8px; cursor: grab; transition: all 0.3s; border: 2px solid transparent; }
        .source-item:hover { background: #eceff1; border-color: #b0bec5; transform: scale(1.05); }
        .source-item:active { cursor: grabbing; transform: scale(0.95); }
        .source-item svg { width: 20px; height: 20px; flex-shrink: 0; }
        .source-item .label { font-size: 12px; color: #37474f; font-weight: 500; }
        .source-item.dragging { opacity: 0.5; }
        
        .drop-zone { margin-top: 15px; padding: 20px; border: 2px dashed #b0bec5; border-radius: 12px; text-align: center; font-size: 12px; color: #78909c; transition: all 0.3s; }
        .drop-zone.active { border-color: #4caf50; background: #e8f5e9; color: #2e7d32; }
        .drop-zone h4 { font-size: 14px; margin-bottom: 8px; color: #607d8b; }
        
        /* Info Panel (Right) */
        .info-panel { width: 360px; background: #fff; border-radius: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); padding: 20px; max-height: 844px; overflow-y: auto; flex-shrink: 0; }
        .info-panel h3 { font-size: 18px; color: #37474f; margin-bottom: 15px; font-weight: 700; }
        .info-section { margin-bottom: 20px; }
        .info-section h4 { font-size: 14px; color: #607d8b; margin-bottom: 10px; font-weight: 600; }
        .info-item { padding: 10px; background: #f5f5f5; border-radius: 8px; margin-bottom: 8px; font-size: 12px; color: #37474f; line-height: 1.4; }
        .info-item .label { font-weight: 600; color: #78909c; }
        .info-log { max-height: 300px; overflow-y: auto; }
        .log-entry { padding: 8px; border-left: 3px solid #607d8b; margin-bottom: 5px; font-size: 11px; color: #37474f; padding-left: 10px; }
        .log-entry .time { color: #78909c; font-size: 10px; }
        
        /* Context Tips (Fixed Bottom) */
        .context-tips { position: fixed; bottom: 0; left: 0; right: 0; background: #fff; border-top: 1px solid #b0bec5; z-index: 100; max-height: 15vh; overflow-y: auto; }
        .tips-header { padding: 10px 15px; background: #eceff1; cursor: pointer; font-size: 12px; font-weight: 600; color: #607d8b; display: flex; justify-content: space-between; align-items: center; }
        .tips-content { padding: 10px 15px; display: none; }
        .tips-content.show { display: block; }
        .tip-item { font-size: 11px; color: #37474f; margin-bottom: 8px; line-height: 1.4; }
        .tip-item strong { color: #607d8b; }
        
        /* Close Button */
        .close-btn { position: fixed; top: 20px; left: 20px; background: #fff; border: none; padding: 10px; border-radius: 50%; cursor: pointer; z-index: 1000; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center; }
        .close-btn:hover { background: #f5f5f5; }
        .close-btn svg { width: 20px; height: 20px; }
        
        /* Layout */
        .layout { display: flex; gap: 30px; align-items: flex-start; }
    </style>
</head>
<body>
    <button class="close-btn" onclick="closeApp()">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#37474f" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
    </button>
    
    <div class="layout">
        $SOURCES_PANEL
        
        <div class="phone-container">
            <div class="phone">
                $PHONE_HEADER
                
                <div class="screen" id="$screen_id">
                    $screen_content
                </div>
                
                $BOTTOM_NAV
            </div>
        </div>
        
        $INFO_PANEL
    </div>
    
    $CONTEXT_TIPS
    
    <script>
        let totalStars = 840;
        let currentFilter = 'all';
        let actionLog = [
            { time: '10:15', action: 'Выполнено: Выпить стакан воды (+10 ⭐)' },
            { time: '10:12', action: 'Загружен прототип' }
        ];
        let addedSources = [];
        
        const messages = [
            { type: 'ai', text: 'Привет! Сегодня отличный день для прогресса! Давай выполним задачи и закроем неделю!', category: 'general' },
            { type: 'ai', text: 'Задача 1/5: Выпей стакан воды до завтрака', task: 'Выпить стакан воды', points: 10, category: 'nutrition' },
            { type: 'ai', text: 'Задача 2/5: 15 минут зарядки', task: '15 мин зарядки', points: 20, category: 'activity' },
            { type: 'ai', text: 'Задача 3/5: Запиши 1 эмоцию дня', task: 'Записать эмоцию', points: 15, category: 'recovery' },
            { type: 'ai', text: 'Совет: Попробуй заменить сахар на мед в чае. Это снизит гликемический индекс!', category: 'nutrition' },
            { type: 'user', text: 'Отличная идея! Буду пробовать.', category: 'general' },
            { type: 'ai', text: 'Задача 4/5: Пройди 1000 шагов', task: '1000 шагов', points: 15, category: 'activity' },
            { type: 'ai', text: 'Рекомендуемая статья: "Влияние микробиома на вес" (PubMed ID: 12345)', category: 'knowledge' },
            { type: 'ai', text: 'Задача 5/5: 7-8 часов сна', task: '7-8 часов сна', points: 20, category: 'recovery' },
            { type: 'ai', text: 'Серия дней: 5 подряд! Так держать!', category: 'general' },
            { type: 'ai', text: 'На следующей неделе повысим нагрузку. Готов к новым вызовам?', category: 'general' },
            { type: 'user', text: 'Да, готов! ', category: 'general' },
            { type: 'ai', text: 'Твой прогресс: 68% плана выполнено. Осталось совсем немного!', category: 'general' },
            { type: 'ai', text: 'Новое исследование: Интервальное голодание улучшает чувствительность к инсулину.', category: 'knowledge' },
            { type: 'ai', text: 'Напоминание: Пора проверить вес и замерить талию.', category: 'health' },
            { type: 'ai', text: 'Достижение разблокировано: "5 дней подряд"!', category: 'general' }
        ];
        
        function initChat() {
            const container = document.getElementById('chat-container');
            messages.forEach(msg => {
                const div = document.createElement('div');
                div.className = \`message \${msg.type}\`;
                div.dataset.category = msg.category;
                
                let avatarSvg = msg.type === 'ai' 
                    ? '<svg viewBox="0 0 24 24" width="40" height="40" fill="#607d8b" stroke="#fff" stroke-width="1"><circle cx="12" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/></svg>'
                    : '<svg viewBox="0 0 24 24" width="40" height="40" fill="#2196f3" stroke="#fff" stroke-width="1"><circle cx="12" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/></svg>';
                
                let bubbleContent = msg.text;
                if (msg.task) {
                    bubbleContent += \`
                        <div class="task-card" onclick="completeTask(this, \${msg.points}, '\${msg.category}')">
                            <div class="checkbox">
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                            </div>
                            <div class="content">
                                <div class="title">\${msg.task}</div>
                                <div class="points">+\${msg.points} <svg viewBox="0 0 24 24" width="12" height="12" fill="#ffd54f" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
                                <div class="category">\${getCategoryName(msg.category)}</div>
                            </div>
                        </div>
                    \`;
                }
                
                div.innerHTML = \`
                    <div class="avatar">\${avatarSvg}</div>
                    <div class="bubble">\${bubbleContent}</div>
                \`;
                container.appendChild(div);
            });
            container.scrollTop = container.scrollHeight;
        }
        
        function getCategoryName(cat) {
            const names = { nutrition: 'Питание', activity: 'Активность', recovery: 'Восстановление', knowledge: 'Знания', health: 'Здоровье', general: 'Общее' };
            return names[cat] || cat;
        }
        
        function filterMessages(category, btn) {
            currentFilter = category;
            document.querySelectorAll('.filter-badge').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            document.querySelectorAll('.message').forEach(msg => {
                if (category === 'all' || msg.dataset.category === category) {
                    msg.style.display = 'flex';
                } else {
                    msg.style.display = 'none';
                }
            });
        }
        
        function completeTask(card, points, category) {
            if (card.classList.contains('completed')) return;
            
            card.classList.add('completed');
            card.querySelector('.checkbox').innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>';
            totalStars += points;
            
            const popup = document.createElement('div');
            popup.className = 'points-popup';
            popup.innerHTML = \`+\${points} <svg viewBox="0 0 24 24" width="24" height="24" fill="#ffd54f" stroke="none" style="vertical-align: middle;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>\`;
            document.body.appendChild(popup);
            setTimeout(() => popup.remove(), 1000);
            
            document.getElementById('total-stars').textContent = totalStars;
            document.getElementById('info-stars').textContent = totalStars;
            
            // Log action
            const now = new Date();
            const timeStr = \`\${now.getHours()}:\${String(now.getMinutes()).padStart(2, '0')}\`;
            actionLog.unshift({ time: timeStr, action: \`Выполнено: \${card.querySelector('.title').textContent} (+\${points} ⭐)\` });
            updateLog();
        }
        
        function addIntervention(type) {
            const interventions = {
                food: { text: 'Рекомендуем: Киноа с овощами и авокадо. БЖУ: 15/8/40г.', category: 'nutrition', points: 15 },
                read: { text: 'Статья: "Механизмы ожирения" (Lancet, 2025). Читать 15 мин.', category: 'knowledge', points: 20 },
                science: { text: 'Научный факт: HRV коррелирует с уровнем кортизола (p<0.01).', category: 'knowledge', points: 10 },
                news: { text: 'Новость: FDA одобрило новый препарат для менеджмента веса с эффективностью 15% снижения.', category: 'knowledge', points: 5 }
            };
            
            const intervention = interventions[type];
            const container = document.getElementById('chat-container');
            const div = document.createElement('div');
            div.className = 'message ai';
            div.dataset.category = intervention.category;
            
            div.innerHTML = \`
                <div class="avatar">
                    <svg viewBox="0 0 24 24" width="40" height="40" fill="#607d8b" stroke="#fff" stroke-width="1">
                        <circle cx="12" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    </svg>
                </div>
                <div class="bubble">
                    \${intervention.text}
                    <div class="task-card" onclick="completeTask(this, \${intervention.points}, '\${intervention.category}')">
                        <div class="checkbox">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <div class="content">
                            <div class="title">Изучить интервенцию</div>
                            <div class="points">+\${intervention.points} <svg viewBox="0 0 24 24" width="12" height="12" fill="#ffd54f" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
                            <div class="category">\${getCategoryName(intervention.category)}</div>
                        </div>
                    </div>
                </div>
            \`;
            container.appendChild(div);
            container.scrollTop = container.scrollHeight;
        }
        
        // Sample data for each source type
        const sourceSampleData = {
            wearable: {
                title: 'Wearables Data',
                data: [
                    { label: 'HRV (Heart Rate Variability)', value: '45 ms', status: 'good' },
                    { label: 'Сон', value: '7.5 часов', status: 'good' },
                    { label: 'Шаги', value: '8,432 / 10,000', status: 'warning' },
                    { label: 'ЧСС в покое', value: '58 уд/мин', status: 'good' },
                    { label: 'Восстановление', value: '82%', status: 'good' }
                ]
            },
            voice: {
                title: 'Voice Input',
                data: [
                    { label: 'Последняя запись', value: 'Усталость + головная боль', status: 'warning' },
                    { label: 'Тон голоса', value: 'Низкий (утро)', status: 'normal' },
                    { label: 'Эмоциональный статус', value: 'Спокойный', status: 'good' },
                    { label: 'Записей за неделю', value: '12', status: 'good' }
                ]
            },
            medical: {
                title: 'Medical Tests',
                data: [
                    { label: 'Витамин D', value: '35 нг/мл (ниже нормы)', status: 'warning' },
                    { label: 'Ферритин', value: '28 нг/мл (норма)', status: 'good' },
                    { label: 'ТТГ', value: '1.8 мМЕ/л (норма)', status: 'good' },
                    { label: 'Глюкоза', value: '85 мг/дл (норма)', status: 'good' },
                    { label: 'Общий холестерин', value: '175 мг/дл', status: 'warning' }
                ]
            },
            food: {
                title: 'Food Photos Analysis',
                data: [
                    { label: 'Калории (сегодня)', value: '1,840 / 2,200 ккал', status: 'good' },
                    { label: 'Белок', value: '65 г (норма)', status: 'good' },
                    { label: 'Жиры', value: '55 г (выше нормы)', status: 'warning' },
                    { label: 'Углеводы', value: '220 г', status: 'normal' },
                    { label: 'Волокна', value: '18 г', status: 'good' }
                ]
            },
            genetics: {
                title: 'Genetics (23andMe)',
                data: [
                    { label: 'APOE', value: 'ε3/ε3 (нейтральный)', status: 'good' },
                    { label: 'MTHFR', value: 'Нет варианта', status: 'good' },
                    { label: 'Лактаза', value: 'Да (переносимость лактозы)', status: 'good' },
                    { label: 'Риск ожирения', value: 'Средний', status: 'warning' },
                    { label: 'Метаболизм вит. B', value: 'Эффективный', status: 'good' }
                ]
            },
            mental: {
                title: 'Mental Health',
                data: [
                    { label: 'Медитация (неделя)', value: '45 мин / 5 сессий', status: 'good' },
                    { label: 'Стресс', value: '4/10', status: 'good' },
                    { label: 'HRV (стресс)', value: '52 ms', status: 'good' },
                    { label: 'Настроение', value: 'Стабильное', status: 'good' },
                    { label: 'Качество сна', value: 'Хорошее', status: 'good' }
                ]
            }
        };
        
        function showSample(sourceType) {
            const sample = sourceSampleData[sourceType];
            if (!sample) return;
            
            let html = \`<div style="background: #fff; border-radius: 12px; padding: 15px; margin-top: 10px;">
                <h4 style="margin: 0 0 10px 0; font-size: 14px; color: #37474f;">\${sample.title}</h4>\`;
            
            sample.data.forEach(item => {
                const statusColor = item.status === 'good' ? '#4caf50' : item.status === 'warning' ? '#ff9800' : '#78909c';
                html += \`<div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #eceff1; font-size: 12px;">
                    <span style="color: #78909c;">\${item.label}</span>
                    <span style="color: #37474f; font-weight: 600;">\${item.value}</span>
                    <span style="width: 8px; height: 8px; border-radius: 50%; background: \${statusColor}; margin-left: 8px;"></span>
                </div>\`;
            });
            
            html += '</div>';
            
            const dropZone = document.getElementById('drop-zone');
            const existingData = dropZone.querySelector('.sample-data-display');
            if (existingData) existingData.remove();
            
            const dataDiv = document.createElement('div');
            dataDiv.className = 'sample-data-display';
            dataDiv.innerHTML = html;
            dropZone.appendChild(dataDiv);
            
            // Log action
            const now = new Date();
            const timeStr = \`\${now.getHours()}:\${String(now.getMinutes()).padStart(2, '0')}\`;
            const names = { wearable: 'Wearables', voice: 'Voice', medical: 'Medical', food: 'Food Photos', genetics: 'Genetics', mental: 'Mental' };
            actionLog.unshift({ time: timeStr, action: \`Просмотр данных: \${names[sourceType]}\` });
            updateLog();
        }
        
        // Log drag start
        function logDrag(sourceType) {
            const now = new Date();
            const timeStr = \`\${now.getHours()}:\${String(now.getMinutes()).padStart(2, '0')}\`;
            const names = { wearable: 'Wearables', voice: 'Voice', medical: 'Medical', food: 'Food Photos', genetics: 'Genetics', mental: 'Mental' };
            actionLog.unshift({ time: timeStr, action: \`Начало drag: \${names[sourceType]}\` });
            updateLog();
        }
        
        function dragStart(event, sourceType) {
            event.dataTransfer.setData('text/plain', sourceType);
            event.target.classList.add('dragging');
            logDrag(sourceType);
        }
        
        function allowDrop(event) {
            event.preventDefault();
            document.getElementById('drop-zone').classList.add('active');
        }
        
        function drop(event) {
            event.preventDefault();
            const sourceType = event.dataTransfer.getData('text/plain');
            document.getElementById('drop-zone').classList.remove('active');
            
            if (!addedSources.includes(sourceType)) {
                addedSources.push(sourceType);
                const names = {
                    wearable: 'Wearables (HRV, сон)',
                    voice: 'Voice (голосовой ввод)',
                    medical: 'Medical (анализы)',
                    food: 'Food Photos (фото еды)',
                    genetics: 'Genetics (генетика)',
                    mental: 'Mental (медитации)'
                };
                
                const div = document.createElement('div');
                div.style.cssText = 'padding: 5px; background: #e8f5e9; margin: 3px; border-radius: 4px;';
                div.textContent = \`✓ \${names[sourceType]}\`;
                document.getElementById('sources-added').appendChild(div);
                
                // Log action
                const now = new Date();
                const timeStr = \`\${now.getHours()}:\${String(now.getMinutes()).padStart(2, '0')}\`;
                actionLog.unshift({ time: timeStr, action: \`Добавлен источник: \${names[sourceType]}\` });
                updateLog();
            }
            
            document.querySelectorAll('.source-item').forEach(item => item.classList.remove('dragging'));
        }
        
        function removeHighlight(event) {
            document.getElementById('drop-zone').classList.remove('active');
        }
        
        function updateLog() {
            const logDiv = document.getElementById('action-log');
            if (!logDiv) return;
            logDiv.innerHTML = '';
            actionLog.slice(0, 20).forEach(entry => {
                const div = document.createElement('div');
                div.className = 'log-entry';
                div.innerHTML = \`<div class="time">\${entry.time}</div><div>\${entry.action}</div>\`;
                logDiv.appendChild(div);
            });
        }
        
        function showCategories() {
            // Placeholder for categories modal
        }
        
        function toggleTips() {
            const content = document.getElementById('tips-content');
            const arrow = document.getElementById('tips-arrow');
            if (content.classList.contains('show')) {
                content.classList.remove('show');
                arrow.style.transform = 'rotate(0deg)';
            } else {
                content.classList.add('show');
                arrow.style.transform = 'rotate(180deg)';
            }
        }
        
        function closeApp() {
            window.location.href = 'https://healora.ru/';
        }
        
        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            initChat();
            updateLog();
        });
    </script>
</body>
</html>
EOF
}

# Build all pages
echo "Building index.html..."
build_page "index.html" "$(cat << 'EOF'
<!-- Filter Badges -->
<div class="filter-bar">
    <span class="filter-badge" onclick="filterMessages('nutrition', this)">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z"/></svg> Питание
    </span>
    <span class="filter-badge" onclick="filterMessages('activity', this)">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10h-4l-2-4h-2l-2 4H2v10z"/></svg> Активность
    </span>
    <span class="filter-badge" onclick="filterMessages('knowledge', this)">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/></svg> Знания
    </span>
</div>

<!-- Scrollable Messages -->
<div class="chat" id="chat-container">
    <!-- Messages will be populated by JS -->
</div>

<!-- Intervention Buttons -->
<div class="intervention-bar">
    <button class="intervention-btn" onclick="addIntervention('food')">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z"/></svg> Что поесть
    </button>
    <button class="intervention-btn" onclick="addIntervention('read')">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> Что почитать
    </button>
    <button class="intervention-btn" onclick="addIntervention('science')">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 3h6l-2 10H11z"/><path d="M12 13v7"/><path d="M8 21h8"/></svg> Научи
    </button>
    <button class="intervention-btn" onclick="addIntervention('news')">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2z"/><polyline points="16 2 16 6 20 6"/></svg> Новости по менеджменту веса
    </button>
</div>
EOF
)" "chat-screen" "" "Сообщения"

echo "Building path.html..."
build_page "path.html" "$(cat << 'EOF'
<div class="profile-content">
    <div class="profile-section">
        <h3>Прогресс пути</h3>
        <div class="param-row"><span class="param-name">Дней в пути</span><span class="param-value">42 дня</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Текущий этап</span><span class="param-value">Фаза 2: Стабилизация</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Общий прогресс</span><span class="param-value">68%</span><span class="param-status status-good"></span></div>
    </div>
    
    <div class="profile-section">
        <h3>Этапы пути</h3>
        <div class="param-row"><span class="param-name">Этап 1</span><span class="param-value">Осознание (0-14 дней) ✓</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Этап 2</span><span class="param-value">Стабилизация (15-30 дней) ✓</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Этап 3</span><span class="param-value">Оптимизация (31-60 дней) ⟳</span><span class="param-status status-warning"></span></div>
        <div class="param-row"><span class="param-name">Этап 4</span><span class="param-value">Долголетие (61-90 дней)</span><span class="param-status status-bad"></span></div>
    </div>
    
    <div class="profile-section">
        <h3>Следующая цель</h3>
        <div class="param-row"><span class="param-name">Цель</span><span class="param-value">Достичь 70% прогресса</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Осталось</span><span class="param-value">18 дней</span><span class="param-status status-warning"></span></div>
    </div>
</div>
EOF
)" "path-screen" "active" "Путь"

echo "Building goals.html..."
build_page "goals.html" "$(cat << 'EOF'
<div class="profile-content">
    <div class="profile-section">
        <h3>Активные цели</h3>
        <div class="param-row"><span class="param-name">Похудение</span><span class="param-value">-3.2 / -5.0 кг (64%)</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Активность</span><span class="param-value">8,432 / 10,000 шагов (84%)</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Сон</span><span class="param-value">7.5 / 8.0 часов (94%)</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Вода</span><span class="param-value">2.1 / 2.5 л (84%)</span><span class="param-status status-warning"></span></div>
    </div>
    
    <div class="profile-section">
        <h3>Достижения</h3>
        <div class="param-row"><span class="param-name">Первый шаг</span><span class="param-value">3 задачи подряд ✓</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">На огне</span><span class="param-value">7 дней без пропусков ✓</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Баланс</span><span class="param-value">50+ очков в каждой категории</span><span class="param-status status-warning"></span></div>
    </div>
    
    <div class="profile-section">
        <h3>Недельная статистика</h3>
        <div class="param-row"><span class="param-name">Знания</span><span class="param-value">320 звёзд</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Активность</span><span class="param-value">280 звёзд</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Восстановление</span><span class="param-value">140 звёзд</span><span class="param-status status-warning"></span></div>
        <div class="param-row"><span class="param-name">Питание</span><span class="param-value">240 звёзд</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Специалисты</span><span class="param-value">180 звёзд</span><span class="param-status status-good"></span></div>
    </div>
</div>
EOF
)" "goals-screen" "active" "Цели"

echo "Building profile.html..."
build_page "profile.html" "$(cat << 'EOF'
<div class="profile-content">
    <!-- Demographics -->
    <div class="profile-section">
        <h3>Демография</h3>
        <div class="param-row"><span class="param-name">Возраст</span><span class="param-value">28 лет</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Рост</span><span class="param-value">165 см</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Вес</span><span class="param-value">55 кг</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">BMI</span><span class="param-value">20.2 кг/м²</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Талия</span><span class="param-value">65 см</span><span class="param-status status-good"></span></div>
    </div>
    
    <!-- Biomedical Markers -->
    <div class="profile-section">
        <h3>Биомаркеры</h3>
        <div class="param-row"><span class="param-name">АД (сист.)</span><span class="param-value">105 мм рт.ст.</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">АД (диаст.)</span><span class="param-value">68 мм рт.ст.</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">ЧСС</span><span class="param-value">68 уд/мин</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Глюкоза</span><span class="param-value">85 мг/дл</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Холестерин общ.</span><span class="param-value">175 мг/дл</span><span class="param-status status-warning"></span></div>
        <div class="param-row"><span class="param-name">HDL</span><span class="param-value">65 мг/дл</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">LDL</span><span class="param-value">98 мг/дл</span><span class="param-status status-warning"></span></div>
        <div class="param-row"><span class="param-name">Триглицериды</span><span class="param-value">60 мг/дл</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Гемоглобин</span><span class="param-value">12.8 г/дл</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Лейкоциты</span><span class="param-value">6.2 ×10³/мкл</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Тромбоциты</span><span class="param-value">260 ×10³/мкл</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Креатинин</span><span class="param-value">0.72 мг/дл</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">ALT</span><span class="param-value">18 Ед/л</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">AST</span><span class="param-value">20 Ед/л</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">TSH</span><span class="param-value">1.8 мМЕ/л</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Витамин D</span><span class="param-value">35 нг/мл</span><span class="param-status status-warning"></span></div>
        <div class="param-row"><span class="param-name">Железо</span><span class="param-value">70 мкг/дл</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Ферритин</span><span class="param-value">28 нг/мл</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Гематокрит</span><span class="param-value">38%</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">MCV</span><span class="param-value">91 фл</span><span class="param-status status-good"></span></div>
    </div>
    
    <!-- Lifestyle Factors -->
    <div class="profile-section">
        <h3>Факторы образа жизни</h3>
        <div class="param-row"><span class="param-name">Курение</span><span class="param-value">Не курит</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Алкоголь</span><span class="param-value">Редко</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Физ. активность</span><span class="param-value">5-6 р/неделю</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Тип упражнений</span><span class="param-value">HIIT, Тренажёрный зал</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Сон</span><span class="param-value">8 часов</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Стресс</span><span class="param-value">4/10</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Диета</span><span class="param-value">Вегетарианская</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Кофе</span><span class="param-value">1 чашка/день</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Вода</span><span class="param-value">2.5 л/день</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Экранное время</span><span class="param-value">4 часа/день</span><span class="param-status status-warning"></span></div>
        <div class="param-row"><span class="param-name">График</span><span class="param-value">Дневной</span><span class="param-status status-good"></span></div>
    </div>
    
    <!-- Genetic Markers -->
    <div class="profile-section">
        <h3>Генетические маркеры</h3>
        <div class="param-row"><span class="param-name">APOE</span><span class="param-value">ε3/ε3</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">MTHFR</span><span class="param-value">Нет варианта</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Лактаза</span><span class="param-value">Да</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">BRCA1/2</span><span class="param-value">Отрицательно</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Фактор V Лейдена</span><span class="param-value">Нет варианта</span><span class="param-status status-good"></span></div>
    </div>
    
    <!-- Family & Medical History -->
    <div class="profile-section">
        <h3>Семейный и медицинский анамнез</h3>
        <div class="param-row"><span class="param-name">ССЗ</span><span class="param-value">Нет</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">ДМ</span><span class="param-value">Нет</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Рак</span><span class="param-value">Бабушка (грудь)</span><span class="param-status status-warning"></span></div>
        <div class="param-row"><span class="param-name">Гипертония</span><span class="param-value">Нет</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Хронические</span><span class="param-value">Нет</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Операции</span><span class="param-value">Нет</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Лекарства</span><span class="param-value">Витамин D</span><span class="param-status status-good"></span></div>
        <div class="param-row"><span class="param-name">Аллергии</span><span class="param-value">Нет</span><span class="param-status status-good"></span></div>
    </div>
</div>
EOF
)" "profile-screen" "active" "Профиль"

echo "Done! All pages built."
