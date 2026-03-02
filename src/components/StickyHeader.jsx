import { useState, useEffect, useRef } from "react";

export default function StickyHeader({ totalAdded, nextItem, onStartNext }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeout = useRef(null);

    useEffect(() => {
        // 1. Scroll hiding logic
        const handleScroll = () => {
            setIsScrolling(true);
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
            scrollTimeout.current = setTimeout(() => {
                setIsScrolling(false);
            }, 1000);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        // 2. Intersection Observer logic
        const profileCard = document.getElementById("profile-card-section");
        let observer;

        if (profileCard) {
            observer = new IntersectionObserver(
                (entries) => {
                    const entry = entries[0];
                    // If the profile card is visible, hide the header. Otherwise show it.
                    setIsVisible(!entry.isIntersecting);
                },
                { threshold: 0 }
            );
            observer.observe(profileCard);
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
            if (observer && profileCard) observer.unobserve(profileCard);
        };
    }, []);

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

    // Only show if not scrolling AND out of viewport of the Profile Card
    const shouldShow = isVisible && !isScrolling;

    return (
        <div
            className={`fixed top-0 left-0 right-0 z-40 pt-4 px-4 transition-transform duration-500 ease-in-out ${shouldShow ? "translate-y-0" : "-translate-y-[130%]"
                }`}
        >
            <div className="max-w-md mx-auto">
                <div
                    onClick={() => {
                        if (nextItem && totalAdded < 10) {
                            onStartNext(nextItem.type, nextItem.id);
                        }
                    }}
                    className={`bg-dark-card/95 backdrop-blur-md border border-dark-border shadow-lg shadow-black/30 rounded-2xl pt-4 pb-3 px-5 transition-transform ${nextItem && totalAdded < 10 ? "cursor-pointer active:scale-[0.98]" : ""
                        }`}
                >

                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[12px] font-bold text-text-primary">
                            Profile Strength <span className="text-text-muted font-normal text-[11px]"> - {getStrengthLabel()}</span>
                        </span>
                        <span className="text-[10px] font-bold text-dark-bg bg-cta px-1.5 py-0.5 rounded">
                            {Math.round(percentage)}% Complete
                        </span>
                    </div>

                    <div className="w-full h-1.5 bg-dark-surface rounded-full overflow-hidden mb-3">
                        <div
                            className={`h-full rounded-full transition-all duration-700 ease-out ${getBarColor()}`}
                            style={{ width: `${percentage}%` }}
                        />
                    </div>

                    {nextItem && totalAdded < 10 && (
                        <div className="flex justify-between items-center bg-dark-surface/50 rounded-lg pr-1.5 pl-3 py-1.5 border border-dark-border/50">
                            <span className="text-[11px] font-bold text-text-primary truncate mr-2">
                                <span className="text-text-muted opacity-70 font-semibold uppercase tracking-wide text-[9px]">Next {nextItem.type}:</span> {nextItem.title}
                            </span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onStartNext(nextItem.type, nextItem.id);
                                }}
                                className="bg-cta hover:scale-[1.02] active:scale-[0.98] transition-all text-dark-bg font-bold text-[10px] px-3 py-1.5 rounded-md flex-shrink-0"
                            >
                                + Add
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
