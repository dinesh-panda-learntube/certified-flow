export const profile = {
  name: "Dinesh Panda",
  currentRole: "Talent Recruiter",
  targetRole: "HR Manager",
  experience: "1–5 years",
  goal: "Get a Good Job",
};

export const skills = [
  {
    id: "skill-1",
    title: "Stakeholder Management (HR)",
    rating: 5,
    meta: "Timed quiz • ~2 minutes",
    match: "82%",
    salaryRange: "₹6.5L–₹9L",
    demandSignal: "Core capability for mid-sized HR teams",
  },
  {
    id: "skill-2",
    title: "Interviewing & Candidate Evaluation",
    rating: 5,
    meta: "Timed quiz • ~2 minutes",
    match: "88%",
    salaryRange: "₹6L–₹8.5L",
    demandSignal: "High recruiter-to-manager transition fit",
  },
  {
    id: "skill-3",
    title: "Employee Relations & Conflict Handling",
    rating: 5,
    meta: "Timed quiz • ~2 minutes",
    match: "74%",
    salaryRange: "₹7L–₹10L",
    demandSignal: "Key requirement in enterprise HR ops",
  },
  {
    id: "skill-4",
    title: "HR Policies & Documentation",
    rating: 5,
    meta: "Timed quiz • ~2 minutes",
    match: "69%",
    salaryRange: "₹6L–₹8L",
    demandSignal: "Compliance-critical function",
  },
  {
    id: "skill-5",
    title: "Onboarding & Joining Experience",
    rating: 5,
    meta: "Timed quiz • ~2 minutes",
    match: "79%",
    salaryRange: "₹6.5L–₹9.5L",
    demandSignal: "Fast-growing HR function",
  },
];

export const certifications = [
  {
    id: "cert-1",
    title: "HR Generalist Foundations (Framework-Aligned)",
    caption:
      "Assessment mapped to core HR responsibilities (policies, employee lifecycle, documentation) with timed scenario scoring.",
    match: "76%",
    salaryRange: "₹8L–₹12L",
    industrySignal: "Mid-Sized & Enterprise HR Teams",
    cvSignal: "Found in 58% HR Manager CVs at MNCs",
  },
  {
    id: "cert-2",
    title: "Employee Relations & Grievance Handling",
    caption:
      "Case-based evaluation using workplace incident artefacts (statements, chat logs, policy clauses) to test judgement and fairness.",
    match: "72%",
    salaryRange: "₹8.5L–₹12L",
    industrySignal: "Compliance-Heavy Organisations",
    cvSignal: "Seen across 3/5 top consulting HR profiles",
  },
  {
    id: "cert-3",
    title: "Performance Management & Feedback Cycles",
    caption:
      "Practical assessment on goal setting, review cycles, and manager communications—evaluated on clarity, process accuracy, and decisions.",
    match: "91%",
    salaryRange: "₹7L–₹10L",
    industrySignal: "Growth-Stage Companies",
    cvSignal: "Appears in 64% fast-scaling startup HR CVs",
  },
  {
    id: "cert-4",
    title: "HR Operations, Compliance & Records",
    caption:
      "Checklist-driven assessment focused on compliant documentation, process rigor, and error-avoidance in HR ops workflows.",
    match: "68%",
    salaryRange: "₹9L–₹13L",
    industrySignal: "Multi-Location Enterprises",
    cvSignal: "Common in enterprise audit-ready HR teams",
  },
  {
    id: "cert-5",
    title: "People Analytics Basics (HR Metrics)",
    caption:
      "Timed dashboard questions on attrition, hiring funnel, and engagement metrics—tests insight, not memorization.",
    match: "63%",
    salaryRange: "₹9L–₹14L",
    industrySignal: "Data-Driven HR Functions",
    cvSignal: "Increasing adoption in top 20% HR CVs",
  },
];

