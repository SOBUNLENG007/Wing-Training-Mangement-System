// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
// import { Button }   from "@/components/ui/button";
// import { Input }    from "@/components/ui/input";
// import { Label }    from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { TrainingSession } from "@/lib/types/session";

// type Props = {
//   open:      boolean;
//   onClose:   () => void;
//   onSubmit:  (s: TrainingSession) => void;
//   trainerName: string;
// };

// export function CreateSessionModal({ open, onClose, onSubmit, trainerName }: Props) {
//   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     const fd = new FormData(e.currentTarget);

//     const newSession: TrainingSession = {
//       id:            `s${Date.now()}`,
//       title:         fd.get("title")       as string,
//       description:   fd.get("description") as string,
//       department:    fd.get("department")  as string,
//       startDate:     fd.get("startDate")   as string,
//       endDate:       fd.get("endDate")     as string,
//       trainer:       trainerName,
//       status:        "upcoming",
//       enrolledCount: 0,
//       maxCapacity:   Number(fd.get("capacity")) || 30,
//     };

//     onSubmit(newSession);
//   }

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle className="text-foreground">Create Training Session</DialogTitle>
//           <DialogDescription>Set up a new training program for your team.</DialogDescription>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="mt-2 space-y-4">
//           <div className="space-y-2">
//             <Label className="text-foreground">Title</Label>
//             <Input name="title" required placeholder="e.g. Cybersecurity Fundamentals" />
//           </div>

//           <div className="space-y-2">
//             <Label className="text-foreground">Description</Label>
//             <Textarea name="description" required placeholder="Brief description of the training..." rows={3} />
//           </div>

//           <div className="grid grid-cols-2 gap-3">
//             <div className="space-y-2">
//               <Label className="text-foreground">Department</Label>
//               <Input name="department" required placeholder="e.g. IT" />
//             </div>
//             <div className="space-y-2">
//               <Label className="text-foreground">Max Capacity</Label>
//               <Input name="capacity" type="number" required defaultValue={30} />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-3">
//             <div className="space-y-2">
//               <Label className="text-foreground">Start Date</Label>
//               <Input name="startDate" type="date" required />
//             </div>
//             <div className="space-y-2">
//               <Label className="text-foreground">End Date</Label>
//               <Input name="endDate" type="date" required />
//             </div>
//           </div>

//           <div className="flex justify-end gap-2 pt-2">
//             <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
//             <Button type="submit">Create Session</Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/lib/auth-store";
import { usersService } from "@/service/users/users.service";

type Props = {
  open: boolean;
  onCloseAction: () => void;
  onSubmitAction: (data: any) => void;
  trainerName: string;
  trainerId?: number;
  departmentId?: number;
  departmentName?: string;
};

export function CreateSessionModal({ open, onCloseAction, onSubmitAction, trainerName, trainerId, departmentId, departmentName }: Props) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [maxCapacity, setMaxCapacity] = useState(20);
  const [selectedDeptId, setSelectedDeptId] = useState(String(departmentId || "2"));

  useEffect(() => {
    setSelectedDeptId(String(departmentId || user?.departmentId || "2"));
  }, [departmentId, user?.departmentId]);

  const resolvedTrainerId = trainerId ?? user?.id;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let finalTrainerId = resolvedTrainerId;

    if (!finalTrainerId) {
      try {
        const profile = await usersService.getProfile();
        finalTrainerId = profile?.id;
        console.log("✅ Fallback profile-based trainerId:", finalTrainerId);
      } catch (error) {
        console.warn("⚠️ Unable to fetch profile for fallback trainerId", error);
      }
    }

    // if (!finalTrainerId) {
    //   console.error("❌ trainerId is not set! User ID:", finalTrainerId);
    //   toast.error("Unable to create session: trainer is not identified. Please reload and try again.");
    //   return;
    // }

    const payload = {
      userId: finalTrainerId,
      title,
      description,
      startDate,
      endDate,
      instructorId: Number(finalTrainerId),
      departmentId: Number(selectedDeptId),
      maxCapacity,
    };

    console.log("📝 Modal - Submitting payload:", payload);
    onSubmitAction(payload);
    
    // Reset form
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setMaxCapacity(20);
    setSelectedDeptId(String(departmentId || "2"));
  };

  return (
    <Dialog open={open} onOpenChange={onCloseAction}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Training Session</DialogTitle>
          <DialogDescription>
            Set up a new training program for your team.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">

          {/* Title */}
          <div className="space-y-2">
            <Label>Title</Label>
            <Input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required 
              placeholder="e.g. Backend Development" 
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required 
              placeholder="Brief description..." 
              rows={3} 
            />
          </div>

          {/* Max Capacity */}
          <div className="space-y-2">
            <Label>Max Capacity</Label>
            <Input 
              type="number" 
              value={maxCapacity}
              onChange={(e) => setMaxCapacity(Number(e.target.value))}
              required 
              min="1"
              placeholder="e.g. 20" 
            />
          </div>

          {/* Trainer (Read-only) */}
          <div className="space-y-2">
            <Label>Trainer</Label>
            <Input type="text" value={trainerName} disabled className="bg-muted" />
          </div>

          {/* Department Selection */}
          <div className="space-y-2">
            <Label>Department</Label>
            <Select value={selectedDeptId} onValueChange={setSelectedDeptId}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">IT</SelectItem>
                <SelectItem value="2">Information Technology</SelectItem>
                <SelectItem value="3">HR</SelectItem>
                <SelectItem value="4">Finance</SelectItem>
                <SelectItem value="5">Operations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required 
              />
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required 
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onCloseAction}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}