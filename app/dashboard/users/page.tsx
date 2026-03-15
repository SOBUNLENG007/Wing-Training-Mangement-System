"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, MoreVertical, X, Mail, Building, BookOpen, ShieldCheck, GraduationCap, User as UserIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Define the User type for TypeScript
type User = {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Trainer" | "Employee";
  department: string;
  status: "Active" | "Inactive";
  sessions: number;
};

const users: User[] = [
  { id: 1, name: "Dara Pich", email: "dara.pich@wing.com", role: "Trainer", department: "Operations", status: "Active", sessions: 3 },
  { id: 2, name: "Srey Mao", email: "srey.mao@wing.com", role: "Trainer", department: "Compliance", status: "Active", sessions: 2 },
  { id: 3, name: "Channy Kem", email: "channy.kem@wing.com", role: "Employee", department: "Operations", status: "Active", sessions: 5 },
  { id: 4, name: "Bopha Rith", email: "bopha.rith@wing.com", role: "Employee", department: "Sales", status: "Active", sessions: 4 },
  { id: 5, name: "Kosal Chea", email: "kosal.chea@wing.com", role: "Trainer", department: "HR", status: "Active", sessions: 1 },
  { id: 6, name: "Sovann Ly", email: "sovann.ly@wing.com", role: "Employee", department: "Compliance", status: "Inactive", sessions: 2 },
  { id: 7, name: "Sokha Admin", email: "sokha.admin@wing.com", role: "Admin", department: "IT", status: "Active", sessions: 0 },
  { id: 8, name: "Pisey Chan", email: "pisey.chan@wing.com", role: "Employee", department: "HR", status: "Active", sessions: 3 },
];

const getRoleBadge = (role: string) => {
  switch (role) {
    case "Admin": 
      return <span className="flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-semibold"><ShieldCheck className="size-3.5" /> {role}</span>;
    case "Trainer": 
      return <span className="flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-semibold"><GraduationCap className="size-3.5" /> {role}</span>;
    default: 
      return <span className="flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold"><UserIcon className="size-3.5" /> {role}</span>;
  }
};

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = users.filter((u) => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-[#1f6fff]">Users Management</h1>
          <p className="text-[13px] text-slate-500 mt-1">Manage admins, trainers, and employees across all departments</p>
        </div>
        <Button className="bg-[#1f6fff] hover:bg-blue-700 text-white rounded-xl h-10 px-4 shadow-sm transition-all">
          <Plus className="w-4 h-4 mr-2" /> Add New User
        </Button>
      </div>

      {/* SEARCH & FILTER SECTION */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-4 rounded-t-2xl border border-slate-200 border-b-0">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
          <Input 
            placeholder="Search by name or email..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 rounded-lg border-slate-200 focus:border-[#1f6fff] focus:ring-[#1f6fff]/20 text-[14px]" 
          />
        </div>
        <Button variant="outline" className="w-full sm:w-auto h-10 rounded-lg border-slate-200 text-slate-600 hover:bg-slate-50">
          <Filter className="w-4 h-4 mr-2" /> Filter
        </Button>
      </div>

      {/* USERS TABLE */}
      <div className="bg-white rounded-b-2xl border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200 text-[12px] uppercase tracking-wider text-slate-500 font-semibold">
                <th className="p-4 px-6">User Profile</th>
                <th className="p-4">Role</th>
                <th className="p-4">Department</th>
                <th className="p-4">Assigned Sessions</th>
                <th className="p-4">Status</th>
                <th className="p-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">No users found.</td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr 
                    key={u.id} 
                    onClick={() => setSelectedUser(u)} 
                    className="hover:bg-blue-50/50 transition-colors cursor-pointer group"
                  >
                    <td className="p-4 px-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border border-slate-100">
                          <AvatarFallback className="text-sm bg-[#1f6fff]/10 text-[#1f6fff] font-bold">
                            {u.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-[14px] text-slate-800 group-hover:text-[#1f6fff] transition-colors">{u.name}</p>
                          <p className="text-[12px] text-slate-500">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{getRoleBadge(u.role)}</td>
                    <td className="p-4 text-[13px] font-medium text-slate-600">{u.department}</td>
                    <td className="p-4">
                      <span className="flex items-center gap-1.5 text-[13px] text-slate-600">
                        <BookOpen className="size-4 text-slate-400" />
                        {u.sessions} sessions
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-bold ${
                        u.status === "Active" ? "bg-green-50 text-green-600" : "bg-slate-100 text-slate-500"
                      }`}>
                        <span className={`size-1.5 rounded-full ${u.status === "Active" ? "bg-green-500" : "bg-slate-400"}`}></span>
                        {u.status}
                      </span>
                    </td>
                    <td className="p-4 px-6 text-right">
                      <button 
                        onClick={(e) => e.stopPropagation()} 
                        className="p-1.5 text-slate-400 hover:text-[#1f6fff] hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- USER DETAILS MODAL --- */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Modal Header/Cover */}
            <div className="h-24 bg-gradient-to-r from-[#1f6fff] to-blue-400 relative">
              <button 
                onClick={() => setSelectedUser(null)}
                className="absolute top-4 right-4 p-1.5 bg-black/10 hover:bg-black/20 text-white rounded-full transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="px-6 pb-8 pt-0 relative">
              {/* Floating Avatar */}
              <div className="absolute -top-12 left-6">
                <Avatar className="w-24 h-24 border-4 border-white shadow-sm bg-white">
                  <AvatarFallback className="text-2xl bg-[#1f6fff]/10 text-[#1f6fff] font-bold">
                    {selectedUser.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="mt-14 mb-6">
                <h2 className="text-2xl font-bold text-slate-900">{selectedUser.name}</h2>
                <div className="flex items-center gap-2 mt-2">
                  {getRoleBadge(selectedUser.role)}
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                    selectedUser.status === "Active" ? "bg-green-50 text-green-600" : "bg-slate-100 text-slate-500"
                  }`}>
                    {selectedUser.status}
                  </span>
                </div>
              </div>

              {/* User Details Grid */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Mail className="size-4.5 text-[#1f6fff]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-slate-400 uppercase">Email Address</p>
                    <p className="text-[14px] font-medium text-slate-700">{selectedUser.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Building className="size-4.5 text-[#1f6fff]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-slate-400 uppercase">Department</p>
                    <p className="text-[14px] font-medium text-slate-700">{selectedUser.department}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <BookOpen className="size-4.5 text-[#1f6fff]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-slate-400 uppercase">Training Participation</p>
                    <p className="text-[14px] font-medium text-slate-700">Involved in {selectedUser.sessions} active sessions</p>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="mt-8 flex gap-3">
                <Button variant="outline" className="flex-1 rounded-xl h-11 border-slate-200">
                  Edit Profile
                </Button>
                <Button className="flex-1 rounded-xl h-11 bg-[#1f6fff] hover:bg-blue-700 text-white shadow-sm">
                  View Full Report
                </Button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}