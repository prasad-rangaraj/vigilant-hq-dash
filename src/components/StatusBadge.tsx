import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'safe' | 'caution' | 'danger' | 'offline';
  label?: string;
  className?: string;
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const statusStyles = {
    safe: "bg-gov-safe/10 text-gov-safe border-gov-safe/30 shadow-glow-safe",
    caution: "bg-gov-caution/10 text-gov-caution border-gov-caution/30 shadow-glow-caution", 
    danger: "bg-gov-danger/10 text-gov-danger border-gov-danger/30 shadow-glow-danger",
    offline: "bg-muted/10 text-muted-foreground border-muted/30"
  };

  const statusLabels = {
    safe: 'SAFE',
    caution: 'CAUTION',
    danger: 'DANGER',
    offline: 'OFFLINE'
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2 py-1 rounded-md border text-xs font-command font-bold tracking-wider",
      statusStyles[status],
      className
    )}>
      <span className={cn(
        "w-2 h-2 rounded-full mr-1.5",
        status === 'safe' && "bg-gov-safe",
        status === 'caution' && "bg-gov-caution",
        status === 'danger' && "bg-gov-danger", 
        status === 'offline' && "bg-muted-foreground"
      )} />
      {label || statusLabels[status]}
    </span>
  );
}