export const projects = [
  {
    id: "proj-1",
    title: "Resolve an Employee Grievance Case (End-to-End)",
    evidence: "Chat thread + incident notes + policy excerpt + resolution email draft",
    deliverables: ["Decision summary", "Risk notes", "Final email"],
    tools: ["ChatGPT", "Claude"],
    match: "84%",
    salaryRange: "₹8L–₹11L",
    outcomes: [
      "Resolved disputes 35% faster while avoiding external legal costs",
      "Reduced compliance exposure by 20% through structured case mapping",
    ],
  },
  {
    id: "proj-2",
    title: "Design a 30-Day Onboarding Plan for a New Hire",
    evidence: "Onboarding checklist + manager brief + weekly plan template",
    deliverables: ["30-day plan", "Stakeholder plan", "Success metrics"],
    tools: ["ChatGPT", "Claude"],
    match: "87%",
    salaryRange: "₹7L–₹10L",
    outcomes: [
      "Improved new hire productivity ramp-up by 25% without extra HR bandwidth",
      "Cut coordination time by 30% using AI-driven milestone design",
    ],
  },
  {
    id: "proj-3",
    title: "Create an HR Policy Update (Leave / Attendance / WFH)",
    evidence: "Policy document + exceptions table + FAQ draft",
    deliverables: ["Revised policy", "FAQ", "Rollout note"],
    tools: ["Google Docs", "Notion"],
    match: "71%",
    salaryRange: "₹8L–₹12L",
    outcomes: [
      "Reduced clarification queries by 40% after structured rewrite",
      "Accelerated approval turnaround by 30% through collaborative workflows",
    ],
  },
  {
    id: "proj-4",
    title: "Run a Hiring Loop for One Role (From JD to Offer)",
    evidence: "JD artefact + shortlist board + interview scorecard + offer note",
    deliverables: ["Shortlist rationale", "Scorecard", "Offer email"],
    tools: ["Notion", "Airtable"],
    match: "90%",
    salaryRange: "₹7L–₹10L",
    outcomes: [
      "Shortened evaluation cycles by 28% while increasing decision clarity",
      "Lowered bias risk by 22% via competency-based scoring",
    ],
  },
  {
    id: "proj-5",
    title: "Prepare a Monthly HR Ops Report (Hiring + Attrition + Open Roles)",
    evidence: "Tracker sheet + dashboard snapshot + summary doc",
    deliverables: ["Insights", "Actions", "Risks"],
    tools: ["Power BI", "Tableau"],
    match: "65%",
    salaryRange: "₹9L–₹14L",
    outcomes: [
      "Detected attrition risks 30% earlier without expanding data scope",
      "Lowered reactive hiring spend by 18% using predictive metrics",
    ],
  },
];

