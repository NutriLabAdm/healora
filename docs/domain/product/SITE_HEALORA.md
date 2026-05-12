# Healora Promo Site - Ideas & Requirements

## Overview
**Healora** - AI-powered Digital Twin for obesity prediction and prevention. Turns blood, genetics, and wearables into personalized "Longevity Path" with daily micro-quests.

## Key Messages

### Value Proposition
- "From Obesity to Longevity through a Digital Twin"
- "Turn fragmented health data into a living digital twin"
- "5-10+ additional healthy years - delivered through messenger-native interface"

### Target Audience
- Women 25-45, urban, full-time work
- BMI 30-40, 2+ failed diets, emotional eating pattern
- Motivated for 5-10 kg sustainable loss

## Site Structure Ideas

### 1. Hero Section
- Headline + subheadline (value prop)
- CTA: "Start Your Journey" or "Get Free Assessment"
- Visual: Digital Twin visualization or health dashboard mockup

### 2. Problem Section
- Statistics: 50% overweight in Russia (doubled since 1990)
- 70-80% weight regain within 1-2 years
- Key gaps: no personalization, no scalable support

### 3. Solution - Digital Twin
- Visual: How it works (6 data sources → AI model → personalized path)
- Data sources: Blood, Clinical history, Diet logs, Wearables, Genetics, Mental health
- Demo flow: Landing → Upload → Digital Twin → Longevity Path → Progress

### 4. Scientific Validation
- NHANES data, AI4FoodDB (100 participants)
- 30-sec sit-to-stand test (safe, reproducible)
- ML model: HRrest, HRpeak, HRR, BMI, waist, BP → risk score

### 5. 8 Habits Section
- Late-night eating, Meal logging, Daily steps, Sleep duration
- HRV/stress, Diet, Medication adherence, Emotional eating
- Timeline to results: 1-8 weeks

### 6. Pricing
- Freemium: $14.99/month
- Premium annual: $119.99/year
- Genetic add-on: $29.99
- B2B: $49/month for nutritionists

### 7. CTA Section
- "Ready to start your longevity journey?"
- Email capture / Telegram link

## Tech Stack Recommendations

- **Frontend**: Next.js, React, or simple HTML/CSS/JS (if static)
- **Hosting**: Beget (as per devops)
- **SSL**: Let's Encrypt via Certbot

## Questions for Site Development

1. **Content**:
   - [ ] Which sections are priority? All or subset?
   - [ ] Language: Russian only, English only, or bilingual?
   - [ ] Any specific legal disclaimers needed?

2. **Functionality**:
   - [ ] Contact form? Email capture?
   - [ ] Telegram link/button?
   - [ ] Blog/news section?
   - [ ] Interactive Digital Twin demo?

3. **Branding**:
   - [ ] Color scheme preferences?
   - [ ] Logo available?
   - [ ] Any existing brand guidelines?

4. **Technical**:
   - [ ] Static site or need backend?
   - [ ] Google Analytics needed?
   - [ ] SEO focus keywords?

5. **Deployment**:
   - [ ] DNS already points to Beget?
   - [ ] Want pre-configured deploy script?