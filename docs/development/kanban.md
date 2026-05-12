# 260427 kanban HEALORA

## Kanban Board

| SCRUM \ PILLARS | PROBLEM = CustDev | SOLUTION = Science | PROTOTYPE = Technology = Feedback | VISION and GANTT for the next iteration |
|----------------|-------------------|--------------------|-----------------------------------|---------------------------------------------|
| **What we learned so far?** | "➧ 43% adults worldwide overweight – 3.3B people, 16% obese<br>➧ Russia: ≥50% overweight, doubled since 1990<br>➧ Majority have ≥2 cardiometabolic diseases<br>➧ 70-80% weight regain within 1-2 years without support<br>➧ Existing apps give one-size-fits-all advice<br>➧ Doctors/nutriologists lack scalable tools" | "➧ 5-10% weight loss → 58% diabetes risk reduction<br>➧ 78% lose weight via habit change programs<br>➧ 65% maintain at 1 year with proper support<br>➧ WHOOP-style journal → 90-day correlation analysis<br>➧ DTLP protocols designed (nutrition, sleep, activity, recovery, medical)<br>➧ 300 behavior interventions catalogued" | "➧ Landing page MVP deployed at healora.ru<br>➧ D3.js charts working (Life Expectancy Dial, Weight Projection, Habit Impact, Biomarker Radar, Adherence Ring, Weight Timeline, Risk Reduction, Network Graph)<br>➧ Design system: blue palette, Sora/DM Sans fonts<br>➧ Chat interface prototype designed<br>➧ Healora Score logic drafted<br>➧ ML stub model defined (HRrest, HRpeak, HRR, BMI, waist, BP → risk)" | "➧ Team structured: 5 founders (Sergey, Anastasiya, Maksim, Alexandra, Ahmed)<br>➧ Milestones defined: MVP deployed ✅, Intervention DB ✅, Digital Twin experiment design ✅, Market analysis ✅, Scientific publications 🔄<br>➧ Server: Beget (217.114.8.5), Nginx + SSL (Let's Encrypt)<br>➧ Backlog defined for MVP (Phase 1: 1-3 months)<br>➧ Subscription model drafted (Free / Pro / Enterprise)" |
| **What we plan to learn next?** | "➧ Validate target users: who needs Digital Twin for obesity?<br>➧ Conduct custdev interviews with 10+ potential users (overweight adults)<br>➧ Interview 3-5 nutriologists/doctors about workflow gaps<br>➧ Test MVP with real users → collect feedback<br>➧ Define pricing willingness (RUB 990/mo?)<br>➧ Understand user acquisition channels" | "➧ Complete scientific publication draft<br>➧ Design clinical validation study protocol<br>➧ Refine correlation algorithm (need 90 days data minimum)<br>➧ Build evidence base for each intervention type<br>➧ Study Bayesian calibration for health scoring<br>➧ Research wearable API integration patterns (Apple Watch, Oura, Whoop)" | "➧ Build MVP screens: Onboarding (3 slides + quiz), Chat interface, Profile, Goals, Digital Twin<br>➧ Implement intervention buttons: Что поесть, Что почитать, Научи, Новости<br>➧ Build points system (5-50 pts per task)<br>➧ Create Drag & Drop logging for Data Sources Panel<br>➧ Implement Healora Score calculation (0-100)<br>➧ Deploy ML stub for risk prediction<br>➧ Add Under the Hood panel with technical log" | "➧ Define exact MVP scope for next Friday demo<br>➧ Create GANTT chart for Phase 1 (1-3 months)<br>➧ Assign specific tasks to team members for next sprint<br>➧ Set up CI/CD pipeline<br>➧ Prepare pitch deck for investors<br>➧ Plan user acquisition for pilot launch" |
| **What are our challenges?** | "➧ Finding real overweight users willing to share health data<br>➧ Competing with free apps (MyFitnessPal, Yazio)<br>➧ Users may not trust AI for health advice<br>➧ Regulatory uncertainty (medical device classification)<br>➧ Doctors are busy and hard to reach for interviews" | "➧ Correlation ≠ causation – need clinical validation<br>➧ 90-day minimum data requirement delays feedback loop<br>➧ ML model accuracy depends on data quality<br>➧ HRV/SpO2 data collection requires wearable adoption<br>➧ Bayesian calibration complexity<br>➧ Limited research on Digital Twin efficacy for obesity" | "➧ Frontend: need to fix profile-screen, add favicon, polish animations<br>➧ Backend: Beget server limitations, no database layer yet<br>➧ Mobile: responsive design challenges<br>➧ Real-time data processing for wearable integration<br>➧ ML model accuracy with limited training data<br>➧ Drag & Drop implementation complexity<br>➧ Achieving HIPAA/GDPR compliance | "➧ Tight timeline: MVP demo next Friday<br>➧ Team coordination across time zones<br>➧ Balancing academic (AIMLEI) vs product goals<br>➧ Subscription pricing uncertainty<br>➧ No dedicated designer – UI may need polish<br>➧ Scope creep risk with ambitious features" |

