import { useState, useEffect } from 'react';
import { Shield, Bell, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import governmentLogo from '@/assets/government-logo.png';

export function GovernmentHeader() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date: Date) => {
    const dateStr = date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short', 
      year: 'numeric'
    });
    const timeStr = date.toLocaleTimeString('en-IN', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    return { dateStr, timeStr };
  };

  const { dateStr, timeStr } = formatDateTime(currentTime);

  return (
    <header className="h-16 bg-gradient-command border-b border-border flex items-center justify-between px-6 shadow-command">
      {/* Government Branding */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <img 
            src={governmentLogo} 
            alt="Government of India Safety Monitoring" 
            className="h-10 w-10 object-contain"
          />
          <div>
            <h1 className="text-lg font-command font-bold text-foreground tracking-wide">
              NSMS - NATIONAL SAFETY MONITORING SYSTEM
            </h1>
            <p className="text-xs text-muted-foreground font-medium">
              Government of India • Ministry of Labour & Employment
            </p>
          </div>
        </div>
      </div>

      {/* Official Time Display */}
      <div className="flex items-center space-x-6">
        <div className="text-right">
          <div className="text-sm font-command font-semibold text-foreground">
            {timeStr} IST
          </div>
          <div className="text-xs text-muted-foreground font-medium">
            {dateStr}
          </div>
        </div>

        {/* Control Actions */}
        <div className="flex items-center space-x-2 pl-4 border-l border-border">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Bell className="h-4 w-4 text-gov-caution" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Settings className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <User className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </header>
  );
}