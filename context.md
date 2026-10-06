# FUEL YOUTH FIT Copilot — Project Context

## Product summary

FUEL YOUTH FIT Copilot is a proposed fitness companion within the existing FUEL YOUTH FIT experience. It helps people make consistent, informed fitness decisions with personalized nutrition planning, post-workout recovery guidance, and progress tracking. Users should be able to ask for help by text or voice and get concise, actionable recommendations that fit their goals, routines, preferences, activity levels, and reported concerns.

This repository now includes a static front-end portfolio prototype based on the supplied product requirements document (PRD) and sample screens. Product and technical details not specified in the PRD are intentionally left as decisions to make during discovery and implementation.

## Problem

People can find it difficult to maintain consistent fitness habits when nutrition and recovery advice is confusing, time-consuming, or expensive. They need an affordable digital companion that adapts to their routines, helps with everyday decisions, and supports long-term progress.

## Goals

- Increase successful completion of fitness-related tasks, especially diet planning, recovery activities, and progress tracking.
- Increase the number of monthly active users who complete diet and recovery activities.
- Help users recognize when a fitness-related concern warrants advice from a qualified healthcare professional.
- Integrate Copilot capabilities into the existing FUEL YOUTH FIT experience rather than introducing a separate destination without a demonstrated need.

## Non-goals and safety boundaries

- The Copilot does not diagnose medical conditions or injuries.
- It does not prescribe medical treatment, provide emergency care, or replace a qualified healthcare professional.
- Serious injuries and clinical diagnosis or treatment are outside the product scope.
- The product is not intended to add a standalone app or destination solely for Copilot features.

Health-related experiences must communicate these boundaries clearly and direct users to a qualified professional when appropriate. Product implementation should define a safe response and escalation policy before releasing health-concern guidance.

## Users and experience

The PRD calls for personalized, low-effort support via text or voice, with plan generation or relevant recovery guidance discoverable in three to four simple interactions. Recommendations should explain why they are suggested. Users should be able to find saved plans and completed activities and resume where they left off.

The PRD does not yet specify user personas, detailed journeys, accessibility requirements, or the exact onboarding and personalization questions. These need validation before they are treated as settled requirements.

## Feature priorities

| Priority | Capability | Reach | Impact | Confidence | Effort |
| --- | --- | --- | --- | --- | --- |
| P0 | Personalized diet plan | High | High | High | Medium |
| P1 | Post-workout recovery | High | High | Medium | Medium |
| P2 | Fitness progress tracking | Medium | Medium | High | Medium |

The overall functional requirement also mentions voice and text requests, exercise videos, and health-concern guidance. The PRD does not assign separate priorities or define detailed acceptance criteria for those surfaces.

## Success measures

**North star:** Month-over-month growth in monthly active users completing diet and recovery activities.

**Leading indicators**

- Active users
- Diet plans created
- Recovery exercises completed per user

**Counter metrics**

- Diet plan drop-off rate: users who start but do not complete a diet plan
- D30 inactivity rate: users who stop using the app after 30 days
- Exercise abandonment rate: users who start but do not finish a recovery session

Metric definitions, event instrumentation, reporting windows, and baseline/target values remain to be established.

## Product requirements

- Accept user requests through text or voice.
- Personalize diet plans, post-workout recovery guidance, exercise video discovery, and progress tracking using relevant user context.
- Provide appropriate, non-diagnostic guidance on when to consult a qualified doctor for reported concerns.
- Keep recommendations concise and actionable unless the user asks for more detail.
- Explain why a recommendation is made.
- Save plans and progress reliably and allow users to resume without losing saved information.
- Make key tasks available within three to four simple interactions, with clear navigation and minimal manual input.

## Quality attributes (PRD)

- **Performance:** Generate diet plans and routine fitness recommendations within 45 seconds under normal operating conditions.
- **Quality:** Recommendations should be relevant to the user's goals, preferences, routine, and activity level.
- **Reliability:** Saved plans and progress should persist and be resumable.
- **Security:** Protect personal and fitness data through appropriate encryption, secure storage, and access controls.
- **Transparency:** Explain recommendations and provide a clear history of saved plans and completed actions.
- **Usability:** Minimize manual input and keep common tasks within three to four interactions.

The PRD does not define specific security controls, availability targets, supported platforms, or how the 45-second performance target is measured.

## Competitive landscape

The PRD names these adjacent offerings:

- MyFitnessPal — calorie and meal tracking
- Nike Training Club — guided workout programs
- Fitbod — personalized workout plans
- Cult.fit — workouts, fitness classes, and coaching
- HealthifyMe — diet tracking, nutrition guidance, and coaching

These are reference points from the PRD, not a completed competitive analysis. The intended differentiation should be validated through research.

## Open decisions

1. Who are the primary user segments, and what are their validated journeys?
2. What platforms and existing FUEL YOUTH FIT surfaces will host the Copilot?
3. What technology stack, architecture, model/provider, and data sources will be used?
4. What user profile data is necessary for personalization, and how will consent, retention, deletion, and access be handled?
5. What safety policy governs reported symptoms, urgent concerns, and escalation to healthcare professionals?
6. What content sources, review process, and licensing apply to nutrition, recovery, and exercise videos?
7. How will each metric be defined, instrumented, and compared with a baseline?
8. What are the detailed acceptance criteria for voice, plan editing, saved history, and progress tracking?

## Source

This context is derived from the supplied `Untitled document.docx` PRD. Where that document is silent, this file marks the topic as open rather than asserting an implementation decision.
