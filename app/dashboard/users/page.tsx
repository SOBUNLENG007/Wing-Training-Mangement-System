// "use client";

// import { useState, useEffect } from "react";
// import { Plus, Search, Filter } from "lucide-react";
// import { useAuth } from "@/lib/auth-store";
// import { RoleGuard } from "@/components/auth/role-guard";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { usersService } from "@/service/users/users.service";
// import { User } from "@/lib/types/user";
// import { filterUsers } from "./utils";
// import { UserTableRow } from "./components/UserTableRow";
// import { UserModal } from "./components/UserModal";
// import { Skeleton } from "@/components/ui/skeleton";
// import { toast } from "sonner";

// // ─── Table header columns ───
// const COLUMNS = ["User Profile", "Role", "Department", "Phone", "Address", "Sessions", "Status", "Actions"];

// function UsersPageContent() {
//   const { user } = useAuth();
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [query, setQuery] = useState("");
//   const [selected, setSelected] = useState<User | null>(null);

//   const isAdmin = user?.role?.toLowerCase() === "admin";

//   // Load users on mount
//   useEffect(() => {
//     loadUsers();
//   }, []);

//   const loadUsers = async () => {
//     try {
//       setLoading(true);
//       const data = await usersService.getAll();
//       setUsers(data);
//     } catch (error) {
//       console.error("Failed to load users:", error);
//       toast.error("Failed to load users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const visibleUsers = filterUsers(users, query);

//   return (
//     <div className="mx-auto max-w-7xl animate-in space-y-6 fade-in duration-500">
//       {/* ── Header ── */}
//       <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
//         <div>
//           <h1 className="text-[22px] font-bold text-[#1f6fff]">Users Management</h1>
//           <p className="mt-1 text-[13px] text-slate-500">
//             Manage admins, trainers, and employees across all departments
//           </p>
//         </div>
//         {isAdmin && (
//           <Button className="h-10 rounded-xl bg-[#1f6fff] px-4 text-white shadow-sm hover:bg-blue-700">
//             <Plus className="mr-2 h-4 w-4" /> Add New User
//           </Button>
//         )}
//       </div>

//       {/* ── Search & Filter ── */}
//       <div className="flex flex-col items-center gap-3 rounded-t-2xl border border-b-0 border-slate-200 bg-white p-4 sm:flex-row">
//         <div className="relative w-full max-w-md flex-1">
//           <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
//           <Input
//             placeholder="Search by name or email..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="h-10 rounded-lg border-slate-200 pl-10 text-[14px] focus:border-[#1f6fff] focus:ring-[#1f6fff]/20"
//           />
//         </div>
//         {isAdmin && (
//           <Button variant="outline" className="h-10 w-full rounded-lg border-slate-200 text-slate-600 hover:bg-slate-50 sm:w-auto">
//             <Filter className="mr-2 h-4 w-4" /> Filter
//           </Button>
//         )}
//       </div>

//       {/* ── Table ── */}
//       <div className="overflow-hidden rounded-b-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse text-left">
//             <thead>
//               <tr className="border-b border-slate-200 bg-slate-50/50 text-[12px] font-semibold uppercase tracking-wider text-slate-500">
//                 {COLUMNS.map((col) => (
//                   <th key={col} className={`p-4 ${col === "User Profile" || col === "Actions" ? "px-6" : ""} ${col === "Actions" ? "text-right" : ""}`}>
//                     {col}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {loading ? (
//                 Array.from({ length: 5 }).map((_, i) => (
//                   <tr key={i}>
//                     <td className="p-4">
//                       <div className="flex items-center gap-3">
//                         <Skeleton className="h-10 w-10 rounded-full" />
//                         <div className="space-y-1">
//                           <Skeleton className="h-4 w-32" />
//                           <Skeleton className="h-3 w-48" />
//                         </div>
//                       </div>
//                     </td>
//                     <td className="p-4"><Skeleton className="h-4 w-16" /></td>
//                     <td className="p-4"><Skeleton className="h-4 w-20" /></td>
//                     <td className="p-4"><Skeleton className="h-4 w-24" /></td>
//                     <td className="p-4"><Skeleton className="h-4 w-32" /></td>
//                     <td className="p-4"><Skeleton className="h-4 w-12" /></td>
//                     <td className="p-4"><Skeleton className="h-4 w-16" /></td>
//                     <td className="p-4"><Skeleton className="h-6 w-16" /></td>
//                   </tr>
//                 ))
//               ) : visibleUsers.length === 0 ? (
//                 <tr>
//                   <td colSpan={COLUMNS.length} className="p-8 text-center text-slate-500">
//                     No users found.
//                   </td>
//                 </tr>
//               ) : (
//                 visibleUsers.map((u) => (
//                   <UserTableRow
//                     key={u.id}
//                     user={u}
//                     isAdmin={isAdmin}
//                     onRowClick={setSelected}
//                   />
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ── Detail Modal ── */}
//       {selected && (
//         <UserModal
//           user={selected}
//           isAdmin={isAdmin}
//           onClose={() => setSelected(null)}
//         />
//       )}
//     </div>
//   );
// }

// export default function UsersPage() {
//   return (
//     <RoleGuard allowed={["admin"]}>
//       <UsersPageContent />
//     </RoleGuard>
//   );
// }


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
      console.error(error);
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