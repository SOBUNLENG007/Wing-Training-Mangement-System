"use client";

import { useEffect, useState, useMemo } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { useAuth } from "@/lib/auth-store";
import { RoleGuard } from "@/components/auth/role-guard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usersService } from "@/service/users/users.service";
import { User } from "@/lib/types/user";
import { filterUsers } from "./utils";
import { UserTableRow } from "./components/UserTableRow";
import { UserModal } from "./components/UserModal";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

// Columns
const COLUMNS = [
  "User Profile",
  "Role",
  "Department",
  "Phone",
  "Address",
  "Sessions",
  "Status",
  "Actions",
];

function UsersPageContent() {
  const { user } = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<User | null>(null);

  const isAdmin = user?.role?.toLowerCase() === "admin";

  // 🔥 Load users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await usersService.getAll();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Optimized filtering (useMemo)
  const visibleUsers = useMemo(() => {
    return filterUsers(users, query);
  }, [users, query]);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Users Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage admins, trainers, and employees
          </p>
        </div>

        {isAdmin && (
          <Button className="gap-2">
            <Plus className="size-4" />
            Add User
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {isAdmin && (
          <Button variant="outline" className="gap-2">
            <Filter className="size-4" />
            Filter
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted text-xs uppercase">
              <tr>
                {COLUMNS.map((col) => (
                  <th key={col} className="p-4">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td className="p-4">
                      <Skeleton className="h-4 w-32" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-4 w-20" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-4 w-20" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-4 w-10" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-4 w-16" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-4 w-16" />
                    </td>
                  </tr>
                ))
              ) : visibleUsers.length === 0 ? (
                <tr>
                  <td colSpan={COLUMNS.length} className="p-6 text-center">
                    No users found
                  </td>
                </tr>
              ) : (
                visibleUsers.map((u) => (
                  <UserTableRow
                    key={u.id}
                    user={u}
                    isAdmin={isAdmin}
                    onRowClick={setSelected}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <UserModal
          user={selected}
          isAdmin={isAdmin}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

// 🔐 Role guard wrapper
export default function UsersPage() {
  return (
    <RoleGuard allowed={["admin"]}>
      <UsersPageContent />
    </RoleGuard>
  );
}