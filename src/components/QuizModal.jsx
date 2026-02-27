import { useState, useEffect, useCallback } from "react";
import { quizQuestions, skills } from "../data/profileData";

export default function QuizModal({ skillId, onPass, onClose }) {
  const questions = quizQuestions[skillId] || [];
  const skill = skills.find((s) => s.id === skillId);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [finished, setFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (finished || timeLeft <= 0) {
      if (timeLeft <= 0) setFinished(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [finished, timeLeft]);

  const handleSelect = useCallback(
    (idx) => {
      if (showFeedback) return;
      setSelected(idx);
      setShowFeedback(true);

      const isCorrect = idx === questions[currentQ].answer;
      if (isCorrect) setScore((s) => s + 1);

      setTimeout(() => {
        if (currentQ < questions.length - 1) {
          setCurrentQ((q) => q + 1);
          setSelected(null);
          setShowFeedback(false);
        } else {
          setFinished(true);
        }
      }, 800);
    },
    [currentQ, questions, showFeedback]
  );

  const passed = score >= 3;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-md mx-4 sm:mx-auto card-glass
                      rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto
                      animate-slideUp shadow-[0_-8px_40px_rgba(0,0,0,0.3)]">

        <div className="sticky top-0 bg-dark-card/95 backdrop-blur-sm border-b border-dark-border/50 px-6 py-5 z-10 rounded-t-3xl sm:rounded-t-3xl">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-extrabold text-text-primary truncate pr-4">
              {skill?.title}
            </h3>
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
            <div className="flex justify-between items-center mt-3">
              <span className="text-[11px] text-text-muted font-medium">
                Question {currentQ + 1} of {questions.length}
              </span>
              <span
                className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${
                  timeLeft < 30
                    ? "text-danger bg-danger/10 animate-pulse"
                    : "text-cta bg-cta/10"
                }`}
              >
                {minutes}:{seconds.toString().padStart(2, "0")}
              </span>
            </div>
          )}

          {!finished && (
            <div className="w-full h-1.5 bg-dark-surface rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-highlight to-cta rounded-full transition-all duration-500"
                style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
              />
            </div>
          )}
        </div>

        <div className="px-6 py-6">
          {!finished ? (
            <>
              {currentQ === 0 && !showFeedback && (
                <div className="text-xs text-text-muted mb-5 bg-dark-surface/60 rounded-xl p-4 border border-dark-border/30">
                  ⏱ You have 2:00 minutes. Answer fast—this is scored.
                </div>
              )}

              <p className="text-[14px] font-bold text-text-primary mb-5 leading-relaxed">
                {questions[currentQ].q}
              </p>

              <div className="space-y-3">
                {questions[currentQ].options.map((opt, idx) => {
                  let optClass = "border-dark-border/60 text-text-secondary hover:border-highlight/40 hover:bg-highlight/5";

                  if (showFeedback) {
                    if (idx === questions[currentQ].answer) {
                      optClass = "border-cta/50 bg-cta/10 text-cta";
                    } else if (idx === selected && idx !== questions[currentQ].answer) {
                      optClass = "border-danger/50 bg-danger/10 text-danger";
                    } else {
                      optClass = "border-dark-border/30 text-text-muted opacity-40";
                    }
                  } else if (selected === idx) {
                    optClass = "border-highlight/60 bg-highlight/10 text-highlight";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={showFeedback}
                      className={`w-full text-left px-5 py-3.5 rounded-xl border text-[13px]
                                  transition-all duration-200 min-h-[48px] leading-relaxed ${optClass}`}
                    >
                      <span className="font-bold mr-2 opacity-40 text-xs">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl mb-5">{passed ? "🎉" : "📚"}</div>
              <p className="text-xl font-extrabold text-text-primary mb-2">
                {score}/{questions.length} Correct
              </p>
              <p
                className={`text-sm mb-8 font-medium ${
                  passed ? "text-cta" : "text-danger"
                }`}
              >
                {passed
                  ? "Verified. Add this skill to your CV."
                  : "Not verified yet. Retake to improve your score."}
              </p>

              {passed ? (
                <button
                  onClick={() => onPass(skillId)}
                  className="px-8 py-3.5 bg-cta text-dark-bg font-bold text-sm rounded-2xl
                             hover:bg-cta-hover active:scale-[0.96]
                             transition-all duration-200 min-h-[52px]
                             shadow-[0_0_24px_rgba(127,194,65,0.25)]"
                >
                  Continue →
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
