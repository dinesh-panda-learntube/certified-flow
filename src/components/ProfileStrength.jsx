export default function ProfileStrength({ totalAdded }) {
  const maxItems = 10;
  const percentage = Math.min((totalAdded / maxItems) * 100, 100);

  const getStrengthLabel = () => {
    if (totalAdded === 0) return "Not Started";
    if (totalAdded < 3) return "Getting Started";
    if (totalAdded < 6) return "Building Up";
    if (totalAdded < 10) return "Strong";
    return "Outstanding";
  };

  const getBarColor = () => {
    if (totalAdded === 0) return "bg-dark-border";
    if (totalAdded < 3) return "bg-danger";
    if (totalAdded < 6) return "bg-highlight";
    if (totalAdded < 10) return "bg-cta";
    return "bg-gradient-to-r from-cta to-highlight";
  };

  return (
    <div className="mt-5 pt-5 border-t border-dark-border">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-bold text-text-primary">
          Profile Strength <span className="text-text-muted font-normal"> - {getStrengthLabel()}</span>
        </span>
        <span className="badge badge-cta">
          {Math.round(percentage)}% Complete
        </span>
      </div>

      <div className="w-full h-3 bg-dark-surface rounded-full overflow-hidden mt-1">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${getBarColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-[11px] text-text-muted text-center mt-3 font-medium tracking-wide">
        Unlocks Certification & CV Referrals On Completing
      </p>

      {/* <div className="flex justify-between items-center mt-3">
        <span className="text-xs font-semibold text-text-secondary">
          {getStrengthLabel()}
        </span>
        {totalAdded < 3 && (
          <span className="text-[11px] text-text-muted">
            Add {3 - totalAdded} more to get started
          </span>
        )}
      </div> */}
    </div>
  );
}
