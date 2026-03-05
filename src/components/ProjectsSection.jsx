import { projects } from "../data/profileData";
import { Banknote, Check } from "lucide-react";

export default function ProjectsSection({ addedItems, onAdd, onStartSim, isAfter }) {
  return (
    <section className="mt-14">
      <div className={`flex items-center justify-between ${isAfter ? "mb-3" : "mb-2"}`}>
        <h2 className={`text-lg font-extrabold text-text-primary`}>
          Real HR Work Projects
        </h2>
        {isAfter && (
          <span className="text-[11px] font-bold text-text-muted">
            {projects.filter(p => addedItems.includes(p.id)).length}/{projects.length}
          </span>
        )}
      </div>
      {!isAfter && (
        <p className="text-text-secondary text-[13px] mt-2 leading-relaxed mb-6">
          Complete projects based on role-relevant tasks.
        </p>
      )}

      {isAfter ? (
        <div className="space-y-4">
          {projects.map((project) => {
            const added = addedItems.includes(project.id);
            return (
              <div
                key={project.id}
                className="glass-card cursor-pointer hover:border-highlight transition-colors flex flex-col"
                onClick={() => onStartSim(project.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 flex-wrap mr-2">
                    {project.tools.map((tool) => (
                      <span key={tool} className="tag-tool h-6">
                        {tool}
                      </span>
                    ))}
                    {!added && (
                      <span className="text-[11px] font-bold text-highlight mr-1 flex items-center h-6">
                        <Banknote size={12} className="inline mr-1" /> {project.salaryRange}
                      </span>
                    )}
                  </div>
                  {added ? (
                    <span className="text-[10px] text-cta font-semibold bg-cta/10 border border-cta/30 px-2 py-0.5 rounded whitespace-nowrap flex-shrink-0 flex items-center gap-1">
                      <Check size={12} /> Added
                    </span>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onStartSim(project.id);
                      }}
                      className="text-[10px] text-highlight font-semibold border border-highlight/30 bg-highlight/10 px-3 py-1 rounded whitespace-nowrap flex-shrink-0 hover:bg-highlight/20 transition-colors"
                    >
                      + Add
                    </button>
                  )}
                </div>
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
            );
          })}
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => {
            const added = addedItems.includes(project.id);

            return (
              <div
                key={project.id}
                className="glass-card cursor-pointer hover:border-highlight transition-colors flex flex-col"
                style={!added ? { borderStyle: "dashed", background: "transparent" } : undefined}
                onClick={() => onStartSim ? onStartSim(project.id) : onAdd(project.id)}
              >
                <div className="w-full text-left flex-1 mb-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-[13px] font-bold text-text-primary pr-3 mb-3">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {project.tools.map((tool) => (
                      <span key={tool} className="tag-tool">
                        {tool}
                      </span>
                    ))}
                    <span className="badge badge-highlight font-medium">
                      <Banknote size={12} className="inline mr-1" /> {project.salaryRange}
                    </span>
                  </div>
                </div>

                <div className="pt-2 mt-auto">
                  {!added ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onStartSim ? onStartSim(project.id) : onAdd(project.id);
                      }}
                      className="btn-primary btn-highlight w-full"
                    >
                      + Add
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onStartSim ? onStartSim(project.id) : onAdd(project.id);
                      }}
                      className="badge-added w-full flex items-center justify-center gap-1"
                    >
                      <Check size={14} /> Added To CV
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
