import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outCerts = path.join(__dirname, 'src', 'data', 'certs');
const outProjs = path.join(__dirname, 'src', 'data', 'projects');

// ----------------------------------------------------------------------
// DETAILED CERTS
// ----------------------------------------------------------------------
const cert2 = {
  "simulation_id": "CERT_SIM_02_EMPLOYEE_RELATIONS",
  "certification_title": "Employee Relations & Grievance Handling",
  "scenarios": [
    {
      "scenario_id": "SC01",
      "title": "Peer Harassment Escalation",
      "questions": [
        {
          "q_id": "SC01_Q01",
          "q": "An employee complains about inappropriate jokes from a peer in a team chat. First action?",
          "explain_this": "Containment and evidence gathering are step one.",
          "options": [
            { "text": "Take screenshots of the chat and isolate the messages.", "feedback": "Ensures evidence is preserved before deletion." },
            { "text": "Schedule a joint meeting immediately.", "feedback": "Risks further conflict or intimidation." },
            { "text": "Send a general reminder about chat etiquette.", "feedback": "Too passive for a specific complaint." },
            { "text": "Suspend the accused peer immediately.", "feedback": "Premature without fact-finding." }
          ],
          "correct_index": 0
        },
        {
          "q_id": "SC01_Q02",
          "q": "The accused denies the jokes were meant to be offensive. How do you respond?",
          "explain_this": "Intent vs Impact. Policy focuses on the impact of behavior.",
          "options": [
            { "text": "Explain that harassment policies focus on impact, not just intent.", "feedback": "Correctly frames the policy." },
            { "text": "Agree with them and drop the case.", "feedback": "Fails to address the complaint." },
            { "text": "Tell the reporter to be less sensitive.", "feedback": "Invalidates the reporter and violates HR policy." },
            { "text": "Terminate the accused immediately.", "feedback": "Disproportionate response." }
          ],
          "correct_index": 0
        }
      ]
    },
    {
      "scenario_id": "SC02",
      "title": "Manager Favoritism Allegation",
      "questions": [
        {
          "q_id": "SC02_Q01",
          "q": "An employee claims their manager gives better leads to a specific colleague. What data do you pull first?",
          "explain_this": "Objective data removes subjectivity from claims.",
          "options": [
            { "text": "Lead assignment logs for the past 3 months.", "feedback": "Provides objective evidence of distribution." },
            { "text": "The manager's performance reviews.", "feedback": "Not directly relevant to lead distribution." },
            { "text": "The reporting employee's attendance record.", "feedback": "Irrelevant and potentially retaliatory." },
            { "text": "The favored colleague's personal file.", "feedback": "Unnecessary privacy breach at this stage." }
          ],
          "correct_index": 0
        }
      ]
    }
  ]
};

const cert3 = {
  "simulation_id": "CERT_SIM_03_PERFORMANCE_MGMT",
  "certification_title": "Performance Management & Feedback Cycles",
  "scenarios": [
    {
      "scenario_id": "SC01",
      "title": "Disputed Appraisal Rating",
      "questions": [
        {
          "q_id": "SC01_Q01",
          "q": "An employee refuses to sign their appraisal, claiming the 'Needs Improvement' rating is unfair. Next step?",
          "explain_this": "Listen and document before concluding.",
          "options": [
            { "text": "Set up a mediation meeting with the manager to review the documented KPIs.", "feedback": "Focuses conversation on objective data." },
            { "text": "Force them to sign it or face disciplinary action.", "feedback": "Coercive and legally risky." },
            { "text": "Change the rating to 'Satisfactory' to avoid conflict.", "feedback": "Undermines the performance system." },
            { "text": "Tell them to escalate to the CEO.", "feedback": "Abdication of HR responsibility." }
          ],
          "correct_index": 0
        },
        {
          "q_id": "SC01_Q02",
          "q": "During review, the manager admits they didn't document any underperformance throughout the year. What is the HR guidance?",
          "explain_this": "Surprise ratings without continuous feedback are a failure of the PMS.",
          "options": [
            { "text": "Adjust the rating, implement a PIP now, and train the manager on continuous feedback.", "feedback": "Corrects the process failure and sets course forward." },
            { "text": "Keep the rating, it's the manager's right.", "feedback": "Exposes company to unfair dismissal risks later." },
            { "text": "Fire the manager.", "feedback": "Too extreme for a first-time coaching gap." },
            { "text": "Give the employee a bonus.", "feedback": "Unrelated and confusing." }
          ],
          "correct_index": 0
        }
      ]
    }
  ]
};

