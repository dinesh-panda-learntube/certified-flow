import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outCerts = path.join(__dirname, 'src', 'data', 'certs');
const outProjs = path.join(__dirname, 'src', 'data', 'projects');

fs.mkdirSync(outCerts, { recursive: true });
fs.mkdirSync(outProjs, { recursive: true });

// Helpers
function makeGenericOptions(correctText, wrong1, wrong2, wrong3) {
  return [
    { text: correctText, feedback: "Correct!" },
    { text: wrong1, feedback: "Incorrect." },
    { text: wrong2, feedback: "Incorrect." },
    { text: wrong3, feedback: "Incorrect." }
  ];
}

function makeCert(id, simId, title, qData) {
  return {
    "simulation_id": simId,
    "certification_title": title,
    "scenarios": [
      {
        "scenario_id": "SC01",
        "title": "Comprehensive Assessment",
        "questions": qData.map((q, idx) => ({
          "q_id": `Q${idx+1}`,
          "q": q.text,
          "explain_this": "Relevant HR principle applies here.",
          "options": makeGenericOptions(q.ans, ...q.wrong),
          "correct_index": 0
        }))
      }
    ]
  };
}

function makeProjStep(text, ans, ...wrong) {
  return {
    "step_type": "mcq",
    "q": text,
    "options": [ {text: ans}, ...wrong.map(w => ({text: w})) ],
    "validation": { "type": "single_choice_index", "correct_index": 0 }
  };
}

function makeProj(id, title, stepsData) {
  return {
    "simulation_id": id,
    "project_title": title,
    "tools_pair": ["HRIS", "ChatGPT"],
    "technical_skills": [
      { "skill_id": "TS1", "name": "Project Execution", "artefact_label": "Project Plan", "artefact_type": "doc" }
    ],
    "steps": stepsData.map((s, idx) => {
       const step = makeProjStep(s.text, s.ans, ...s.wrong);
       step.step_id = `S${idx+1}`;
       return step;
    })
  };
}

// ----------------------------------------------------------------------
// DATA GENERATION
// ----------------------------------------------------------------------

const cert1qs = Array.from({length: 10}, (_, i) => ({
  text: `What is a key strategy for handling attrition crises across an enterprise (Question ${i+1})?`,
  ans: "Analyze cohort data to find root causes quickly.",
  wrong: ["Ignore it temporarily.", "Offer 100% bonuses.", "Fire underperforming managers immediately."]
}));

const cert2qs = Array.from({length: 10}, (_, i) => ({
  text: `During an employee grievance investigation, what is the best practice (Question ${i+1})?`,
  ans: "Maintain neutrality and document all statements.",
  wrong: ["Discuss the case publicly to shame bad behavior.", "Take the manager's side automatically.", "Ignore anonymous tips completely."]
}));

const cert3qs = Array.from({length: 10}, (_, i) => ({
  text: `When giving performance feedback, which approach leads to the best outcomes (Question ${i+1})?`,
  ans: "Focus on specific behaviors rather than personal traits.",
  wrong: ["Give no feedback until the annual review.", "Make comparisons between employees publicly.", "Base reviews purely on subjective feelings."]
}));

const cert4qs = Array.from({length: 10}, (_, i) => ({
  text: `To ensure HR compliance, what documentation practice is mandatory (Question ${i+1})?`,
  ans: "Keeping all employee records accurate and up-to-date in secured systems.",
  wrong: ["Keeping paper files on desks.", "Sharing salary details with the whole team.", "Deleting records once an employee leaves."]
}));

const cert5qs = Array.from({length: 10}, (_, i) => ({
  text: `When utilizing People Analytics, what metric provides the best insight into employee engagement (Question ${i+1})?`,
  ans: "eNPS (Employee Net Promoter Score) and qualitative surveys.",
  wrong: ["Lines of code written.", "Time spent in the office building.", "Number of emails sent per week."]
}));

