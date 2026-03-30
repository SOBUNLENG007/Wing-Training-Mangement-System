import { MoreVertical } from "lucide-react";
import { getFullName } from "../utils";
import { RoleBadge } from "./RoleBadge";
import { StatusBadge } from "./StatusBadge";
import { SessionsCell } from "./SessionCel";
import { User } from "@/lib/types/user";
import { Avatar } from "./Avatar";

type Props = {
  user: User;
  isAdmin: boolean;
  onRowClick: (u: User) => void;
};

export function UserTableRow({ user: u, isAdmin, onRowClick }: Props) {
  return (
    <tr
      onClick={() => onRowClick(u)}
      className="group cursor-pointer transition-colors hover:bg-blue-50/50"
    >
      {/* Profile */}
      <td className="p-4 px-6">
        <div className="flex items-center gap-3">
          <Avatar user={u} />
          <div>
            <p className="text-[14px] font-semibold text-slate-800 transition-colors group-hover:text-[#1f6fff]">
              {getFullName(u)}
            </p>
            <p className="text-[12px] text-slate-500">{u.email}</p>
          </div>
        </div>
      </td>

      {/* Role */}
      <td className="p-4">
        <RoleBadge role={u.role} />
      </td>

      {/* Department */}
      <td className="p-4 text-[13px] font-medium text-slate-600">
        {u.departmentName}
      </td>

      {/* Phone / Address */}
      <td className="p-4 text-[13px] text-slate-600">{u.phoneNumber}</td>
      <td className="p-4 text-[13px] text-slate-600">{u.address}</td>

      {/* Sessions */}
      <td className="p-4">
        <SessionsCell count={u.sessions} />
      </td>

      {/* Status */}
      <td className="p-4">
        {typeof u.status === "boolean" ? (
          u.status ? (
            <StatusBadge status="Active" />
          ) : (
            <StatusBadge status="Inactive" />
          )
        ) : (
          <StatusBadge status={u.status} />
        )}
      </td>

      {/* Actions */}
      <td className="p-4 px-6 text-center">
        {isAdmin ? (
          <button
            onClick={(e) => e.stopPropagation()}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-blue-50 hover:text-[#1f6fff]"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
        ) : (
          <span className="text-xs text-slate-400">View only</span>
        )}
      </td>
    </tr>
  );
}
