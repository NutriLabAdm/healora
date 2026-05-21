process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const gigachat = require('./gigachat');

dotenv.config();
dotenv.config({ path: path.join(__dirname, 'gigachat.env') });

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// AI provider config
let AI_PROVIDER = process.env.AI_PROVIDER || 'openai'; // 'openai' | 'gigachat'

// Initialize OpenAI only if API key is available
let openai = null;
if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
} else {
    console.warn('WARNING: OPENAI_API_KEY not set.');
}

// Load profiles
let profiles = [];
try {
    const profilesPath = path.join(__dirname, '../docs/healora_mvp_testing_json_pack/healora_10_synthetic_digital_twin_profiles.json');
    const data = JSON.parse(fs.readFileSync(profilesPath, 'utf8'));
    profiles = data.healora_test_profiles;
} catch (err) {
    console.error('Error loading profiles:', err.message);
}

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all profiles
app.get('/api/profiles', (req, res) => {
    try {
        const profilesPath = path.join(__dirname, '../docs/healora_mvp_testing_json_pack/healora_10_synthetic_digital_twin_profiles.json');
        const data = JSON.parse(fs.readFileSync(profilesPath, 'utf8'));
        res.json({ profiles: data.healora_test_profiles });
    } catch (err) {
        console.error('Error loading profiles:', err.message);
        res.status(500).json({ error: 'Failed to load profiles' });
    }
});

// Get specific profile
app.get('/api/profiles/:id', (req, res) => {
    try {
        const profilesPath = path.join(__dirname, '../docs/healora_mvp_testing_json_pack/healora_10_synthetic_digital_twin_profiles.json');
        const data = JSON.parse(fs.readFileSync(profilesPath, 'utf8'));
        const profile = data.healora_test_profiles.find(p => p.profile_id === req.params.id);
        if (profile) {
            res.json({ profile });
        } else {
            res.status(404).json({ error: 'Profile not found' });
        }
    } catch (err) {
        console.error('Error loading profile:', err.message);
        res.status(500).json({ error: 'Failed to load profile' });
    }
});

