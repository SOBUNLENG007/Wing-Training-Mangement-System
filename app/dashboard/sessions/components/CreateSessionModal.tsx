import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button }   from "@/components/ui/button";
import { Input }    from "@/components/ui/input";
import { Label }    from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TrainingSession } from "@/lib/types/session";

type Props = {
  open:      boolean;
  onClose:   () => void;
  onSubmit:  (s: TrainingSession) => void;
  trainerName: string;
};

export function CreateSessionModal({ open, onClose, onSubmit, trainerName }: Props) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const newSession: TrainingSession = {
      id:            `s${Date.now()}`,
      title:         fd.get("title")       as string,
      description:   fd.get("description") as string,
      department:    fd.get("department")  as string,
      startDate:     fd.get("startDate")   as string,
      endDate:       fd.get("endDate")     as string,
      trainer:       trainerName,
      status:        "upcoming",
      enrolledCount: 0,
      maxCapacity:   Number(fd.get("capacity")) || 30,
    };

    onSubmit(newSession);
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Create Training Session</DialogTitle>
          <DialogDescription>Set up a new training program for your team.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
          <div className="space-y-2">
            <Label className="text-foreground">Title</Label>
            <Input name="title" required placeholder="e.g. Cybersecurity Fundamentals" />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Description</Label>
            <Textarea name="description" required placeholder="Brief description of the training..." rows={3} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-foreground">Department</Label>
              <Input name="department" required placeholder="e.g. IT" />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Max Capacity</Label>
              <Input name="capacity" type="number" required defaultValue={30} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-foreground">Start Date</Label>
              <Input name="startDate" type="date" required />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">End Date</Label>
              <Input name="endDate" type="date" required />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Create Session</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}