export const quizQuestions = {
  "skill-1": [
    {
      q: "A line manager resists the new attendance policy you helped draft. What's your first response?",
      options: [
        "Escalate to their manager immediately",
        "Schedule a 1-on-1 to understand their concern",
        "Send a formal email restating the policy",
        "Ignore until they comply",
      ],
      answer: 1,
    },
    {
      q: "During a workforce planning meeting, finance disagrees with your headcount proposal. You should?",
      options: [
        "Accept finance's numbers without pushback",
        "Present data on attrition cost vs. hiring cost",
        "Walk out and send a follow-up email",
        "Ask the CEO to intervene",
      ],
      answer: 1,
    },
    {
      q: "Which metric best shows HR's impact to business stakeholders?",
      options: [
        "Number of employee events organized",
        "Cost-per-hire and time-to-productivity",
        "Total resumes screened",
        "HR team headcount",
      ],
      answer: 1,
    },
    {
      q: "A department head wants to skip the interview process for a referral. What do you do?",
      options: [
        "Agree to maintain the relationship",
        "Report them to compliance",
        "Explain the hiring policy and offer a fast-track within process",
        "Let recruitment handle it",
      ],
      answer: 2,
    },
    {
      q: "When presenting HR strategy to the leadership team, what should you lead with?",
      options: [
        "The number of open positions",
        "Business-aligned outcomes and measurable KPIs",
        "Employee complaint statistics",
        "A detailed HRIS demo",
      ],
      answer: 1,
    },
  ],
  "skill-2": [
    {
      q: "A candidate answers vaguely in a competency-based interview. What should you do?",
      options: [
        "Move to the next question",
        "Use a probing follow-up like 'Can you walk me through a specific example?'",
        "Mark the answer as unsatisfactory",
        "End the interview early",
      ],
      answer: 1,
    },
    {
      q: "What's the primary purpose of a structured interview?",
      options: [
        "To make interviews shorter",
        "To ensure every candidate gets the same evaluation criteria",
        "To avoid legal issues",
        "To impress the candidate",
      ],
      answer: 1,
    },
    {
      q: "Which is the best way to reduce unconscious bias during interviews?",
      options: [
        "Have only one interviewer",
        "Use a standardized scorecard with predefined competencies",
        "Rely on gut feeling",
        "Ask personal questions to build rapport",
      ],
      answer: 1,
    },
    {
      q: "A hiring manager insists on a 'culture fit' rejection without evidence. You should?",
      options: [
        "Accept the decision",
        "Ask for specific behavioral examples that support the rejection",
        "Hire the candidate anyway",
        "Ignore the feedback",
      ],
      answer: 1,
    },
    {
      q: "What's the STAR method used for in interviews?",
      options: [
        "Rating candidates on a 5-star scale",
        "Structuring behavioral questions: Situation, Task, Action, Result",
        "A salary negotiation technique",
        "Screening resumes",
      ],
      answer: 1,
    },
  ],
  "skill-3": [
    {
      q: "Two team members have an ongoing conflict affecting productivity. First step?",
      options: [
        "Fire the more disruptive employee",
        "Meet each person individually to understand perspectives",
        "Send a group warning email",
        "Ignore it and hope it resolves",
      ],
      answer: 1,
    },
    {
      q: "An employee files a harassment complaint. What must be your immediate action?",
      options: [
        "Inform the accused immediately",
        "Document the complaint and initiate a formal investigation",
        "Tell the employee to resolve it themselves",
        "Wait for more complaints",
      ],
      answer: 1,
    },
    {
      q: "What is the key principle in handling employee grievances?",
      options: [
        "Speed over fairness",
        "Confidentiality, fairness, and documented process",
        "Always side with management",
        "Minimize HR involvement",
      ],
      answer: 1,
    },
    {
      q: "A manager asks you to terminate an employee without proper documentation. You should?",
      options: [
        "Process the termination immediately",
        "Explain the need for a PIP or documented warnings first",
        "Ask the employee to resign instead",
        "Delay indefinitely",
      ],
      answer: 1,
    },
    {
      q: "During mediation between two employees, the best approach is to?",
      options: [
        "Take sides with the senior employee",
        "Remain neutral and focus on shared outcomes",
        "Let them argue it out",
        "Threaten disciplinary action for both",
      ],
      answer: 1,
    },
  ],
  "skill-4": [
    {
      q: "When updating an attendance policy, what's the first thing you should review?",
      options: [
        "Employee preferences",
        "Current labor laws and statutory requirements",
        "Competitor policies",
        "Manager opinions",
      ],
      answer: 1,
    },
    {
      q: "An HR policy document should primarily be written for?",
      options: [
        "Legal teams only",
        "All employees — clear, simple, and actionable",
        "Senior management only",
        "External auditors",
      ],
      answer: 1,
    },
    {
      q: "What's essential when rolling out a new WFH policy?",
      options: [
        "Announce via email and move on",
        "Communicate clearly, train managers, collect feedback, and iterate",
        "Let managers decide on their own",
        "Copy a competitor's policy",
      ],
      answer: 1,
    },
    {
      q: "Which document is legally required to be maintained for every employee in India?",
      options: [
        "Birthday calendar",
        "Appointment letter and salary records",
        "Team outing records",
        "LinkedIn profile backup",
      ],
      answer: 1,
    },
    {
      q: "How often should HR policies be reviewed?",
      options: [
        "Only when there's a legal issue",
        "At least annually or when regulations change",
        "Every 5 years",
        "Never — once written, they're final",
      ],
      answer: 1,
    },
  ],
  "skill-5": [
    {
      q: "What's the most critical element of a Day 1 onboarding experience?",
      options: [
        "A welcome party",
        "Clear communication of role expectations, tools access, and team introductions",
        "A long orientation presentation",
        "Giving them a company t-shirt",
      ],
      answer: 1,
    },
    {
      q: "A new hire feels lost after their first week. Most likely cause?",
      options: [
        "They aren't smart enough",
        "No structured onboarding plan or buddy was assigned",
        "The office is too big",
        "They should have figured it out",
      ],
      answer: 1,
    },
    {
      q: "What's the ideal duration for a structured onboarding program?",
      options: [
        "Just Day 1",
        "30-60-90 days with clear milestones",
        "1 week maximum",
        "Until the employee asks to stop",
      ],
      answer: 1,
    },
    {
      q: "Pre-boarding (before Day 1) should include?",
      options: [
        "Nothing — wait until they arrive",
        "Welcome email, document submission, tools setup, and team intro",
        "Just the offer letter",
        "A surprise party plan",
      ],
      answer: 1,
    },
    {
      q: "How do you measure onboarding effectiveness?",
      options: [
        "By how happy the new hire seems",
        "Time-to-productivity, 90-day retention rate, and manager feedback",
        "By the number of documents signed",
        "Whether they attended all meetings",
      ],
      answer: 1,
    },
  ],
};

