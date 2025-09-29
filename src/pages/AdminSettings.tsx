import { MainLayout } from '@/components/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { 
  Settings, 
  Shield, 
  Users, 
  Key, 
  Database, 
  Bell,
  Eye,
  Lock,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Globe,
  Smartphone
} from 'lucide-react';

const systemStatus = [
  { component: 'Database Connection', status: 'healthy', lastCheck: '2 mins ago' },
  { component: 'Device Connectivity', status: 'healthy', lastCheck: '1 min ago' },
  { component: 'Alert System', status: 'healthy', lastCheck: '30 secs ago' },
  { component: 'Backup Services', status: 'warning', lastCheck: '1 hour ago' },
  { component: 'Security Monitor', status: 'healthy', lastCheck: '45 secs ago' }
];

const userRoles = [
  { name: 'System Administrator', users: 2, permissions: ['Full Access', 'User Management', 'System Config'] },
  { name: 'Safety Officer', users: 8, permissions: ['Monitor Workers', 'View Reports', 'Manage Alerts'] },
  { name: 'Site Supervisor', users: 15, permissions: ['Worker Monitoring', 'Basic Reports'] },
  { name: 'Medical Officer', users: 3, permissions: ['Health Data', 'Medical Reports', 'Emergency Response'] },
  { name: 'Operator', users: 45, permissions: ['View Dashboard', 'Basic Monitoring'] }
];

const auditLogs = [
  { timestamp: '2024-01-14 09:23:15', user: 'admin@safety.gov.in', action: 'Modified alert threshold for CO2 levels', severity: 'medium' },
  { timestamp: '2024-01-14 08:45:32', user: 'supervisor@safety.gov.in', action: 'Acknowledged critical alert - Worker W-2024-023', severity: 'high' },
  { timestamp: '2024-01-14 07:12:08', user: 'operator@safety.gov.in', action: 'Generated compliance report for January 2024', severity: 'low' },
  { timestamp: '2024-01-13 16:38:45', user: 'admin@safety.gov.in', action: 'Added new user - Dr. Sharma (Medical Officer)', severity: 'medium' },
  { timestamp: '2024-01-13 14:22:17', user: 'safety@safety.gov.in', action: 'Updated emergency evacuation protocol', severity: 'high' }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'healthy': return 'text-gov-safe';
    case 'warning': return 'text-gov-caution';
    case 'error': return 'text-gov-danger';
    default: return 'text-muted-foreground';
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'low': return 'default';
    case 'medium': return 'secondary';
    case 'high': return 'destructive';
    default: return 'outline';
  }
};

