# Healora Mobile — Architecture

## High-Level Architecture

```
┌────────────────────────────────────────────────────────┐
│                   Mobile App (RN)                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │ Dashboard │ │ Profile  │ │ Plan     │ │ Chat     │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │ Diary    │ │ Progress │ │ Goals    │ │ Doctor   │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
├────────────────────────────────────────────────────────┤
│  Shared Layer: Navigation · Theme · Components · API    │
├────────────────────────────────────────────────────────┤
│  Native Bridge: Camera · STT · Biometrics · Widgets    │
├────────────────────────────────────────────────────────┤
│  Storage: MMKV (fast) + WatermelonDB (offline sync)    │
└───────────────────────┬────────────────────────────────┘
                        │ HTTPS / WSS
┌───────────────────────▼────────────────────────────────┐
│              API Gateway (nginx)                        │
│              healora.ru/api/                            │
├────────────────────────────────────────────────────────┤
│  AI Core  │  Knowledge Layer  │  Data Layer            │
└────────────────────────────────────────────────────────┘
```

## Module Map (Screen Tree)

```
App (NavigationContainer + DeepLink)
├── AuthStack
│   ├── Login
│   ├── Register
│   ├── ForgotPassword
│   └── Onboarding (3 slides + Quiz)
│
├── MainTabs (BottomTabNavigator)
│   ├── ChatStack
│   │   └── ChatScreen
│   ├── PlanStack
│   │   ├── PlanList
│   │   ├── PlanDetail
│   │   └── PlanJournal
│   ├── GoalsStack
│   │   ├── GoalsScreen
│   │   └── ProgressPath
│   ├── DiaryStack
│   │   └── DiaryScreen
│   └── ProfileStack
│       ├── ProfileScreen
│       └── SettingsScreen
│
└── DoctorStack (B2B)
    ├── PatientList
    ├── PatientDetail
    └── PlanEditor
```

## Data Flow

```
[UI Component]
     │
     ├──→ Zustand (local UI state: modals, toggles, temp data)
     │
     └──→ React Query (server state: profile, plan, diary)
              │
              ├──→ API Client (axios) → Backend
              │
              └──→ WatermelonDB (offline cache)
                       │
                       └──→ Sync on reconnect
```

## Key Libraries

| Purpose | Library |
|---------|---------|
| Navigation | @react-navigation/native + v7 |
| State (UI) | zustand |
| State (Server) | @tanstack/react-query |
| HTTP Client | axios |
| Secure Storage | react-native-keychain |
| Local DB (Offline) | @nozbe/watermelondb |
| Fast Storage | react-native-mmkv |
| Camera | react-native-vision-camera |
| Image Crop | react-native-image-crop-picker |
| Speech-to-Text | @react-native-voice/voice |
| Notifications | @notifee/react-native + Firebase |
| Charts | react-native-svg + victory-native |
| SVG Icons | react-native-svg (inline SVGs from web) |
| Deep Links | react-native-deep-link |
| Biometrics | react-native-biometrics |
| Widgets | Native Swift + Kotlin modules |

---

*Created: 24.05.2026 | Healora Mobile | AIMLEI-2026*
