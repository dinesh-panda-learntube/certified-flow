import { profile } from "../data/profileData";
import { skills, certifications, projects } from "../data/profileData";
import { Star } from "lucide-react";

export default function CVPreview({ cvView, setCvView, addedItems }) {
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-text-secondary uppercase tracking-widest">
          CV Preview
        </span>
        <div className="flex bg-dark-card border border-dark-border rounded-xl overflow-hidden">
          <button
            onClick={() => setCvView("before")}
            className={`px-5 py-2 text-[11px] font-bold tracking-wide transition-all duration-300
              ${cvView === "before"
                ? "bg-highlight text-white"
                : "text-text-muted hover:text-text-secondary"}`}
          >
            Before
          </button>
          <button
            onClick={() => setCvView("after")}
            className={`px-5 py-2 text-[11px] font-bold tracking-wide transition-all duration-300
              ${cvView === "after"
                ? "bg-cta text-dark-bg"
                : "text-text-muted hover:text-text-secondary"}`}
          >
            After
          </button>
        </div>
      </div>

      <p className="text-text-muted text-[11px] mb-4">
        Everything you add updates your CV instantly.
      </p>

      <div className="glass-card">
        {cvView === "before" ? <BeforeView /> : <AfterView addedItems={addedItems} />}
      </div>
    </div>
  );
}

function BeforeView() {
  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-dark-surface flex items-center justify-center text-xl border border-dark-border">
          👤
        </div>
        <div className="flex-1">
          <p className="font-bold text-[15px] text-text-primary">{profile.name}</p>
          <p className="text-xs text-text-muted mt-0.5">{profile.currentRole}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <InfoRow label="Current Role" value={profile.currentRole} />
        <InfoRow label="Target Role" value={profile.targetRole} />
        <InfoRow label="Experience" value={profile.experience} />
        <InfoRow label="Goal" value={profile.goal} />
      </div>

      <div className="border-t border-dark-border pt-4 mt-2">
        <p className="text-text-muted text-xs italic text-center">
          Complete sections below to build your upgraded CV.
        </p>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="bg-dark-surface rounded-lg px-3 py-2.5">
      <p className="text-[9px] font-bold uppercase tracking-widest text-text-muted mb-0.5">{label}</p>
      <p className="text-xs font-semibold text-text-primary">{value}</p>
    </div>
  );
}

function AfterView({ addedItems }) {
  const addedSkills = skills.filter((s) => addedItems.skills.includes(s.id));
  const addedCerts = certifications.filter((c) => addedItems.certifications.includes(c.id));
  const addedProjs = projects.filter((p) => addedItems.projects.includes(p.id));
  const hasContent = addedSkills.length || addedCerts.length || addedProjs.length;

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cta to-highlight flex items-center justify-center text-xl">
          ✨
        </div>
        <div>
          <p className="font-bold text-[15px] text-text-primary">{profile.name}</p>
          <p className="text-xs text-cta font-semibold mt-0.5">HR Manager Profile</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <InfoRow label="Target Role" value={profile.targetRole} />
        <InfoRow label="Experience" value={profile.experience} />
      </div>

      {!hasContent && (
        <p className="text-text-muted text-xs text-center py-4 italic">
          Add items below to see your upgraded CV here.
        </p>
      )}

      {addedSkills.length > 0 && (
        <CVSection title="Verified Skills">
          <div className="flex flex-wrap gap-2">
            {addedSkills.map((s) => (
              <span key={s.id} className="badge badge-cta flex items-center gap-1"><Star size={10} className="fill-current" /> {s.title}</span>
            ))}
          </div>
        </CVSection>
      )}

      {addedCerts.length > 0 && (
        <CVSection title="Certifications">
          {addedCerts.map((c) => (
            <div key={c.id} className="mb-3 last:mb-0">
              <p className="text-xs font-semibold text-text-primary">{c.title}</p>
              <p className="text-[11px] text-text-muted mt-1 leading-relaxed">{c.caption}</p>
            </div>
          ))}
        </CVSection>
      )}

      {addedProjs.length > 0 && (
        <CVSection title="Proof-of-Work Projects">
          {addedProjs.map((p) => (
            <div key={p.id} className="mb-3 last:mb-0">
              <p className="text-xs font-semibold text-text-primary">{p.title}</p>
              <div className="flex gap-1.5 mt-1.5">
                {p.tools.map((t) => (
                  <span key={t} className="tag-tool">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </CVSection>
      )}
    </div>
  );
}

function CVSection({ title, children }) {
  return (
    <div className="border-t border-dark-border pt-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-muted mb-3">
        {title}
      </p>
      {children}
    </div>
  );
}
