import { useState, useEffect, useRef } from "react";

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function StickyFooter({ totalAdded, nextItem, onStartNext }) {
  const [count, setCount] = useState(1474);
  const [showColon, setShowColon] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(false);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const colonInterval = setInterval(() => {
      setShowColon((prev) => !prev);
    }, 1000);

    const tick = () => {
      setCount((prev) => prev + rand(5, 10));
    };
    const schedule = () => {
      const delay = rand(5, 15) * 1000;
      return setTimeout(() => {
        tick();
        timerId = schedule();
      }, delay);
    };
    let timerId = schedule();
    return () => {
      clearTimeout(timerId);
      clearInterval(colonInterval);
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const isCompleted = totalAdded >= 10;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-500 ease-in-out ${isVisible ? "translate-y-0" : "translate-y-full"}`}>
      <div className="max-w-md mx-auto px-5">
        <div className="bg-gradient-to-t from-dark-bg via-dark-bg to-transparent pt-8 pb-5">
          <div className="bg-highlight text-center px-4 py-1.5 rounded-t-xl mx-auto w-max mb-[-12px] relative z-10 shadow-lg border border-highlight/50">
            <p className="text-white text-[10px] font-extrabold tracking-widest uppercase">
              Free Access For 23H<span className={showColon ? "opacity-100" : "opacity-0"}>:</span>59M - Complete 1 to extend
            </p>
          </div>

          {isCompleted ? (
            <a
              href="https://calendly.com/rohan-careerninja/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-cta rounded-2xl px-5 py-4 mt-3 text-center shadow-lg hover:scale-[1.02] transition-transform"
            >
              <p className="text-dark-bg font-black text-[17px] tracking-tight">
                Contact Us For CV & Certification →
              </p>
            </a>
          ) : (
            <button
              onClick={() => {
                if (nextItem) onStartNext(nextItem.type, nextItem.id);
              }}
              className="bg-cta rounded-2xl px-5 py-3.5 mt-3 text-center shadow-lg w-full block hover:scale-[1.02] transition-transform"
            >
              <p className="text-dark-bg font-black text-[16px] tracking-tight">
                Improve Your HR Manager Readiness →
              </p>
              {nextItem && (
                <p className="text-dark-bg/80 text-[11px] mt-1.5 font-bold uppercase tracking-wide">
                  {nextItem.type}: {nextItem.title}
                </p>
              )}
            </button>
          )}

          <p className="text-center text-text-secondary text-xs mt-3 font-medium animate-fadeIn">
            {count} candidates upgraded their CV & LinkedIn for Free
          </p>
        </div>
      </div>
    </div>
  );
}
