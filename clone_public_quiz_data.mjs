import fs from 'fs';
import path from 'path';

// Read profileData from src/data/profileData.js
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const profileDataPath = path.join(__dirname, 'src', 'data', 'profileData.js');
const { certifications, projects } = await import('file://' + profileDataPath);

const certJsonPath = path.join(__dirname, 'public', 'quiz', 'cert.json');
const projJsonPath = path.join(__dirname, 'public', 'quiz', 'proj.json');

const certData = JSON.parse(fs.readFileSync(certJsonPath, 'utf8'));
const projData = JSON.parse(fs.readFileSync(projJsonPath, 'utf8'));

const originalCertSim = certData.simulations[0];
certData.simulations = certifications.map((c, i) => {
  if (i === 0) return originalCertSim;
  let newSim = JSON.parse(JSON.stringify(originalCertSim));
  newSim.simulation_metadata.simulation_id = c.id;
  newSim.simulation_metadata.simulation_title = c.title;
  newSim.simulation_metadata.why_this_matters_for_getting_hired = c.caption;
  return newSim;
});

const originalProjSim = projData.simulations[0];
projData.simulations = projects.map((p, i) => {
  if (i === 0) return originalProjSim;
  let newSim = JSON.parse(JSON.stringify(originalProjSim));
  newSim.simulation_metadata.simulation_id = p.id;
  newSim.simulation_metadata.simulation_title = p.title;
  newSim.simulation_metadata.why_this_matters_for_getting_hired = p.evidence; // close enough
  return newSim;
});

fs.writeFileSync(certJsonPath, JSON.stringify(certData, null, 2));
fs.writeFileSync(projJsonPath, JSON.stringify(projData, null, 2));

console.log('Successfully expanded cert.json and proj.json in public/quiz with ' + 
  certData.simulations.length + ' certs and ' + projData.simulations.length + ' projs.');
