import { skills } from "../data/profileData";

export default function SkillsSection({
  addedItems,
  onAddSkill,
  isAfter,
}) {
  const addedSkills = skills.filter((s) => addedItems.includes(s.id));
  const remainingSkills = skills.filter((s) => !addedItems.includes(s.id));

  return (
    <section className="mt-10">
      <h2 className={`text-lg font-extrabold text-text-primary ${isAfter ? "mb-3" : "mb-2"}`}>
        Core Skills
      </h2>
      {!isAfter && (
        <p className="text-text-secondary text-[13px] leading-relaxed mb-5">
          Verify HR skills with quick quizzes. Added skills appear on your
          profile with a ★ rating.
        </p>
      )}

      <div className="glass-card">
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
              <div
                key={skill.id}
                className="flex items-center justify-between bg-dark-surface rounded-xl px-4 py-3 animate-fadeIn"
              >
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
            ))}
          </div>
        )}

        {remainingSkills.length > 0 && !isAfter && (
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
      </div>
    </section>
  );
}