const cert4 = {
  "simulation_id": "CERT_SIM_04_HR_OPERATIONS",
  "certification_title": "HR Operations, Compliance & Records",
  "scenarios": [
    {
      "scenario_id": "SC01",
      "title": "Statutory Compliance Audit",
      "questions": [
        {
          "q_id": "SC01_Q01",
          "q": "An external auditor requests PF (Provident Fund) remittance challans for the last 12 months. Some are missing. What to do?",
          "explain_this": "Transparency with a remediation plan is better than hiding missing documents.",
          "options": [
            { "text": "Locate bank statements proving deductions and draft a remediation plan for missing challans.", "feedback": "Shows compliance intent and offers alternative proof." },
            { "text": "Forge the missing challans.", "feedback": "Illegal and grounds for severe penalty." },
            { "text": "Refuse to provide any documents.", "feedback": "Triggers a full investigation and fines." },
            { "text": "Blame the previous HR manager and do nothing.", "feedback": "Doesn't solve the company's liability." }
          ],
          "correct_index": 0
        },
        {
          "q_id": "SC01_Q02",
          "q": "You find that an employee's joining date in the HRIS doesn't match their statutory forms. What is the fix?",
          "explain_this": "Data consistency across systems reduces audit findings.",
          "options": [
            { "text": "Correct HRIS to match the statutory forms (Single Source of Truth) with a documented change request.", "feedback": "Ensures audit trail and alignment." },
            { "text": "Leave it as is, no one will notice.", "feedback": "Will be caught in cross-verification." },
            { "text": "Ask the employee to resign and rejoin.", "feedback": "Absurd and illegal." },
            { "text": "Delete the statutory form.", "feedback": "Destruction of records is illegal." }
          ],
          "correct_index": 0
        }
      ]
    }
  ]
};

const cert5 = {
  "simulation_id": "CERT_SIM_05_PEOPLE_ANALYTICS",
  "certification_title": "People Analytics Basics (HR Metrics)",
  "scenarios": [
    {
      "scenario_id": "SC01",
      "title": "Q3 Attrition Dashboard Analysis",
      "questions": [
        {
          "q_id": "SC01_Q01",
          "q": "Voluntary attrition spiked to 18% in Q3. Which cut of data should you look at FIRST to find actionable insights?",
          "explain_this": "High-level metrics hide local problems. Slice by tenure and department.",
          "options": [
            { "text": "Attrition by Department and Tenure.", "feedback": "Isolates where and when people are leaving." },
            { "text": "Average age of all employees.", "feedback": "Too broad to be useful." },
            { "text": "Industry benchmarking reports.", "feedback": "Doesn't explain internal drivers." },
            { "text": "The company's stock price.", "feedback": "Correlation is not causation." }
          ],
          "correct_index": 0
        },
        {
          "q_id": "SC01_Q02",
          "q": "Data shows 70% of exits in Q3 were employees with < 6 months tenure in the Sales team. What's the hypothesis?",
          "explain_this": "Early attrition usually points to recruitment mismatch or onboarding failure.",
          "options": [
            { "text": "Mismatch in job expectations during hiring or poor onboarding.", "feedback": "Correctly identifies the root causes of early tenure exits." },
            { "text": "Base salaries are below market rate.", "feedback": "Usually drives later tenure exits." },
            { "text": "Sales team needs more vacation days.", "feedback": "Unlikely to be the primary driver of early exits." },
            { "text": "Competitors are aggressively poaching.", "feedback": "Possible, but onboarding/hiring is a more controllable variable." }
          ],
          "correct_index": 0
        }
      ]
    }
  ]
};

fs.writeFileSync(path.join(outCerts, 'cert-2.json'), JSON.stringify(cert2, null, 2));
fs.writeFileSync(path.join(outCerts, 'cert-3.json'), JSON.stringify(cert3, null, 2));
fs.writeFileSync(path.join(outCerts, 'cert-4.json'), JSON.stringify(cert4, null, 2));
fs.writeFileSync(path.join(outCerts, 'cert-5.json'), JSON.stringify(cert5, null, 2));

