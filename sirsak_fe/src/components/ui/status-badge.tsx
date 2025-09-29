import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "available" | "occupied" | "pending" | "approved" | "rejected";
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variants = {
    available: "bg-room-available text-white",
    occupied: "bg-room-occupied text-white", 
    pending: "bg-room-pending text-white",
    approved: "bg-success text-success-foreground",
    rejected: "bg-destructive text-destructive-foreground",
  };

  const labels = {
    available: "Tersedia",
    occupied: "Terisi",
    pending: "Pending",
    approved: "Disetujui", 
    rejected: "Ditolak",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        variants[status],
        className
      )}
    >
      {labels[status]}
    </span>
  );
}