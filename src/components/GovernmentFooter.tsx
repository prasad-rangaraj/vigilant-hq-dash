import { Shield, Zap } from 'lucide-react';

export function GovernmentFooter() {
  return (
    <footer className="bg-gradient-panel border-t border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Side - Security & Compliance */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-gov-safe" />
            <span className="text-xs font-command font-medium text-muted-foreground">
              End-to-End Encrypted • HIPAA/Gov Compliant
            </span>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Classification: <span className="font-command font-semibold text-gov-info">RESTRICTED</span>
          </div>
        </div>

        {/* Right Side - SIH2025 Branding */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-gov-caution" />
            <span className="text-xs font-command font-bold text-foreground">
              Powered by AI
            </span>
          </div>
          
          <div className="h-4 w-px bg-border" />
          
          <span className="text-xs font-command font-bold text-gov-info">
            SIH2025 PROTOTYPE
          </span>
        </div>
      </div>
    </footer>
  );
}