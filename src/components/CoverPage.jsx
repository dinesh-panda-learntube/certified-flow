import { Star, Check, Award, User, Lightbulb, Sparkles } from "lucide-react";

export default function CoverPage({ profile, onStart }) {
    return (
        <div className="relative h-[100dvh] w-full bg-dark-bg overflow-hidden flex flex-col">

            {/* Top Text Content (z-10 ensures it sits above the thumbnail background) */}
            <div className="relative z-10 px-5 pt-10 pb-4 text-center flex-shrink-0 animate-slideDown max-w-md mx-auto w-full">
                <div className="inline-block bg-dark-surface border border-dark-border px-4 py-1.5 rounded-full mb-5 shadow-md">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-white uppercase tracking-wide">
                        <Award size={14} className="text-highlight" /> 5x Employer Recognition
                    </span>
                </div>

                <h1 className="text-4xl font-black text-text-primary mb-3 leading-tight tracking-tight">
                    Build Your Best <br></br> <span className="bg-gradient-to-r from-cta to-highlight text-transparent bg-clip-text">{profile.targetRole}</span> CV
                </h1>

                <p className="text-sm font-semibold text-text-secondary flex items-center justify-center gap-2">
                    <span className="opacity-80">{profile.currentRole}</span>
                    <span className="text-text-muted">→</span>
                    <span className="text-cta">{profile.targetRole}</span>
                    {/* <span className="opacity-80">({profile.experience})</span> */}
                </p>
            </div>

            {/* Flowing Faded Thumbnail Background (z-0) */}
            <div
                className="flex-1 w-full z-0 flex flex-col items-center pt-6 pointer-events-none select-none transition-all px-5"
                style={{
                    maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 95%)",
                    WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 95%)"
                }}
            >
                <div className="max-w-[320px] w-full">
                    {/* Upgraded CV Chip */}
                    <div className="flex justify-center mb-4 text-center">
                        <span className="bg-cta/20 text-cta border border-cta/30 px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-sm flex items-center gap-1.5">
                            <Sparkles size={12} /> Upgraded CV
                        </span>
                    </div>

                    <div className="glass-card mb-4 opacity-[0.85]">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center border bg-dark-surface border-dark-border text-text-muted">
                                <User size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-sm text-text-primary">
                                    {profile.name}
                                </p>
                                <p className="text-[10px] font-semibold text-cta">
                                    {profile.currentRole}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Checklist of Features with Bottom Fade */}
                    <div 
                        className="glass-card mt-4 overflow-hidden"
                        style={{
                            maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
                            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)"
                        }}
                    >
                        <div className="flex flex-col divide-y divide-dark-border/50">
                            {[
                                { text: "Verified High-Value Skills", stars: true },
                                { text: "Specialised Certifications" },
                                { text: "Latest Tools & Frameworks" },
                                { text: "Professional Website Link" }
                            ].map((feature, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center h-[50px] px-4"
                                    >
                                        <div className="flex justify-between items-center w-full gap-2">
                                            <div className="flex items-center gap-2.5">
                                                <div className="bg-cta/20 p-1 rounded-full text-cta shrink-0 flex items-center justify-center">
                                                    <Check size={10} strokeWidth={4} />
                                                </div>
                                                <p className="text-[12px] font-bold text-text-primary truncate">{feature.text}</p>
                                            </div>
                                            {feature.stars && (
                                                <div className="flex items-center gap-[1px] shrink-0 ml-2 bg-highlight/10 px-1.5 py-1 rounded-md">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <Star key={i} size={10} className="text-star fill-star" />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Absolute Sticky Bottom CTA Block (z-20 ensures it sits physically above the thumbnail flex background) */}
            <div className="absolute bottom-0 inset-x-0 z-20 w-full px-5 pb-8 pt-16 bg-gradient-to-t from-dark-bg via-dark-bg/95 to-transparent">
                <div className="max-w-md mx-auto w-full animate-slideUp">
                    <p className="flex items-start justify-center gap-2 text-[13px] text-text-primary text-center leading-relaxed font-bold px-4 mb-4 opacity-95">
                        <Lightbulb size={16} className="text-cta shrink-0 mt-0.5" />
                        <span>Expert Shaji Divekar, IIFL <span className="text-text-muted">Has Selected High-Value Skills, Certifications & Projects Employers Recognise.</span></span>
                    </p>
                    <button
                        onClick={onStart}
                        className="w-full bg-cta text-dark-bg py-3.5 rounded-2xl shadow-[0_4px_24px_rgba(127,194,65,0.25)] hover:scale-[1.02] transition-all active:scale-95 flex flex-col items-center justify-center p-2"
                    >
                        <span className="font-black text-[17px]">View My {profile.targetRole} Profile →</span>
                        <span className="font-bold text-[10px] mt-1 tracking-widest opacity-90 uppercase">Get Certifications & Job Referrals On Completion</span>
                    </button>
                    <p className="text-center text-text-muted text-[14px] mt-4 font-medium">
                        12,634 Candidates Upgraded & Got 5x Employer Attention
                    </p>
                </div>
            </div>

        </div>
    );
}
