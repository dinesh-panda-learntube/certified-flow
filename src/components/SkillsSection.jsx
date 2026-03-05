import { skills } from "../data/profileData";
import { Star, Check } from "lucide-react";

export default function SkillsSection({
  addedItems,
  onAddSkill,
  isAfter,
}) {
  const addedSkills = skills.filter((s) => addedItems.includes(s.id));
  const remainingSkills = skills.filter((s) => !addedItems.includes(s.id));

  return (
    <section className="mt-10">
      <div className={`flex items-center justify-between ${isAfter ? "mb-3" : "mb-2"}`}>
        <h2 className="text-lg font-extrabold text-text-primary">
          Core Skills
        </h2>
        {isAfter && (
          <span className="text-[11px] font-bold text-text-muted">{addedSkills.length}/{skills.length}</span>
        )}
      </div>
      {!isAfter && (
        <p className="text-text-secondary text-[13px] leading-relaxed mb-5">
          Verify with quick quizzes & get your 5 <Star size={12} className="inline text-star fill-star" /> rating.
        </p>
      )}

      <div className="glass-card">
        {isAfter ? (
          <div className="space-y-3">
            {skills.map((skill) => {
              const added = addedItems.includes(skill.id);
              return (
                <div
                  key={skill.id}
                  className="w-full flex items-center justify-between bg-dark-surface rounded-xl px-4 py-3 animate-fadeIn border border-transparent cursor-pointer hover:border-highlight transition-all"
                  onClick={() => onAddSkill(skill.id)}
                >
                  <div className="flex items-center gap-3">
                    {added ? (
                      <span className="text-cta hidden sm:inline-block"><Check size={16} /></span>
                    ) : (
                      <span className="text-text-muted text-sm opacity-50 hidden sm:inline-block">○</span>
                    )}
                    <span className="text-[13px] font-semibold text-text-primary text-left">
                      {skill.title}
                    </span>
                  </div>
                  {added ? (
                    <span className="flex items-center gap-0.5 flex-shrink-0 ml-3">
                      {Array.from({ length: skill.rating }).map((_, i) => (
                        <Star key={i} size={12} className="text-star fill-star" />
                      ))}
                    </span>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddSkill(skill.id);
                      }}
                      className="text-[10px] text-highlight font-semibold border border-highlight/30 bg-highlight/10 px-3 py-1 rounded whitespace-nowrap ml-3 hover:bg-highlight/20 transition-colors flex-shrink-0"
                    >
                      + Add
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <>
            {addedSkills.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 mb-4">
                <div className="w-12 h-12 rounded-full bg-dark-surface border-2 border-dashed border-dark-border flex items-center justify-center mb-3">
                  <span className="text-cta text-2xl font-bold">+</span>
                </div>
                <p className="text-text-muted text-xs text-center leading-relaxed">
                  Complete quizzes to earn skills to add here
                </p>
              </div>
            )}

            {addedSkills.length > 0 && (
              <div className="space-y-3 mb-5">
                {addedSkills.map((skill) => (
                  <button
                    key={skill.id}
                    onClick={() => onAddSkill(skill.id)}
                    className="w-full flex items-center justify-between bg-dark-surface rounded-xl px-4 py-3 animate-fadeIn"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-cta hidden sm:inline-block"><Check size={16} /></span>
                      <span className="text-[13px] font-semibold text-text-primary text-left">
                        {skill.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {remainingSkills.length > 0 && (
              <>
                <div className="border-t border-dark-border my-4" />
                <div className="overflow-x-auto scrollbar-hide -mx-1">
                  <div className="flex gap-2 px-1 pb-1" style={{ width: "max-content" }}>
                    {remainingSkills.map((skill) => (
                      <button
                        key={skill.id}
                        onClick={() => onAddSkill(skill.id)}
                        className="flex items-center gap-2 bg-dark-surface border border-dark-border
                          rounded-xl px-4 py-2.5 text-[12px] font-semibold text-text-secondary
                          hover:border-cta hover:text-cta transition-all duration-200
                          whitespace-nowrap flex-shrink-0 active:scale-95"
                      >
                        <span className="text-cta text-sm font-bold">+</span>
                        {skill.title}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}
