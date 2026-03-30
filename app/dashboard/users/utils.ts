import { User } from "@/lib/types/user";

export const getFullName = (u: User) => `${u.first_name} ${u.last_name}`;
export const getInitials = (u: User) => {
  const first = u.first_name && u.first_name.length > 0 ? u.first_name[0] : "";
  const last = u.last_name && u.last_name.length > 0 ? u.last_name[0] : "";
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