export const skillQuizData = {
  "skill-1": {
    quiz_id: "SKILL_SIM_01_HR_STAKEHOLDER_MGMT",
    simulation_title: "HR Stakeholder Management",
    timebox_seconds: 30,
    questions: [
      { q_id: "Q01", q: "A hiring manager wants \"urgent hiring\". What's your first clarification?", options: ["Role, deadline, and must-have skills", "Salary slips of last hires", "Office seating arrangement", "Leave policy for the team"], correct_index: 0 },
      { q_id: "Q02", q: "Best way to reduce back-and-forth on a JD request?", options: ["Use a structured intake checklist", "Ask them to call twice daily", "Send a long email thread", "Wait until they follow up"], correct_index: 0 },
      { q_id: "Q03", q: "Odd one out (people you align with on hiring):", options: ["Hiring manager", "Interview panel", "Finance partner", "Office electrician"], correct_index: 3 },
      { q_id: "Q04", q: "A candidate backs out. What should you update first?", options: ["Hiring manager with impact + options", "Company-wide announcement", "Social media post", "Payroll team ticket"], correct_index: 0 },
      { q_id: "Q05", q: "A stakeholder asks for daily updates. Best lightweight format?", options: ["3-line status: done/next/blocked", "A 2-page weekly report", "Only verbal updates", "Forward all candidate emails"], correct_index: 0 },
      { q_id: "Q06", q: "Which update is most useful to a busy manager?", options: ["Decision needed + deadline + 2 options", "Full interview transcripts", "All chat screenshots", "Only \"working on it\""], correct_index: 0 },
      { q_id: "Q07", q: "When should you escalate a hiring risk to HR leadership?", options: ["High impact and time-sensitive risk", "Any small scheduling issue", "Only after the role closes", "Only if a candidate asks"], correct_index: 0 },
      { q_id: "Q08", q: "A manager rejects all candidates without reasons. Best next step?", options: ["Ask for specific criteria + examples", "Stop sourcing immediately", "Argue that your picks are best", "Escalate without context"], correct_index: 0 },
      { q_id: "Q09", q: "Which is a clear success metric for a hiring sprint?", options: ["Time-to-shortlist meeting target", "Number of WhatsApp messages", "Length of the JD document", "Number of meetings scheduled"], correct_index: 0 },
      { q_id: "Q10", q: "You're blocked on approvals. Best way to unblock fast?", options: ["Pre-brief approvers with 1-pager", "Send reminders every hour", "Wait for next month", "Ask candidates to chase"], correct_index: 0 },
      { q_id: "Q11", q: "In HR work, \"stakeholder alignment\" mainly prevents\u2026", options: ["Rework from mismatched expectations", "More candidates applying", "More holidays being approved", "More tools being purchased"], correct_index: 0 },
      { q_id: "Q12", q: "Which message best communicates a delay?", options: ["Cause + new ETA + next step needed", "Busy now, will update later", "Not possible, please wait", "It's blocked, nothing to do"], correct_index: 0 },
      { q_id: "Q13", q: "A candidate shares sensitive info. What do you do?", options: ["Share only on need-to-know basis", "Forward to the whole panel", "Post it in group chat", "Add it to a public tracker"], correct_index: 0 },
      { q_id: "Q14", q: "Odd one out (good HR update habits):", options: ["Document decisions", "Confirm owners", "State deadlines", "Add personal opinions"], correct_index: 3 },
      { q_id: "Q15", q: "A stakeholder says \"Just do it\". Your best response?", options: ["Confirm scope + success criteria", "Start and hope it fits", "Do everything possible", "Ignore and proceed silently"], correct_index: 0 },
      { q_id: "Q16", q: "A manager wants complaint details. Best HR response?", options: ["Share summary and protect identities", "Share names to build trust", "Share full statements as proof", "Share in a team-wide email"], correct_index: 0 },
      { q_id: "Q17", q: "Which is the best use of a simple RACI in HR?", options: ["Clarify who does what in a process", "Calculate monthly payroll", "Write offer letters faster", "Set employee benefits pricing"], correct_index: 0 },
      { q_id: "Q18", q: "A stakeholder blocks you citing \"risk\". Best next step?", options: ["Ask the risk and offer alternatives", "Proceed without approval", "Wait silently", "Escalate to everyone"], correct_index: 0 },
      { q_id: "Q19", q: "Best weekly alignment method across multiple stakeholders?", options: ["One-page update with decisions needed", "Multiple long emails per person", "Only meetings, no notes", "No updates until final"], correct_index: 0 },
      { q_id: "Q20", q: "In a workplace issue, who should be informed first?", options: ["Direct owner/manager of the case", "Company-wide email list", "Social media community", "External vendors first"], correct_index: 0 },
    ],
  },
};

