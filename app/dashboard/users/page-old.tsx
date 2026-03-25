"use client";

import { useState, useEffect } from "react";
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


// ─── Table header columns ───
const COLUMNS = ["User Profile", "Role", "Department", "Phone", "Address", "Sessions", "Status", "Actions"];

// ─── Page ──

export default function UsersPageContent() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<User | null>(null);

  const isAdmin = user?.role?.toLowerCase() === "admin";

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await usersService.getAll();
      setUsers(data);
    } catch (error) {
      console.error("Failed to load users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const visibleUsers = filterUsers(users, query);

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
//               {visibleUsers.length === 0 ? (
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

// // export default function UsersPage() {
// //   return (
// //     <RoleGuard allowed={["admin"]}>
// //       <UsersPageContent />
// //     </RoleGuard>
// //   );
// // }






"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Loader2, UserPlus, Search, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      // ប្រសិនបើ Java ប្រើ ApiResponse wrapper ត្រូវយក .payload
      setUsers(res.data.payload || res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Users List</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="mr-2 size-4" /> Add User
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={4} className="py-10 text-center">
                  <Loader2 className="animate-spin mx-auto text-blue-600" />
                </td>
              </tr>
            ) : (
              users.map((u: any) => (
                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-700">{u.firstName} {u.lastName}</td>
                  <td className="px-6 py-4 text-slate-600">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-md bg-blue-50 text-blue-600 text-xs font-bold">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button className="text-slate-400 hover:text-blue-600"><Edit2 size={16}/></button>
                    <button className="text-slate-400 hover:text-red-600"><Trash2 size={16}/></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}