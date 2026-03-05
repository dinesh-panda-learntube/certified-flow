import { useRef, useState } from "react";
import { CircleCheckBig, Check } from "lucide-react";

export default function ProfileStrength({ totalAdded, totalTasks }) {
  const maxItems = totalTasks || 10;
  const percentage = Math.min((totalAdded / maxItems) * 100, 100);
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

      <div className="border-t border-dark-border mt-4 pt-4 flex flex-col gap-3">
        {/* Upload CV */}
        <div className="flex items-center gap-2">
          <CircleCheckBig size={16} className="text-cta flex-shrink-0" />
          <span className="text-[11px] font-semibold text-text-secondary">
            Upload Your CV
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleCvUpload}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1 rounded-lg text-[11px] font-bold tracking-wide bg-cta text-dark-bg hover:opacity-90 transition-opacity"
          >
            {cvFileName ? <span className="flex items-center gap-1"><Check size={14} /> Uploaded</span> : "Upload"}
          </button>
          {cvFileName && (
            <span className="text-[10px] text-text-muted truncate max-w-[100px]" title={cvFileName}>
              {cvFileName}
            </span>
          )}
        </div>

        {/* Verify Your Profile Points */}
        <div className="flex items-center gap-2">
          <CircleCheckBig size={16} className="text-cta flex-shrink-0" />
          <span className="text-[11px] font-semibold text-text-secondary">
            Verify Your Profile Points ({totalAdded}/{maxItems})
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
