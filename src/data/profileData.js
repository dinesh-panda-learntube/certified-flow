export const profile = {
  name: "Your Name Here",
  currentRole: "HR Professional",
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
    title: "HR Generalist Certification",
    caption: "Validated expertise in core HR policies and lifecycles.",
    match: "76%",
    salaryRange: "₹8L–₹12L",
    industrySignal: "Mid-Sized & Enterprise HR Teams",
    cvSignal: "Found in 58% HR Manager CVs at MNCs",
  },
  {
    id: "cert-2",
    title: "Employee Relations Certification",
    caption: "Proven ability to resolve workplace incidents fairly.",
    match: "72%",
    salaryRange: "₹8.5L–₹12L",
    industrySignal: "Compliance-Heavy Organisations",
    cvSignal: "Seen across 3/5 top consulting HR profiles",
  },
  {
    id: "cert-3",
    title: "Performance Mgt Certification",
    caption: "Demonstrated skill in goal setting and review cycles.",
    match: "91%",
    salaryRange: "₹7L–₹10L",
    industrySignal: "Growth-Stage Companies",
    cvSignal: "Appears in 64% fast-scaling startup HR CVs",
  },
  {
    id: "cert-4",
    title: "HR Operations Certification",
    caption: "Certified rigor in HR compliance and error-free ops.",
    match: "68%",
    salaryRange: "₹9L–₹13L",
    industrySignal: "Multi-Location Enterprises",
    cvSignal: "Common in enterprise audit-ready HR teams",
  },
  {
    id: "cert-5",
    title: "People Analytics Certification",
    caption: "Data-driven HR competency in metrics and analytics.",
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

import { importedSkills, importedCerts, importedProjects } from './simulationsData';

export const skillQuizData = {
  "skill-1": importedSkills["skill-1"],
  "skill-2": importedSkills["skill-2"],
  "skill-3": importedSkills["skill-3"],
  "skill-4": importedSkills["skill-4"],
  "skill-5": importedSkills["skill-5"],
};

export const certScenarioData = importedCerts;

export const projectSimData = importedProjects;
