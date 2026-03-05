import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, 'src', 'data', 'profileData.js');

const module = await import('file://' + dataPath);
const { skills, certifications, projects, quizQuestions, skillQuizData, certScenarioData, projectSimData } = module;

const outSkills = path.join(__dirname, 'src', 'data', 'skills');
const outCerts = path.join(__dirname, 'src', 'data', 'certs');
const outProjs = path.join(__dirname, 'src', 'data', 'projects');

fs.mkdirSync(outSkills, { recursive: true });
fs.mkdirSync(outCerts, { recursive: true });
fs.mkdirSync(outProjs, { recursive: true });

// SKILLS
fs.writeFileSync(path.join(outSkills, 'skill-1.json'), JSON.stringify(skillQuizData['skill-1'], null, 2));

for (let i = 2; i <= 5; i++) {
  const skillId = `skill-${i}`;
  const skillInfo = skills.find(s => s.id === skillId);
  const qData = quizQuestions[skillId] || [];
  
  const formattedQuestions = qData.map((q, idx) => ({
    q_id: `Q${String(idx+1).padStart(2, '0')}`,
    q: q.q,
    options: q.options,
    correct_index: q.answer
  }));

  const out = {
    quiz_id: `SKILL_SIM_0${i}_${skillInfo.title.replace(/[^A-Za-z0-9]/g, '_').toUpperCase()}`,
    simulation_title: skillInfo.title,
    timebox_seconds: 30,
    questions: formattedQuestions
  };
  fs.writeFileSync(path.join(outSkills, `${skillId}.json`), JSON.stringify(out, null, 2));
}

// CERTS
fs.writeFileSync(path.join(outCerts, 'cert-1.json'), JSON.stringify(certScenarioData['cert-1'], null, 2));

for (let i = 2; i <= 5; i++) {
  const certId = `cert-${i}`;
  const certInfo = certifications.find(c => c.id === certId);
  
  const out = {
    simulation_id: `CERT_SIM_0${i}_${certInfo.title.replace(/[^A-Za-z0-9]/g, '_').toUpperCase()}`,
    certification_title: certInfo.title,
    scenarios: [
      {
        scenario_id: `SC0${i}`,
        title: `${certInfo.title} Scenario`,
        questions: [
          { 
            q_id: `SC0${i}_Q01`, 
            q: `You are dealing with an issue related to ${certInfo.title}. What is your first action?`, 
            explain_this: "Initial assessment is critical.", 
            options: [
              { text: "Assess the situation thoroughly before taking action.", feedback: "Good, you must understand the context." }, 
              { text: "Take immediate drastic action.", feedback: "Too hasty." },
              { text: "Ignore the issue.", feedback: "Inappropriate." },
              { text: "Delegate without context.", feedback: "Poor leadership." }
            ], 
            correct_index: 0 
          },
          { 
            q_id: `SC0${i}_Q02`, 
            q: `Which tool or approach should be used next for ${certInfo.title}?`, 
            explain_this: "Structuring the response is key.", 
            options: [
              { text: "Document all evidence and create a structured plan.", feedback: "Excellent, documentation is key." }, 
              { text: "Rely on memory and verbal instructions.", feedback: "Prone to error." },
              { text: "Wait for the situation to resolve naturally.", feedback: "Ineffective." },
              { text: "Escalate immediately without details.", feedback: "Lacks problem-solving." }
            ], 
            correct_index: 0 
          }
        ]
      }
    ]
  };
  fs.writeFileSync(path.join(outCerts, `${certId}.json`), JSON.stringify(out, null, 2));
}

// PROJECTS
fs.writeFileSync(path.join(outProjs, 'proj-1.json'), JSON.stringify(projectSimData['proj-1'], null, 2));

for (let i = 2; i <= 5; i++) {
  const projId = `proj-${i}`;
  const projInfo = projects.find(p => p.id === projId);
  
  const out = {
    simulation_id: `PROJ_SIM_0${i}_${projInfo.title.replace(/[^A-Za-z0-9]/g, '_').toUpperCase()}`,
    project_title: projInfo.title,
    tools_pair: projInfo.tools,
    technical_skills: [
      { skill_id: "TS1", name: "Core Setup", artefact_label: "Draft Plan", artefact_type: "prompt_snippet" }
    ],
    steps: [
      { 
        step_id: `S${i}01`, 
        step_type: "mcq", 
        q: `What is the first step when starting the project: ${projInfo.title}?`, 
        options: [
          { text: "Define the scope and gather initial requirements." }, 
          { text: "Start writing the final report immediately." }, 
          { text: "Ask the team to complete it." }, 
          { text: "Wait for further instructions." }
        ], 
        validation: { type: "single_choice_index", correct_index: 0 } 
      },
      { 
        step_id: `S${i}02`, 
        step_type: "artefact_fill", 
        technical_skill_id: "TS1", 
        q: "Fill in the draft plan template with the correct action.", 
        artefact: { label: "Draft Plan", state: "Initial Action: [ACTION]\nExpected Result: Success" }, 
        targets: [{ token: "[ACTION]", hint: "Choose the action" }], 
        interaction: { mode: "single_tap_one_blank", blank_order: ["[ACTION]"] }, 
        options_by_target: { "[ACTION]": ["Analyze requirements", "Skip planning", "Guess outcomes"] }, 
        validation: { type: "final_state_match", correct_final_state: "Initial Action: Analyze requirements\nExpected Result: Success" } 
      }
    ]
  };
  fs.writeFileSync(path.join(outProjs, `${projId}.json`), JSON.stringify(out, null, 2));
}

console.log('Successfully generated JSON files.');
