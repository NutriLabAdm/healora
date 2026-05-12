import json
import sqlite3
from datetime import date
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI(title="Healora Diary API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001", "http://127.0.0.1:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_DIR = Path(__file__).parent / "data"
DB_DIR.mkdir(parents=True, exist_ok=True)
DB_PATH = DB_DIR / "diary.db"

# Serve profile images from docs/images/pers
PERS_DIR = Path(__file__).resolve().parent.parent.parent.parent / "docs" / "images" / "pers"
if PERS_DIR.exists():
    app.mount("/images/pers", StaticFiles(directory=str(PERS_DIR)), name="pers")


def get_db():
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS diary (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            profile_id TEXT NOT NULL,
            day INTEGER NOT NULL,
            date TEXT NOT NULL DEFAULT (date('now')),
            meals TEXT NOT NULL DEFAULT '[]',
            water_ml REAL NOT NULL DEFAULT 0,
            mood TEXT NOT NULL DEFAULT '{}',
            voice_note TEXT,
            audio TEXT,
            comment TEXT,
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            updated_at TEXT NOT NULL DEFAULT (datetime('now')),
            UNIQUE(profile_id, day)
        )
    """)
    conn.commit()
    conn.close()


class Meal(BaseModel):
    type: str | None = None
    photo: str | None = None
    description: str | None = None
    time: str | None = None
    duration: int | None = None
    calories: int | None = None
    protein: int | None = None
    fat: int | None = None
    carbs: int | None = None
    ndi: float | None = None
    recommendations: str | None = None


class DiaryPayload(BaseModel):
    profile_id: str
    day: int
    meals: list[Meal] = []
    water_ml: float = 0
    mood: dict = {}
    voice_note: str | None = None
    audio: str | None = None
    comment: str | None = None


# ── Profiles data ──────────────────────────────────────────
# reload-trigger: 1

PROFILES = [
    {
        "profile_id": "P001",
        "name": "Maia",
        "photo": "01_Maia_55_flowers.png",
        "demographics": {"sex": "female", "age": 55, "ethnicity_or_background": "европеоидная"},
        "anthropometrics": {"weight_kg": 65, "height_cm": 165, "bmi": 23.9, "waist_cm": 78},
        "vitals": {"systolic_bp_mmhg": 128, "diastolic_bp_mmhg": 82, "resting_hr_bpm": 72, "hrv_ms": 45, "spo2_percent": 97},
        "labs": {"glucose_mg_dl": 98, "total_cholesterol_mg_dl": 210, "vitamin_d": 22, "ferritin": 90, "tsh": 2.5},
        "lifestyle": {"sleep_hours": 7, "stress_level_0_10": 4, "daily_steps": 6000, "water_l_day": 1.5, "physical_activity": "2-3/нед"},
        "digital_twin_scores": {"current_stars": 620, "health_risk_score": 32, "risk_level": "medium"},
    },
    {
        "profile_id": "P002",
        "name": "Stepan",
        "photo": "02_Stepan_14_on_bench.png",
        "demographics": {"sex": "male", "age": 14, "ethnicity_or_background": "европеоидная"},
        "anthropometrics": {"weight_kg": 52, "height_cm": 165, "bmi": 19.1, "waist_cm": 68},
        "vitals": {"systolic_bp_mmhg": 110, "diastolic_bp_mmhg": 70, "resting_hr_bpm": 75, "hrv_ms": 60, "spo2_percent": 99},
        "labs": {"glucose_mg_dl": 85, "total_cholesterol_mg_dl": 150, "vitamin_d": 28, "ferritin": 55, "tsh": 2.0},
        "lifestyle": {"sleep_hours": 8.5, "stress_level_0_10": 3, "daily_steps": 9000, "water_l_day": 1.2, "physical_activity": "5-7/нед"},
        "digital_twin_scores": {"current_stars": 920, "health_risk_score": 12, "risk_level": "low"},
    },
    {
        "profile_id": "TEST_001",
        "name": "Анна",
        "photo": "03_Natalia_42_salad.png",
        "demographics": {"sex": "female", "age": 28, "ethnicity_or_background": "европеоидная"},
        "anthropometrics": {"weight_kg": 58, "height_cm": 168, "bmi": 20.2, "waist_cm": 72},
        "vitals": {"systolic_bp_mmhg": 105, "diastolic_bp_mmhg": 68, "resting_hr_bpm": 64, "hrv_ms": 72, "spo2_percent": 98},
        "labs": {"glucose_mg_dl": 88, "total_cholesterol_mg_dl": 175, "vitamin_d": 32, "ferritin": 65, "tsh": 2.1},
        "lifestyle": {"sleep_hours": 7.5, "stress_level_0_10": 3, "daily_steps": 8200, "water_l_day": 1.8, "physical_activity": "3-5/нед"},
        "digital_twin_scores": {"current_stars": 840, "health_risk_score": 18, "risk_level": "low"},
    },
    {
        "profile_id": "P004",
        "name": "Нина",
        "photo": "04_Nina_75_Oleg_27_notebook.png",
        "demographics": {"sex": "female", "age": 75, "ethnicity_or_background": "европеоидная"},
        "anthropometrics": {"weight_kg": 70, "height_cm": 162, "bmi": 26.7, "waist_cm": 88},
        "vitals": {"systolic_bp_mmhg": 145, "diastolic_bp_mmhg": 85, "resting_hr_bpm": 76, "hrv_ms": 30, "spo2_percent": 95},
        "labs": {"glucose_mg_dl": 108, "total_cholesterol_mg_dl": 230, "vitamin_d": 15, "ferritin": 110, "tsh": 3.2},
        "lifestyle": {"sleep_hours": 6.5, "stress_level_0_10": 4, "daily_steps": 4000, "water_l_day": 1.3, "physical_activity": "1-2/нед"},
        "digital_twin_scores": {"current_stars": 380, "health_risk_score": 48, "risk_level": "high"},
    },
    {
        "profile_id": "P005",
        "name": "Дмитрий",
        "photo": "05_Дмитрий_55_notepad.png",
        "demographics": {"sex": "male", "age": 55, "ethnicity_or_background": "европеоидная"},
        "anthropometrics": {"weight_kg": 88, "height_cm": 178, "bmi": 27.8, "waist_cm": 98},
        "vitals": {"systolic_bp_mmhg": 135, "diastolic_bp_mmhg": 88, "resting_hr_bpm": 72, "hrv_ms": 35, "spo2_percent": 96},
        "labs": {"glucose_mg_dl": 105, "total_cholesterol_mg_dl": 220, "vitamin_d": 20, "ferritin": 130, "tsh": 2.8},
        "lifestyle": {"sleep_hours": 6.5, "stress_level_0_10": 6, "daily_steps": 5000, "water_l_day": 1.4, "physical_activity": "1-2/нед"},
        "digital_twin_scores": {"current_stars": 450, "health_risk_score": 42, "risk_level": "medium"},
    },
    {
        "profile_id": "P006",
        "name": "Мария",
        "photo": "06_Maria_43_kitchen_apron.png",
        "demographics": {"sex": "female", "age": 43, "ethnicity_or_background": "европеоидная"},
        "anthropometrics": {"weight_kg": 62, "height_cm": 166, "bmi": 22.5, "waist_cm": 74},
        "vitals": {"systolic_bp_mmhg": 118, "diastolic_bp_mmhg": 76, "resting_hr_bpm": 68, "hrv_ms": 52, "spo2_percent": 98},
        "labs": {"glucose_mg_dl": 92, "total_cholesterol_mg_dl": 190, "vitamin_d": 26, "ferritin": 72, "tsh": 2.3},
        "lifestyle": {"sleep_hours": 7.2, "stress_level_0_10": 4, "daily_steps": 7000, "water_l_day": 1.6, "physical_activity": "2-3/нед"},
        "digital_twin_scores": {"current_stars": 710, "health_risk_score": 24, "risk_level": "low"},
    },
    {
        "profile_id": "P007",
        "name": "Иван",
        "photo": "07_Ivan_13_chips.png",
        "demographics": {"sex": "male", "age": 13, "ethnicity_or_background": "европеоидная"},
        "anthropometrics": {"weight_kg": 48, "height_cm": 158, "bmi": 19.2, "waist_cm": 65},
        "vitals": {"systolic_bp_mmhg": 108, "diastolic_bp_mmhg": 68, "resting_hr_bpm": 78, "hrv_ms": 58, "spo2_percent": 99},
        "labs": {"glucose_mg_dl": 82, "total_cholesterol_mg_dl": 140, "vitamin_d": 30, "ferritin": 50, "tsh": 1.9},
        "lifestyle": {"sleep_hours": 9, "stress_level_0_10": 2, "daily_steps": 10000, "water_l_day": 1.0, "physical_activity": "5-7/нед"},
        "digital_twin_scores": {"current_stars": 950, "health_risk_score": 10, "risk_level": "low"},
    },
    {
        "profile_id": "P008",
        "name": "Галина",
        "photo": "08_Galina_75_Vika_9_balcony.png",
        "demographics": {"sex": "female", "age": 75, "ethnicity_or_background": "европеоидная"},
        "anthropometrics": {"weight_kg": 68, "height_cm": 160, "bmi": 26.6, "waist_cm": 86},
        "vitals": {"systolic_bp_mmhg": 148, "diastolic_bp_mmhg": 88, "resting_hr_bpm": 74, "hrv_ms": 28, "spo2_percent": 94},
        "labs": {"glucose_mg_dl": 110, "total_cholesterol_mg_dl": 235, "vitamin_d": 14, "ferritin": 105, "tsh": 3.5},
        "lifestyle": {"sleep_hours": 6, "stress_level_0_10": 3, "daily_steps": 3500, "water_l_day": 1.2, "physical_activity": "1/нед"},
        "digital_twin_scores": {"current_stars": 320, "health_risk_score": 55, "risk_level": "high"},
    },
    {
        "profile_id": "P009",
        "name": "Таня",
        "photo": "09_Tanya_15_pasta.png",
        "demographics": {"sex": "female", "age": 15, "ethnicity_or_background": "европеоидная"},
        "anthropometrics": {"weight_kg": 54, "height_cm": 163, "bmi": 20.3, "waist_cm": 70},
        "vitals": {"systolic_bp_mmhg": 108, "diastolic_bp_mmhg": 68, "resting_hr_bpm": 74, "hrv_ms": 62, "spo2_percent": 99},
        "labs": {"glucose_mg_dl": 84, "total_cholesterol_mg_dl": 155, "vitamin_d": 26, "ferritin": 52, "tsh": 2.0},
        "lifestyle": {"sleep_hours": 8, "stress_level_0_10": 4, "daily_steps": 7500, "water_l_day": 1.1, "physical_activity": "3-4/нед"},
        "digital_twin_scores": {"current_stars": 880, "health_risk_score": 14, "risk_level": "low"},
    },
    {
        "profile_id": "TEST_002",
        "name": "Михаил",
        "photo": "10_Alex_48_soup.png",
        "demographics": {"sex": "male", "age": 42, "ethnicity_or_background": "европеоидная"},
        "anthropometrics": {"weight_kg": 96, "height_cm": 182, "bmi": 31.2, "waist_cm": 104},
        "vitals": {"systolic_bp_mmhg": 142, "diastolic_bp_mmhg": 91, "resting_hr_bpm": 78, "hrv_ms": 38, "spo2_percent": 96},
        "labs": {"glucose_mg_dl": 112, "total_cholesterol_mg_dl": 245, "vitamin_d": 18, "ferritin": 140, "tsh": 3.8},
        "lifestyle": {"sleep_hours": 6, "stress_level_0_10": 7, "daily_steps": 4200, "water_l_day": 1.2, "physical_activity": "0-1/нед"},
        "digital_twin_scores": {"current_stars": 210, "health_risk_score": 52, "risk_level": "high"},
    },
    {
        "profile_id": "P011",
        "name": "Николай",
        "photo": "11_Nilolay_23_chocolate_bar.png",
        "demographics": {"sex": "male", "age": 23, "ethnicity_or_background": "европеоидная"},
        "anthropometrics": {"weight_kg": 78, "height_cm": 180, "bmi": 24.1, "waist_cm": 84},
        "vitals": {"systolic_bp_mmhg": 122, "diastolic_bp_mmhg": 78, "resting_hr_bpm": 68, "hrv_ms": 48, "spo2_percent": 98},
        "labs": {"glucose_mg_dl": 95, "total_cholesterol_mg_dl": 185, "vitamin_d": 24, "ferritin": 95, "tsh": 2.4},
        "lifestyle": {"sleep_hours": 7, "stress_level_0_10": 5, "daily_steps": 5500, "water_l_day": 1.3, "physical_activity": "2-3/нед"},
        "digital_twin_scores": {"current_stars": 560, "health_risk_score": 34, "risk_level": "medium"},
    },
    {
        "profile_id": "P012",
        "name": "Галина",
        "photo": "12_Galina_43_remote_work.png",
        "demographics": {"sex": "female", "age": 43, "ethnicity_or_background": "европеоидная"},
        "anthropometrics": {"weight_kg": 66, "height_cm": 167, "bmi": 23.7, "waist_cm": 76},
        "vitals": {"systolic_bp_mmhg": 120, "diastolic_bp_mmhg": 78, "resting_hr_bpm": 70, "hrv_ms": 50, "spo2_percent": 98},
        "labs": {"glucose_mg_dl": 94, "total_cholesterol_mg_dl": 195, "vitamin_d": 28, "ferritin": 78, "tsh": 2.2},
        "lifestyle": {"sleep_hours": 7.5, "stress_level_0_10": 6, "daily_steps": 3000, "water_l_day": 1.5, "physical_activity": "1-2/нед"},
        "digital_twin_scores": {"current_stars": 490, "health_risk_score": 36, "risk_level": "medium"},
    },
    {
        "profile_id": "P014",
        "name": "Екатерина",
        "photo": "14_Ekaterina_39_wearable.png",
        "demographics": {"sex": "female", "age": 39, "ethnicity_or_background": "европеоидная"},
        "anthropometrics": {"weight_kg": 60, "height_cm": 170, "bmi": 20.8, "waist_cm": 72},
        "vitals": {"systolic_bp_mmhg": 115, "diastolic_bp_mmhg": 74, "resting_hr_bpm": 66, "hrv_ms": 58, "spo2_percent": 98},
        "labs": {"glucose_mg_dl": 90, "total_cholesterol_mg_dl": 180, "vitamin_d": 30, "ferritin": 70, "tsh": 2.2},
        "lifestyle": {"sleep_hours": 7.8, "stress_level_0_10": 4, "daily_steps": 8000, "water_l_day": 1.7, "physical_activity": "3-4/нед"},
        "digital_twin_scores": {"current_stars": 780, "health_risk_score": 22, "risk_level": "low"},
    },
    {
        "profile_id": "P015",
        "name": "Полина",
        "photo": "15_Polina_21_coffie.png",
        "demographics": {"sex": "female", "age": 21, "ethnicity_or_background": "европеоидная"},
        "anthropometrics": {"weight_kg": 56, "height_cm": 168, "bmi": 19.8, "waist_cm": 70},
        "vitals": {"systolic_bp_mmhg": 108, "diastolic_bp_mmhg": 70, "resting_hr_bpm": 72, "hrv_ms": 64, "spo2_percent": 99},
        "labs": {"glucose_mg_dl": 86, "total_cholesterol_mg_dl": 160, "vitamin_d": 34, "ferritin": 60, "tsh": 1.8},
        "lifestyle": {"sleep_hours": 8, "stress_level_0_10": 4, "daily_steps": 6500, "water_l_day": 1.4, "physical_activity": "2-3/нед"},
        "digital_twin_scores": {"current_stars": 860, "health_risk_score": 16, "risk_level": "low"},
    },
    {
        "profile_id": "TEST_003",
        "name": "Елена",
        "photo": "16_Anastasia_37_street.png",
        "demographics": {"sex": "female", "age": 34, "ethnicity_or_background": "европеоидная"},
        "anthropometrics": {"weight_kg": 64, "height_cm": 170, "bmi": 22.1, "waist_cm": 76},
        "vitals": {"systolic_bp_mmhg": 118, "diastolic_bp_mmhg": 76, "resting_hr_bpm": 70, "hrv_ms": 55, "spo2_percent": 98},
        "labs": {"glucose_mg_dl": 95, "total_cholesterol_mg_dl": 200, "vitamin_d": 24, "ferritin": 80, "tsh": 2.8},
        "lifestyle": {"sleep_hours": 7, "stress_level_0_10": 5, "daily_steps": 6500, "water_l_day": 1.5, "physical_activity": "2-3/нед"},
        "digital_twin_scores": {"current_stars": 650, "health_risk_score": 28, "risk_level": "medium"},
    },
    {
        "profile_id": "P017",
        "name": "Степан",
        "photo": "17_Stepan_72_terier.png",
        "demographics": {"sex": "male", "age": 72, "ethnicity_or_background": "европеоидная"},
        "anthropometrics": {"weight_kg": 82, "height_cm": 175, "bmi": 26.8, "waist_cm": 96},
        "vitals": {"systolic_bp_mmhg": 140, "diastolic_bp_mmhg": 84, "resting_hr_bpm": 70, "hrv_ms": 32, "spo2_percent": 95},
        "labs": {"glucose_mg_dl": 106, "total_cholesterol_mg_dl": 215, "vitamin_d": 18, "ferritin": 120, "tsh": 3.0},
        "lifestyle": {"sleep_hours": 7, "stress_level_0_10": 3, "daily_steps": 5000, "water_l_day": 1.5, "physical_activity": "2/нед"},
        "digital_twin_scores": {"current_stars": 420, "health_risk_score": 44, "risk_level": "medium"},
    },
    {
        "profile_id": "P017b",
        "name": "Степан (2)",
        "photo": "17_Stepan_72_terier_2.png",
        "demographics": {"sex": "male", "age": 72, "ethnicity_or_background": "европеоидная"},
        "anthropometrics": {"weight_kg": 80, "height_cm": 175, "bmi": 26.1, "waist_cm": 94},
        "vitals": {"systolic_bp_mmhg": 138, "diastolic_bp_mmhg": 82, "resting_hr_bpm": 68, "hrv_ms": 34, "spo2_percent": 96},
        "labs": {"glucose_mg_dl": 104, "total_cholesterol_mg_dl": 210, "vitamin_d": 20, "ferritin": 115, "tsh": 2.9},
        "lifestyle": {"sleep_hours": 7.2, "stress_level_0_10": 3, "daily_steps": 4800, "water_l_day": 1.4, "physical_activity": "2/нед"},
        "digital_twin_scores": {"current_stars": 440, "health_risk_score": 42, "risk_level": "medium"},
    },
    {
        "profile_id": "P019a",
        "name": "Данил",
        "photo": "19_Danil_29_sofa_blue_jeanse.png",
        "demographics": {"sex": "male", "age": 29, "ethnicity_or_background": "европеоидная"},
        "anthropometrics": {"weight_kg": 76, "height_cm": 178, "bmi": 24.0, "waist_cm": 82},
        "vitals": {"systolic_bp_mmhg": 120, "diastolic_bp_mmhg": 76, "resting_hr_bpm": 66, "hrv_ms": 50, "spo2_percent": 98},
        "labs": {"glucose_mg_dl": 92, "total_cholesterol_mg_dl": 180, "vitamin_d": 26, "ferritin": 88, "tsh": 2.4},
        "lifestyle": {"sleep_hours": 7, "stress_level_0_10": 5, "daily_steps": 4500, "water_l_day": 1.2, "physical_activity": "1-2/нед"},
        "digital_twin_scores": {"current_stars": 520, "health_risk_score": 36, "risk_level": "medium"},
    },
    {
        "profile_id": "P019b",
        "name": "Стас",
        "photo": "19_Stas_35_dog_bike.png",
        "demographics": {"sex": "male", "age": 35, "ethnicity_or_background": "европеоидная"},
        "anthropometrics": {"weight_kg": 82, "height_cm": 182, "bmi": 24.8, "waist_cm": 86},
        "vitals": {"systolic_bp_mmhg": 125, "diastolic_bp_mmhg": 80, "resting_hr_bpm": 64, "hrv_ms": 46, "spo2_percent": 98},
        "labs": {"glucose_mg_dl": 94, "total_cholesterol_mg_dl": 195, "vitamin_d": 28, "ferritin": 92, "tsh": 2.2},
        "lifestyle": {"sleep_hours": 7.5, "stress_level_0_10": 4, "daily_steps": 7500, "water_l_day": 1.6, "physical_activity": "3-4/нед"},
        "digital_twin_scores": {"current_stars": 680, "health_risk_score": 28, "risk_level": "low"},
    },
    {
        "profile_id": "P020",
        "name": "Ирина",
        "photo": "20_Irina_31_box_openspace.png",
        "demographics": {"sex": "female", "age": 31, "ethnicity_or_background": "европеоидная"},
        "anthropometrics": {"weight_kg": 59, "height_cm": 167, "bmi": 21.2, "waist_cm": 72},
        "vitals": {"systolic_bp_mmhg": 112, "diastolic_bp_mmhg": 72, "resting_hr_bpm": 68, "hrv_ms": 60, "spo2_percent": 98},
        "labs": {"glucose_mg_dl": 88, "total_cholesterol_mg_dl": 170, "vitamin_d": 30, "ferritin": 68, "tsh": 2.0},
        "lifestyle": {"sleep_hours": 7, "stress_level_0_10": 6, "daily_steps": 5000, "water_l_day": 1.4, "physical_activity": "2/нед"},
        "digital_twin_scores": {"current_stars": 600, "health_risk_score": 30, "risk_level": "medium"},
    },
    {
        "profile_id": "P021",
        "name": "Юлия",
        "photo": "21_Yulia_35_coffie_white_blouse.png",
        "demographics": {"sex": "female", "age": 35, "ethnicity_or_background": "европеоидная"},
        "anthropometrics": {"weight_kg": 61, "height_cm": 169, "bmi": 21.4, "waist_cm": 73},
        "vitals": {"systolic_bp_mmhg": 114, "diastolic_bp_mmhg": 74, "resting_hr_bpm": 70, "hrv_ms": 56, "spo2_percent": 98},
        "labs": {"glucose_mg_dl": 90, "total_cholesterol_mg_dl": 185, "vitamin_d": 28, "ferritin": 74, "tsh": 2.3},
        "lifestyle": {"sleep_hours": 7.2, "stress_level_0_10": 5, "daily_steps": 6200, "water_l_day": 1.5, "physical_activity": "2-3/нед"},
        "digital_twin_scores": {"current_stars": 640, "health_risk_score": 26, "risk_level": "low"},
    },
    {
        "profile_id": "P022",
        "name": "Варя",
        "photo": "22_Varya_30_yoga.png",
        "demographics": {"sex": "female", "age": 30, "ethnicity_or_background": "европеоидная"},
        "anthropometrics": {"weight_kg": 57, "height_cm": 168, "bmi": 20.2, "waist_cm": 71},
        "vitals": {"systolic_bp_mmhg": 110, "diastolic_bp_mmhg": 70, "resting_hr_bpm": 62, "hrv_ms": 68, "spo2_percent": 99},
        "labs": {"glucose_mg_dl": 86, "total_cholesterol_mg_dl": 165, "vitamin_d": 35, "ferritin": 62, "tsh": 1.9},
        "lifestyle": {"sleep_hours": 8, "stress_level_0_10": 3, "daily_steps": 8500, "water_l_day": 1.8, "physical_activity": "4-5/нед"},
        "digital_twin_scores": {"current_stars": 900, "health_risk_score": 14, "risk_level": "low"},
    },
    {
        "profile_id": "P023a",
        "name": "Алина",
        "photo": "23_Alina_26_baby_carriage_park.png",
        "demographics": {"sex": "female", "age": 26, "ethnicity_or_background": "европеоидная"},
        "anthropometrics": {"weight_kg": 60, "height_cm": 166, "bmi": 21.8, "waist_cm": 74},
        "vitals": {"systolic_bp_mmhg": 115, "diastolic_bp_mmhg": 74, "resting_hr_bpm": 72, "hrv_ms": 54, "spo2_percent": 98},
        "labs": {"glucose_mg_dl": 90, "total_cholesterol_mg_dl": 178, "vitamin_d": 26, "ferritin": 70, "tsh": 2.2},
        "lifestyle": {"sleep_hours": 6.5, "stress_level_0_10": 6, "daily_steps": 5500, "water_l_day": 1.3, "physical_activity": "1-2/нед"},
        "digital_twin_scores": {"current_stars": 480, "health_risk_score": 38, "risk_level": "medium"},
    },
    {
        "profile_id": "P023b",
        "name": "Кен",
        "photo": "23_Ken_38_vegitables.png",
        "demographics": {"sex": "male", "age": 38, "ethnicity_or_background": "азиатская"},
        "anthropometrics": {"weight_kg": 74, "height_cm": 176, "bmi": 23.9, "waist_cm": 82},
        "vitals": {"systolic_bp_mmhg": 122, "diastolic_bp_mmhg": 78, "resting_hr_bpm": 66, "hrv_ms": 48, "spo2_percent": 98},
        "labs": {"glucose_mg_dl": 94, "total_cholesterol_mg_dl": 190, "vitamin_d": 22, "ferritin": 85, "tsh": 2.4},
        "lifestyle": {"sleep_hours": 7, "stress_level_0_10": 5, "daily_steps": 7000, "water_l_day": 1.6, "physical_activity": "3/нед"},
        "digital_twin_scores": {"current_stars": 580, "health_risk_score": 32, "risk_level": "medium"},
    },
    {
        "profile_id": "P024a",
        "name": "Алла",
        "photo": "24_Alla_38_mirror.png",
        "demographics": {"sex": "female", "age": 38, "ethnicity_or_background": "европеоидная"},
        "anthropometrics": {"weight_kg": 63, "height_cm": 168, "bmi": 22.3, "waist_cm": 75},
        "vitals": {"systolic_bp_mmhg": 116, "diastolic_bp_mmhg": 75, "resting_hr_bpm": 68, "hrv_ms": 54, "spo2_percent": 98},
        "labs": {"glucose_mg_dl": 92, "total_cholesterol_mg_dl": 188, "vitamin_d": 28, "ferritin": 76, "tsh": 2.1},
        "lifestyle": {"sleep_hours": 7.5, "stress_level_0_10": 4, "daily_steps": 6800, "water_l_day": 1.6, "physical_activity": "3/нед"},
        "digital_twin_scores": {"current_stars": 670, "health_risk_score": 26, "risk_level": "low"},
    },
    {
        "profile_id": "P024b",
        "name": "Маша",
        "photo": "24_Masha_Andrey_caffe.png",
        "demographics": {"sex": "female", "age": 28, "ethnicity_or_background": "европеоидная"},
        "anthropometrics": {"weight_kg": 58, "height_cm": 166, "bmi": 21.0, "waist_cm": 72},
        "vitals": {"systolic_bp_mmhg": 112, "diastolic_bp_mmhg": 72, "resting_hr_bpm": 70, "hrv_ms": 60, "spo2_percent": 98},
        "labs": {"glucose_mg_dl": 88, "total_cholesterol_mg_dl": 170, "vitamin_d": 32, "ferritin": 65, "tsh": 2.0},
        "lifestyle": {"sleep_hours": 7, "stress_level_0_10": 5, "daily_steps": 6000, "water_l_day": 1.4, "physical_activity": "2/нед"},
        "digital_twin_scores": {"current_stars": 620, "health_risk_score": 28, "risk_level": "low"},
    },
    {
        "profile_id": "P024c",
        "name": "Семья",
        "photo": "24_fam_white_kitchen.png",
        "demographics": {"sex": "female", "age": 35, "ethnicity_or_background": "европеоидная"},
        "anthropometrics": {"weight_kg": 62, "height_cm": 167, "bmi": 22.2, "waist_cm": 74},
        "vitals": {"systolic_bp_mmhg": 118, "diastolic_bp_mmhg": 76, "resting_hr_bpm": 68, "hrv_ms": 52, "spo2_percent": 98},
        "labs": {"glucose_mg_dl": 91, "total_cholesterol_mg_dl": 185, "vitamin_d": 26, "ferritin": 72, "tsh": 2.3},
        "lifestyle": {"sleep_hours": 7, "stress_level_0_10": 5, "daily_steps": 5800, "water_l_day": 1.5, "physical_activity": "2/нед"},
        "digital_twin_scores": {"current_stars": 590, "health_risk_score": 30, "risk_level": "medium"},
    },
    {
        "profile_id": "P025",
        "name": "Катя",
        "photo": "25_Katya_29_office.png",
        "demographics": {"sex": "female", "age": 29, "ethnicity_or_background": "европеоидная"},
        "anthropometrics": {"weight_kg": 59, "height_cm": 169, "bmi": 20.7, "waist_cm": 71},
        "vitals": {"systolic_bp_mmhg": 110, "diastolic_bp_mmhg": 70, "resting_hr_bpm": 66, "hrv_ms": 62, "spo2_percent": 99},
        "labs": {"glucose_mg_dl": 87, "total_cholesterol_mg_dl": 168, "vitamin_d": 34, "ferritin": 64, "tsh": 2.0},
        "lifestyle": {"sleep_hours": 7.5, "stress_level_0_10": 5, "daily_steps": 4500, "water_l_day": 1.3, "physical_activity": "1-2/нед"},
        "digital_twin_scores": {"current_stars": 640, "health_risk_score": 24, "risk_level": "low"},
    },
    {
        "profile_id": "P026",
        "name": "Алекс и Регина",
        "photo": "26_Alex_Regina_desert.png",
        "demographics": {"sex": "male", "age": 32, "ethnicity_or_background": "европеоидная"},
        "anthropometrics": {"weight_kg": 80, "height_cm": 180, "bmi": 24.7, "waist_cm": 84},
        "vitals": {"systolic_bp_mmhg": 124, "diastolic_bp_mmhg": 80, "resting_hr_bpm": 66, "hrv_ms": 46, "spo2_percent": 98},
        "labs": {"glucose_mg_dl": 94, "total_cholesterol_mg_dl": 190, "vitamin_d": 24, "ferritin": 90, "tsh": 2.4},
        "lifestyle": {"sleep_hours": 7, "stress_level_0_10": 5, "daily_steps": 6500, "water_l_day": 1.5, "physical_activity": "2-3/нед"},
        "digital_twin_scores": {"current_stars": 560, "health_risk_score": 34, "risk_level": "medium"},
    },
    {
        "profile_id": "P029",
        "name": "Семья в кино",
        "photo": "29_cinema_family.png",
        "demographics": {"sex": "female", "age": 38, "ethnicity_or_background": "европеоидная"},
        "anthropometrics": {"weight_kg": 64, "height_cm": 168, "bmi": 22.7, "waist_cm": 76},
        "vitals": {"systolic_bp_mmhg": 118, "diastolic_bp_mmhg": 76, "resting_hr_bpm": 70, "hrv_ms": 50, "spo2_percent": 98},
        "labs": {"glucose_mg_dl": 92, "total_cholesterol_mg_dl": 188, "vitamin_d": 26, "ferritin": 74, "tsh": 2.2},
        "lifestyle": {"sleep_hours": 7, "stress_level_0_10": 5, "daily_steps": 5500, "water_l_day": 1.4, "physical_activity": "2/нед"},
        "digital_twin_scores": {"current_stars": 540, "health_risk_score": 34, "risk_level": "medium"},
    },
]


@app.on_event("startup")
def startup():
    init_db()


@app.get("/api/profiles")
def list_profiles():
    return {"profiles": PROFILES}


@app.get("/api/profiles/{profile_id}")
def get_profile(profile_id: str):
    for p in PROFILES:
        if p["profile_id"] == profile_id:
            return {"profile": p}
    raise HTTPException(status_code=404, detail="Profile not found")


@app.get("/api/diary/{profile_id}/{day}")
def get_diary(profile_id: str, day: int):
    conn = get_db()
    row = conn.execute(
        "SELECT * FROM diary WHERE profile_id = ? AND day = ?",
        (profile_id, day),
    ).fetchone()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="Diary entry not found")
    data = dict(row)
    data["meals"] = json.loads(data["meals"])
    data["mood"] = json.loads(data["mood"])
    return data


@app.post("/api/diary")
def save_diary(payload: DiaryPayload):
    conn = get_db()
    existing = conn.execute(
        "SELECT id FROM diary WHERE profile_id = ? AND day = ?",
        (payload.profile_id, payload.day),
    ).fetchone()

    meals_json = json.dumps([m.model_dump() for m in payload.meals], ensure_ascii=False)
    mood_json = json.dumps(payload.mood, ensure_ascii=False)

    if existing:
        conn.execute(
            """UPDATE diary SET
               meals=?, water_ml=?, mood=?, voice_note=?, audio=?, comment=?,
               updated_at=datetime('now')
               WHERE profile_id=? AND day=?""",
            (meals_json, payload.water_ml, mood_json,
             payload.voice_note, payload.audio, payload.comment,
             payload.profile_id, payload.day),
        )
    else:
        conn.execute(
            """INSERT INTO diary
               (profile_id, day, meals, water_ml, mood, voice_note, audio, comment)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
            (payload.profile_id, payload.day, meals_json, payload.water_ml,
             mood_json, payload.voice_note, payload.audio, payload.comment),
        )
    conn.commit()
    conn.close()
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=3051, reload=True)
