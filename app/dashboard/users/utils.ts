import { User } from "@/lib/types/user";

export const getFullName  = (u: User) => `${u.first_name} ${u.last_name}`;
export const getInitials  = (u: User) => `${u.first_name[0] ?? ""}${u.last_name[0] ?? ""}`.toUpperCase();

export const filterUsers  = (users: User[], query: string) => {
  const q = query.toLowerCase();
  return users.filter(
    (u) => getFullName(u).toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  );
};