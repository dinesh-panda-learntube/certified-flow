# Prompt: Generate Profile Builder Quiz JSON (Skills / Certifications / Projects)

Use this prompt to generate **quiz JSON content** for the first simulation in each Profile Builder section:
1) **Skill Section Quiz** (timed micro-assessment)
2) **Certification Section Simulation** (scenario-based with feedback flow)
3) **Project Section Simulation** (artefact-driven, step-by-step proof)

The goal is to create **fast-scanning, motivating, CV-realistic** questions that feel aligned to the user’s **Current Role**, **Target Role**, and **Experience Range**, while increasing difficulty from easy → hard.

---

## INPUTS (you will be given)
- User profile:
  - Name
  - Current Role
  - Target Role
  - Years of Experience Range
  - Goal
- The chosen **first item** in each section:
  - Skill title
  - Certification title
  - Project title + tools pair
- A CSV with competency/role context (use it to keep tasks plausible and relevant).

---

## OUTPUT REQUIRED
Generate **one JSON object per request** (one at a time):
- If asked for the Skill quiz → output Skill quiz JSON only.
- If asked for the Certification simulation → output Certification JSON only.
- If asked for the Project simulation → output Project JSON only.

Return **JSON only** and no extra commentary.

---

# 1) SKILL SECTION QUIZ — REQUIREMENTS
### Purpose
A quick proficiency check that feels appropriate for the user’s current role (e.g., recruiter) but clearly maps to the target role (e.g., HR Manager).

### Format
- 20 questions
- Each question must be **≤ 200 characters**
- Each option text must be **≤ 50 characters**
- Questions should be fast to scan and answer in ~30 seconds total (micro questions).

### Question styles to include
Mix these types across the 20:
- Definition/terminology
- Odd one out
- Simple “best next step”
- Tool/framework familiarity (only where relevant)
- Common HR tasks: triage, stakeholder updates, scope clarity

### Difficulty
- Q1–Q6: “easy” but not trivial; should match the user’s current role experience (recruiter familiarity)
- Q7–Q14: medium
- Q15–Q20: hard (still answerable; avoid specialist legal nuance)

### Distractors
- Options must be similar length
- Distractors should reflect common misconceptions (e.g., oversharing, acting without diagnosis, policy-first)

### Output structure (recommended)
```json
{
  "quiz_id": "",
  "section": "skills",
  "simulation_title": "",
  "timebox_seconds": 30,
  "questions": [
    {
      "q_id": "Q01",
      "q": "",
      "options": ["", "", "", ""],
      "correct_index": 0
    }
  ]
}
```

---

# 2) CERTIFICATION SECTION SIMULATION — REQUIREMENTS
### Purpose
A role-realistic crisis simulation that introduces the user to a **new job + real company context** and tests both strategic judgement and technical HR decision-making.

### Format
- 3 scenarios
- 10 total questions across all scenarios
- The **first question of each scenario** must introduce the context (≤ 200 characters)
- Each question includes:
  - `explain_this`: a short framework/definition needed to answer (≤ 200 characters)
  - 4 options
  - Each option contains **feedback** that describes action + outcome (≤ 100 characters)

### Feedback rules
- Do **not** label feedback as correct/incorrect.
- Feedback should read like: “You do X → outcome Y” (impact on company/career).

### Flow rules
- Questions inside each scenario must form a coherent sequence of events:
  - Diagnose → contain → structure → decide
- Each scenario must end with a **high-stakes decision** (crisis or career opportunity).

### Company context
- Use **real company names** relevant to the candidate in India and HR Manager pathways.
- Companies must fit the scenario plausibly (e.g., Amazon India for ER escalation, Infosys for audit/compliance, Flipkart for ops attrition).

### Difficulty
- Scenario 1: accessible but urgent (onboarding into role)
- Scenario 2: deeper ER/process reasoning under pressure
- Scenario 3: governance, traceability, metrics under audit deadlines

