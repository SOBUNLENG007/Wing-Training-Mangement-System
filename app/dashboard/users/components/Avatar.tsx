

import { User } from "@/lib/types/user";

import { getFullName, getInitials } from "../utils";

const AVATAR_SIZE = { sm: "h-10 w-10 text-sm border-2 border-slate-100", lg: "h-24 w-24 text-2xl border-4 border-white shadow-md" };
 
export function Avatar({ user, size = "sm" }: { user: User; size?: "sm" | "lg" }) {
  return (
    <div className={`${AVATAR_SIZE[size]} shrink-0 overflow-hidden rounded-full bg-[#1f6fff]/10`}>
      {user.avatar_url
        // eslint-disable-next-line @next/next/no-img-element
        ? <img src={user.avatar_url} alt={getFullName(user)} className="h-full w-full object-cover" />
        : <div className="flex h-full w-full select-none items-center justify-center font-bold text-[#1f6fff]">{getInitials(user)}</div>
      }
    </div>
  );
}