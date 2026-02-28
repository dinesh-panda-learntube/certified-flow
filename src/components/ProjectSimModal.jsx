import { useState, useCallback } from "react";
import { projectSimData, projects } from "../data/profileData";

export default function ProjectSimModal({ projectId, onPass, onClose }) {
  const simData = projectSimData[projectId];
  const project = projects.find((p) => p.id === projectId);
  const steps = simData?.steps || [];

  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // MCQ state
  const [mcqSelected, setMcqSelected] = useState(null);
  const [mcqFeedback, setMcqFeedback] = useState(false);

  // Artefact fill state
  const [filledBlanks, setFilledBlanks] = useState({});
  const [activeBlanks, setActiveBlanks] = useState([]); // blank_order tracking
  const [currentBlankIdx, setCurrentBlankIdx] = useState(0);
  const [fillLocked, setFillLocked] = useState(false);

  // Artefact ordering state
  const [orderedPieces, setOrderedPieces] = useState([]);
  const [orderLocked, setOrderLocked] = useState(false);

  const step = steps[currentStep];

  // Reset step-level state when advancing
  const resetStepState = useCallback(() => {
    setMcqSelected(null);
    setMcqFeedback(false);
    setFilledBlanks({});
    setCurrentBlankIdx(0);
    setFillLocked(false);
    setOrderedPieces([]);
    setOrderLocked(false);

    const nextStep = steps[currentStep + 1];
    if (nextStep?.step_type === "artefact_fill") {
      setActiveBlanks(nextStep.interaction?.blank_order || []);
    } else if (nextStep?.step_type === "artefact_ordering") {
      setActiveBlanks(nextStep.targets_in_order || []);
    } else {
      setActiveBlanks([]);
    }
  }, [currentStep, steps]);

  // Init first step blanks
  useState(() => {
    if (step?.step_type === "artefact_fill") {
      setActiveBlanks(step.interaction?.blank_order || []);
    } else if (step?.step_type === "artefact_ordering") {
      setActiveBlanks(step.targets_in_order || []);
    }
  });

  const goNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      resetStepState();
      setCurrentStep((s) => s + 1);
    } else {
      setFinished(true);
    }
  }, [currentStep, steps.length, resetStepState]);

  // ---- MCQ handlers ----
  const handleMcqSelect = useCallback(
    (idx) => {
      if (mcqFeedback) return;
      setMcqSelected(idx);
      setMcqFeedback(true);
      if (idx === step.validation?.correct_index) setScore((s) => s + 1);
    },
    [mcqFeedback, step]
  );

  // ---- Artefact fill handler ----
  const handleFillBlank = useCallback(
    (token, value) => {
      if (fillLocked) return;
      setFilledBlanks((prev) => ({ ...prev, [token]: value }));
      if (currentBlankIdx < activeBlanks.length - 1) {
        setCurrentBlankIdx((i) => i + 1);
      } else {
        // All blanks filled — check correctness
        const allFilled = { ...filledBlanks, [token]: value };
        let rendered = step.artefact.state;
        for (const [k, v] of Object.entries(allFilled)) {
          rendered = rendered.replace(k, v);
        }
        if (rendered === step.validation?.correct_final_state) {
          setScore((s) => s + 1);
        }
        setFillLocked(true);
      }
    },
    [fillLocked, currentBlankIdx, activeBlanks, filledBlanks, step]
  );

  // ---- Artefact ordering handler ----
  const handleOrderPiece = useCallback(
    (piece) => {
      if (orderLocked) return;
      if (orderedPieces.includes(piece)) return;
      const newOrdered = [...orderedPieces, piece];
      setOrderedPieces(newOrdered);

      if (newOrdered.length >= (step.targets_in_order?.length || 0)) {
        // Check correctness
        let rendered = step.artefact.state;
        step.targets_in_order.forEach((token, i) => {
          rendered = rendered.replace(token, newOrdered[i]);
        });
        if (rendered === step.validation?.correct_final_state) {
          setScore((s) => s + 1);
        }
        setOrderLocked(true);
      }
    },
    [orderLocked, orderedPieces, step]
  );

  if (!simData || !project) return null;

  const totalSteps = steps.length;
  const passed = score >= Math.ceil(totalSteps * 0.6);
  const pct = Math.round((score / totalSteps) * 100);

  // Build rendered artefact text with filled blanks
  const renderArtefact = () => {
    if (!step.artefact) return null;
    let text = step.artefact.state;

    if (step.step_type === "artefact_fill") {
      for (const [token, value] of Object.entries(filledBlanks)) {
        text = text.replace(token, value);
      }
    } else if (step.step_type === "artefact_ordering") {
      step.targets_in_order?.forEach((token, i) => {
        if (orderedPieces[i]) {
          text = text.replace(token, orderedPieces[i]);
        }
      });
    }
    return text;
  };

  const currentToken = activeBlanks[currentBlankIdx];
  const currentHint =
    step?.step_type === "artefact_fill"
      ? step.targets?.find((t) => t.token === currentToken)?.hint
      : null;

  // Determine if the "Next" button should appear
  const showNext =
    step?.step_type === "mcq"
      ? mcqFeedback
      : step?.step_type === "artefact_fill"
      ? fillLocked
      : step?.step_type === "artefact_ordering"
      ? orderLocked
      : false;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />

      <div
        className="relative w-full max-w-md mx-4 sm:mx-auto
                    rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto
                    animate-slideUp shadow-[0_-8px_40px_rgba(0,0,0,0.3)]"
        style={{
          background: "linear-gradient(145deg, #112f48, #0f2940)",
          border: "1px solid #1e4c6b",
        }}
      >
        {/* Header */}
        <div
          className="sticky top-0 rounded-t-3xl z-10 px-6 py-5 border-b border-dark-border/50"
          style={{ background: "rgba(15,45,68,0.95)", backdropFilter: "blur(8px)" }}
        >
          <div className="flex justify-between items-center">
            <div className="pr-4">
              <p className="text-[10px] text-cta font-bold uppercase tracking-widest mb-1">
                Project Simulation
              </p>
              <h3 className="text-sm font-extrabold text-text-primary truncate">
                {simData.project_title}
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
              {/* Tools tag */}
              <div className="mt-3 mb-2 flex gap-2">
                {simData.tools_pair?.map((tool) => (
                  <span key={tool} className="tag-tool text-[10px]">
                    {tool}
                  </span>
                ))}
                <span className="badge badge-highlight text-[10px]">
                  Step {currentStep + 1}/{totalSteps}
                </span>
              </div>

              <div className="w-full h-1.5 bg-dark-surface rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cta to-highlight rounded-full transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                />
              </div>
            </>
          )}
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {!finished ? (
            <>
              {/* Skill tag */}
              {step.technical_skill_id && (
                <div className="mb-3">
                  <span className="inline-block bg-cta/15 text-cta text-[10px] font-bold px-2.5 py-1 rounded-lg">
                    🛠 {simData.technical_skills?.find((ts) => ts.skill_id === step.technical_skill_id)?.name}
                  </span>
                </div>
              )}

              {/* Question */}
              <p className="text-[14px] font-bold text-text-primary mb-5 leading-relaxed">
                {step.q}
              </p>

              {/* ---- MCQ ---- */}
              {step.step_type === "mcq" && (
                <div className="space-y-3">
                  {step.options.map((opt, idx) => {
                    const optText = typeof opt === "string" ? opt : opt.text;
                    const isCorrect = idx === step.validation?.correct_index;
                    let optClass =
                      "border-dark-border/60 text-text-secondary hover:border-highlight/40 hover:bg-highlight/5";

                    if (mcqFeedback) {
                      if (isCorrect) {
                        optClass = "border-cta/50 bg-cta/10 text-cta";
                      } else if (idx === mcqSelected && !isCorrect) {
                        optClass = "border-danger/50 bg-danger/10 text-danger";
                      } else {
                        optClass = "border-dark-border/30 text-text-muted opacity-40";
                      }
                    } else if (mcqSelected === idx) {
                      optClass = "border-highlight/60 bg-highlight/10 text-highlight";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleMcqSelect(idx)}
                        disabled={mcqFeedback}
                        className={`w-full text-left px-5 py-3.5 rounded-xl border text-[13px]
                                    transition-all duration-200 min-h-[48px] leading-relaxed ${optClass}`}
                      >
                        <span className="font-bold mr-2 opacity-40 text-xs">
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        {optText}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* ---- Artefact Fill ---- */}
              {step.step_type === "artefact_fill" && (
                <div>
                  {/* Artefact preview */}
                  <div className="bg-dark-surface rounded-xl p-4 border border-dark-border mb-4">
                    <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-2">
                      📄 {step.artefact.label}
                    </p>
                    <pre className="text-[12px] text-text-secondary leading-relaxed whitespace-pre-wrap font-sans">
                      {renderArtefact()}
                    </pre>
                  </div>

                  {/* Current blank hint */}
                  {!fillLocked && currentToken && (
                    <div className="mb-3">
                      <p className="text-[11px] text-highlight font-semibold mb-2">
                        Fill: <span className="text-text-primary">{currentToken}</span>
                        {currentHint && (
                          <span className="text-text-muted ml-1">— {currentHint}</span>
                        )}
                      </p>
                      <div className="space-y-2">
                        {step.options_by_target?.[currentToken]?.map((opt, idx) => {
                          const isSelected = filledBlanks[currentToken] === opt;
                          return (
                            <button
                              key={idx}
                              onClick={() => handleFillBlank(currentToken, opt)}
                              disabled={fillLocked || filledBlanks[currentToken] !== undefined}
                              className={`w-full text-left px-4 py-3 rounded-xl border text-[12px]
                                          transition-all duration-200 leading-relaxed ${
                                isSelected
                                  ? "border-highlight/60 bg-highlight/10 text-highlight"
                                  : "border-dark-border/60 text-text-secondary hover:border-highlight/40 hover:bg-highlight/5"
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Result indicator */}
                  {fillLocked && (
                    <div className="animate-fadeIn">
                      {(() => {
                        let rendered = step.artefact.state;
                        for (const [k, v] of Object.entries(filledBlanks)) {
                          rendered = rendered.replace(k, v);
                        }
                        const correct = rendered === step.validation?.correct_final_state;
                        return (
                          <p className={`text-[12px] font-semibold ${correct ? "text-cta" : "text-danger"}`}>
                            {correct ? "✓ Correct!" : "✗ Not quite right"}
                          </p>
                        );
                      })()}
                    </div>
                  )}
                </div>
              )}

              {/* ---- Artefact Ordering ---- */}
              {step.step_type === "artefact_ordering" && (
                <div>
                  {/* Artefact preview */}
                  <div className="bg-dark-surface rounded-xl p-4 border border-dark-border mb-4">
                    <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-2">
                      📄 {step.artefact.label}
                    </p>
                    <pre className="text-[12px] text-text-secondary leading-relaxed whitespace-pre-wrap font-sans">
                      {renderArtefact()}
                    </pre>
                  </div>

                  {/* Instruction */}
                  {!orderLocked && (
                    <p className="text-[11px] text-highlight font-semibold mb-3">
                      Tap in order ({orderedPieces.length}/{step.targets_in_order?.length || 0} placed)
                    </p>
                  )}

                  {/* Pieces to place */}
                  {!orderLocked && (
                    <div className="space-y-2">
                      {step.pieces?.map((piece, idx) => {
                        const placed = orderedPieces.includes(piece);
                        return (
                          <button
                            key={idx}
                            onClick={() => handleOrderPiece(piece)}
                            disabled={placed}
                            className={`w-full text-left px-4 py-3 rounded-xl border text-[12px]
                                        transition-all duration-200 leading-relaxed ${
                              placed
                                ? "border-cta/30 bg-cta/10 text-cta opacity-50"
                                : "border-dark-border/60 text-text-secondary hover:border-highlight/40 hover:bg-highlight/5"
                            }`}
                          >
                            {placed && (
                              <span className="text-cta mr-2 font-bold">
                                {orderedPieces.indexOf(piece) + 1}.
                              </span>
                            )}
                            {piece}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Result indicator */}
                  {orderLocked && (
                    <div className="animate-fadeIn">
                      {(() => {
                        let rendered = step.artefact.state;
                        step.targets_in_order.forEach((token, i) => {
                          rendered = rendered.replace(token, orderedPieces[i]);
                        });
                        const correct = rendered === step.validation?.correct_final_state;
                        return (
                          <p className={`text-[12px] font-semibold ${correct ? "text-cta" : "text-danger"}`}>
                            {correct ? "✓ Correct order!" : "✗ Not quite right"}
                          </p>
                        );
                      })()}
                    </div>
                  )}
                </div>
              )}

              {/* Next button */}
              {showNext && (
                <div className="mt-5 animate-fadeIn">
                  <button
                    onClick={goNext}
                    className="w-full py-3.5 bg-highlight text-white font-bold text-sm rounded-2xl
                               hover:bg-highlight-hover active:scale-[0.96]
                               transition-all duration-200 min-h-[48px]"
                  >
                    {currentStep < totalSteps - 1 ? "Next Step →" : "See Results →"}
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Result screen */
            <div className="text-center py-8">
              <div className="text-6xl mb-5">{passed ? "🏆" : "📚"}</div>
              <p className="text-xl font-extrabold text-text-primary mb-1">
                {score}/{totalSteps} Correct
              </p>
              <p className="text-sm text-text-muted mb-2">{pct}%</p>

              {/* Skills learned */}
              {simData.technical_skills?.length > 0 && (
                <div className="text-left mb-6 space-y-2">
                  <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold">
                    Skills Practiced
                  </p>
                  {simData.technical_skills.map((ts) => (
                    <div key={ts.skill_id} className="bg-dark-surface rounded-lg px-3 py-2 flex items-center gap-2">
                      <span className="text-cta text-sm">🛠</span>
                      <span className="text-[12px] text-text-primary font-semibold">{ts.name}</span>
                    </div>
                  ))}
                </div>
              )}

              <p
                className={`text-sm mb-8 font-medium ${
                  passed ? "text-cta" : "text-danger"
                }`}
              >
                {passed
                  ? "Project complete! Add this to your CV as proof-of-work."
                  : "Not complete yet. Retake to improve your score."}
              </p>

              {passed ? (
                <button
                  onClick={() => onPass(projectId)}
                  className="px-8 py-3.5 bg-cta text-dark-bg font-bold text-sm rounded-2xl
                             hover:bg-cta-hover active:scale-[0.96]
                             transition-all duration-200 min-h-[52px]
                             shadow-[0_0_24px_rgba(127,194,65,0.25)]"
                >
                  Add to CV ✓
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
