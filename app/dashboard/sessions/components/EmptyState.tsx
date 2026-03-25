import { BookOpen } from "lucide-react";

export function EmptyState() {
  return (
    <div className="py-16 text-center">
      <BookOpen className="mx-auto size-10 text-muted-foreground/40" />
      <p className="mt-3 text-sm text-muted-foreground">No sessions found.</p>
    </div>
  );
}