### Output structure (recommended)
```json
{
  "simulation_id": "",
  "section": "certifications",
  "certification_title": "",
  "question_count_total": 10,
  "scenarios": [
    {
      "scenario_id": "SC01",
      "title": "",
      "questions": [
        {
          "q_id": "SC01_Q01",
          "q": "",
          "explain_this": "",
          "options": [
            {"text": "", "feedback": ""}
          ],
          "correct_index": 0
        }
      ]
    }
  ]
}
```

---

# 3) PROJECT SECTION SIMULATION — REQUIREMENTS
### Purpose
Prove competence through **artefact-building** steps that feel like real work for the target role.

### Format
- Total 10 steps
- Must identify **1–2 key technical skills** required for the project.
- For each technical skill:
  - Choose an artefact type (prompt/doc/email/table/board)
  - Devote **at least 4 steps** to iteratively improving that same artefact
- Use artefacts heavily; include pure MCQs only to cover broader “project completeness” steps.

### Artefact rules
Each artefact step must:
- Show an **incomplete artefact state** (realistic excerpt)
- Highlight **target tokens** to replace (e.g., `[RISK]`, `[EVENT1]`)
- Offer options as **replacement strings only** (single response per tap)
- If multiple blanks exist, the user fills them via:
  - **one tap per blank**, OR
  - an **ordering step** that fills multiple blanks using selected pieces

### Low cognitive load requirement
- **Only one input action per tap**.
- Avoid options that bundle multiple values together.
- For ordering steps: user taps pieces in sequence; system inserts them into target tokens in order.

### Correctness validation
- Do not validate “which option index was selected.”
- Validate using the **final artefact string** after insertion.
- Provide `validation.type = "final_state_match"` and `correct_final_state`.

### Step types allowed
- `artefact_fill` (fill one or more token blanks)
- `artefact_ordering` (order pieces to fill multiple tokens)
- `catch_the_error` (select which line to remove/replace)
- `mcq` (only when needed for the overall flow)

### Difficulty
- Start with simpler containment/triage
- Move toward structured documentation + leadership-safe updates
- End with decision-ready artefacts (handoff-ready)

### Output structure (recommended)
```json
{
  "simulation_id": "",
  "section": "projects",
  "project_title": "",
  "tools_pair": ["", ""],
  "technical_skills": [
    {
      "skill_id": "TS1",
      "name": "",
      "artefact_label": "",
      "artefact_type": ""
    }
  ],
  "steps": [
    {
      "step_id": "S01",
      "step_type": "mcq",
      "q": "",
      "options": [{"text": ""}],
      "validation": {"type": "single_choice_index", "correct_index": 0}
    },
    {
      "step_id": "S03",
      "step_type": "artefact_fill",
      "technical_skill_id": "TS1",
      "q": "",
      "artefact": {"label": "", "state": ""},
      "targets": [{"token": "", "hint": ""}],
      "options_by_target": {"[TOKEN]": ["", "", "", ""]},
      "validation": {
        "type": "final_state_match",
        "correct_final_state": ""
      }
    },
    {
      "step_id": "S09",
      "step_type": "artefact_ordering",
      "technical_skill_id": "TS2",
      "q": "",
      "artefact": {"label": "", "state": ""},
      "targets_in_order": ["[A]", "[B]", "[C]"],
      "pieces": ["", "", "", ""],
      "validation": {
        "type": "final_state_match",
        "correct_final_state": ""
      }
    }
  ]
}
```

---

## GLOBAL QUALITY RULES (apply to all three)
1. **Difficulty ramps from easy → hard**.
2. Questions and options must be **fast-scannable**.
3. Distractors must be **plausible misconceptions**.
4. Language should be **credible and HR-realistic**.
5. Avoid repetitive phrasing:
   - Vary sentence structures in feedback and project bullets.
6. Respect all character limits.

---

## FINAL GENERATION COMMAND
Using the provided user details + chosen item title(s) + CSV context, generate the JSON for the requested quiz type with the constraints above.

