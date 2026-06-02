# Healora Mobile — Sprint Plan v0.1 (Alpha)

> Старт: 26.05.2026 | Длительность: 2 недели

## Цель Alpha

Работающее приложение с авторизацией, дашбордом и профилем (read-only). Публикация в TestFlight + Play Console Internal Testing.

---

## Week 1 (26.05 — 30.05): Scaffolding + Auth

### Day 1-2: Project Init
- [ ] Init React Native CLI + TypeScript
- [ ] Настройка линтеров (ESLint, Prettier)
- [ ] Структура папок (`src/screens`, `src/components`, `src/api`, `src/store`, `src/navigation`)
- [ ] React Navigation: Stack + Bottom Tabs shell

### Day 3-4: UI Kit + Theme
- [ ] Порт Design System: цвета, типографика, spacing
- [ ] Base components: Button, Text, Card, Input, Badge, ProgressBar
- [ ] Icon system: inline SVG из веб-версии

### Day 5: Auth Screens
- [ ] Login screen (email + password)
- [ ] Register screen
- [ ] API client + JWT logic

### Day 6-7: CI/CD + Distribution
- [ ] Fastlane setup (iOS + Android)
- [ ] GitHub Actions: сборка + деплой
- [ ] TestFlight + Play Console Internal

---

## Week 2 (02.06 — 06.06): Dashboard + Profile

### Day 8-9: Dashboard
- [ ] Экран Dashboard: приветствие, Score, звёзды
- [ ] Quick stats: сон, шаги, вес
- [ ] Today's interventions list (from API)

### Day 10-11: Profile
- [ ] Экран Profile: порт ProfileView
- [ ] Аватар, имя, уровень, риск
- [ ] 6 секций (Demographics, Vitals, Labs, Lifestyle, Genetics, Medical)

### Day 12: Onboarding
- [ ] 3 слайда онбординга
- [ ] Quiz (5 вопросов → Healora Score)

### Day 13: Polish + Bug Fixes
- [ ] Loading states, error states, empty states
- [ ] SafeArea, keyboard avoidance, status bar

### Day 14: Alpha Release
- [ ] Сборка + деплой в TestFlight / Play Console
- [ ] Smoke tests
- [ ] Демо команде

---

## Критерии готовности Alpha

- [ ] Пользователь может зарегистрироваться/войти
- [ ] Видит дашборд со Score и сегодняшними интервенциями
- [ ] Может просмотреть свой профиль (read-only)
- [ ] Проходит онбординг (слайды + quiz)
- [ ] Приложение не падает в основных сценариях
- [ ] Сборка проходит CI/CD

---

*Created: 24.05.2026 | Healora Mobile | AIMLEI-2026*
