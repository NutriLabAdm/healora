import React from 'react';

const VitaminsModule = ({ onClose }) => (
  <div className="km2-detail">
    <div className="km2-detail-header">
      <span className="km2-detail-badge" style={{ background: '#2e7d32' }}>VITAMINS</span>
      <h2 className="km2-detail-title">Путь фолиевой кислоты в организме</h2>
      <button className="km2-detail-close" onClick={onClose}>×</button>
    </div>
    <div className="km2-detail-body" style={{ overflow: 'auto' }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 650" width="100%" style={{ maxWidth: 850, display: 'block', margin: '0 auto' }}>
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#444"/></marker>
          <marker id="arrow-gray" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#888"/></marker>
          <filter id="shadow" x="-2%" y="-2%" width="104%" height="108%"><feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.12"/></filter>
        </defs>

        <text x="425" y="35" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#222">Путь фолиевой кислоты в организме</text>

        <rect x="275" y="55" width="250" height="36" rx="8" fill="#e3f2fd" stroke="#1976d2" strokeWidth="2" filter="url(#shadow)"/>
        <text x="400" y="78" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1565c0">Пищевые фолаты / Фолиевая кислота</text>

        <line x1="400" y1="91" x2="400" y2="115" stroke="#444" strokeWidth="2" markerEnd="url(#arrow)"/>
        <text x="410" y="106" fontSize="11" fill="#666" fontStyle="italic">DHFR</text>

        <rect x="320" y="118" width="160" height="32" rx="6" fill="#f3e5f5" stroke="#7b1fa2" strokeWidth="1.5" filter="url(#shadow)"/>
        <text x="400" y="138" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#6a1b9a">Дигидрофолат (DHF)</text>

        <line x1="400" y1="150" x2="400" y2="174" stroke="#444" strokeWidth="2" markerEnd="url(#arrow)"/>
        <text x="410" y="165" fontSize="11" fill="#666" fontStyle="italic">DHFR</text>

        <rect x="305" y="177" width="190" height="32" rx="6" fill="#f3e5f5" stroke="#7b1fa2" strokeWidth="1.5" filter="url(#shadow)"/>
        <text x="400" y="197" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#6a1b9a">Тетрагидрофолат (ТГФ)</text>

        <line x1="400" y1="209" x2="400" y2="233" stroke="#444" strokeWidth="2" markerEnd="url(#arrow)"/>
        <rect x="420" y="213" width="95" height="16" rx="4" fill="#fff3e0" stroke="#e65100" strokeWidth="1"/>
        <text x="467" y="224" textAnchor="middle" fontSize="9" fill="#bf360c">SHMT — кофактор B6</text>

        <rect x="295" y="236" width="210" height="32" rx="6" fill="#f3e5f5" stroke="#7b1fa2" strokeWidth="1.5" filter="url(#shadow)"/>
        <text x="400" y="256" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#6a1b9a">5,10-метилен-ТГФ</text>

        <line x1="400" y1="268" x2="400" y2="292" stroke="#444" strokeWidth="2" markerEnd="url(#arrow)"/>
        <rect x="420" y="272" width="105" height="16" rx="4" fill="#fff3e0" stroke="#e65100" strokeWidth="1"/>
        <text x="472" y="283" textAnchor="middle" fontSize="9" fill="#bf360c">MTHFR — кофактор B2/ФАД</text>

        <rect x="285" y="295" width="230" height="36" rx="8" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="2" filter="url(#shadow)"/>
        <text x="400" y="316" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1b5e20">5-метил-ТГФ (активная форма)</text>

        <line x1="400" y1="331" x2="400" y2="355" stroke="#444" strokeWidth="2" markerEnd="url(#arrow)"/>
        <rect x="420" y="335" width="120" height="16" rx="4" fill="#fff3e0" stroke="#e65100" strokeWidth="1"/>
        <text x="480" y="346" textAnchor="middle" fontSize="9" fill="#bf360c">MTR — акцептор B12/метилкобаламин</text>

        <rect x="305" y="358" width="190" height="32" rx="6" fill="#fce4ec" stroke="#c62828" strokeWidth="1.5" filter="url(#shadow)"/>
        <text x="400" y="378" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#b71c1c">Гомоцистеин</text>

        <line x1="305" y1="374" x2="170" y2="374" stroke="#444" strokeWidth="2" markerEnd="url(#arrow)"/>
        <rect x="145" y="345" width="120" height="16" rx="4" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="1"/>
        <text x="205" y="356" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1b5e20">Метионин</text>

        <line x1="155" y1="345" x2="155" y2="300" stroke="#999" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#arrow-gray)"/>
        <text x="130" y="325" fontSize="9" fill="#888" fontStyle="italic">цикл метилирования</text>

        <line x1="400" y1="390" x2="400" y2="408" stroke="#444" strokeWidth="2" markerEnd="url(#arrow)"/>
        <rect x="415" y="393" width="85" height="14" rx="4" fill="#fff3e0" stroke="#e65100" strokeWidth="1"/>
        <text x="458" y="403" textAnchor="middle" fontSize="9" fill="#bf360c">CBS — кофактор B6</text>

        <rect x="320" y="412" width="160" height="32" rx="6" fill="#e0f2f1" stroke="#00695c" strokeWidth="1.5" filter="url(#shadow)"/>
        <text x="400" y="432" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#004d40">Цистеин</text>

        <line x1="495" y1="374" x2="620" y2="374" stroke="#444" strokeWidth="2" markerEnd="url(#arrow)"/>

        <rect x="625" y="355" width="190" height="38" rx="6" fill="#fff8e1" stroke="#f57f17" strokeWidth="1.5" strokeDasharray="6,3" filter="url(#shadow)"/>
        <text x="720" y="373" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#e65100">BHMT</text>
        <text x="720" y="386" textAnchor="middle" fontSize="9" fill="#f57f17">бетаин / B6 / ДМГ</text>
        <text x="720" y="398" textAnchor="middle" fontSize="9" fill="#999" fontStyle="italic">альтернативный путь</text>

        <line x1="640" y1="355" x2="640" y2="265" stroke="#999" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#arrow-gray)"/>
        <path d="M 640 265 Q 640 250 625 250 L 210 250 Q 195 250 195 265 L 195 345" stroke="#999" strokeWidth="1.5" fill="none" strokeDasharray="5,3" markerEnd="url(#arrow-gray)"/>
        <text x="430" y="245" fontSize="9" fill="#888" fontStyle="italic">транссульфирование</text>

        <rect x="30" y="480" width="780" height="90" rx="8" fill="#fafafa" stroke="#ddd" strokeWidth="1"/>
        <text x="420" y="500" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#555">Легенда</text>

        <rect x="50" y="510" width="14" height="14" rx="3" fill="#e3f2fd" stroke="#1976d2" strokeWidth="1"/>
        <text x="70" y="522" fontSize="11" fill="#444">Исходное вещество</text>

        <rect x="200" y="510" width="14" height="14" rx="3" fill="#f3e5f5" stroke="#7b1fa2" strokeWidth="1"/>
        <text x="220" y="522" fontSize="11" fill="#444">Промежуточный метаболит</text>

        <rect x="400" y="510" width="14" height="14" rx="3" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="2"/>
        <text x="420" y="522" fontSize="11" fill="#444">Активная форма</text>

        <rect x="560" y="510" width="14" height="14" rx="3" fill="#fff3e0" stroke="#e65100" strokeWidth="1"/>
        <text x="580" y="522" fontSize="11" fill="#444">Фермент — кофактор</text>

        <rect x="50" y="535" width="14" height="14" rx="3" fill="#fce4ec" stroke="#c62828" strokeWidth="1"/>
        <text x="70" y="547" fontSize="11" fill="#444">Маркер (гомоцистеин)</text>

        <rect x="220" y="535" width="14" height="14" rx="3" fill="#fff8e1" stroke="#f57f17" strokeWidth="1.5" strokeDasharray="4,2"/>
        <text x="240" y="547" fontSize="11" fill="#444">Альтернативный путь</text>

        <line x1="400" y1="535" x2="440" y2="535" stroke="#999" strokeWidth="1.5" strokeDasharray="5,3"/>
        <text x="450" y="539" fontSize="11" fill="#444">Обратная связь / цикл</text>

        <text x="425" y="610" textAnchor="middle" fontSize="11" fill="#888">Путь фолиевой кислоты: от поступления до участия в цикле метилирования и транссульфирования</text>
      </svg>
    </div>
  </div>
);

export default VitaminsModule;
