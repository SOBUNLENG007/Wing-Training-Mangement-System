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

  // ── Derived list ───────────────────────────────────────────────────────────
  const visible = sessions.filter((s) => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) ||
                        s.department.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || s.status === filter;
    return matchSearch && matchFilter;
  });

  // ── Handlers ───────────────────────────────────────────────────────────────
  async function handleCreate(newSession: Omit<TrainingSession, "id">) {
    try {
      const created = await sessionsService.create(newSession);
      setSessions((prev) => [created, ...prev]);
      setShowCreate(false);
      toast.success("Training session created successfully");
    } catch (error) {
      console.error("Failed to create session:", error);
      toast.error("Failed to create training session");
    }
  }

  async function handleDelete(id: string) {
    try {
      await sessionsService.delete(id);
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
        onClose={() => setShowCreate(false)}
        onSubmit={handleCreate}
        trainerName={user?.name ?? ""}
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