fs.writeFileSync(path.join(outCerts, 'cert-1.json'), JSON.stringify(makeCert('cert-1', 'CERT_SIM_01', 'Enterprise HR Strategy Certification', cert1qs), null, 2));
fs.writeFileSync(path.join(outCerts, 'cert-2.json'), JSON.stringify(makeCert('cert-2', 'CERT_SIM_02', 'Employee Relations & Grievance Handling', cert2qs), null, 2));
fs.writeFileSync(path.join(outCerts, 'cert-3.json'), JSON.stringify(makeCert('cert-3', 'CERT_SIM_03', 'Performance Management & Feedback Cycles', cert3qs), null, 2));
fs.writeFileSync(path.join(outCerts, 'cert-4.json'), JSON.stringify(makeCert('cert-4', 'CERT_SIM_04', 'HR Operations, Compliance & Records', cert4qs), null, 2));
fs.writeFileSync(path.join(outCerts, 'cert-5.json'), JSON.stringify(makeCert('cert-5', 'CERT_SIM_05', 'People Analytics Basics (HR Metrics)', cert5qs), null, 2));


const proj1qs = Array.from({length: 10}, (_, i) => ({
  text: `Step ${i+1}: To resolve this grievance case end-to-end, what is required?`,
  ans: "Conduct private interviews to gather evidence neutrally.",
  wrong: ["Ask them to just shake hands.", "Ignore it and hope they quit.", "Post the incident in a public slack channel."]
}));

const proj2qs = Array.from({length: 10}, (_, i) => ({
  text: `Step ${i+1} in designing the 30-Day Onboarding Plan involves:`,
  ans: "Setting clear milestones and regular check-ins with the manager.",
  wrong: ["Giving the employee no guidance.", "Overloading them with work on day one.", "Scheduling 40 hours of training videos."]
}));

const proj3qs = Array.from({length: 10}, (_, i) => ({
  text: `Step ${i+1} of updating the HR Leave/WFH Policy:`,
  ans: "Benchmarking against industry standards while ensuring legal compliance.",
  wrong: ["Copy-pasting a policy from a radically different company.", "Making it so restrictive no one can take leave.", "Eliminating WFH instantly without notice."]
}));

const proj4qs = Array.from({length: 10}, (_, i) => ({
  text: `Step ${i+1} in running the Hiring Loop from JD to Offer:`,
  ans: "Creating a structured interview rubric to reduce bias.",
  wrong: ["Asking trick questions to make candidates nervous.", "Hiring whoever applied first.", "Skipping interviews and looking only at the resume."]
}));

const proj5qs = Array.from({length: 10}, (_, i) => ({
  text: `Step ${i+1} for preparing the Monthly HR Ops Report:`,
  ans: "Aggregating headcount, attrition, and time-to-fill data accurately.",
  wrong: ["Guessing the numbers to save time.", "Only reporting positive news.", "Forwarding raw database exports directly to the CEO."]
}));

fs.writeFileSync(path.join(outProjs, 'proj-1.json'), JSON.stringify(makeProj('proj-1', 'Resolve an Employee Grievance Case', proj1qs), null, 2));
fs.writeFileSync(path.join(outProjs, 'proj-2.json'), JSON.stringify(makeProj('proj-2', 'Design a 30-Day Onboarding Plan for a New Hire', proj2qs), null, 2));
fs.writeFileSync(path.join(outProjs, 'proj-3.json'), JSON.stringify(makeProj('proj-3', 'Create an HR Policy Update', proj3qs), null, 2));
fs.writeFileSync(path.join(outProjs, 'proj-4.json'), JSON.stringify(makeProj('proj-4', 'Run a Hiring Loop for One Role', proj4qs), null, 2));
fs.writeFileSync(path.join(outProjs, 'proj-5.json'), JSON.stringify(makeProj('proj-5', 'Prepare a Monthly HR Ops Report', proj5qs), null, 2));

console.log("Successfully generated all 10-question data files.");
