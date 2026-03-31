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
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  departmentService,
  Department,
} from "@/service/departments/department.service";

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

type AddUserForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  departmentId: number;
};

function AddUserModal({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (user: AddUserForm) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<AddUserForm>();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoadingDepartments(true);
    departmentService
      .getAll()
      .then((data) => {
        let arr = [];
        if (Array.isArray(data)) arr = data;
        else if (data && Array.isArray(data.payload)) arr = data.payload;
        setDepartments(arr);
      })
      .finally(() => setLoadingDepartments(false));
  }, [open]);

  const onSubmit = (data: AddUserForm) => {
    onAdd(data);
    reset();
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="grid max-w-md gap-4">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-center">Add New User</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 grid-cols-2 grid gap-4"
        >
          <div className="flex flex-col">
            <label
              htmlFor="firstName"
              className="mb-1 text-xs font-semibold text-slate-600"
            >
              First Name
            </label>
            <input
              id="firstName"
              {...register("firstName", { required: true })}
              placeholder="First Name"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="lastName"
              className="mb-1 text-xs font-semibold text-slate-600"
            >
              Last Name
            </label>
            <input
              id="lastName"
              {...register("lastName", { required: true })}
              placeholder="Last Name"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-1 text-xs font-semibold text-slate-600"
            >
              Email
            </label>
            <input
              id="email"
              {...register("email", { required: true })}
              placeholder="Email"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-1 text-xs font-semibold text-slate-600"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: true,
                minLength: 8,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              })}
              placeholder="Password"
              className="w-full border rounded px-3 py-2"
            />
            {errors.password && (
              <span className="text-xs text-red-500 mt-1">
                Password must be at least 8 characters, include uppercase,
                lowercase, number, and special character.
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="phoneNumber"
              className="mb-1 text-xs font-semibold text-slate-600"
            >
              Phone Number
            </label>
            <input
              id="phoneNumber"
              {...register("phoneNumber")}
              placeholder="Phone Number"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="address"
              className="mb-1 text-xs font-semibold text-slate-600"
            >
              Address
            </label>
            <input
              id="address"
              {...register("address")}
              placeholder="Address"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="dateOfBirth"
              className="mb-1 text-xs font-semibold text-slate-600"
            >
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              type="date"
              {...register("dateOfBirth", { required: true })}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="gender"
              className="mb-1 text-xs font-semibold text-slate-600"
            >
              Gender
            </label>
            <select
              id="gender"
              {...register("gender", { required: true })}
              className="w-full border rounded px-3 py-2"
              defaultValue=""
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex flex-col col-span-2">
            <label
              htmlFor="departmentId"
              className="mb-1 text-xs font-semibold text-slate-600"
            >
              Department
            </label>
            <select
              id="departmentId"
              {...register("departmentId", {
                valueAsNumber: true,
                required: true,
              })}
              className="w-full border rounded px-3 py-2"
              disabled={loadingDepartments || departments.length === 0}
              defaultValue=""
            >
              <option value="" disabled>
                {loadingDepartments
                  ? "Loading departments..."
                  : departments.length === 0
                    ? "No departments found"
                    : "Select a department"}
              </option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
            {!loadingDepartments && departments.length === 0 && (
              <span className="text-xs text-red-500 mt-1">
                No departments available. Please add departments first.
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded col-span-2"
            disabled={isSubmitting}
          >
            Add User
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function UsersPageContent() {
  const { user } = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<User | null>(null);
  const [page, setPage] = useState(0); // zero-based
  const [size] = useState(7); // users per page (was 10)
  const [showAdd, setShowAdd] = useState(false);

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

  // Pagination logic
  const total = visibleUsers.length;
  const pagedUsers = visibleUsers.slice(page * size, page * size + size);
  const totalPages = Math.ceil(total / size);

  // Reset to first page on search
  useEffect(() => {
    setPage(0);
  }, [query]);

  return (
    <div className="mx-auto max-w-full space-y-6">
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
          <Button className="gap-2" onClick={() => setShowAdd(true)}>
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
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => toast("Filter functionality coming soon!")}
          >
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
                pagedUsers.map((u) => (
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i}
              variant={i === page ? "default" : "outline"}
              size="sm"
              onClick={() => setPage(i)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
          >
            Next
          </Button>
          <span className="ml-4 text-xs text-muted-foreground">
            Total: {total}
          </span>
        </div>
      )}

      {/* Add User Modal */}
      <AddUserModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onAdd={async (newUser) => {
          try {
            setLoading(true);
            // @ts-ignore: id will be assigned by backend
            const created = await usersService.create({
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              email: newUser.email,
              password: newUser.password,
              phoneNumber: newUser.phoneNumber,
              address: newUser.address,
              departmentId: newUser.departmentId,
              dateOfBirth: new Date(newUser.dateOfBirth),
              gender: newUser.gender,
            } as any);
            if (created) {
              setUsers((prev) => [created, ...prev]);
              setShowAdd(false);
              toast.success("User added successfully");
            } else {
              toast.error("Failed to add user");
            }
          } catch {
            toast.error("Failed to add user");
          } finally {
            setLoading(false);
          }
        }}
      />

      {/* Modal */}
      {selected !== null && (
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
