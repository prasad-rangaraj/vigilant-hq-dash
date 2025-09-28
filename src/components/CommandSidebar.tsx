import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  Brain, 
  AlertTriangle, 
  FileText, 
  UserCheck, 
  Smartphone,
  GraduationCap,
  Settings,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    title: 'COMMAND CENTER',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'WORKER MONITORING',
    href: '/workers',
    icon: Users,
  },
  {
    title: 'GAS & ENVIRONMENT',
    href: '/environment',
    icon: Activity,
  },
  {
    title: 'AI RISK ANALYSIS',
    href: '/ai-risk',
    icon: Brain,
  },
  {
    title: 'ALERTS & INCIDENTS',
    href: '/alerts',
    icon: AlertTriangle,
  },
  {
    title: 'REPORTS',
    href: '/reports',
    icon: FileText,
  },
  {
    title: 'WORKER PROFILES',
    href: '/profiles',
    icon: UserCheck,
  },
  {
    title: 'DEVICE MANAGEMENT',
    href: '/devices',
    icon: Smartphone,
  },
  {
    title: 'TRAINING MODE',
    href: '/training',
    icon: GraduationCap,
  },
  {
    title: 'ADMIN SETTINGS',
    href: '/admin',
    icon: Settings,
  },
];

export function CommandSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-gradient-panel border-r border-border h-full flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-gov-info" />
          <span className="font-command font-bold text-sm text-foreground tracking-wider">
            CONTROL CENTER
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1 font-medium">
          SIH2025 PROTOTYPE
        </p>
      </div>

      {/* Navigation Menu */}
      <nav className="p-2 space-y-1 flex-1">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-md transition-all duration-200 text-sm font-medium",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-glow-active"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <Icon className={cn(
                "h-4 w-4",
                isActive ? "text-primary-foreground" : "text-muted-foreground"
              )} />
              <span className="font-command font-semibold tracking-wide">
                {item.title}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Security Footer */}
      <div className="mt-auto p-4">
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="h-4 w-4 text-gov-safe" />
            <span className="text-xs font-command font-bold text-foreground">
              SECURE CONNECTION
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            End-to-End Encrypted • HIPAA Compliant
          </p>
        </div>
      </div>
    </aside>
  );
}