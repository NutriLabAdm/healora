import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatInterface = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sources, setSources] = useState([]);
  const [basket, setBasket] = useState({});
  const [log, setLog] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [provider, setProvider] = useState('gigachat');

  useEffect(() => {
    const saved = localStorage.getItem('healoraBasket');
    if (saved) setBasket(JSON.parse(saved));
    fetch('/api/provider').then(r => r.json()).then(d => {
      if (d.provider) setProvider(d.provider);
    }).catch(() => {});
  }, []);

  const toggleProvider = () => {
    const next = provider === 'gigachat' ? 'openai' : 'gigachat';
    fetch('/api/provider', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider: next })
    }).then(r => r.json()).then(d => {
      if (d.provider) setProvider(d.provider);
    }).catch(() => {});
  };

  useEffect(() => {
    localStorage.setItem('healoraBasket', JSON.stringify(basket));
  }, [basket]);

  const addMessage = (text, user = false) => {
    const newMsg = {
      id: Date.now(),
      text,
      user,
      time: new Date().toLocaleTimeString(),
      type: 'text'
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const addTask = (title, points, category) => {
    const newMsg = {
      id: Date.now(),
      type: 'task',
      title,
      points,
      category,
      completed: false,
      user: false,
      time: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const sampleTasks = [
    { title: 'Пить 2л воды в день', points: 10, category: 'Питание' },
    { title: 'Прогулка 30 мин', points: 15, category: 'Активность' },
    { title: 'Ложиться до 23:00', points: 20, category: 'Сон' },
    { title: 'Медитация 10 мин', points: 10, category: 'Ментальное' },
    { title: 'Записать приемы пищи', points: 5, category: 'Дневник' },
    { title: 'Измерить пульс утром', points: 15, category: 'Мониторинг' }
  ];

  const toggleTask = (id) => {
    setMessages(prev => prev.map(m => {
      if (m.id === id && !m.completed) {
        const newEntry = {
          time: new Date().toLocaleTimeString(),
          action: `Выполнено: ${m.title} (+${m.points} звёзд)`
        };
        setLog(prev => [newEntry, ...prev].slice(0, 20));
        return { ...m, completed: true };
      }
      return m;
    }));
  };

  const sendQuick = (text) => {
    setInput(text);
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} };
      send(fakeEvent, text);
    }, 0);
  };

  const send = async (e, overrideMsg) => {
    e.preventDefault();
    const msg = overrideMsg || input;
    if (!msg.trim()) return;
    
    setInput('');
    addMessage(msg, true);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg })
      });
      
      const data = await res.json();
      if (data.reply) {
        addMessage(data.reply, false);
      }
      
      if (data.quiz) {
        setQuiz(data.quiz);
        setShowQuiz(true);
        setAnswers(Array(data.quiz.questions.length).fill(null));
        setScore(0);
        setQIndex(0);
      }

      const taskKeywords = /задач|реком|совет|предлож|делать|план|тренировк|упражнен/i;
      if (taskKeywords.test(msg)) {
        setTimeout(() => {
          addMessage('Вот рекомендованные задачи на сегодня:', false);
          sampleTasks.forEach(t => addTask(t.title, t.points, t.category));
        }, 500);
      }
    } catch (err) {
      console.error(err);
      addMessage('Ошибка соединения', false);
    } finally {
      setLoading(false);
    }
  };

  const addSource = (type) => {
    if (!sources.includes(type)) {
      setSources(prev => [...prev, type]);
      // Fix: use proper object spread
      setBasket(prev => {
        const newBasket = { ...prev };
        newBasket[type] = { sample: `Data for ${type}` };
        return newBasket;
      });
      
      const names = {
        wearable: 'Wearables (HRV, сон)',
        voice: 'Voice (голосовой ввод)',
        medical: 'Medical (анализы)',
        food: 'Food Photos (фото еды)',
        genetics: 'Genetics (генетика)',
        mental: 'Mental (медитации)'
      };
      
      const newEntry = {
        time: new Date().toLocaleTimeString(),
        action: `Добавлен источник: ${names[type] || type}`
      };
      setLog(prev => [newEntry, ...prev].slice(0, 20));
    }
  };

  const handleQuiz = (idx, ans) => {
    setAnswers(prev => {
      const copy = [...prev];
      copy[idx] = ans;
      return copy;
    });
  };

  const next = () => {
    if (qIndex < answers.length - 1) {
      setQIndex(i => i + 1);
    } else {
      let s = 0;
      answers.forEach((a, i) => {
        if (quiz.questions && a === quiz.questions[i].correct_answer) s++;
      });
      setScore(s);
      setShowQuiz(false);
      addMessage(`Вы набрали ${s} из ${quiz.questions.length} звезд!`, false);
    }
  };

  const prev = () => {
    if (qIndex > 0) setQIndex(i => i - 1);
  };

  if (showQuiz && quiz) {
    return (
      <div className="chat-container">
        <div className="chat-header">
          <h2>Викторина: {quiz.title}</h2>
           <button onClick={() => setShowQuiz(false)} className="close-quiz" id="EL_ICON_012">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
        </div>
        <div className="quiz-container">
          <div className="quiz-question">
            <p>{quiz.questions[qIndex].question}</p>
          </div>
          <div className="quiz-options">
            {quiz.questions[qIndex].options.map((opt, i) => (
              <div
                key={i}
                className={`quiz-option ${answers[qIndex] === i ? 'selected' : ''}`}
                onClick={() => handleQuiz(qIndex, i)}
              >
                {opt}
              </div>
            ))}
          </div>
          <div className="quiz-nav">
             <button onClick={prev} disabled={qIndex === 0} className="nav-btn">
               Назад
             </button>
             <button onClick={next} disabled={answers[qIndex] === null} className="nav-btn">
               {qIndex === answers.length - 1 ? 'Завершить' : 'Далее'}
             </button>
          </div>
          {score > 0 && qIndex === answers.length - 1 && (
            <div className="quiz-result">
              <p>Ваш результат: {score} из {quiz.questions.length}</p>
              <p>Вы получили {score} звезд!</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Healora AI Ассистент</h2>
        <button
          className={`provider-toggle ${provider}`}
          onClick={toggleProvider}
          title={provider === 'gigachat' ? 'GigaChat' : 'OpenAI'}
        >
          {provider === 'gigachat' ? '⚡Giga' : '🤖GPT'}
        </button>
        <button className="chat-menu-badge" onClick={() => navigate('/diary')}>
          <span className="chat-menu-badge-num">6</span>
          <span className="chat-menu-badge-name">Дневник питания</span>
        </button>
      </div>
      
      <div className="chat-messages">
        {messages.map(m => (
          m.type === 'task' ? (
            <div key={m.id} className={`task-card ${m.completed ? 'completed' : ''}`} onClick={() => toggleTask(m.id)}>
              <div className="checkbox">{m.completed ? '✓' : ''}</div>
              <div className="content">
                <div className="title">{m.title}</div>
                <div className="points">+{m.points} звёзд</div>
                <div className="category">{m.category}</div>
              </div>
            </div>
          ) : (
            <div key={m.id} className={`message ${m.user ? 'user-message' : 'ai-message'}`}>
              <div className="message-content">
                <p>{m.text}</p>
                <small className="message-time">{m.time}</small>
              </div>
            </div>
          )
        ))}
        {loading && (
          <div className="message ai-message">
            <div className="message-content">
              <p>Думаю...</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="chat-quick-actions">
        <button className="quick-badge" onClick={() => sendQuick('Покажи задания на день')} disabled={loading}>
          📋 Задания на день
        </button>
        <button className="quick-badge" onClick={() => sendQuick('Дай совет')} disabled={loading}>
          💡 Совет
        </button>
        <button className="quick-badge" onClick={() => sendQuick('Рандомный факт о здоровье')} disabled={loading}>
          🎲 Рандом
        </button>
      </div>
      <form onSubmit={send} className="chat-form">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Напишите сообщение..."
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()}>
          {loading ? 'Отправка...' : 'Отправить'}
        </button>
      </form>
      
      <div className="chat-sidebar">
        <div className="sidebar-section">
          <h3>Источники данных</h3>
          <div className="sources-list">
            {['wearable', 'voice', 'medical', 'food', 'genetics', 'mental'].map(t => (
              <div
                key={t}
                className={`source-item ${sources.includes(t) ? 'added' : ''}`}
                onClick={() => !sources.includes(t) && addSource(t)}
              >
                <span>
                  {t === 'wearable' && 'Wearables'}
                  {t === 'voice' && 'Voice'}
                  {t === 'medical' && 'Medical'}
                  {t === 'food' && 'Food Photos'}
                  {t === 'genetics' && 'Genetics'}
                  {t === 'mental' && 'Mental'}
                </span>
                {sources.includes(t) && (
                  <span className="remove-source" onClick={(e) => {
                    e.stopPropagation();
                    // removeSource(t) if needed
                  }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </span>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="sidebar-section">
          <h3>Журнал действий</h3>
          <div className="action-log">
            {log.map((e, i) => (
              <div key={i} className="log-entry">
                <div className="time">{e.time}</div>
                <div>{e.action}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
