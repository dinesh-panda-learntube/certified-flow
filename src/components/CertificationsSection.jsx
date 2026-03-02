import { useState, useRef } from "react";
import { certifications } from "../data/profileData";

export default function CertificationsSection({ addedItems, onAdd, onStartScenario, isAfter, certificationsList = certifications }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);
  const total = certificationsList.length;

  const slide = (direction) => {
    if (scrollRef.current) {
      if (scrollRef.current.children.length === 0) return;
      const cardWidth = scrollRef.current.children[0].offsetWidth;
      const gap = 16;
      const amount = direction === "next" ? (cardWidth + gap) : -(cardWidth + gap);
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const prev = () => slide("prev");
  const next = () => slide("next");

  const handleScroll = () => {
    if (!scrollRef.current || scrollRef.current.children.length === 0) return;
    const cardWidth = scrollRef.current.children[0].offsetWidth;
    const gap = 16;
    const index = Math.round(scrollRef.current.scrollLeft / (cardWidth + gap));
    if (index !== currentIndex && index >= 0 && index < total) {
      setCurrentIndex(index);
    }
  };

  const scrollTo = (index) => {
    if (scrollRef.current && scrollRef.current.children.length > 0) {
      const cardWidth = scrollRef.current.children[0].offsetWidth;
      const gap = 16;
      scrollRef.current.scrollTo({ left: index * (cardWidth + gap), behavior: "smooth" });
    }
  };

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-2">
        <h2 className={`text-lg font-extrabold text-text-primary ${isAfter ? "mb-1" : ""}`}>
          Industry-Recognised Certifications
        </h2>
        {isAfter && (
          <span className="text-[11px] font-bold text-text-muted">
            {certificationsList.filter(c => addedItems.includes(c.id)).length}/{certificationsList.length}
          </span>
        )}
        {!isAfter && (
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="w-8 h-8 rounded-full bg-dark-surface border border-dark-border
                flex items-center justify-center text-text-secondary flex-shrink-0
                hover:border-highlight hover:text-highlight transition-all active:scale-90"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="w-8 h-8 rounded-full bg-dark-surface border border-dark-border
                flex items-center justify-center text-text-secondary flex-shrink-0
                hover:border-highlight hover:text-highlight transition-all active:scale-90"
            >
              ›
            </button>
          </div>
        )}
      </div>
      {!isAfter && (
        <p className="text-text-secondary text-[13px] leading-relaxed mb-5">
          Certifications tied to real HR frameworks.
        </p>
      )}

      {isAfter ? (
        <div className="space-y-4">
          {(() => {
            const sortedCerts = [...certificationsList].sort((a, b) => {
              const matchA = parseInt(a.match) || 0;
              const matchB = parseInt(b.match) || 0;
              return matchB - matchA;
            });

            let incompleteLabelCount = 0;

            return sortedCerts.map((c) => {
              const added = addedItems.includes(c.id);
              let showMatch = false;
              if (!added) {
                if (incompleteLabelCount < 3) {
                  showMatch = true;
                }
                incompleteLabelCount++;
              }

              return (
                <div
                  key={c.id}
                  className="glass-card cursor-pointer hover:border-highlight transition-colors"
                  onClick={() => onStartScenario(c.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      {showMatch && (
                        <p className="text-[10px] font-bold text-highlight mb-0.5 tracking-wide">
                          Your Match: {c.match}
                        </p>
                      )}
                      <h3 className={`text-[13px] font-bold text-text-primary ${!added ? 'mb-1' : 'mb-2'}`}>
                        {c.title}
                      </h3>
                      {!added ? (
                        <p className="text-[11px] text-text-secondary leading-relaxed mb-3">
                          {c.cvSignal}
                        </p>
                      ) : (
                        <p className="text-[11px] text-text-muted leading-relaxed mb-3">
                          {c.caption}
                        </p>
                      )}
                    </div>
                    {added ? (
                      <span className="text-[10px] text-cta font-semibold border border-cta/30 bg-cta/10 px-2 py-0.5 rounded ml-2 mt-0.5 flex-shrink-0 whitespace-nowrap">
                        Awarded {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </span>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onStartScenario(c.id);
                        }}
                        className="text-[10px] text-highlight font-semibold border border-highlight/30 bg-highlight/10 px-3 py-1 rounded whitespace-nowrap ml-2 mt-0.5 hover:bg-highlight/20 transition-colors flex-shrink-0"
                      >
                        + Add
                      </button>
                    )}
                  </div>
                </div>
              );
            });
          })()}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 pt-1 -mx-2 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {certificationsList.map((cert) => {
              const added = addedItems.includes(cert.id);
              return (
                <div key={cert.id} className="w-[85%] sm:w-[75%] flex-shrink-0 snap-start h-auto flex">
                  <div
                    className="glass-card cursor-pointer hover:border-highlight transition-colors w-full h-full flex flex-col"
                    style={!added ? { borderStyle: "dashed", background: "transparent" } : undefined}
                    onClick={() => onStartScenario ? onStartScenario(cert.id) : onAdd(cert.id)}
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="badge badge-highlight">{cert.match} match</span>
                      </div>

                      <h3 className="text-[13px] font-bold text-text-primary mb-5">
                        {cert.title}
                      </h3>

                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-text-secondary text-[13px] leading-relaxed mb-5">{cert.cvSignal}</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-2">
                      {!added ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onStartScenario ? onStartScenario(cert.id) : onAdd(cert.id);
                          }}
                          className="btn-primary btn-highlight w-full"
                        >
                          + Add
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onStartScenario ? onStartScenario(cert.id) : onAdd(cert.id);
                          }}
                          className="badge-added w-full text-center"
                        >
                          ✓ Added
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-2 mt-2">
            {certificationsList.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${i === currentIndex
                  ? "bg-highlight w-5"
                  : "bg-dark-border hover:bg-text-muted"
                  }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