// Update specific profile
app.put('/api/profiles/:id', (req, res) => {
    try {
        const profilesPath = path.join(__dirname, '../docs/healora_mvp_testing_json_pack/healora_10_synthetic_digital_twin_profiles.json');
        const data = JSON.parse(fs.readFileSync(profilesPath, 'utf8'));
        const profileIndex = data.healora_test_profiles.findIndex(p => p.profile_id === req.params.id);

        if (profileIndex === -1) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        // Validate critical fields
        const updatedProfile = req.body;

        // Validate anthropometrics
        if (updatedProfile.anthropometrics) {
            if (updatedProfile.anthropometrics.bmi < 10 || updatedProfile.anthropometrics.bmi > 60) {
                return res.status(400).json({ error: 'BMI must be between 10 and 60' });
            }
            if (updatedProfile.anthropometrics.weight_kg < 20 || updatedProfile.anthropometrics.weight_kg > 300) {
                return res.status(400).json({ error: 'Weight must be between 20 and 300 kg' });
            }
        }

        // Validate vitals
        if (updatedProfile.vitals) {
            if (updatedProfile.vitals.systolic_bp_mmhg && (updatedProfile.vitals.systolic_bp_mmhg < 70 || updatedProfile.vitals.systolic_bp_mmhg > 250)) {
                return res.status(400).json({ error: 'Systolic BP must be between 70 and 250 mmHg' });
            }
            if (updatedProfile.vitals.resting_hr_bpm && (updatedProfile.vitals.resting_hr_bpm < 30 || updatedProfile.vitals.resting_hr_bpm > 220)) {
                return res.status(400).json({ error: 'Heart rate must be between 30 and 220 bpm' });
            }
        }

        // Validate labs (with warning - these are sensitive)
        if (updatedProfile.labs) {
            if (updatedProfile.labs.glucose_mg_dl && (updatedProfile.labs.glucose_mg_dl < 50 || updatedProfile.labs.glucose_mg_dl > 500)) {
                return res.status(400).json({ error: 'Glucose must be between 50 and 500 mg/dL' });
            }
        }

        // Merge updated fields
        data.healora_test_profiles[profileIndex] = {
            ...data.healora_test_profiles[profileIndex],
            ...updatedProfile,
            profile_id: req.params.id // Ensure ID cannot be changed
        };

        // Save back to file
        fs.writeFileSync(profilesPath, JSON.stringify(data, null, 2), 'utf8');

        res.json({
            success: true,
            profile: data.healora_test_profiles[profileIndex],
            message: 'Profile updated successfully'
        });
    } catch (err) {
        console.error('Error updating profile:', err.message);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

// Create new profile
app.post('/api/profiles', (req, res) => {
    try {
        const profilesPath = path.join(__dirname, '../docs/healora_mvp_testing_json_pack/healora_10_synthetic_digital_twin_profiles.json');
        const data = JSON.parse(fs.readFileSync(profilesPath, 'utf8'));

        const newProfile = req.body;

        // Validate required fields
        if (!newProfile.profile_id || !newProfile.demographics) {
            return res.status(400).json({ error: 'profile_id and demographics required' });
        }

        // Upsert: update if exists, create if new
        const existingIndex = data.healora_test_profiles.findIndex(p => p.profile_id === newProfile.profile_id);
        if (existingIndex !== -1) {
            data.healora_test_profiles[existingIndex] = newProfile;
            fs.writeFileSync(profilesPath, JSON.stringify(data, null, 2), 'utf8');
            return res.json({
                success: true,
                profile: newProfile,
                message: 'Profile updated successfully'
            });
        }

        // Add to array
        data.healora_test_profiles.push(newProfile);

        // Save back to file
        fs.writeFileSync(profilesPath, JSON.stringify(data, null, 2), 'utf8');

        res.json({
            success: true,
            profile: newProfile,
            message: 'Profile created successfully'
        });
    } catch (err) {
        console.error('Error creating profile:', err.message);
        res.status(500).json({ error: 'Failed to create profile' });
    }
});

// Delete profile
app.delete('/api/profiles/:id', (req, res) => {
    try {
        const profilesPath = path.join(__dirname, '../docs/healora_mvp_testing_json_pack/healora_10_synthetic_digital_twin_profiles.json');
        const data = JSON.parse(fs.readFileSync(profilesPath, 'utf8'));

        const profileIndex = data.healora_test_profiles.findIndex(p => p.profile_id === req.params.id);

        if (profileIndex === -1) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        // Remove from array
        data.healora_test_profiles.splice(profileIndex, 1);

        // Save back to file
        fs.writeFileSync(profilesPath, JSON.stringify(data, null, 2), 'utf8');

        res.json({
            success: true,
            message: 'Profile deleted successfully'
        });
    } catch (err) {
        console.error('Error deleting profile:', err.message);
        res.status(500).json({ error: 'Failed to delete profile' });
    }
});

// Get/set AI provider at runtime
app.get('/api/provider', (req, res) => {
    res.json({ provider: AI_PROVIDER });
});

app.post('/api/provider', (req, res) => {
    const { provider } = req.body;
    if (provider !== 'openai' && provider !== 'gigachat') {
        return res.status(400).json({ error: 'Provider must be "openai" or "gigachat"' });
    }
    AI_PROVIDER = provider;
    console.log(`AI provider switched to ${provider}`);
    res.json({ provider: AI_PROVIDER });
});

function buildSystemPrompt(found, tasks) {
    if (!found) return 'Ты — Healora AI, персональный ассистент здоровья. Отвечай на русском языке, будь краток (2-4 предложения).';
    const d = found.demographics || {};
    const a = found.anthropometrics || {};
    const v = found.vitals || {};
    const l = found.labs || {};
    const ls = found.lifestyle || {};
    const planSection = (tasks && tasks.length > 0)
      ? `\nПлан терапии на сегодня (день ${tasks[0]?.day || '?'}):
${tasks.map(t => `  ${t.done ? '✅ [ВЫПОЛНЕНО]' : t.alert ? '🔴 [ПРОПУЩЕНО]' : '⬜ [ОЖИДАЕТСЯ]'} ${t.name} (${t.code})`).join('\n')}`
      : '\nПлан терапии: данные не загружены.';
    return `Ты — Healora AI, персональный ассистент здоровья.

Информация о пользователе:
- Имя: ${d.name || 'Пользователь'}
- Возраст: ${d.age || '?'} лет
- Пол: ${d.sex === 'male' ? 'Мужской' : d.sex === 'female' ? 'Женский' : d.sex || '?'}
- Рост: ${a.height_cm || '?'} см
- Вес: ${a.weight_kg || '?'} кг
- ИМТ: ${a.bmi || '?'}
- Давление: ${v.systolic_bp_mmhg || '?'}/${v.diastolic_bp_mmhg || '?'} мм рт.ст.
- Пульс: ${v.resting_hr_bpm || '?'} уд/мин

Лабораторные показатели:
- Глюкоза: ${l.glucose_mg_dl || '?'} мг/дл
- HbA1c: ${l.hba1c_percent || '?'} %
- Холестерин общий: ${l.total_cholesterol_mg_dl || '?'} мг/дл
- HDL: ${l.hdl_mg_dl || '?'} мг/дл
- LDL: ${l.ldl_mg_dl || '?'} мг/дл
- Триглицериды: ${l.triglycerides_mg_dl || '?'} мг/дл
- Витамин D: ${l.vitamin_d_ng_ml || '?'} нг/мл
- Железо: ${l.iron_mcg_dl || '?'} мкг/дл
- Ферритин: ${l.ferritin_ng_ml || '?'} нг/мл

Образ жизни:
- Сон: ${ls.sleep_hours || '?'} ч/сут
- Стресс: ${ls.stress_level || '?'}/10
- Шаги: ${ls.steps_per_day || '?'} шагов/день
- Вода: ${ls.water_ml_per_day || '?'} мл/день
- Курение: ${ls.smoking || '?'}
- Алкоголь: ${ls.alcohol || '?'}
${planSection}
Правила:
1. Отвечай на русском языке.
2. Будь кратким (2-4 предложения).
3. Используй данные пользователя для персонализации ответов.
4. Если вопрос касается здоровья — ссылайся на показатели пользователя и план терапии.
5. Если какое-то задание из плана отмечено 🔴 [ПРОПУЩЕНО] — мягко напомни о нём и предложи выполнить.
6. Если все задания выполнены — похвали пользователя.
7. Задавай 1 уточняющий вопрос в конце каждого ответа: спроси о самочувствии, выполнении задания или потребностях на завтра.
8. Будь поддерживающим и мотивирующим.
9. НЕ ставь медицинских диагнозов — рекомендую проконсультироваться с врачом.
10. Если спрашивают про питание — предложи конкретные продукты с учётом КБЖУ.`;
}

app.post('/api/chat', async (req, res) => {
    try {
        const { message, profile, history, provider, tasks, systemPrompt } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message required' });
        }

        let found = null;
        if (profile && profiles.length > 0) {
            found = profiles.find(p => p.profile_id === profile);
        }

        const promptContent = systemPrompt || buildSystemPrompt(found, tasks);
        const systemMsg = { role: 'system', content: promptContent };
        const historyMsgs = (history || []).map(m => ({ role: m.role, content: m.content }));
        const userMsg = { role: 'user', content: message };
        const messages = [systemMsg, ...historyMsgs, userMsg];

        let reply;
        let source = 'fallback';

        const useProvider = provider || AI_PROVIDER;

        if (useProvider === 'gigachat') {
            try {
                const response = await gigachat.chatCompletion({
                    model: 'GigaChat-Max',
                    messages,
                    max_tokens: 300,
                    temperature: 0.7
                });
                reply = response.choices?.[0]?.message?.content?.trim();
                source = 'gigachat';
            } catch (apiError) {
                console.error('GigaChat API error:', apiError.message);
            }
        } else if (useProvider === 'openai' && openai) {
            try {
                const response = await openai.chat.completions.create({
                    model: 'gpt-3.5-turbo',
                    messages,
                    max_tokens: 300
                });
                reply = response.choices[0].message.content.trim();
                source = 'openai';
            } catch (apiError) {
                console.error('OpenAI API error:', apiError.message);
            }
        }

        if (!reply) {
            const fallbacks = {
                'water': 'Отличная привычка! Рекомендую выпивать 8 стаканов воды в день.',
                'sleep': 'Сон важен для восстановления. Старайтесь спать 7–9 часов в сутки.',
                'еда': 'Питание — основа долголетия. Следите за КБЖУ и пейте воду.',
                'тренировк': 'Движение продлевает жизнь! Даже 15 минут зарядки помогают.',
                'стресс': 'Дыхание 4-7-8 помогает снизить стресс. Попробуйте прямо сейчас.'
            };
            reply = 'Спасибо за ваш вопрос! Я здесь, чтобы помочь.';
            const msg = message.toLowerCase();
            for (const [key, value] of Object.entries(fallbacks)) {
                if (msg.includes(key)) {
                    reply = value;
                    break;
                }
            }
        }

        res.json({ reply, source });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/generate-quiz', async (req, res) => {
    try {
        const { text, category, profile } = req.body;

        if (!text) {
            return res.status(400).json({ error: 'Intervention text required' });
        }

        let profileText = '28 years, female, BMI 20.2';
        if (profile && profiles.length > 0) {
            const found = profiles.find(p => p.profile_id === profile);
            if (found) {
                profileText = `${found.demographics.age} years, ${found.demographics.sex}, BMI ${found.anthropometrics.bmi}`;
            }
        }

        try {
            let response;

            if (AI_PROVIDER === 'gigachat') {
                response = await gigachat.chatCompletion({
                    model: 'GigaChat-Max',
                    messages: [
                        { role: 'system', content: `You are Healora AI Coach. Profile: ${profileText}. Create articles and quizzes.` },
                        { role: 'user', content: `Based on: "${text}". Create 5 articles and 5 questions each in JSON format.` }
                    ],
                    max_tokens: 1000
                });
            } else {
                response = await openai.chat.completions.create({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { role: 'system', content: `You are Healora AI Coach. Profile: ${profileText}. Create articles and quizzes.` },
                        { role: 'user', content: `Based on: "${text}". Create 5 articles and 5 questions each in JSON format.` }
                    ],
                    max_tokens: 1000
                });
            }

            const data = JSON.parse(response.choices[0].message.content.trim());
            res.json(data);
        } catch (apiError) {
            console.error('AI API error:', apiError.message);
            res.json({
                articles: [{ title: 'Sample Article', summary: 'Description', questions: [{ q: 'Q1?', options: ['Yes', 'No'], answer: 0 }] }],
                warning: 'API unavailable'
            });
        }
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ── Diary Storage (JSON file) ──────────────────────────────────────────
const DIARY_PATH = path.join(__dirname, 'data', 'diary.json');

function loadDiary() {
    try {
        const dir = path.dirname(DIARY_PATH);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        if (!fs.existsSync(DIARY_PATH)) fs.writeFileSync(DIARY_PATH, '{}', 'utf8');
        return JSON.parse(fs.readFileSync(DIARY_PATH, 'utf8'));
    } catch (e) {
        return {};
    }
}

function saveDiary(data) {
    const dir = path.dirname(DIARY_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DIARY_PATH, JSON.stringify(data, null, 2), 'utf8');
}

// POST /api/diary – upsert a diary entry
app.post('/api/diary', (req, res) => {
    try {
        const { profile_id, day, meals, water_ml, mood, voice_note, audio, comment } = req.body;

        if (!profile_id || day === undefined || day === null) {
            return res.status(400).json({ error: 'profile_id and day are required' });
        }

        const diary = loadDiary();
        const key = `${profile_id}_${day}`;

        const entry = {
            profile_id,
            day,
            meals: meals || [],
            water_ml: water_ml || 0,
            mood: mood || {},
            voice_note: voice_note || null,
            audio: audio || null,
            comment: comment || null,
            updated_at: new Date().toISOString(),
        };

        if (diary[key]) {
            diary[key] = { ...diary[key], ...entry };
        } else {
            entry.created_at = new Date().toISOString();
            diary[key] = entry;
        }

        saveDiary(diary);
        res.json({ status: 'ok' });
    } catch (err) {
        console.error('Error saving diary:', err.message);
        res.status(500).json({ error: 'Failed to save diary entry' });
    }
});

// GET /api/diary/:profile_id/:day – load diary for a given day
app.get('/api/diary/:profile_id/:day', (req, res) => {
    try {
        const { profile_id, day } = req.params;
        const diary = loadDiary();
        const key = `${profile_id}_${day}`;

        if (diary[key]) {
            res.json(diary[key]);
        } else {
            res.json({ profile_id, day: parseInt(day), meals: [], water_ml: 0, mood: {}, voice_note: null, audio: null, comment: null });
        }
    } catch (err) {
        console.error('Error loading diary:', err.message);
        res.status(500).json({ error: 'Failed to load diary entry' });
    }
});

const PORT = process.env.PORT || 3051;
app.listen(PORT, () => {
    console.log(`Healora API running on port ${PORT}`);
});
