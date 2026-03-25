import { User, Mail, Phone, CalendarDays, MapPin } from "lucide-react";
import { ProfileForm } from "@/lib/types/setting";
import { Field } from "./Field";

type Props = {
  form:     ProfileForm;
  onChange: (patch: Partial<ProfileForm>) => void;
};

// Shorthand: fire onChange with just the changed key
const patch =
  (onChange: Props["onChange"], key: keyof ProfileForm) =>
  (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    onChange({ [key]: e.target.value });

export function ProfileSection({ form, onChange }: Props) {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-[18px] font-bold text-[#1f6fff]">Basic information</h2>
        <p className="mt-0.5 text-[13px] text-slate-500">Tell us your basic info details</p>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
        <Field label="First Name"   icon={User}        type="text"  placeholder="First name"        value={form.firstName} onChange={patch(onChange, "firstName")} />
        <Field label="Last Name"    icon={User}        type="text"  placeholder="Last name"         value={form.lastName}  onChange={patch(onChange, "lastName")}  />
        <Field label="Email"        icon={Mail}        type="email" placeholder="email@example.com" value={form.email}     onChange={patch(onChange, "email")}     />
        <Field label="Phone Number" icon={Phone}       type="tel"   placeholder="081743267"         value={form.phone}     onChange={patch(onChange, "phone")}     />
        <Field label="Birth"        icon={CalendarDays} type="date"                                 value={form.birthDate} onChange={patch(onChange, "birthDate")} />

        <Field label="Gender" as="select" value={form.gender} onChange={patch(onChange, "gender")}>
          <option value="" disabled>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </Field>

        <Field label="Address" icon={MapPin} type="text" placeholder="Your address" value={form.address} onChange={patch(onChange, "address")} full />
      </div>
    </section>
  );
}