// ----------------------------------------------------------------------
// DETAILED PROJECTS
// ----------------------------------------------------------------------

const proj2 = {
  "simulation_id": "PROJ_SIM_02_ONBOARDING_PLAN",
  "project_title": "Design a 30-Day Onboarding Plan for a New Hire",
  "tools_pair": ["Notion", "ChatGPT"],
  "technical_skills": [
    { "skill_id": "TS1", "name": "Milestone Design", "artefact_label": "30-Day Plan", "artefact_type": "table" }
  ],
  "steps": [
    {
      "step_id": "S01",
      "step_type": "mcq",
      "q": "What is the primary goal of the first week of onboarding?",
      "options": [
        { "text": "Cultural assimilation, tool access, and basic role understanding." },
        { "text": "Assigning them a high-stakes project immediately." },
        { "text": "Leaving them alone to read company manuals." },
        { "text": "Testing their skills to see if they should be fired." }
      ],
      "validation": { "type": "single_choice_index", "correct_index": 0 }
    },
    {
      "step_id": "S02",
      "step_type": "artefact_fill",
      "technical_skill_id": "TS1",
      "q": "Assign the appropriate milestone for Week 2.",
      "artefact": { "label": "30-Day Plan", "state": "| Week | Milestone |\n|---|---|\n| Week 1 | Tool access & Introductions |\n| Week 2 | [WEEK_2_GOAL] |\n| Week 3 | Shadowing real tasks |" },
      "targets": [{ "token": "[WEEK_2_GOAL]", "hint": "Select Week 2 goal" }],
      "interaction": { "mode": "single_tap_one_blank", "blank_order": ["[WEEK_2_GOAL]"] },
      "options_by_target": { "[WEEK_2_GOAL]": ["Deep dive into role-specific processes", "Organize a company-wide party", "Complete annual performance review"] },
      "validation": { "type": "final_state_match", "correct_final_state": "| Week | Milestone |\n|---|---|\n| Week 1 | Tool access & Introductions |\n| Week 2 | Deep dive into role-specific processes |\n| Week 3 | Shadowing real tasks |" }
    }
  ]
};

const proj3 = {
  "simulation_id": "PROJ_SIM_03_HR_POLICY_UPDATE",
  "project_title": "Create an HR Policy Update (Leave / Attendance / WFH)",
  "tools_pair": ["Google Docs", "Claude"],
  "technical_skills": [
    { "skill_id": "TS1", "name": "Policy Drafting", "artefact_label": "Policy Draft", "artefact_type": "prompt_snippet" }
  ],
  "steps": [
    {
      "step_id": "S01",
      "step_type": "artefact_fill",
      "technical_skill_id": "TS1",
      "q": "Draft the 'Scope' section of the new WFH policy.",
      "artefact": { "label": "Policy Draft", "state": "1. Scope: This policy applies to [SCOPE_TARGET] operating out of the [LOCATION] office." },
      "targets": [{ "token": "[SCOPE_TARGET]", "hint": "Who does this apply to?" }, { "token": "[LOCATION]", "hint": "Which location?" }],
      "interaction": { "mode": "single_tap_per_blank", "blank_order": ["[SCOPE_TARGET]", "[LOCATION]"] },
      "options_by_target": { 
        "[SCOPE_TARGET]": ["all full-time employees", "only managers", "contractors only"], 
        "[LOCATION]": ["Bangalore", "Global", "Sales"] 
      },
      "validation": { "type": "final_state_match", "correct_final_state": "1. Scope: This policy applies to all full-time employees operating out of the Bangalore office." }
    },
    {
      "step_id": "S02",
      "step_type": "mcq",
      "q": "How should you roll out the finalized policy?",
      "options": [
        { "text": "Email all staff, update the intranet, and hold a Q&A town hall." },
        { "text": "Quietly upload it to the shared drive." },
        { "text": "Only tell managers and let them trickle it down." },
        { "text": "Print copies and leave them on desks." }
      ],
      "validation": { "type": "single_choice_index", "correct_index": 0 }
    }
  ]
};

