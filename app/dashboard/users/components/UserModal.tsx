import { X, Mail, Phone, MapPin, Building, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/types/user";
import { getFullName } from "../utils";
import { RoleBadge } from "./RoleBadge";
import { StatusBadge } from "./StatusBadge";
import { InfoRow } from "./InfoRow";
import { Avatar } from "./Avatar";
 

type Props = {
  user:      User;
  isAdmin:   boolean;
  onClose:   () => void;
};

export function UserModal({ user: u, isAdmin, onClose }: Props) {
  const info = [
    { icon: Mail,     label: "Email",      value: u.email },
    { icon: Phone,    label: "Phone",      value: u.phone_number },
    { icon: MapPin,   label: "Address",    value: u.address },
    { icon: Building, label: "Department", value: `${u.department_name} (ID: ${u.department_id})` },
    { icon: BookOpen, label: "Sessions",   value: `Involved in ${u.sessions} active sessions` },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner */}
        <div className="relative h-24 bg-linear-to-r from-[#1f6fff] to-blue-400">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-black/10 p-1.5 text-white transition-colors hover:bg-black/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative px-6 pb-8 pt-0">
          {/* Avatar overlapping banner */}
          <div className="absolute -top-12 left-6">
            <Avatar user={u} size="lg" />
          </div>

          {/* Name + badges */}
          <div className="mb-5 mt-14">
            <h2 className="text-2xl font-bold text-slate-900">{getFullName(u)}</h2>
            <div className="mt-2 flex items-center gap-2">
              <RoleBadge role={u.role} />
              <StatusBadge status={u.status} />
            </div>
          </div>

          {/* Info rows */}
          <div className="space-y-3">
            {info.map(({ icon, label, value }) => (
              <InfoRow key={label} icon={icon} label={label} value={value} />
            ))}
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex gap-3">
            {isAdmin ? (
              <>
                <Button variant="outline" className="h-11 flex-1 rounded-xl border-slate-200" onClick={onClose}>
                  Edit Profile
                </Button>
                <Button className="h-11 flex-1 rounded-xl bg-[#1f6fff] text-white shadow-sm hover:bg-blue-700">
                  View Full Report
                </Button>
              </>
            ) : (
              <Button className="h-11 w-full rounded-xl bg-[#1f6fff] text-white shadow-sm hover:bg-blue-700" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}