export const certScenarioData = {
  "cert-1": {
    simulation_id: "CERT_SIM_01_ENTERPRISE_HR_STRATEGY",
    certification_title: "Enterprise HR Strategy Certification",
    scenarios: [
      {
        scenario_id: "SC01",
        title: "Flipkart: Attrition Spike, 48 Hours",
        questions: [
          { q_id: "SC01_Q01", q: "You join Flipkart as HR Manager. Delivery ops attrition jumps 2x this week. CEO wants a 48-hour plan. What do you do first?", explain_this: "5 Whys: ask \u201cwhy\u201d repeatedly to reach root cause. Start with fast evidence to avoid fixing symptoms.", options: [{ text: "Pull exit reasons + shift data", feedback: "You get evidence fast and target the true drivers." }, { text: "Announce retention bonus today", feedback: "You spend money early but may miss the real cause." }, { text: "Replace the team lead", feedback: "You act fast but risk blame without proof." }, { text: "Wait for monthly survey results", feedback: "You protect process, but attrition compounds this week." }], correct_index: 0 },
          { q_id: "SC01_Q02", q: "Data shows exits peak after 30\u201345 days and mostly night shifts. What\u2019s the best next diagnostic step?", explain_this: "Cohort analysis: compare outcomes by group (e.g., shift, tenure). Pinpoints where intervention will move metrics fastest.", options: [{ text: "Compare night vs day onboarding", feedback: "You isolate process gaps tied to the shift cohort." }, { text: "Hire more recruiters immediately", feedback: "You add volume, but root cause stays untouched." }, { text: "Reduce hiring bar to fill faster", feedback: "You fill seats quickly, but quality and churn may rise." }, { text: "Change titles for the role", feedback: "You improve optics, but exits continue for the cohort." }], correct_index: 0 },
          { q_id: "SC01_Q03", q: "Managers disagree on who owns training, scheduling, and buddying. Which tool helps you assign ownership quickly?", explain_this: "RACI clarifies who is Responsible, Accountable, Consulted, Informed\u2014reduces confusion and prevents handoffs failing.", options: [{ text: "RACI for first 45 days", feedback: "You remove ambiguity and speed up execution." }, { text: "Write a long policy document", feedback: "You create clarity later, but lose the 48-hour window." }, { text: "Ask each manager to decide", feedback: "You move fast, but consistency breaks across teams." }, { text: "Create a new approval committee", feedback: "You add governance, but decisions slow down." }], correct_index: 0 },
          { q_id: "SC01_Q04", q: "In 48 hours, you must pick ONE move with fastest impact. Which decision is strongest?", explain_this: "Leading indicator: early signal (e.g., no-show rate) that moves before outcomes like attrition. Choose actions that shift leading indicators.", options: [{ text: "Fix night-shift onboarding gaps", feedback: "You reduce early friction where exits concentrate." }, { text: "Launch culture workshop series", feedback: "You build long-term engagement, but impact is slow." }, { text: "Run a company-wide townhall", feedback: "You show visibility, but local drivers remain." }, { text: "Rebrand the team name", feedback: "You improve perception, not early retention drivers." }], correct_index: 0 },
        ],
      },
      {
        scenario_id: "SC02",
        title: "Amazon India: ER Escalation Today",
        questions: [
          { q_id: "SC02_Q01", q: "At Amazon India, a harassment complaint escalates to HR within 2 hours. A director wants \u201cnames and details\u201d now. What do you share?", explain_this: "Need-to-know: share minimum necessary info to act. Protects confidentiality, reduces retaliation risk, preserves investigation integrity.", options: [{ text: "Share allegation summary + next steps", feedback: "You enable action while protecting confidentiality." }, { text: "Share full chat screenshots", feedback: "You accelerate context but raise privacy and bias risk." }, { text: "Share all names immediately", feedback: "You satisfy urgency but increase retaliation exposure." }, { text: "Share nothing until closure", feedback: "You protect privacy, but lose leadership alignment." }], correct_index: 0 },
          { q_id: "SC02_Q02", q: "You need to decide first action within 30 minutes. What\u2019s the most defensible immediate step?", explain_this: "Containment: stop harm while facts are gathered. Common first moves: separate reporting lines, limit contact, preserve evidence.", options: [{ text: "Implement interim no-contact plan", feedback: "You reduce risk while investigation proceeds." }, { text: "Send a warning to the accused", feedback: "You signal action, but may contaminate evidence." }, { text: "Ask both parties to \u201csort it\u201d", feedback: "You avoid process, but risk repeats and liability." }, { text: "Delay until manager returns", feedback: "You keep hierarchy, but risk escalates today." }], correct_index: 0 },
          { q_id: "SC02_Q03", q: "Evidence is fragmented (chat logs, witnesses, timelines). Which method structures the investigation best under time pressure?", explain_this: "Case file method: timeline + allegation map + evidence index. Keeps facts auditable and reduces inconsistent decisions.", options: [{ text: "Build a case timeline + evidence index", feedback: "You create an auditable, consistent investigation flow." }, { text: "Rely on manager verbal summary", feedback: "You move fast, but lose traceability and accuracy." }, { text: "Ask HR team for opinions", feedback: "You gather viewpoints, but facts stay unstructured." }, { text: "Start disciplinary action immediately", feedback: "You act decisively, but risk wrongful action claims." }], correct_index: 0 },
          { q_id: "SC02_Q04", q: "End of day: director asks if this can be closed quietly. What\u2019s your final decision for today?", explain_this: "Due process: consistent steps, documentation, neutrality. Protects company and employee rights; avoids \u201cinformal closure\u201d risks.", options: [{ text: "Proceed with formal investigation plan", feedback: "You reduce legal risk and protect organisational trust." }, { text: "Close informally with verbal warning", feedback: "You move quickly, but create repeat-risk and liability." }, { text: "Transfer the reporter quietly", feedback: "You contain conflict, but risk retaliation perception." }, { text: "Ask both to take leave", feedback: "You pause harm, but doesn\u2019t resolve root issue." }], correct_index: 0 },
        ],
      },
      {
        scenario_id: "SC03",
        title: "Infosys: Compliance Audit Tomorrow",
        questions: [
          { q_id: "SC03_Q01", q: "Infosys opens a new location. Payroll disputes emerge due to policy version mismatch. Audit is tomorrow. First containment step?", explain_this: "Single source of truth: one official version for policy. In crises, publish an interim rule to stop spread of inconsistent actions.", options: [{ text: "Publish interim rule + freeze changes", feedback: "You stop drift and reduce disputes before audit." }, { text: "Let each location decide locally", feedback: "You gain speed, but inconsistency increases disputes." }, { text: "Ignore until next payroll cycle", feedback: "You delay effort, but costs and distrust rise." }, { text: "Ask employees to check old emails", feedback: "You shift burden, but errors multiply at scale." }], correct_index: 0 },
          { q_id: "SC03_Q02", q: "You must show auditors control and traceability. Which control is strongest?", explain_this: "Version control: tracked edits, owners, and change logs. Auditors look for traceability: what changed, when, by whom, and why.", options: [{ text: "Policy repo + change log + owner", feedback: "You demonstrate traceability and accountability clearly." }, { text: "Multiple PDFs per business unit", feedback: "You move fast, but drift is inevitable." }, { text: "Verbal guidance from HRBP", feedback: "You simplify, but lack audit proof." }, { text: "Ask payroll to patch manually", feedback: "You fix symptoms, but disputes will recur." }], correct_index: 0 },
        ],
      },
    ],
  },
};

