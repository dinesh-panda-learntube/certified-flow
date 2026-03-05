import { useState, useCallback } from "react";
import { certScenarioData, certifications } from "../data/profileData";
import { Check } from "lucide-react";

export default function CertScenarioModal({ certId, onPass, onClose }) {
  const certData = certScenarioData[certId];
  const cert = certifications.find((c) => c.id === certId);
  const scenarios = certData?.scenarios || [];

  // Flatten all questions across scenarios for sequential flow
  const allSteps = [];
  scenarios.forEach((sc) => {
    sc.questions.forEach((q, qi) => {
      allSteps.push({ ...q, scenarioTitle: sc.title, scenarioId: sc.scenario_id, stepInScenario: qi, scenarioLength: sc.questions.length });
    });
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showExplain, setShowExplain] = useState(false);
  const [finished, setFinished] = useState(false);

  const step = allSteps[currentStep];

  const handleSelect = useCallback(
    (idx) => {
      if (showFeedback) return;
      setSelected(idx);
      setShowFeedback(true);
      if (idx === step.correct_index) setScore((s) => s + 1);
    },
    [showFeedback, step]
  );

  const handleNext = useCallback(() => {
    if (currentStep < allSteps.length - 1) {
      setCurrentStep((s) => s + 1);
      setSelected(null);
      setShowFeedback(false);
      setShowExplain(false);
    } else {
      setFinished(true);
    }
  }, [currentStep, allSteps.length]);

  if (!certData || !cert) return null;

  const totalQ = allSteps.length;
  const passed = score >= Math.ceil(totalQ * 0.6);
  const pct = Math.round((score / totalQ) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-md mx-4 sm:mx-auto
                      rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto
                      animate-slideUp shadow-[0_-8px_40px_rgba(0,0,0,0.3)]"
           style={{ background: "linear-gradient(145deg, #112f48, #0f2940)", border: "1px solid #1e4c6b" }}>

        {/* Header */}
        <div className="sticky top-0 rounded-t-3xl z-10 px-6 py-5 border-b border-dark-border/50"
             style={{ background: "rgba(15,45,68,0.95)", backdropFilter: "blur(8px)" }}>
          <div className="flex justify-between items-center">
            <div className="pr-4">
              <p className="text-[10px] text-highlight font-bold uppercase tracking-widest mb-1">
                Certification Scenario
              </p>
              <h3 className="text-sm font-extrabold text-text-primary truncate">
                {certData.certification_title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full
                         bg-dark-surface/80 text-text-muted hover:text-text-primary hover:bg-dark-surface
                         transition-all duration-200 min-w-[36px] min-h-[36px]"
            >
              ✕
            </button>
          </div>

          {!finished && (
            <>
              {/* Scenario tag */}
              <div className="mt-3 mb-2">
                <span className="inline-block bg-highlight/15 text-highlight text-[10px] font-bold px-2.5 py-1 rounded-lg">
                  📋 {step.scenarioTitle}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[11px] text-text-muted font-medium">
                  Step {step.stepInScenario + 1} of {step.scenarioLength} · Question {currentStep + 1}/{totalQ}
                </span>
              </div>

              <div className="w-full h-1.5 bg-dark-surface rounded-full mt-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-highlight to-cta rounded-full transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / totalQ) * 100}%` }}
                />
              </div>
            </>
          )}
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {!finished ? (
            <>
              <p className="text-[14px] font-bold text-text-primary mb-5 leading-relaxed">
                {step.q}
              </p>

              <div className="space-y-3">
                {step.options.map((opt, idx) => {
                  const optText = typeof opt === "string" ? opt : opt.text;
                  const feedback = typeof opt === "object" ? opt.feedback : null;
                  const isCorrect = idx === step.correct_index;

                  let optClass =
                    "border-dark-border/60 text-text-secondary hover:border-highlight/40 hover:bg-highlight/5";

                  if (showFeedback) {
                    if (isCorrect) {
                      optClass = "border-cta/50 bg-cta/10 text-cta";
                    } else if (idx === selected && !isCorrect) {
                      optClass = "border-danger/50 bg-danger/10 text-danger";
                    } else {
                      optClass = "border-dark-border/30 text-text-muted opacity-40";
                    }
                  } else if (selected === idx) {
                    optClass = "border-highlight/60 bg-highlight/10 text-highlight";
                  }

                  return (
                    <div key={idx}>
                      <button
                        onClick={() => handleSelect(idx)}
                        disabled={showFeedback}
                        className={`w-full text-left px-5 py-3.5 rounded-xl border text-[13px]
                                    transition-all duration-200 min-h-[48px] leading-relaxed ${optClass}`}
                      >
                        <span className="font-bold mr-2 opacity-40 text-xs">
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        {optText}
                      </button>
                      {/* Show feedback text for selected option */}
                      {showFeedback && idx === selected && feedback && (
                        <p className={`text-[11px] mt-1.5 ml-2 leading-relaxed ${
                          isCorrect ? "text-cta" : "text-danger/80"
                        }`}>
                          → {feedback}
                        </p>
                      )}
                      {/* Also show correct option feedback if user picked wrong */}
                      {showFeedback && isCorrect && idx !== selected && feedback && (
                        <p className="text-[11px] mt-1.5 ml-2 leading-relaxed text-cta/70">
                          → {feedback}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Explain This + Next */}
              {showFeedback && (
                <div className="mt-5 space-y-3 animate-fadeIn">
                  {step.explain_this && (
                    <button
                      onClick={() => setShowExplain(!showExplain)}
                      className="w-full text-left text-[12px] font-semibold text-highlight
                        bg-dark-surface rounded-xl px-4 py-2.5 hover:bg-dark-surface/80 transition-all
                        flex items-center justify-between"
                    >
                      <span>💡 Explain This</span>
                      <span
                        className="transition-transform duration-200"
                        style={{ transform: showExplain ? "rotate(180deg)" : "rotate(0deg)" }}
                      >
                        ▾
                      </span>
                    </button>
                  )}

                  {showExplain && step.explain_this && (
                    <div className="bg-dark-surface/60 rounded-xl p-4 border border-highlight/20 text-[12px] text-text-secondary leading-relaxed animate-fadeIn">
                      {step.explain_this}
                    </div>
                  )}

                  <button
                    onClick={handleNext}
                    className="w-full py-3.5 bg-highlight text-white font-bold text-sm rounded-2xl
                               hover:bg-highlight-hover active:scale-[0.96]
                               transition-all duration-200 min-h-[48px]"
                  >
                    {currentStep < allSteps.length - 1 ? "Next →" : "See Results →"}
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Result screen */
            <div className="text-center py-8">
              <div className="text-6xl mb-5">{passed ? "🏆" : "📚"}</div>
              <p className="text-xl font-extrabold text-text-primary mb-1">
                {score}/{totalQ} Correct
              </p>
              <p className="text-sm text-text-muted mb-2">{pct}%</p>

              {/* Scenario breakdown */}
              <div className="text-left mb-6 space-y-2">
                {scenarios.map((sc) => {
                  const scQuestions = allSteps.filter((s) => s.scenarioId === sc.scenario_id);
                  return (
                    <div key={sc.scenario_id} className="bg-dark-surface rounded-lg px-3 py-2">
                      <p className="text-[11px] text-text-muted">{sc.title}</p>
                      <p className="text-[12px] font-semibold text-text-primary">
                        {scQuestions.length} questions
                      </p>
                    </div>
                  );
                })}
              </div>

              <p
                className={`text-sm mb-8 font-medium ${
                  passed ? "text-cta" : "text-danger"
                }`}
              >
                {passed
                  ? "Certified! Add this certification to your CV."
                  : "Not certified yet. Retake to improve your score."}
              </p>

              {passed ? (
                <button
                  onClick={() => onPass(certId)}
                  className="px-8 py-3.5 bg-cta text-dark-bg font-bold text-sm rounded-2xl
                             hover:bg-cta-hover active:scale-[0.96]
                             transition-all duration-200 min-h-[52px]
                             shadow-[0_0_24px_rgba(127,194,65,0.25)]"
                >
                  Add Certification <Check size={16} className="inline ml-1 mb-0.5" />
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="px-8 py-3.5 bg-highlight text-white font-bold text-sm rounded-2xl
                             hover:bg-highlight-hover active:scale-[0.96]
                             transition-all duration-200 min-h-[52px]
                             shadow-[0_0_24px_rgba(64,106,255,0.2)]"
                >
                  Close & Retake Later
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
