import { useState, useCallback, useEffect } from "react";
import { profile, skills, certifications, projects } from "./data/profileData";
import SkillsSection from "./components/SkillsSection";
import CertificationsSection from "./components/CertificationsSection";
import ProjectsSection from "./components/ProjectsSection";
import ProfileStrength from "./components/ProfileStrength";
import StickyFooter from "./components/StickyFooter";
import StickyHeader from "./components/StickyHeader";
import SkillCompletionCard from "./components/SkillCompletionCard";
import SkillQuizModal from "./components/SkillQuizModal";
import CoverPage from "./components/CoverPage";

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
  const params = new URLSearchParams(window.location.search);
  const userProfile = {
    ...profile,
    name: params.get("name") || profile.name,
    currentRole: params.get("current") || profile.currentRole,
    targetRole: params.get("target") || profile.targetRole,
    experience: params.get("goal") || profile.experience,
    goal: params.get("goal") || profile.goal
  };

  const [addedItems, setAddedItems] = useState(() =>
    loadFromStorage("profile_addedItems", { skills: [], certifications: [], projects: [] })
  );
  const [customCertifications, setCustomCertifications] = useState(certifications);
  const [cvView, setCvView] = useState("after");
  const [passedQuizzes, setPassedQuizzes] = useState(() =>
    loadFromStorage("profile_passedQuizzes", [])
  );
  const [completionResult, setCompletionResult] = useState(null);

  const [hasStarted, setHasStarted] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const completed = params.get("completed");
    return completed !== null && completed !== "HR Management Certification";
  });

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
      if (completedItem === "HR Management Certification") {
        setCustomCertifications((prev) => {
          const updated = [...prev];
          updated[0] = {
            id: "cert-custom-1",
            title: "HR Management Certification",
            caption: "Validated expertise in core HR policies and lifecycles.",
            match: "100%",
            salaryRange: "₹8L–₹12L",
            industrySignal: "Mid-Sized & Enterprise HR Teams",
            cvSignal: "Found in 58% HR Manager CVs at MNCs"
          };
          return updated;
        });
        setAddedItems((prev) => ({
          ...prev,
          certifications: prev.certifications.includes("cert-custom-1")
            ? prev.certifications
            : [...prev.certifications, "cert-custom-1"],
        }));
      } else if (completedItem.startsWith("cert-")) {
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

      // Clean the URL conditionally to preserve Outreach campaigns
      if (completedItem !== "HR Management Certification") {
        params.delete("completed");
        const newSearch = params.toString();
        const newUrl = window.location.pathname + (newSearch ? '?' + newSearch : '');
        window.history.replaceState({}, "", newUrl);
      }
    }
  }, []);

  const isAfter = cvView === "after";

  const effectiveAdded = addedItems;

  const effectivePassed = passedQuizzes;

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

  const startCertScenario = useCallback((certId) => {
    const base = import.meta.env.BASE_URL;
    const certNum = certId.replace('cert-', '0');
    window.location.href = `${base}quiz/index.html?sim=v1/hr_manager-certifications-${certNum}&cert=${certId}&return=${base}`;
  }, []);

  const startProjectSim = useCallback((projId) => {
    const base = import.meta.env.BASE_URL;
    const projNum = projId.replace('proj-', '0');
    window.location.href = `${base}quiz/index.html?sim=v1/hr_manager-projects-${projNum}&proj=${projId}&return=${base}`;
  }, []);

  const handleStartNext = useCallback((type, id) => {
    if (type === "Skill") startSkillQuiz(id);
    else if (type === "Certification") startCertScenario(id);
    else if (type === "Project") startProjectSim(id);
  }, [startSkillQuiz, startCertScenario, startProjectSim]);


  // Show completion content inside profile card when returning from quiz
  const showCompletion = !isAfter && completionResult;

  // Determine next item
  let nextItem = null;
  const remainingSkills = skills.filter((s) => !effectivePassed.includes(s.id));
  if (remainingSkills.length > 0) {
    nextItem = { type: "Skill", title: remainingSkills[0].title, id: remainingSkills[0].id };
  } else {
    const remainingCerts = customCertifications.filter(
      (c) => !effectiveAdded.certifications.includes(c.id)
    );
    if (remainingCerts.length > 0) {
      nextItem = { type: "Certification", title: remainingCerts[0].title, id: remainingCerts[0].id };
    } else {
      const remainingProj = projects.filter(
        (p) => !effectiveAdded.projects.includes(p.id)
      );
      if (remainingProj.length > 0) {
        nextItem = { type: "Project", title: remainingProj[0].title, id: remainingProj[0].id };
      }
    }
  }

  if (!hasStarted) {
    return <CoverPage profile={userProfile} onStart={() => setHasStarted(true)} />;
  }

  return (
    <div className="min-h-screen bg-dark-bg pb-54">
      <div className="max-w-md mx-auto px-5 pt-8 pb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-extrabold bg-gradient-to-r from-cta to-highlight bg-clip-text text-transparent">
            My Profile
          </h1>
          <div className="flex bg-dark-card border border-dark-border rounded-xl overflow-hidden">
            <button
              onClick={() => setCvView("after")}
              className={`px-5 py-2 text-[11px] font-bold tracking-wide transition-all duration-300
                ${cvView === "after"
                  ? "bg-cta text-dark-bg"
                  : "text-text-muted hover:text-text-secondary"}`}
            >
              Target
            </button>
            <button
              onClick={() => setCvView("before")}
              className={`px-5 py-2 text-[11px] font-bold tracking-wide transition-all duration-300
                ${cvView === "before"
                  ? "bg-highlight text-white"
                  : "text-text-muted hover:text-text-secondary"}`}
            >
              Configure
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div id="profile-card-section" className="glass-card mb-6">
          {/* Profile header — always shown */}
          <div className={`flex items-center gap-4 ${!showCompletion && !isAfter ? "mb-5" : isAfter ? "" : "mb-4"}`}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl border bg-dark-surface border-dark-border">
              👤
            </div>
            <div>
              <p className="font-bold text-[17px] text-text-primary">
                {userProfile.name}
              </p>
              <p className="text-xs font-semibold mt-0.5 text-text-muted">
                {isAfter ? (
                  <>
                    <span className="opacity-70">{userProfile.currentRole}</span>
                    <span className="mx-1.5 text-text-secondary">→</span>
                    <span className="text-cta">{userProfile.targetRole}</span>
                  </>
                ) : (
                  userProfile.currentRole
                )}
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
                <InfoRow label="Target Role" value={userProfile.targetRole} />
                <InfoRow label="Experience" value={userProfile.experience} />
                <InfoRow label="Current" value={userProfile.currentRole} />
                <InfoRow label="Goal" value={userProfile.goal} />
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
          certificationsList={customCertifications}
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

      {isAfter ? (
        <StickyHeader totalAdded={totalAdded} nextItem={nextItem} onStartNext={handleStartNext} />
      ) : (
        <StickyFooter totalAdded={totalAdded} nextItem={nextItem} onStartNext={handleStartNext} />
      )}

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
