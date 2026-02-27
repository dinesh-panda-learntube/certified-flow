import { useState } from "react";
import { certifications } from "../data/profileData";

export default function CertificationsSection({ addedItems, onAdd, isAfter }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = certifications.length;

  const prev = () => setCurrentIndex((i) => (i === 0 ? total - 1 : i - 1));
  const next = () => setCurrentIndex((i) => (i === total - 1 ? 0 : i + 1));

  const cert = certifications[currentIndex];
  const added = addedItems.includes(cert.id);

  return (
    <section className="mt-10">
      <h2 className={`text-lg font-extrabold text-text-primary ${isAfter ? "mb-3" : "mb-2"}`}>
        Certifications
      </h2>
      {!isAfter && (
        <p className="text-text-secondary text-[13px] leading-relaxed mb-5">
          Certifications tied to real HR frameworks — each with a
          recruiter-readable caption.
        </p>
      )}

      {isAfter ? (
        <div className="space-y-4">
          {certifications.map((c) => (
            <div key={c.id} className="glass-card">
              <h3 className="text-[13px] font-bold text-text-primary mb-2">
                {c.title}
              </h3>
              <p className="text-[11px] text-text-muted leading-relaxed">
                {c.caption}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full bg-dark-surface border border-dark-border
                flex items-center justify-center text-text-secondary flex-shrink-0
                hover:border-highlight hover:text-highlight transition-all active:scale-90"
            >
              ‹
            </button>

            <div className="flex-1 min-w-0">
              <div className="glass-card" style={!added ? { borderStyle: "dashed" } : undefined}>
                <h3 className="text-[13px] font-bold text-text-primary mb-3">
                  {cert.title}
                </h3>
                <p className="text-[11px] text-text-muted leading-relaxed mb-4">
                  {cert.caption}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="badge badge-highlight">{cert.match} match</span>
                  <span className="badge badge-surface">{cert.cvSignal}</span>
                </div>

                <div>
                  {!added ? (
                    <button
                      onClick={() => onAdd(cert.id)}
                      className="btn-primary btn-highlight"
                    >
                      Add Certification
                    </button>
                  ) : (
                    <span className="badge-added">✓ Added</span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={next}
              className="w-9 h-9 rounded-full bg-dark-surface border border-dark-border
                flex items-center justify-center text-text-secondary flex-shrink-0
                hover:border-highlight hover:text-highlight transition-all active:scale-90"
            >
              ›
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 mt-4">
            {certifications.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  i === currentIndex
                    ? "bg-highlight w-5"
                    : "bg-dark-border hover:bg-text-muted"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
