"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useAuth } from "@/lib/auth-store";
import { RoleGuard } from "@/components/auth/role-guard";
import { Button } from "@/components/ui/button";
import { sessionsService } from "@/service/sessions/sessions.service";

import { TrainingSession } from "@/lib/types/session";
import { FilterOption } from "../sessions/utils";
import { SessionFilters } from "./components/SessionFilter";
import { SessionCard } from "./components/SessionCard";
import { EmptyState } from "./components/EmptyState";
import { CreateSessionModal } from "./components/CreateSessionModal";
import { SessionDetailModal } from "./components/SessionDetailModal";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
 

function SessionsPageContent() {
  const { user } = useAuth();

  // Debug: Log user data
  useEffect(() => {
    console.log("🔐 Current authenticated user:", user);
  }, [user]);

  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterOption>("all");
  const [showCreate, setShowCreate] = useState(false);
  const [selectedSession, setSelectedSession] = useState<TrainingSession | null>(null);

  const canManage = user?.role === "admin" || user?.role === "trainer";

  // Load sessions on mount
  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const data = await sessionsService.getAll();
      setSessions(data);
    } catch (error) {
      console.error("Failed to load sessions:", error);
      toast.error("Failed to load training sessions");
    } finally {
      setLoading(false);
    }
  };

  // ── Derived list ──
  const visible = sessions.filter((s) => {
    const title = s.title || "";
    const department = s.department || "";
    const status = s.status || "upcoming";

    const matchSearch = title.toLowerCase().includes(search.toLowerCase()) ||
                        department.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || status === filter;
    return matchSearch && matchFilter;
  });

  // ── Handlers ───────────────────────────────────────────────────────────────
  async function handleCreate(payload: any) {
    try {
      console.log("🔄 Creating session with payload:", payload);
      const created = await sessionsService.create(payload);
      setSessions((prev) => [created, ...prev]);
      setShowCreate(false);
      toast.success("Training session created successfully");
    } catch (error: any) {
      console.error("❌ Failed to create session:", error);
      const errorMsg = error?.response?.data?.message || 
                       error?.response?.data?.error ||
                       error?.response?.data?.errors?.[0] ||
                       error?.message ||
                       "Failed to create training session";
      console.error("📋 Error Details:", {
        message: errorMsg,
        status: error?.response?.status,
        data: error?.response?.data
      });
      toast.error(String(errorMsg));
    }
  }

  async function handleDelete(id: string) {
    try {
      await sessionsService.delete(parseInt(id));
      setSessions((prev) => prev.filter((s) => s.id !== id));
      setSelectedSession(null);
      toast.success("Training session deleted successfully");
    } catch (error) {
      console.error("Failed to delete session:", error);
      toast.error("Failed to delete training session");
    }
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Training Sessions</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create and manage training programs by department or team.
          </p>
        </div>
        {canManage && (
          <Button onClick={() => setShowCreate(true)} className="gap-2">
            <Plus className="size-4" /> Create Session
          </Button>
        )}
      </div>

      {/* Search + Filter */}
      <SessionFilters
        search={search}
        filter={filter}
        onSearch={setSearch}
        onFilter={setFilter}
      />

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3 rounded-lg border p-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-20 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          ))}
        </div>
      ) : visible.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((s) => (
            <SessionCard key={s.id} session={s} onClick={setSelectedSession} />
          ))}
        </div>
      )}

      {/* Modals */}
      <CreateSessionModal
        open={showCreate}
        onCloseAction={() => setShowCreate(false)}
        onSubmitAction={handleCreate}
        trainerName={user?.name ?? ""}
        trainerId={user?.id}
        departmentId={user?.departmentId}
        departmentName={user?.departmentName}
      />

      <SessionDetailModal
        session={selectedSession}
        canManage={canManage}
        onClose={() => setSelectedSession(null)}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default function SessionsPage() {
  return (
    <RoleGuard allowed={["admin", "trainer"]}>
      <SessionsPageContent />
    </RoleGuard>
  );
}