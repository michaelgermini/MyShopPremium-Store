import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CounterBadgeProps {
  count: number;
  className?: string;
}

export function CounterBadge({ count, className }: CounterBadgeProps) {
  if (count <= 0) return null;

  return (
    <Badge
      variant="destructive"
      className={cn(
        "absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs animate-pulse",
        className
      )}
    >
      {count > 99 ? '99+' : count}
    </Badge>
  );
}
