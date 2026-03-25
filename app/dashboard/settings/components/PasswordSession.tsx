import { useState } from "react";
import { Lock } from "lucide-react";
import { Field }      from "./Field";
import { EyeToggle }  from "./Eyetoggle";
import { PasswordForm } from "@/lib/types/setting";

type Props = {
  form:     PasswordForm;
  onChange: (patch: Partial<PasswordForm>) => void;
  onSubmit: () => void;
};

export function PasswordSection({ form, onChange, onSubmit }: Props) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew,     setShowNew]     = useState(false);

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-[18px] font-bold text-[#1f6fff]">Password</h2>
        <p className="mt-0.5 text-[13px] text-slate-500">Modify your current password</p>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
        <Field
          label="Current Password"
          icon={Lock}
          type={showCurrent ? "text" : "password"}
          placeholder="Current password"
          value={form.currentPassword}
          onChange={(e) => onChange({ currentPassword: e.target.value })}
          rightEl={<EyeToggle visible={showCurrent} onToggle={() => setShowCurrent((v) => !v)} />}
        />
        <Field
          label="New Password"
          icon={Lock}
          type={showNew ? "text" : "password"}
          placeholder="New password"
          value={form.newPassword}
          onChange={(e) => onChange({ newPassword: e.target.value })}
          rightEl={<EyeToggle visible={showNew} onToggle={() => setShowNew((v) => !v)} />}
        />
      </div>

      <button
        type="button"
        onClick={onSubmit}
        className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-[13px] font-medium text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50"
      >
        Change Password
      </button>
    </section>
  );
}