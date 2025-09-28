import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MonitoringCardProps {
  title: string;
  value?: string | number;
  subtitle?: string;
  status?: 'safe' | 'caution' | 'danger' | 'active';
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  glowEffect?: boolean;
}

export function MonitoringCard({ 
  title, 
  value, 
  subtitle, 
  status,
  icon, 
  children, 
  className,
  glowEffect = false
}: MonitoringCardProps) {
  const glowStyles = {
    safe: "shadow-glow-safe border-gov-safe/30",
    caution: "shadow-glow-caution border-gov-caution/30",
    danger: "shadow-glow-danger border-gov-danger/30",
    active: "shadow-glow-active border-glow-active/30"
  };

  return (
    <Card className={cn(
      "bg-gradient-panel border-border transition-all duration-300 hover:shadow-command",
      glowEffect && status && glowStyles[status],
      className
    )}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-command font-bold text-muted-foreground tracking-wider uppercase flex items-center justify-between">
          {title}
          {icon}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {value !== undefined && (
          <div className="space-y-1">
            <div className={cn(
              "text-2xl font-ibm-plex font-bold tracking-tight",
              status === 'safe' && "text-gov-safe",
              status === 'caution' && "text-gov-caution",
              status === 'danger' && "text-gov-danger",
              !status && "text-foreground"
            )}>
              {value}
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground font-medium">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </CardContent>
    </Card>
  );
}