---

## Team & Responsibilities

| Role | Team Members | Responsibilities |
|------|-------------|-----------------|
| **Frontend** | Alexandra Bratsilo, Ahmed Eltwam | HTML/CSS/JS, D3.js charts, chat interface, onboarding screens, responsive design |
| **Backend** | Maksim Kovalev | Server deployment (Beget), Nginx config, SSL, API stubs, data integration, devops |
| **Analytics** | Anastasiya Oskolkova | ML model design, Bayesian calibration, correlation analysis, Healora Score algorithm, data science |
| **Content / Copywriter** | Sergey Savinskiy | Product description, intervention DB, DTLP protocols, scientific publications, user communication |

---

## Sprint Plan: Current (Week of 28 April – 2 May 2026)

| Pillar | Task | Owner | Deadline | Status |
|--------|------|-------|----------|--------|
| **PROBLEM** | Schedule 10+ custdev interviews | Sergey, Anastasiya | 2 May | 🔄 |
| **PROBLEM** | Create user interview guide | Sergey, Alexandra | 30 Apr | 🔄 |
| **SOLUTION** | Draft scientific publication | Sergey, Anastasiya | 15 May | 🔄 |
| **SOLUTION** | Complete intervention DB (INTERVENTION_DB.md) | Sergey | 30 Apr | 🔄 |
| **PROTOTYPE** | Fix profile-screen div location | Ahmed | 29 Apr | 🔄 |
| **PROTOTYPE** | Add favicon to root | Maksim | 29 Apr | 🔄 |
| **PROTOTYPE** | Build onboarding slides (3+quiz) | Alexandra | 2 May | 🔄 |
| **PROTOTYPE** | Implement chat interface with task cards | Ahmed, Alexandra | 2 May | 🔄 |
| **PROTOTYPE** | Build points system (5-50 pts) | Maksim | 2 May | 🔄 |
| **PROTOTYPE** | Deploy ML stub for risk prediction | Maksim | 2 May | 🔄 |
| **VISION** | Create GANTT for Phase 1 | Sergey | 30 Apr | 🔄 |
| **VISION** | Prepare demo for Friday presentation | All | 2 May | 🔄 |

---

## GANTT (Phase 1: MVP)

| Week | Focus | Deliverable |
|------|-------|-------------|
| **Week 1** (28 Apr – 2 May) | Prototype MVP | Functional demo with onboarding, chat, goals, digital twin stub |
| **Week 2** (5 May – 9 May) | User Testing | First feedback from 5+ users, fix critical bugs |
| **Week 3** (12 May – 16 May) | Polish & Deploy | Responsive fixes, performance optimization, public beta launch |
| **Week 4** (19 May – 23 May) | Analytics | Healora Score calibration, first correlation insights |
| **Week 5** (26 May – 30 May) | Iterate | Feature prioritization based on feedback |
| **Week 6-8** (Jun) | V1 Prep | Wearable API integration, advanced ML |

---

## Key Metrics (OKRs)

| Objective | Key Result | Owner | Target |
|-----------|------------|-------|--------|
| Validate market need | 10+ custdev interviews completed | Sergey, Anastasiya | 2 May |
| Build MVP | 5 core screens functional (Onboarding, Chat, Goals, Profile, Digital Twin) | Frontend team | 2 May |
| Deploy to users | Public beta accessible at healora.ru | Backend team | 16 May |
| User engagement | 5+ users complete onboarding + first task | All | 23 May |
| Scientific validation | Publication draft submitted | Sergey, Anastasiya | 15 May |

---

*Created: 28 April 2026 | HEALORA | AIMLEI-2026*
