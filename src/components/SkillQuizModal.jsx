import { useState, useEffect, useCallback, useMemo } from "react";
import { skillQuizData, skills } from "../data/profileData";
import { Star, Check } from "lucide-react";

export default function SkillQuizModal({ skillId, onPass, onClose }) {
  const quizData = skillQuizData[skillId];
  const skill = skills.find((s) => s.id === skillId);
  const questions = quizData?.questions || [];
  const totalTimebox = quizData?.timebox_seconds || 60;

  const [currentQ, setCurrentQ] = useState(0);

  const shuffledOptions = useMemo(() => {
    const q = questions[currentQ];
    if (!q) return [];

    // Map options tracking their original indices for stable grading checks
    const opts = q.options.map((text, index) => ({
      text,
      originalIndex: index
    }));

    // Fisher-Yates secure shuffle without mutating source objects natively
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    return opts;
  }, [currentQ, questions]);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(totalTimebox);
  const [finished, setFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [skillEarned, setSkillEarned] = useState(false);

  // Per-question countdown
  useEffect(() => {
    if (finished || showFeedback) return;
    if (timeLeft <= 0) {
      // Time's up for this question — auto-advance
      handleTimeout();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [finished, timeLeft, showFeedback]);

  const handleTimeout = useCallback(() => {
    setShowFeedback(true);
    setTimeout(() => {
      setFinished(true);
    }, 800);
  }, []);

  const handleSelect = useCallback(
    (idx) => {
      if (idx === questions[currentQ].correct_index) setScore((s) => s + 1);

      if (currentQ < questions.length - 1) {
        setCurrentQ((q) => q + 1);
      } else {
        setFinished(true);
      }
    },
    [currentQ, questions]
  );

  const handleAddToCv = useCallback(() => {
    onPass(skillId);
    setSkillEarned(true);
    // Auto-close after 2 seconds
    setTimeout(() => onClose(), 2000);
  }, [skillId, onPass, onClose]);

  if (!quizData || !skill) return null;

  const passed = score >= Math.ceil(questions.length * 0.6);
  const pct = Math.round((score / questions.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-md mx-4 sm:mx-auto glass-card
                      rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto
                      animate-slideUp shadow-[0_-8px_40px_rgba(0,0,0,0.3)]"
        style={{ background: "linear-gradient(145deg, #112f48, #0f2940)", border: "1px solid #1e4c6b" }}>

        {/* Header */}
        <div className="sticky top-0 rounded-t-3xl z-10 px-6 py-5 border-b border-dark-border/50"
          style={{ background: "rgba(15,45,68,0.95)", backdropFilter: "blur(8px)" }}>
          <div className="flex justify-between items-center">
            <div className="pr-4">
              <p className="text-[10px] text-highlight font-bold uppercase tracking-widest mb-1">
                Skill Quiz
              </p>
              <h3 className="text-sm font-extrabold text-text-primary truncate">
                {quizData.simulation_title}
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

          {!finished && !skillEarned && (
            <div className="flex justify-between items-center mt-3">
              <span className="text-[11px] text-text-muted font-medium">
                {currentQ} Completed
              </span>
              <span
                className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${timeLeft < 10
                  ? "text-danger bg-danger/10 animate-pulse"
                  : "text-highlight bg-highlight/10"
                  }`}
              >
                0:{timeLeft.toString().padStart(2, "0")}
              </span>
            </div>
          )}

          {!finished && !skillEarned && (
            <div className="w-full h-1.5 bg-dark-surface rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-highlight rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${(timeLeft / totalTimebox) * 100}%` }}
              />
            </div>
          )}
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {skillEarned ? (
            /* Skill Earned screen */
            <div className="text-center py-8 animate-fadeIn">
              <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-cta/20 flex items-center justify-center text-cta">
                <Check size={40} />
              </div>
              <p className="text-xs text-cta font-bold uppercase tracking-widest mb-2">
                Skill Earned
              </p>
              <p className="text-lg font-extrabold text-text-primary mb-2">
                {skill.title}
              </p>
              <p className="text-sm text-text-muted">
                Added to your CV
              </p>
              <div className="mt-4 flex justify-center">
                {Array.from({ length: skill.rating || 0 }).map((_, i) => (
                  <Star key={i} size={18} className="text-star fill-star mx-0.5" />
                ))}
              </div>
            </div>
          ) : !finished ? (
            <>
              {currentQ === 0 && !showFeedback && (
                <div className="text-xs text-text-muted mb-5 bg-dark-surface/60 rounded-xl p-4 border border-dark-border/30">
                  ⏱ {totalTimebox} seconds total to complete. Answer fast—this is scored.
                </div>
              )}

              <p className="text-[14px] font-bold text-text-primary mb-5 leading-relaxed">
                {questions[currentQ].q}
              </p>

              <div className="space-y-3">
                {shuffledOptions.map((opt) => {
                  let optClass =
                    "border-dark-border/60 text-text-secondary hover:border-highlight/40 hover:bg-highlight/5";

                  if (showFeedback) {
                    if (opt.originalIndex === selected) {
                      optClass = "border-highlight/60 bg-highlight/10 text-highlight";
                    } else {
                      optClass = "border-dark-border/30 text-text-muted opacity-40";
                    }
                  } else if (selected === opt.originalIndex) {
                    optClass = "border-highlight/60 bg-highlight/10 text-highlight";
                  }

                  return (
                    <button
                      key={opt.originalIndex}
                      onClick={() => handleSelect(opt.originalIndex)}
                      disabled={showFeedback}
                      className={`w-full text-left px-4 py-3 border rounded-xl transition-all font-medium text-[13px] leading-snug ${optClass}`}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            /* Result screen */
            <div className="text-center py-8">
              <div className="text-6xl mb-5">{passed ? "🎉" : "📚"}</div>
              <p className="text-xl font-extrabold text-text-primary mb-1">
                {score}/{questions.length} Correct
              </p>
              <p className="text-sm text-text-muted mb-2">{pct}%</p>
              <p
                className={`text-sm mb-8 font-medium ${passed ? "text-cta" : "text-danger"
                  }`}
              >
                {passed
                  ? "Verified. Add this skill to your CV."
                  : "Not verified yet. Retake to improve your score."}
              </p>

              {passed ? (
                <button
                  onClick={handleAddToCv}
                  className="px-8 py-3.5 bg-cta text-dark-bg font-bold text-sm rounded-2xl
                             hover:bg-cta-hover active:scale-[0.96]
                             transition-all duration-200 min-h-[52px]
                             shadow-[0_0_24px_rgba(127,194,65,0.25)]"
                >
                  Add to CV <Check size={16} className="inline ml-1 mb-0.5" />
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
