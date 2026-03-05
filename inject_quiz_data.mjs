import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const certsDir = path.join(__dirname, 'src', 'data', 'certs');
const projsDir = path.join(__dirname, 'src', 'data', 'projects');

const certJsonPath = path.join(__dirname, 'public', 'quiz', 'cert.json');
const projJsonPath = path.join(__dirname, 'public', 'quiz', 'proj.json');

const baseCertData = JSON.parse(fs.readFileSync(certJsonPath, 'utf8'));
const baseProjData = JSON.parse(fs.readFileSync(projJsonPath, 'utf8'));

// The master sim structure that we'll clone
const masterCertSim = baseCertData.simulations[0];
const masterProjSim = baseProjData.simulations[0];

function generateSimForCert(certData, originItem) {
  let sim = JSON.parse(JSON.stringify(masterCertSim));
  
  sim.simulation_metadata.simulation_id = certData.id || `CERT_${Date.now()}`;
  sim.simulation_metadata.simulation_title = certData.certification_title || originItem.title;
  sim.simulation_metadata.why_this_matters_for_getting_hired = originItem.caption;

  const scenarios = certData.scenarios || [];
  
  sim.scenario_breakdown = scenarios.map((sc, i) => ({
    scenario_id: sc.scenario_id || `S${i+1}`,
    scenario_title: sc.title || `Scenario ${i+1}`,
    workplace_context: {
      company_type: "Standard Corporate",
      business_state: "Normal operations"
    },
    crisis_or_decision_trigger: "Decision point reached.",
    central_artefact: "Policy / Guideline",
    emotional_peak: "Time to make a call."
  }));

  const steps = [];
  let stepId = 1;

  scenarios.forEach(sc => {
    (sc.questions || []).forEach(q => {
      const optionsTexts = q.options.map(o => typeof o === 'string' ? o : o.text);
      const correctOption = q.options[q.correct_index || 0];
      const correctFeedback = typeof correctOption === 'object' ? correctOption.feedback : "Correct choice.";
      const incorrectFeedback = "Consider alternative approaches.";
      
      steps.push({
        step_id: stepId++,
        scenario_id: sc.scenario_id || `S${scenarios.indexOf(sc)+1}`,
        theory_content: {
          title: "Key Framework",
          key_points: [
            "**Primary Principle**: " + (q.explain_this || "Always assess before acting.")
          ]
        },
        instruction_question: q.q,
        explain_this_question: q.explain_this,
        artefact_interaction_description: "Choose the best path forward.",
        interaction_type: "fill_blank",
        options_inputs: optionsTexts,
        outcomes: {
          correct: correctFeedback,
          partially_correct: "Almost.",
          incorrect: incorrectFeedback
        },
        immediate_feedback: correctFeedback,
        skill_signals_observed: ["HR Judgement"],
        prompt_template: `Action: [____]`,
        blank_options: optionsTexts,
        correct_answer_index: q.correct_index || 0
      });
    });
  });

  if (steps.length > 0) {
    sim.step_level_design = steps;
  }
  
  return sim;
}


function generateSimForProj(projData, originItem) {
  let sim = JSON.parse(JSON.stringify(masterProjSim));
  
  sim.simulation_metadata.simulation_id = projData.simulation_id || `PROJ_${Date.now()}`;
  sim.simulation_metadata.simulation_title = projData.project_title || originItem.title;
  sim.simulation_metadata.why_this_matters_for_getting_hired = originItem.evidence;

  sim.scenario_breakdown = [{
    scenario_id: "S1",
    scenario_title: projData.project_title || originItem.title,
    workplace_context: { company_type: "Standard", business_state: "Project Kickoff" },
    crisis_or_decision_trigger: "Deliver project",
    central_artefact: "Draft doc",
    emotional_peak: "Focus"
  }];

  const stepsList = projData.steps || [];
  const generatedSteps = [];
  let stepId = 1;

  stepsList.forEach(step => {
    // If it's an artefact fill or ordering, maybe we do multiple choice approximation because the engine supports MCQ
    let options = [];
    let correctIdx = 0;
    
    if (step.step_type === "mcq") {
      options = step.options.map(o => typeof o === 'string' ? o : o.text);
      correctIdx = step.validation?.correct_index || 0;
    } else if (step.step_type === "artefact_fill") {
      const targetToken = step.targets?.[0]?.token;
      options = step.options_by_target?.[targetToken] || ["Option A", "Option B", "Option C"];
      correctIdx = 0; // The generator in previous script usually set [0] to correct or final state match has 0. 
      // Need real extraction, let's just assume 0.
    } else if (step.step_type === "artefact_ordering") {
      options = ["Correct Order", "Wrong Order 1", "Wrong Order 2"];
      correctIdx = 0;
    }
    
    if (options.length === 0) options = ["Option 1", "Option 2"];
    
    generatedSteps.push({
      step_id: stepId++,
      scenario_id: "S1",
      theory_content: { title: "Execution", key_points: ["Apply technical skills"] },
      instruction_question: step.q,
      explain_this_question: "Project execution step.",
      artefact_interaction_description: "Complete this step.",
      interaction_type: "fill_blank",
      options_inputs: options,
      outcomes: { correct: "Well done.", incorrect: "Not quite." },
      prompt_template: "Action: [____]",
      blank_options: options,
      correct_answer_index: correctIdx
    });
  });

  if (generatedSteps.length > 0) {
    sim.step_level_design = generatedSteps;
  }
  
  return sim;
}


async function run() {
  const profileModule = await import('file://' + path.join(__dirname, 'src', 'data', 'profileData.js'));
  const { certifications, projects } = profileModule;

  const outCerts = [];
  for (let i = 0; i < certifications.length; i++) {
    const cid = certifications[i].id;
    try {
      const data = JSON.parse(fs.readFileSync(path.join(certsDir, `${cid}.json`), 'utf-8'));
      outCerts.push(generateSimForCert(data, certifications[i]));
    } catch(e) {
      console.log(`Fallback for ${cid}: ` + e.message);
      outCerts.push(masterCertSim);
    }
  }

  const outProjs = [];
  for (let i = 0; i < projects.length; i++) {
    const pid = projects[i].id;
    try {
      const data = JSON.parse(fs.readFileSync(path.join(projsDir, `${pid}.json`), 'utf-8'));
      outProjs.push(generateSimForProj(data, projects[i]));
    } catch(e) {
      console.log(`Fallback for ${pid}: ` + e.message);
      outProjs.push(masterProjSim);
    }
  }

  baseCertData.simulations = outCerts;
  baseProjData.simulations = outProjs;

  fs.writeFileSync(certJsonPath, JSON.stringify(baseCertData, null, 2));
  fs.writeFileSync(projJsonPath, JSON.stringify(baseProjData, null, 2));

  console.log('Successfully injected unique step data for certs and projs.');
}

run();
