import { profile } from "../data/profileData";

export default function Header() {
  return (
    <div className="text-center mb-8">
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-cta to-highlight bg-clip-text text-transparent mb-3 leading-tight">
        See Your Best HR Manager Profile
      </h1>
      <p className="text-text-secondary text-[13px] leading-relaxed max-w-xs mx-auto">
        Build a CV-ready profile in minutes. Add skills, certifications, and
        proof-of-work projects recruiters actually scan for.
      </p>

      <div className="flex flex-wrap gap-2 justify-center mt-6">
        <span className="badge badge-highlight gap-1.5">
          <span className="text-sm">👤</span>
          {profile.name}
        </span>
        <span className="badge badge-surface gap-1.5">
          <span className="text-sm">💼</span>
          Current: {profile.currentRole}
        </span>
        <span className="badge badge-surface gap-1.5">
          <span className="text-sm">🎯</span>
          Target: {profile.targetRole}
        </span>
        <span className="badge badge-surface gap-1.5">
          <span className="text-sm">📅</span>
          Experience: {profile.experience}
        </span>
        <span className="badge badge-surface gap-1.5">
          <span className="text-sm">🚀</span>
          Goal: {profile.goal}
        </span>
      </div>
    </div>
  );
}
