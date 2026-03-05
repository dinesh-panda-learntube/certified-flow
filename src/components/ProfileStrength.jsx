import { useRef, useState } from "react";
import { CircleCheckBig, Check, Lock } from "lucide-react";

export default function ProfileStrength({ totalAdded, totalTasks }) {
  // Hardcode maxItems to 10 as requested
  const maxItems = 10;
  // Ensure we don't exceed max count
  const displayAdded = Math.min(totalAdded, maxItems);
  const percentage = Math.min((displayAdded / maxItems) * 100, 100);
  const fileInputRef = useRef(null);
  const [cvFileName, setCvFileName] = useState(null);

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

  const handleCvUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setCvFileName(file.name);
    }
  };

  return (
    <div className="mt-5 pt-5 border-t border-dark-border">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-bold text-text-primary">
          Profile Strength <span className="text-text-muted font-normal"> - {getStrengthLabel()}</span>
        </span>
        <span className="badge badge-cta">
          {Math.round(percentage)}% Complete
        </span>
      </div>

      <div className="w-full h-3 bg-dark-surface rounded-full overflow-hidden mt-1">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${getBarColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="border-t border-dark-border mt-4 pt-4 flex flex-col pl-1">
        {/* Step 1: Upload CV */}
        <div className="relative flex items-center">
          {/* Vertical pipe connecting to next step */}
          <div className="absolute left-[7.5px] top-[24px] bottom-[-16px] w-[1px] bg-dark-border"></div>
          
          <CircleCheckBig 
            size={16} 
            className={`flex-shrink-0 z-10 bg-dark-card ${cvFileName ? "text-cta" : "text-dark-border"}`} 
          />
          <span className="text-[11px] font-semibold text-text-secondary ml-3 flex-1">
            Upload Your CV
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleCvUpload}
          />
          <div className="flex items-center gap-2">
            {cvFileName && (
              <span className="text-[10px] text-text-muted truncate max-w-[80px]" title={cvFileName}>
                {cvFileName}
              </span>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold tracking-wide transition-all ${
                cvFileName 
                  ? "bg-dark-surface border border-dark-border text-text-secondary hover:bg-dark-surface/80" 
                  : "bg-cta text-dark-bg hover:opacity-90"
              }`}
            >
              {cvFileName ? "Replace" : "Upload"}
            </button>
          </div>
        </div>

        {/* Step 2: Verify Profile Points */}
        <div className="relative flex items-center mt-4">
          {/* Vertical pipe connecting to next step */}
          <div className="absolute left-[7.5px] top-[24px] bottom-[-16px] w-[1px] bg-dark-border"></div>
          
          <CircleCheckBig 
            size={16} 
            className={`flex-shrink-0 z-10 bg-dark-card ${displayAdded >= maxItems ? "text-cta" : displayAdded > 0 ? "text-highlight" : "text-dark-border"}`} 
          />
          <span className="text-[11px] font-semibold text-text-secondary ml-3 flex-1">
            Verify Your Profile Points
          </span>
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-dark-surface border border-dark-border">
            {displayAdded}/{maxItems}
          </span>
        </div>

        {/* Step 3: Get CV Upgrade (Locked) */}
        <div className="relative flex items-center mt-4">
          <div className="relative w-4 h-7 flex items-center justify-center z-10">
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
              <div className="relative flex-shrink-0">
                <img
                  src={`${import.meta.env.BASE_URL}certificate.jpg`}
                  alt="Certificate"
                  className="w-10 h-7 rounded object-cover opacity-60 border border-dark-border shadow-sm block"
                />
                <div className="absolute -top-1.5 -right-1.5 bg-dark-bg border border-dark-border rounded-full w-4 h-4 flex items-center justify-center shadow-lg">
                  <Lock size={8} className="text-text-muted" />
                </div>
              </div>
            </div>
          </div>
          <span className="text-[11px] font-bold text-text-secondary ml-3 flex-1 opacity-70 pl-4">
            Free CV Upgrade, Certification & Jobs Within 3 Days
          </span>
        </div>
      </div>

      {/* <div className="flex justify-between items-center mt-3">
        <span className="text-xs font-semibold text-text-secondary">
          {getStrengthLabel()}
        </span>
        {totalAdded < 3 && (
          <span className="text-[11px] text-text-muted">
            Add {3 - totalAdded} more to get started
          </span>
        )}
      </div> */}
    </div>
  );
}
