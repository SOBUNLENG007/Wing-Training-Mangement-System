"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useAuth } from "@/lib/auth-store";
import { RoleGuard } from "@/components/auth/role-guard";
import { Button } from "@/components/ui/button";
import { sessionsService } from "@/service/sessions/sessions.service";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

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
  const [selectedSession, setSelectedSession] =
    useState<TrainingSession | null>(null);
  const [page, setPage] = useState(0); // zero-based
  const [size] = useState(9);
  const [total, setTotal] = useState(0);

  const canManage = user?.role === "admin" || user?.role === "trainer";

  // Load sessions on mount and when page/filter/search changes
  useEffect(() => {
    loadSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, search]); // Only refetch all on filter/search change

  const loadSessions = async () => {
    try {
      setLoading(true);
      // Always fetch all, since backend does not paginate
      const params = {
        search,
        filter: filter !== "all" ? filter : undefined,
      };
      const res = await sessionsService.getAll(params);
      // Accept either direct array or { payload: array }
      let sessionArr: TrainingSession[] = [];
      if (Array.isArray(res)) {
        sessionArr = res;
      } else if (res && Array.isArray((res as any).payload)) {
        sessionArr = (res as any).payload;
      }
      setSessions(sessionArr);
      setTotal(sessionArr.length);
    } catch (error) {
      console.error("Failed to load sessions:", error);
      toast.error("Failed to load training sessions");
    } finally {
      setLoading(false);
    }
  };

  // ── Derived list ──
  // Filtering is handled server-side if supported, otherwise here
  const visible = sessions.slice(page * size, (page + 1) * size);

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
      const errorMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data?.errors?.[0] ||
        error?.message ||
        "Failed to create training session";
      console.error("📋 Error Details:", {
        message: errorMsg,
        status: error?.response?.status,
        data: error?.response?.data,
      });
      toast.error(String(errorMsg));
      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
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
        <div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((s) => (
              <SessionCard key={s.id} session={s} onClick={setSelectedSession} />
            ))}
          </div>
          {/* Pagination UI */}
          <Pagination className="mt-6">
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
                    {Array.from({ length: 9 }).map((_, i) => (
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
                  <div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                      {visible.map((s) => (
                        <SessionCard key={s.id} session={s} onClick={setSelectedSession} />
                      ))}
                    </div>
                    {/* Pagination UI */}
                    <Pagination className="mt-6">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={e => {
                              e.preventDefault();
                              setPage(p => Math.max(0, p - 1));
                            }}
                            aria-disabled={page === 0}
                            tabIndex={page === 0 ? -1 : 0}
                          />
                        </PaginationItem>
                        {Array.from({ length: Math.ceil(total / size) }).map((_, i) => (
                          <PaginationItem key={i}>
                            <PaginationLink
                              href="#"
                              isActive={i === page}
                              onClick={e => {
                                e.preventDefault();
                                setPage(i);
                              }}
                            >
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={e => {
                              e.preventDefault();
                              setPage(p => (p + 1 < Math.ceil(total / size) ? p + 1 : p));
                            }}
                            aria-disabled={page + 1 >= Math.ceil(total / size)}
                            tabIndex={page + 1 >= Math.ceil(total / size) ? -1 : 0}
                          />
                        </PaginationItem>
                      </PaginationContent>
                      <div className="ml-4 flex items-center text-xs text-slate-500">
                        Total: {total}
                      </div>
                    </Pagination>
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
          </Pagination>
        </div>
      )}
    </div>
  );
}

export default function SessionsPage() {
    <RoleGuard allowed={["admin", "trainer"]}>
      <SessionsPageContent />
    </RoleGuard>
}
