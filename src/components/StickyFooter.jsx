import { useState, useEffect } from "react";

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function StickyFooter() {
  const [count, setCount] = useState(1474);

  useEffect(() => {
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
    return () => clearTimeout(timerId);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <div className="max-w-md mx-auto px-5">
        <div className="bg-gradient-to-t from-dark-bg via-dark-bg to-transparent pt-8 pb-5">
          <div className="glass-card text-center">
            <p className="text-text-primary text-xs font-bold tracking-wide">
              Free Access For 24H - Complete 1 to extend
            </p>
          </div>

          <div className="bg-cta rounded-2xl px-5 py-3.5 mt-3 text-center">
            <p className="text-dark-bg font-extrabold text-[15px]">
              Improve Your HR Manager Readiness →
            </p>
            <p className="text-dark-bg/70 text-[11px] mt-1.5">
              Unlocks Certification & CV Referrals on completion
            </p>
          </div>

          <p className="text-center text-text-secondary text-xs mt-3 font-medium animate-fadeIn">
            {count} candidates upgraded their CV & LinkedIn for Free
          </p>
        </div>
      </div>
    </div>
  );
}
