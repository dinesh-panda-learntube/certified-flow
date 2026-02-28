import { useState, useCallback, useEffect } from "react";
import { profile, skills, certifications, projects } from "./data/profileData";
import SkillsSection from "./components/SkillsSection";
import CertificationsSection from "./components/CertificationsSection";
import ProjectsSection from "./components/ProjectsSection";
import ProfileStrength from "./components/ProfileStrength";
import StickyFooter from "./components/StickyFooter";
import SkillCompletionCard from "./components/SkillCompletionCard";
import SkillQuizModal from "./components/SkillQuizModal";

// Load persisted state from localStorage
function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [addedItems, setAddedItems] = useState(() =>
    loadFromStorage("profile_addedItems", { skills: [], certifications: [], projects: [] })
  );
  const [cvView, setCvView] = useState("before");
  const [passedQuizzes, setPassedQuizzes] = useState(() =>
    loadFromStorage("profile_passedQuizzes", [])
  );
  const [completionResult, setCompletionResult] = useState(null);

  // Persist addedItems and passedQuizzes to localStorage
  useEffect(() => {
    localStorage.setItem("profile_addedItems", JSON.stringify(addedItems));
  }, [addedItems]);

  useEffect(() => {
    localStorage.setItem("profile_passedQuizzes", JSON.stringify(passedQuizzes));
  }, [passedQuizzes]);

  // On mount, check if returning from a quiz with a completed item
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const completedItem = params.get("completed");
    if (completedItem) {
      // Determine which category this belongs to
      if (completedItem.startsWith("cert-")) {
        setAddedItems((prev) => ({
          ...prev,
          certifications: prev.certifications.includes(completedItem)
            ? prev.certifications
            : [...prev.certifications, completedItem],
        }));
      } else if (completedItem.startsWith("proj-")) {
        setAddedItems((prev) => ({
          ...prev,
          projects: prev.projects.includes(completedItem)
            ? prev.projects
            : [...prev.projects, completedItem],
        }));
      } else {
        // Skill
        setPassedQuizzes((prev) =>
          prev.includes(completedItem) ? prev : [...prev, completedItem]
        );
        setAddedItems((prev) => ({
          ...prev,
          skills: prev.skills.includes(completedItem)
            ? prev.skills
            : [...prev.skills, completedItem],
        }));
      }

      // Load result data from localStorage
      try {
        const stored = localStorage.getItem(`quiz_result_${completedItem}`);
        if (stored) {
          setCompletionResult(JSON.parse(stored));
        } else {
          setCompletionResult({
            skillId: completedItem,
            simTitle: "Simulation",
            impactMetrics: null,
            score: 0,
            history: [],
          });
        }
      } catch {
        setCompletionResult({
          skillId: completedItem,
          simTitle: "Simulation",
          impactMetrics: null,
          score: 0,
          history: [],
        });
      }

      // Clean the URL
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  const isAfter = cvView === "after";

  const effectiveAdded = isAfter
    ? {
        skills: skills.map((s) => s.id),
        certifications: certifications.map((c) => c.id),
        projects: projects.map((p) => p.id),
      }
    : addedItems;

  const effectivePassed = isAfter ? skills.map((s) => s.id) : passedQuizzes;

  const totalAdded =
    effectiveAdded.skills.length +
    effectiveAdded.certifications.length +
    effectiveAdded.projects.length;

  const addItem = useCallback((type, id) => {
    setAddedItems((prev) => ({
      ...prev,
      [type]: prev[type].includes(id) ? prev[type] : [...prev[type], id],
    }));
  }, []);

  const [activeSkillQuiz, setActiveSkillQuiz] = useState(null);

  // Open skill quiz modal when user clicks "+" on a skill
  const startSkillQuiz = useCallback((skillId) => {
    setActiveSkillQuiz(skillId);
  }, []);

  const handleSkillQuizPass = useCallback((skillId) => {
    setPassedQuizzes((prev) => prev.includes(skillId) ? prev : [...prev, skillId]);
    setAddedItems((prev) => ({
      ...prev,
      skills: prev.skills.includes(skillId) ? prev.skills : [...prev.skills, skillId],
    }));
    setActiveSkillQuiz(null);
  }, []);

  // Navigate to quiz page for certification
  const startCertScenario = useCallback((certId) => {
    const base = import.meta.env.BASE_URL;
    window.location.href = `${base}quiz/index.html?sim=cert&cert=${certId}&return=${base}`;
  }, []);

  // Navigate to quiz page for project
  const startProjectSim = useCallback((projId) => {
    const base = import.meta.env.BASE_URL;
    window.location.href = `${base}quiz/index.html?sim=proj&proj=${projId}&return=${base}`;
  }, []);


  // Show completion content inside profile card when returning from quiz
  const showCompletion = !isAfter && completionResult;

  return (
    <div className="min-h-screen bg-dark-bg pb-54">
      <div className="max-w-md mx-auto px-5 pt-8 pb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-extrabold bg-gradient-to-r from-cta to-highlight bg-clip-text text-transparent">
            Profile
          </h1>
          <div className="flex bg-dark-card border border-dark-border rounded-xl overflow-hidden">
            <button
              onClick={() => setCvView("before")}
              className={`px-5 py-2 text-[11px] font-bold tracking-wide transition-all duration-300
                ${cvView === "before"
                  ? "bg-highlight text-white"
                  : "text-text-muted hover:text-text-secondary"}`}
            >
              Before
            </button>
            <button
              onClick={() => setCvView("after")}
              className={`px-5 py-2 text-[11px] font-bold tracking-wide transition-all duration-300
                ${cvView === "after"
                  ? "bg-cta text-dark-bg"
                  : "text-text-muted hover:text-text-secondary"}`}
            >
              After
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="glass-card mb-6">
          {/* Profile header — always shown */}
          <div className={`flex items-center gap-4 ${!showCompletion && !isAfter ? "mb-5" : isAfter ? "" : "mb-4"}`}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl border bg-dark-surface border-dark-border">
              👤
            </div>
            <div>
              <p className="font-bold text-[17px] text-text-primary">
                {profile.name}
              </p>
              <p
                className={`text-xs font-semibold mt-0.5 ${
                  isAfter ? "text-cta" : "text-text-muted"
                }`}
              >
                {isAfter ? profile.targetRole : profile.currentRole}
              </p>
            </div>
          </div>

          {/* Completion content inside profile card (replaces info rows) */}
          {showCompletion ? (
            <SkillCompletionCard
              result={completionResult}
            />
          ) : (
            /* Default info rows — shown when no completion card */
            !isAfter && (
              <div className="grid grid-cols-2 gap-3">
                <InfoRow label="Target Role" value={profile.targetRole} />
                <InfoRow label="Experience" value={profile.experience} />
                <InfoRow label="Current" value={profile.currentRole} />
                <InfoRow label="Goal" value={profile.goal} />
              </div>
            )
          )}

          <ProfileStrength totalAdded={totalAdded} />
        </div>

        <SkillsSection
          addedItems={effectiveAdded.skills}
          passedQuizzes={effectivePassed}
          onAddSkill={startSkillQuiz}
          isAfter={isAfter}
        />

        <CertificationsSection
          addedItems={effectiveAdded.certifications}
          onAdd={(id) => addItem("certifications", id)}
          onStartScenario={startCertScenario}
          isAfter={isAfter}
        />

        <ProjectsSection
          addedItems={effectiveAdded.projects}
          onAdd={(id) => addItem("projects", id)}
          onStartSim={startProjectSim}
          isAfter={isAfter}
        />

        {!isAfter && (
          <div className="mt-16 text-center space-y-3 pb-8">
            <p className="text-text-secondary text-sm">
              Your CV updates live as you add items.
            </p>
            <p className="text-text-muted text-xs opacity-70">
              Toggle &lsquo;After&rsquo; to preview the full completed profile.
            </p>
          </div>
        )}
      </div>

      <StickyFooter />

      {activeSkillQuiz && (
        <SkillQuizModal
          skillId={activeSkillQuiz}
          onPass={handleSkillQuizPass}
          onClose={() => setActiveSkillQuiz(null)}
        />
      )}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="bg-dark-surface rounded-lg px-3 py-2.5">
      <p className="text-[9px] font-bold uppercase tracking-widest text-text-muted mb-0.5">
        {label}
      </p>
      <p className="text-xs font-semibold text-text-primary">{value}</p>
    </div>
  );
}
