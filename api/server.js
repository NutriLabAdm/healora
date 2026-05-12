const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize OpenAI only if API key is available
let openai = null;
if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
} else {
    console.warn('WARNING: OPENAI_API_KEY not set. AI features will use fallback responses.');
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

        // Check for duplicate ID
        if (data.healora_test_profiles.find(p => p.profile_id === newProfile.profile_id)) {
            return res.status(400).json({ error: 'Profile ID already exists' });
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

app.post('/api/chat', async (req, res) => {
    try {
        const { message, profile } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message required' });
        }

        let profileText = '28 years, female, BMI 20.2';
        if (profile && profiles.length > 0) {
            const found = profiles.find(p => p.profile_id === profile);
            if (found) {
                profileText = `${found.demographics.age} years, ${found.demographics.sex}, BMI ${found.anthropometrics.bmi}`;
                if (found.labs) {
                    profileText += `, glucose ${found.labs.glucose_mg_dl} mg/dL, cholesterol ${found.labs.total_cholesterol_mg_dl}`;
                }
            }
        }

        let reply;

        if (openai) {
            try {
                const response = await openai.chat.completions.create({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { role: 'system', content: `You are Healora AI Coach. Profile: ${profileText}. Be positive, brief.` },
                        { role: 'user', content: message }
                    ],
                    max_tokens: 200
                });
                reply = response.choices[0].message.content.trim();
            } catch (apiError) {
                console.error('OpenAI API error:', apiError.message);
            }
        }

        if (!reply) {
            const fallbacks = {
                'water': 'Great! Drinking water is key to health. We recommend 8 glasses a day.',
                'sleep': 'Sleep is important for recovery. Try to sleep 7-9 hours a day.',
                'food': 'Nutrition is the foundation of longevity. Watch your macros and drink water.',
                'training': 'Activity extends life! Even 15 minutes of exercise helps.',
                'stress': '4-7-8 breathing will help reduce stress. Try it right now.'
            };
            reply = 'Thanks for the question! I am here to help.';
            const msg = message.toLowerCase();
            for (const [key, value] of Object.entries(fallbacks)) {
                if (msg.includes(key)) {
                    reply = value;
                    break;
                }
            }
        }

        res.json({ reply, source: openai ? 'openai' : 'fallback' });
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
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: `You are Healora AI Coach. Profile: ${profileText}. Create articles and quizzes.` },
                    { role: 'user', content: `Based on: "${text}". Create 5 articles and 5 questions each in JSON format.` }
                ],
                max_tokens: 1000
            });

            const data = JSON.parse(response.choices[0].message.content.trim());
            res.json(data);
        } catch (apiError) {
            console.error('OpenAI API error:', apiError.message);
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
            res.status(404).json({ error: 'Diary entry not found' });
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
