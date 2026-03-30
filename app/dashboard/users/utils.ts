import { User } from "@/lib/types/user";

export const getFullName = (u: User) => `${u.firstName} ${u.lastName}`.trim();
export const getInitials = (u: User) => {
  const first = u.firstName && u.firstName.length > 0 ? u.firstName[0] : "";
  const last = u.lastName && u.lastName.length > 0 ? u.lastName[0] : "";
  const initials = `${first}${last}`.toUpperCase();
  return initials || "?";
};

export const filterUsers = (users: User[], query: string) => {
  const q = query.toLowerCase();
  return users.filter(
    (u) =>
      getFullName(u).toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q),
  );
};