export const projectSimData = {
  "proj-1": {
    simulation_id: "PROJ_SIM_01_GRIEVANCE_RESOLUTION",
    project_title: "Employee Grievance Resolution With ChatGPT / Claude",
    tools_pair: ["ChatGPT", "Claude"],
    technical_skills: [
      { skill_id: "TS1", name: "Prompting For ER Triage", artefact_label: "ChatGPT Prompt", artefact_type: "prompt_snippet" },
      { skill_id: "TS2", name: "Building An ER Case Timeline", artefact_label: "Case Timeline Table", artefact_type: "table" },
    ],
    steps: [
      { step_id: "S01", step_type: "mcq", q: "An employee alleges harassment in a DM. Your first action as HR Manager is to\u2026", options: [{ text: "Acknowledge, ensure safety, capture basics" }, { text: "Forward the DM to the manager" }, { text: "Tell them to email a formal complaint" }, { text: "Ask both parties to talk it out" }], validation: { type: "single_choice_index", correct_index: 0 } },
      { step_id: "S02", step_type: "mcq", q: "A director asks \u201cwho reported this?\u201d What\u2019s your best response today?", options: [{ text: "Share high-level summary, protect identity" }, { text: "Share reporter name to build urgency" }, { text: "Share full chat logs for context" }, { text: "Refuse to share anything at all" }], validation: { type: "single_choice_index", correct_index: 0 } },
      { step_id: "S03", step_type: "artefact_fill", technical_skill_id: "TS1", q: "Complete the triage prompt (fast + safe).", artefact: { label: "ChatGPT Prompt", state: "You are an HR Manager. Triage this incident.\nReturn:\n1) Risk level: [RISK]\n2) First 3 actions in 2 hours: [ACTIONS]\n3) What NOT to do: [AVOID]\nIncident: Employee alleges harassment via DM; asks for confidentiality." }, targets: [{ token: "[RISK]", hint: "Choose risk level" }, { token: "[ACTIONS]", hint: "Choose 2-hour actions" }, { token: "[AVOID]", hint: "Choose what to avoid" }], interaction: { mode: "single_tap_per_blank", blank_order: ["[RISK]", "[ACTIONS]", "[AVOID]"] }, options_by_target: { "[RISK]": ["High", "Medium", "Low", "Unclear"], "[ACTIONS]": ["Safety check + interim no-contact + preserve evidence", "Ask both to resolve directly + close quickly", "Send policy reminder to team + monitor", "Wait for manager input + decide later"], "[AVOID]": ["Name-sharing or broadcasting details", "Documenting anything until closure", "Pausing contact between parties", "Asking clarifying questions"] }, validation: { type: "final_state_match", correct_final_state: "You are an HR Manager. Triage this incident.\nReturn:\n1) Risk level: High\n2) First 3 actions in 2 hours: Safety check + interim no-contact + preserve evidence\n3) What NOT to do: Name-sharing or broadcasting details\nIncident: Employee alleges harassment via DM; asks for confidentiality." } },
      { step_id: "S04", step_type: "artefact_fill", technical_skill_id: "TS1", q: "Make the prompt\u2019s questions neutral and evidence-driven.", artefact: { label: "ChatGPT Prompt", state: "Add: \u201cQuestions to ask the reporter\u201d.\nGenerate 5 questions that are [STYLE1], [STYLE2], and avoid [AVOID1]." }, targets: [{ token: "[STYLE1]", hint: "Choose style" }, { token: "[STYLE2]", hint: "Choose style" }, { token: "[AVOID1]", hint: "Choose what to avoid" }], interaction: { mode: "single_tap_per_blank", blank_order: ["[STYLE1]", "[STYLE2]", "[AVOID1]"] }, options_by_target: { "[STYLE1]": ["fact-based", "emotion-led", "manager-led", "assumption-led"], "[STYLE2]": ["time-anchored", "opinion-based", "binary-only", "hypothetical"], "[AVOID1]": ["leading questions", "timelines", "specific examples", "incident details"] }, validation: { type: "final_state_match", correct_final_state: "Add: \u201cQuestions to ask the reporter\u201d.\nGenerate 5 questions that are fact-based, time-anchored, and avoid leading questions." } },
      { step_id: "S05", step_type: "artefact_fill", technical_skill_id: "TS1", q: "Remove the highest-risk output request from the prompt.", artefact: { label: "ChatGPT Prompt", state: "Draft outputs must include:\nA) Risk level + 2-hour actions\nB) Suggested message to the manager\nC) [REMOVE_LINE]\nD) Confidentiality-safe status update for leadership" }, targets: [{ token: "[REMOVE_LINE]", hint: "Choose the line to remove" }], interaction: { mode: "single_tap_one_blank", blank_order: ["[REMOVE_LINE]"] }, options_by_target: { "[REMOVE_LINE]": ["Recommended disciplinary action for the accused", "A list of rumours from the team", "A public announcement for all employees", "Reporter identity and personal details"] }, validation: { type: "final_state_match", correct_final_state: "Draft outputs must include:\nA) Risk level + 2-hour actions\nB) Suggested message to the manager\nC) \nD) Confidentiality-safe status update for leadership" } },
      { step_id: "S06", step_type: "artefact_fill", technical_skill_id: "TS1", q: "Make outputs scannable for fast execution.", artefact: { label: "ChatGPT Prompt", state: "Final instruction: \u201cWrite outputs as [FORMAT]. Include a short [ADDON] for each action.\u201d" }, targets: [{ token: "[FORMAT]", hint: "Choose format" }, { token: "[ADDON]", hint: "Choose add-on" }], interaction: { mode: "single_tap_per_blank", blank_order: ["[FORMAT]", "[ADDON]"] }, options_by_target: { "[FORMAT]": ["bullet points", "long paragraphs", "legal clauses", "chatty story"], "[ADDON]": ["rationale", "personal opinion", "rumour source", "emotion score"] }, validation: { type: "final_state_match", correct_final_state: "Final instruction: \u201cWrite outputs as bullet points. Include a short rationale for each action.\u201d" } },
      { step_id: "S07", step_type: "artefact_fill", technical_skill_id: "TS2", q: "Fill the missing time to complete the first row.", artefact: { label: "Case Timeline Table", state: "| Time | Event | Source | Risk |\n|---|---|---|---|\n| [TIME1] | DM received: harassment allegation | Reporter | High |\n| 10:10 | Safety check initiated | HR | High |" }, targets: [{ token: "[TIME1]", hint: "Choose the time" }], interaction: { mode: "single_tap_one_blank", blank_order: ["[TIME1]"] }, options_by_target: { "[TIME1]": ["10:00", "09:00", "10:30", "12:00"] }, validation: { type: "final_state_match", correct_final_state: "| Time | Event | Source | Risk |\n|---|---|---|---|\n| 10:00 | DM received: harassment allegation | Reporter | High |\n| 10:10 | Safety check initiated | HR | High |" } },
      { step_id: "S08", step_type: "artefact_fill", technical_skill_id: "TS2", q: "Add the safest containment event to the timeline.", artefact: { label: "Case Timeline Table", state: "| Time | Event | Source | Risk |\n|---|---|---|---|\n| 10:00 | DM received: harassment allegation | Reporter | High |\n| 10:10 | Safety check initiated | HR | High |\n| 10:20 | [EVENT1] | HR | High |" }, targets: [{ token: "[EVENT1]", hint: "Choose the event text" }], interaction: { mode: "single_tap_one_blank", blank_order: ["[EVENT1]"] }, options_by_target: { "[EVENT1]": ["Interim no-contact plan set", "Accused warned by email", "Reporter told to ignore it", "Team notified to stay calm"] }, validation: { type: "final_state_match", correct_final_state: "| Time | Event | Source | Risk |\n|---|---|---|---|\n| 10:00 | DM received: harassment allegation | Reporter | High |\n| 10:10 | Safety check initiated | HR | High |\n| 10:20 | Interim no-contact plan set | HR | High |" } },
      { step_id: "S09", step_type: "artefact_ordering", technical_skill_id: "TS2", q: "Tap to order the next 3 timeline events (one tap per choice).", artefact: { label: "Case Timeline Table", state: "| Time | Event | Source | Risk |\n|---|---|---|---|\n| 10:00 | DM received: harassment allegation | Reporter | High |\n| 10:10 | Safety check initiated | HR | High |\n| 10:20 | Interim no-contact plan set | HR | High |\n| 10:25 | [STEP_A] | HR | High |\n| 10:40 | [STEP_B] | HR | High |\n| 11:10 | [STEP_C] | HR | Med |" }, targets_in_order: ["[STEP_A]", "[STEP_B]", "[STEP_C]"], pieces: ["Evidence preserved", "Reporter interview scheduled", "Witness check initiated", "Accused interview scheduled"], validation: { type: "final_state_match", correct_final_state: "| Time | Event | Source | Risk |\n|---|---|---|---|\n| 10:00 | DM received: harassment allegation | Reporter | High |\n| 10:10 | Safety check initiated | HR | High |\n| 10:20 | Interim no-contact plan set | HR | High |\n| 10:25 | Evidence preserved | HR | High |\n| 10:40 | Reporter interview scheduled | HR | High |\n| 11:10 | Witness check initiated | HR | Med |" } },
      { step_id: "S10", step_type: "artefact_fill", technical_skill_id: "TS2", q: "Complete the leadership update line (safe, measurable, no identities).", artefact: { label: "Case Timeline Table", state: "Leadership note (add to record):\n\u201cStatus: [STATUS1]. Next decision needed by: [TIME2].\u201d" }, targets: [{ token: "[STATUS1]", hint: "Choose status text" }, { token: "[TIME2]", hint: "Choose a deadline" }], interaction: { mode: "single_tap_per_blank", blank_order: ["[STATUS1]", "[TIME2]"] }, options_by_target: { "[STATUS1]": ["Containment in place; fact-finding underway", "Accused is guilty; action planned", "Reporter is overreacting; closing soon", "Names shared widely; waiting"], "[TIME2]": ["6 PM", "Tomorrow", "Next week", "Whenever possible"] }, validation: { type: "final_state_match", correct_final_state: "Leadership note (add to record):\n\u201cStatus: Containment in place; fact-finding underway. Next decision needed by: 6 PM.\u201d" } },
    ],
  },
};