export default function AdminSettings() {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: true,
    sessionTimeout: true,
    auditLogging: true,
    ipWhitelist: false
  });

  const [alertSettings, setAlertSettings] = useState({
    criticalAlerts: true,
    smsAlerts: true,
    emailNotifications: true,
    pushNotifications: false
  });

  const [systemPreferences, setSystemPreferences] = useState({
    darkMode: false,
    autoRefresh: true,
    soundAlerts: true,
    dataExport: true
  });

  return (
    <MainLayout>
      <div className="p-6 space-y-6 font-admin">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-admin font-bold text-foreground tracking-tight">
              ADMIN SETTINGS
            </h1>
            <p className="text-muted-foreground mt-3 text-lg font-inter">
              System configuration, user management, and security settings
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              EXPORT LOGS
            </Button>
            <Button size="sm" variant="destructive">
              <AlertTriangle className="h-4 w-4 mr-2" />
              EMERGENCY MODE
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Status */}
          <Card>
            <CardHeader>
            <CardTitle className="font-admin text-xl font-semibold tracking-tight flex items-center">
              <Database className="h-6 w-6 mr-3" />
              SYSTEM STATUS
            </CardTitle>
            <CardDescription className="font-inter">Real-time monitoring of critical system components</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemStatus.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {item.status === 'healthy' ? (
                        <CheckCircle className="h-4 w-4 text-gov-safe" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-gov-caution" />
                      )}
                      <span className="font-semibold text-foreground font-inter">{item.component}</span>
                    </div>
                    <div className="text-right">
                      <Badge variant={item.status === 'healthy' ? 'default' : 'secondary'}>
                        {item.status.toUpperCase()}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{item.lastCheck}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User Management */}
          <Card>
            <CardHeader>
            <CardTitle className="font-admin text-xl font-semibold tracking-tight flex items-center">
              <Users className="h-6 w-6 mr-3" />
              USER ROLES & PERMISSIONS
            </CardTitle>
            <CardDescription className="font-inter">Manage user access levels and system permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userRoles.map((role, index) => (
                  <div key={index} className="border border-border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-foreground font-inter">{role.name}</span>
                      <Badge variant="outline" className="font-inter">{role.users} users</Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map((permission, pIndex) => (
                        <Badge key={pIndex} variant="secondary" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline">
                <Key className="h-4 w-4 mr-2" />
                MANAGE PERMISSIONS
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="font-admin text-xl font-semibold tracking-tight flex items-center">
              <Shield className="h-6 w-6 mr-3" />
              SECURITY CONFIGURATION
            </CardTitle>
            <CardDescription className="font-inter">System security policies and access controls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground font-inter">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground font-inter">Require 2FA for all admin users</p>
                  </div>
                  <Switch 
                    checked={securitySettings.twoFactor}
                    onCheckedChange={(checked) => setSecuritySettings(prev => ({...prev, twoFactor: checked}))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground font-inter">Session Timeout</p>
                    <p className="text-sm text-muted-foreground font-inter">Auto-logout after 30 minutes</p>
                  </div>
                  <Switch 
                    checked={securitySettings.sessionTimeout}
                    onCheckedChange={(checked) => setSecuritySettings(prev => ({...prev, sessionTimeout: checked}))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground font-inter">Audit Logging</p>
                    <p className="text-sm text-muted-foreground font-inter">Log all user actions</p>
                  </div>
                  <Switch 
                    checked={securitySettings.auditLogging}
                    onCheckedChange={(checked) => setSecuritySettings(prev => ({...prev, auditLogging: checked}))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground font-inter">IP Whitelist</p>
                    <p className="text-sm text-muted-foreground font-inter">Restrict access by IP address</p>
                  </div>
                  <Switch 
                    checked={securitySettings.ipWhitelist}
                    onCheckedChange={(checked) => setSecuritySettings(prev => ({...prev, ipWhitelist: checked}))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground font-inter">Data Encryption</p>
                    <p className="text-sm text-muted-foreground font-inter">AES-256 encryption at rest</p>
                  </div>
                  <Badge variant="default" className="bg-gov-safe font-inter">ENABLED</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground font-inter">Backup Schedule</p>
                    <p className="text-sm text-muted-foreground font-inter">Automated daily backups</p>
                  </div>
                  <Badge variant="default" className="bg-gov-safe font-inter">ACTIVE</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground font-inter">SSL Certificate</p>
                    <p className="text-sm text-muted-foreground font-inter">Valid until March 2025</p>
                  </div>
                  <Badge variant="default" className="bg-gov-safe font-inter">VALID</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground font-inter">Intrusion Detection</p>
                    <p className="text-sm text-muted-foreground font-inter">Real-time threat monitoring</p>
                  </div>
                  <Badge variant="default" className="bg-gov-safe font-inter">ACTIVE</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audit Logs */}
        <Card>
          <CardHeader>
            <CardTitle className="font-admin text-xl font-semibold tracking-tight flex items-center">
              <Eye className="h-6 w-6 mr-3" />
              AUDIT TRAIL
            </CardTitle>
            <CardDescription className="font-inter">System activity logs and security events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {auditLogs.map((log, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-mono text-muted-foreground">{log.timestamp}</span>
                      <Badge variant={getSeverityColor(log.severity)} className="text-xs">
                        {log.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground mb-1 font-inter">{log.action}</p>
                    <p className="text-xs text-muted-foreground font-inter">{log.user}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              VIEW FULL AUDIT LOG
            </Button>
          </CardContent>
        </Card>

        {/* System Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
            <CardTitle className="font-admin text-lg font-semibold tracking-tight flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              ALERT SETTINGS
            </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground font-inter font-medium">Critical Alert Notifications</span>
                <Switch 
                  checked={alertSettings.criticalAlerts}
                  onCheckedChange={(checked) => setAlertSettings(prev => ({...prev, criticalAlerts: checked}))}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground font-inter font-medium">SMS Alerts</span>
                <Switch 
                  checked={alertSettings.smsAlerts}
                  onCheckedChange={(checked) => setAlertSettings(prev => ({...prev, smsAlerts: checked}))}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground font-inter font-medium">Email Notifications</span>
                <Switch 
                  checked={alertSettings.emailNotifications}
                  onCheckedChange={(checked) => setAlertSettings(prev => ({...prev, emailNotifications: checked}))}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground font-inter font-medium">Push Notifications</span>
                <Switch 
                  checked={alertSettings.pushNotifications}
                  onCheckedChange={(checked) => setAlertSettings(prev => ({...prev, pushNotifications: checked}))}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
            <CardTitle className="font-admin text-lg font-semibold tracking-tight flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              SYSTEM PREFERENCES
            </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground font-inter font-medium">Dark Mode Interface</span>
                <Switch 
                  checked={systemPreferences.darkMode}
                  onCheckedChange={(checked) => setSystemPreferences(prev => ({...prev, darkMode: checked}))}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground font-inter font-medium">Auto-refresh Dashboard</span>
                <Switch 
                  checked={systemPreferences.autoRefresh}
                  onCheckedChange={(checked) => setSystemPreferences(prev => ({...prev, autoRefresh: checked}))}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground font-inter font-medium">Sound Alerts</span>
                <Switch 
                  checked={systemPreferences.soundAlerts}
                  onCheckedChange={(checked) => setSystemPreferences(prev => ({...prev, soundAlerts: checked}))}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground font-inter font-medium">Data Export Access</span>
                <Switch 
                  checked={systemPreferences.dataExport}
                  onCheckedChange={(checked) => setSystemPreferences(prev => ({...prev, dataExport: checked}))}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}