const proj4 = {
  "simulation_id": "PROJ_SIM_04_HIRING_LOOP",
  "project_title": "Run a Hiring Loop for One Role (From JD to Offer)",
  "tools_pair": ["Airtable", "LinkedIn"],
  "technical_skills": [
    { "skill_id": "TS1", "name": "Interview Sequencing", "artefact_label": "Interview Stages", "artefact_type": "table" }
  ],
  "steps": [
    {
      "step_id": "S01",
      "step_type": "artefact_ordering",
      "technical_skill_id": "TS1",
      "q": "Order the hiring loop stages correctly.",
      "artefact": { "label": "Interview Stages", "state": "1. [STAGE_1]\n2. [STAGE_2]\n3. [STAGE_3]\n4. [STAGE_4]" },
      "targets_in_order": ["[STAGE_1]", "[STAGE_2]", "[STAGE_3]", "[STAGE_4]"],
      "pieces": ["HR Screening", "Hiring Manager Technical Fit", "Case Study / Assessment", "Culture & Leadership Fit"],
      "validation": { "type": "final_state_match", "correct_final_state": "1. HR Screening\n2. Hiring Manager Technical Fit\n3. Case Study / Assessment\n4. Culture & Leadership Fit" }
    },
    {
      "step_id": "S02",
      "step_type": "mcq",
      "q": "A candidate demands a salary 30% above your budget at the final stage. What do you do?",
      "options": [
        { "text": "Present the total rewards package, explain budget limits, and gauge their flexibility before rejecting." },
        { "text": "Immediately reject them without discussion." },
        { "text": "Approve the 30% increase manually to secure them." },
        { "text": "Ignore their email and ghost them." }
      ],
      "validation": { "type": "single_choice_index", "correct_index": 0 }
    }
  ]
};

const proj5 = {
  "simulation_id": "PROJ_SIM_05_MONTHLY_HR_REPORT",
  "project_title": "Prepare a Monthly HR Ops Report (Hiring + Attrition + Open Roles)",
  "tools_pair": ["Excel", "Tableau"],
  "technical_skills": [
    { "skill_id": "TS1", "name": "Metric Calculation", "artefact_label": "HR Metrics Draft", "artefact_type": "prompt_snippet" }
  ],
  "steps": [
    {
      "step_id": "S01",
      "step_type": "artefact_fill",
      "technical_skill_id": "TS1",
      "q": "Calculate the monthly attrition rate. You had 100 employees at the start, 110 at the end, and 5 left during the month.",
      "artefact": { "label": "HR Metrics Draft", "state": "Formula: (Exits / Average Headcount) * 100\nAverage Headcount = [AVG_HC]\nAttrition Rate = [ATTR_RATE]%" },
      "targets": [{ "token": "[AVG_HC]", "hint": "Calculate average" }, { "token": "[ATTR_RATE]", "hint": "Calculate rate" }],
      "interaction": { "mode": "single_tap_per_blank", "blank_order": ["[AVG_HC]", "[ATTR_RATE]"] },
      "options_by_target": { 
        "[AVG_HC]": ["105", "100", "110"], 
        "[ATTR_RATE]": ["4.76", "5.00", "4.54"] 
      },
      "validation": { "type": "final_state_match", "correct_final_state": "Formula: (Exits / Average Headcount) * 100\nAverage Headcount = 105\nAttrition Rate = 4.76%" }
    },
    {
      "step_id": "S02",
      "step_type": "mcq",
      "q": "When presenting this report to leadership, what should be on the summary slide?",
      "options": [
        { "text": "Key insights, red flags (like high attrition areas), and recommended actions." },
        { "text": "A list of every person who resigned and their personal reasons." },
        { "text": "Only the raw data tables exported from the HRIS." },
        { "text": "Pictures of the recent team building event." }
      ],
      "validation": { "type": "single_choice_index", "correct_index": 0 }
    }
  ]
};

fs.writeFileSync(path.join(outProjs, 'proj-2.json'), JSON.stringify(proj2, null, 2));
fs.writeFileSync(path.join(outProjs, 'proj-3.json'), JSON.stringify(proj3, null, 2));
fs.writeFileSync(path.join(outProjs, 'proj-4.json'), JSON.stringify(proj4, null, 2));
fs.writeFileSync(path.join(outProjs, 'proj-5.json'), JSON.stringify(proj5, null, 2));

console.log('Detailed JSON overrides created successfully.');
