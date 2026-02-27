import { useState } from "react";
import { projects } from "../data/profileData";

export default function ProjectsSection({ addedItems, onAdd, isAfter }) {
  const [expanded, setExpanded] = useState({});

  const toggle = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section className="mt-14">
      <h2 className={`text-lg font-extrabold text-text-primary ${isAfter ? "mb-3" : ""}`}>
        Projects That Look Like Real HR Work
      </h2>
      {!isAfter && (
        <p className="text-text-secondary text-[13px] mt-2 leading-relaxed mb-6">
          Complete role-relevant tasks using realistic artefacts (docs, trackers,
          chats). These become proof on your CV.
        </p>
      )}

      {isAfter ? (
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="glass-card">
              <h3 className="text-[13px] font-bold text-text-primary mb-3">
                {project.title}
              </h3>
              <div className="space-y-2">
                {project.outcomes.map((o, i) => (
                  <p
                    key={i}
                    className="flex items-start gap-2 text-[11px] text-text-secondary"
                  >
                    <span className="text-cta flex-shrink-0 mt-px">▸</span>
                    {o}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => {
            const added = addedItems.includes(project.id);
            const isOpen = !!expanded[project.id];

            return (
              <div key={project.id} className="glass-card" style={!added ? { borderStyle: "dashed" } : undefined}>
                <button
                  onClick={() => toggle(project.id)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3 className="text-[13px] font-bold text-text-primary pr-3">
                    {project.title}
                  </h3>
                  <span
                    className={`text-text-muted text-lg flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▾
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-4 animate-fadeIn">
                    <div className="flex items-center gap-2 mb-5 flex-wrap">
                      <span className="badge badge-highlight">
                        {project.match} match
                      </span>
                      {project.tools.map((tool) => (
                        <span key={tool} className="tag-tool">
                          {tool}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-5 mb-5">
                      <div className="flex items-start gap-3">
                        <span className="text-sm mt-0.5 flex-shrink-0">📎</span>
                        <div>
                          <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest block mb-1.5">
                            Includes artefacts
                          </span>
                          <p className="text-[11px] text-text-secondary leading-relaxed">
                            {project.evidence}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="text-sm mt-0.5 flex-shrink-0">📝</span>
                        <div>
                          <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest block mb-2">
                            What you&apos;ll submit
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {project.deliverables.map((d) => (
                              <span key={d} className="tag-deliverable">
                                {d}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] text-text-muted mb-5 space-y-2">
                      <p>💰 {project.salaryRange}</p>
                      {project.outcomes.map((o, i) => (
                        <p
                          key={i}
                          className="flex items-start gap-2 text-text-secondary"
                        >
                          <span className="text-cta flex-shrink-0 mt-px">▸</span>
                          {o}
                        </p>
                      ))}
                    </div>

                    <div className="pt-1">
                      {!added ? (
                        <button
                          onClick={() => onAdd(project.id)}
                          className="btn-primary btn-highlight"
                        >
                          Start Project
                        </button>
                      ) : (
                        <span className="badge-added">✓ Added To CV</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
