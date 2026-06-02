export interface User {
  user_id: string;
  email: string;
  created_at: string;
  last_login: string;
}

export interface Demographics {
  name?: string;
  age?: number;
  sex?: 'male' | 'female';
  ethnicity?: string;
}

export interface Anthropometrics {
  height_cm?: number;
  weight_kg?: number;
  bmi?: number;
  waist_cm?: number;
}

export interface Vitals {
  systolic_bp_mmhg?: number;
  diastolic_bp_mmhg?: number;
  resting_hr_bpm?: number;
  hrv_ms?: number;
  spo2_percent?: number;
}

export interface Labs {
  glucose_mg_dl?: number;
  hba1c_percent?: number;
  total_cholesterol_mg_dl?: number;
  hdl_mg_dl?: number;
  ldl_mg_dl?: number;
  triglycerides_mg_dl?: number;
  vitamin_d_ng_ml?: number;
  iron_mcg_dl?: number;
  ferritin_ng_ml?: number;
}

export interface Lifestyle {
  sleep_hours?: number;
  stress_level?: number;
  steps_per_day?: number;
  water_ml_per_day?: number;
  smoking?: string;
  alcohol?: string;
  activity_level?: string;
  diet_type?: string;
}

export interface Genetics {
  apoe?: string;
  mthfr?: string;
  lactase?: string;
  brca?: string;
}

export interface MedicalHistory {
  medications?: string[];
  allergies?: string[];
  family_history?: string[];
  conditions?: string[];
}

export interface DigitalTwinScores {
  current_stars?: number;
  total_stars?: number;
  healora_score?: number;
  health_literacy_score?: number;
}

export interface Profile {
  profile_id: string;
  photo?: string;
  demographics: Demographics;
  anthropometrics: Anthropometrics;
  vitals: Vitals;
  labs: Labs;
  lifestyle: Lifestyle;
  genetics: Genetics;
  medical_history: MedicalHistory;
  digital_twin_scores?: DigitalTwinScores;
}

export interface Intervention {
  id: string;
  day: number;
  date: string;
  code: string;
  type: string;
  scheduled_time: string;
  params: Record<string, unknown>;
  status: 'pending' | 'done' | 'skipped' | 'modified' | 'rescheduled' | 'cancelled';
  result: string | null;
  completed_at: string | null;
  comment: string | null;
}

export interface Plan {
  plan_id: string;
  profile_id: string;
  protocol_id: string;
  title: string;
  status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';
  created_at: string;
  source: 'engine' | 'hitl';
  approved_by: string | null;
  schedule: Intervention[];
  computed: {
    progress_pct: number;
    done_count: number;
    total_count: number;
    streak_days: number;
    missed_streak: number;
    next_intervention: string | null;
  };
  changelog: Array<{ at: string; action: string; by: string }>;
}

export interface DiaryMeal {
  name: string;
  photo?: string;
  calories?: number;
  protein?: number;
  fat?: number;
  carbs?: number;
  time?: string;
}

export interface DiaryEntry {
  profile_id: string;
  day: number;
  meals: DiaryMeal[];
  water_ml: number;
  mood: Record<string, number>;
  voice_note: string | null;
  audio: string | null;
  comment: string | null;
}

export interface Protocol {
  protocol_id: string;
  name: string;
  category: string;
  goal: string;
  intervention_count: number;
}
