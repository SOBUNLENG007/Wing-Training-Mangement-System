import { LucideIcon } from "lucide-react";

const BASE = "h-11 w-full rounded-xl border border-slate-200 bg-white text-[14px] text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-[#1f6fff] focus:ring-2 focus:ring-[#1f6fff]/20";

type SharedProps = {
  label:    string;
  icon?:    LucideIcon;
  rightEl?: React.ReactNode;  // e.g. EyeToggle
  full?:    boolean;          // spans 2 columns
};

type AsInput  = SharedProps & { as?: "input";  children?: never } & React.InputHTMLAttributes<HTMLInputElement>;
type AsSelect = SharedProps & { as:  "select"; children:  React.ReactNode } & React.SelectHTMLAttributes<HTMLSelectElement>;

type FieldProps = AsInput | AsSelect;

export function Field({ label, icon: Icon, rightEl, full, as, children, ...rest }: FieldProps) {
  const pl = Icon    ? "pl-10" : "pl-4";
  const pr = rightEl ? "pr-10" : "pr-4";

  return (
    <div className={`space-y-1.5 ${full ? "md:col-span-2" : ""}`}>
      <label className="text-[13px] font-medium text-slate-700">{label}</label>

      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
        )}

        {as === "select" ? (
          <select
            {...(rest as React.SelectHTMLAttributes<HTMLSelectElement>)}
            className={`${BASE} appearance-none ${pl} ${pr}`}
          >
            {children}
          </select>
        ) : (
          <input
            {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
            className={`${BASE} ${pl} ${pr}`}
          />
        )}

        {rightEl && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
            {rightEl}
          </div>
        )}
      </div>
    </div>
  );
}