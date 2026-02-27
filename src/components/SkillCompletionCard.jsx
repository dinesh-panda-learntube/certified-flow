import { useState } from "react";
import { skills } from "../data/profileData";

export default function SkillCompletionCard({ result }) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const skill = skills.find((s) => s.id === result.skillId);
  if (!skill) return null;

  const metrics = result.impactMetrics;
  const history = result.history || [];
  const incorrectItems = history.filter((item) => item.type === "incorrect");
  const partialItems = history.filter((item) => item.type === "partial");
  const correctItems = history.filter((item) => item.type === "correct");

  return (
    <div className="animate-fadeIn">
      {/* Simulation Complete Badge */}
      <div className="text-center mb-4">
        <div className="inline-block bg-cta/20 text-cta text-[11px] font-bold tracking-wide px-3 py-1 rounded-full mb-2">
          ✓ SIMULATION COMPLETE
        </div>
        <p className="text-text-muted text-[11px]">
          +{result.score?.toLocaleString() || 0} Skillions Earned
        </p>
      </div>

      {/* Earned Skill Card */}
      <div className="text-[11px] text-text-muted uppercase tracking-wider font-bold mb-2">
        Earned Skill
      </div>
      <div className="bg-dark-surface rounded-xl px-4 py-3 mb-4 border border-cta/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-cta text-sm">✓</span>
            <span className="text-[13px] font-semibold text-text-primary">
              {skill.title}
            </span>
          </div>
          <span className="text-star text-xs flex-shrink-0">
            {"★".repeat(skill.rating)}
          </span>
        </div>
      </div>

      {/* More Details Toggle */}
      <button
        onClick={() => setDetailsOpen(!detailsOpen)}
        className="w-full flex items-center justify-between text-[12px] font-semibold text-highlight
          bg-dark-surface rounded-xl px-4 py-2.5 hover:bg-dark-surface/80 transition-all mb-3"
      >
        <span>More Details</span>
        <span
          className="transition-transform duration-200"
          style={{
            transform: detailsOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ▾
        </span>
      </button>

      {detailsOpen && (
        <div className="space-y-3 animate-fadeIn mb-3">
          {/* Simulation Title */}
          <div className="bg-dark-surface rounded-lg px-3 py-2">
            <p className="text-[10px] text-text-muted uppercase tracking-wider">
              Simulation
            </p>
            <p className="text-xs font-semibold text-text-primary">
              {result.simTitle}
            </p>
          </div>

          {/* Impact Metrics */}
          {metrics && (
            <div className="grid grid-cols-2 gap-3">
              {metrics.time_saved && (
                <div className="bg-dark-surface rounded-xl p-3 border border-dark-border">
                  <div className="text-lg mb-1">⏱️</div>
                  <div className="text-sm font-bold text-emerald-400">
                    {metrics.time_saved}
                  </div>
                  <div className="text-[10px] text-text-muted mt-0.5">
                    time saved
                  </div>
                </div>
              )}
              {metrics.cost_saved && (
                <div className="bg-dark-surface rounded-xl p-3 border border-dark-border">
                  <div className="text-lg mb-1">💰</div>
                  <div className="text-sm font-bold text-cta">
                    {metrics.cost_saved}
                  </div>
                  <div className="text-[10px] text-text-muted mt-0.5">
                    cost saved
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Performance Review — Categorized */}
          {history.length > 0 && (
            <div className="space-y-3">
              {/* Needs Attention (incorrect) */}
              {incorrectItems.length > 0 && (
                <div>
                  <div className="text-[11px] text-red-400 font-bold uppercase tracking-wider mb-1.5">
                    Needs Attention
                  </div>
                  {incorrectItems.map((item, i) => (
                    <ReviewItem
                      key={`inc-${i}`}
                      item={item}
                      color="red"
                      icon="!"
                    />
                  ))}
                </div>
              )}

              {/* Room for Improvement (partial) */}
              {partialItems.length > 0 && (
                <div>
                  <div className="text-[11px] text-yellow-400 font-bold uppercase tracking-wider mb-1.5">
                    Room for Improvement
                  </div>
                  {partialItems.map((item, i) => (
                    <ReviewItem
                      key={`part-${i}`}
                      item={item}
                      color="yellow"
                      icon="!"
                    />
                  ))}
                </div>
              )}

              {/* Good Decisions (correct) */}
              {correctItems.length > 0 && (
                <div>
                  <div className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider mb-1.5">
                    Good Decisions
                  </div>
                  {correctItems.map((item, i) => (
                    <ReviewItem
                      key={`corr-${i}`}
                      item={item}
                      color="green"
                      icon="✓"
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ReviewItem({ item, color, icon }) {
  const [open, setOpen] = useState(false);

  const colorClasses = {
    red: {
      bg: "bg-red-400",
      text: "text-red-400",
    },
    yellow: {
      bg: "bg-yellow-400",
      text: "text-yellow-400",
    },
    green: {
      bg: "bg-emerald-400",
      text: "text-emerald-400",
    },
  };

  const c = colorClasses[color] || colorClasses.green;

  return (
    <div className="bg-dark-surface rounded-lg overflow-hidden border border-dark-border mb-1.5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-3 py-2.5 text-left"
      >
        <span
          className={`w-5 h-5 rounded-full ${c.bg} flex items-center justify-center
            text-[10px] font-bold text-dark-bg flex-shrink-0`}
        >
          {icon}
        </span>
        <span className="text-[12px] text-text-primary truncate flex-1">
          {item.question}
        </span>
        <span className="text-text-muted text-xs">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-3 pb-3 space-y-2 border-t border-dark-border pt-2 animate-fadeIn">
          <div>
            <div className="text-[10px] text-text-muted uppercase mb-0.5">
              Your Answer
            </div>
            <div className="text-[12px] text-text-primary">
              {item.userAnswer}
            </div>
          </div>
          {item.outcomeText && (
            <div>
              <div className={`text-[10px] uppercase mb-0.5 ${c.text}`}>
                Review
              </div>
              <div className="text-[12px] text-text-muted">
                {item.outcomeText}
              </div>
            </div>
          )}
          {item.correctAnswer && item.type !== "correct" && (
            <div className="bg-emerald-400/5 border border-dashed border-emerald-400/30 rounded-lg p-2">
              <div className="text-[10px] text-emerald-400 uppercase font-bold mb-0.5">
                Best Answer
              </div>
              <div className="text-[12px] text-emerald-400">
                {item.correctAnswer}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
