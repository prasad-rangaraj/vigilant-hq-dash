import { useState } from 'react';
import { AlertTriangle, Clock, CheckCircle, XCircle, User, MapPin, Phone } from 'lucide-react';
import { MainLayout } from '@/components/MainLayout';
import { MonitoringCard } from '@/components/MonitoringCard';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';

interface Alert {
  id: string;
  type: 'critical' | 'high' | 'medium' | 'low';
  category: 'safety' | 'environmental' | 'equipment' | 'medical' | 'security';
  title: string;
  description: string;
  location: string;
  affectedWorkers: string[];
  timestamp: Date;
  status: 'active' | 'acknowledged' | 'resolved' | 'escalated';
  acknowledgedBy?: string;
  resolvedBy?: string;
  responseTime?: number; // in minutes
}

const mockAlerts: Alert[] = [
  {
    id: 'ALT001',
    type: 'critical',
    category: 'environmental',
    title: 'HAZARDOUS GAS LEAK DETECTED',
    description: 'High concentration of H2S detected in Zone B processing area. Immediate evacuation required.',
    location: 'Zone B - Processing Unit 3',
    affectedWorkers: ['EMP002', 'EMP005', 'EMP008'],
    timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    status: 'active'
  },
  {
    id: 'ALT002',
    type: 'critical',
    category: 'medical',
    title: 'WORKER MEDICAL EMERGENCY',
    description: 'EMP003 showing signs of heat exhaustion. Heart rate 115 BPM, temperature 38.2°C.',
    location: 'Zone A - Mining Shaft 2',
    affectedWorkers: ['EMP003'],
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    status: 'acknowledged',
    acknowledgedBy: 'Dr. Rajesh Kumar'
  },
  {
    id: 'ALT003',
    type: 'high',
    category: 'equipment',
    title: 'CRITICAL EQUIPMENT FAILURE',
    description: 'Ventilation system malfunction in Zone A. Air circulation reduced by 60%.',
    location: 'Zone A - Ventilation Control',
    affectedWorkers: ['EMP001', 'EMP004', 'EMP007'],
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    status: 'escalated'
  },
  {
    id: 'ALT004',
    type: 'medium',
    category: 'safety',
    title: 'Safety Protocol Violation',
    description: 'Worker detected in restricted area without proper clearance.',
    location: 'Zone C - Restricted Area Alpha',
    affectedWorkers: ['EMP009'],
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    status: 'resolved',
    acknowledgedBy: 'Security Chief Sharma',
    resolvedBy: 'Security Chief Sharma',
    responseTime: 12
  },
  {
    id: 'ALT005',
    type: 'low',
    category: 'equipment',
    title: 'Low Battery Warning',
    description: 'Multiple wearable devices showing battery levels below 20%.',
    location: 'Multiple Zones',
    affectedWorkers: ['EMP006', 'EMP010', 'EMP011'],
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    status: 'acknowledged',
    acknowledgedBy: 'Maintenance Team'
  }
];

interface Incident {
  id: string;
  title: string;
  severity: 'minor' | 'major' | 'critical';
  type: string;
  description: string;
  location: string;
  injuryCount: number;
  timestamp: Date;
  investigationStatus: 'pending' | 'ongoing' | 'completed';
  rootCause?: string;
}

const mockIncidents: Incident[] = [
  {
    id: 'INC001',
    title: 'Gas Exposure Incident',
    severity: 'major',
    type: 'Chemical Exposure',
    description: 'Two workers exposed to CO gas due to sensor malfunction.',
    location: 'Zone A - Level 3',
    injuryCount: 2,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    investigationStatus: 'ongoing'
  },
  {
    id: 'INC002',
    title: 'Equipment Malfunction',
    severity: 'minor',
    type: 'Mechanical Failure',
    description: 'Conveyor belt stopped, causing minor injury to operator.',
    location: 'Zone B - Production Line 2',
    injuryCount: 1,
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    investigationStatus: 'completed',
    rootCause: 'Lack of preventive maintenance'
  }
];

export default function Alerts() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredAlerts = mockAlerts.filter(alert => {
    const statusMatch = filterStatus === 'all' || alert.status === filterStatus;
    const typeMatch = filterType === 'all' || alert.type === filterType;
    return statusMatch && typeMatch;
  });

  const getAlertStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'danger';
      case 'acknowledged': return 'caution';
      case 'resolved': return 'safe';
      case 'escalated': return 'danger';
      default: return 'safe';
    }
  };

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'critical': return 'danger';
      case 'high': return 'caution';
      case 'medium': return 'caution';
      case 'low': return 'safe';
      default: return 'safe';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hr ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  const activeAlerts = mockAlerts.filter(a => a.status === 'active').length;
  const criticalAlerts = mockAlerts.filter(a => a.type === 'critical').length;

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-command font-bold text-foreground tracking-wide">
              ALERTS & INCIDENT MANAGER
            </h1>
            <p className="text-muted-foreground mt-1">
              Real-time alert monitoring and incident management system
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-card border border-border rounded-md text-sm font-medium"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="resolved">Resolved</option>
              <option value="escalated">Escalated</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-card border border-border rounded-md text-sm font-medium"
            >
              <option value="all">All Types</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Alert Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MonitoringCard
            title="Active Alerts"
            value={activeAlerts}
            subtitle="Require immediate attention"
            status="danger"
            icon={<AlertTriangle className="h-5 w-5 text-gov-danger" />}
            glowEffect={activeAlerts > 0}
          />
          
          <MonitoringCard
            title="Critical Priority"
            value={criticalAlerts}
            subtitle="Emergency response needed"
            status="danger"
            icon={<XCircle className="h-5 w-5 text-gov-danger" />}
            glowEffect={criticalAlerts > 0}
          />
          
          <MonitoringCard
            title="Resolved Today"
            value={mockAlerts.filter(a => a.status === 'resolved').length}
            subtitle="Successfully handled"
            status="safe"
            icon={<CheckCircle className="h-5 w-5 text-gov-safe" />}
          />
          
          <MonitoringCard
            title="Avg Response Time"
            value="8.5 min"
            subtitle="Last 24 hours"
            status="safe"
            icon={<Clock className="h-5 w-5 text-gov-info" />}
          />
        </div>

        {/* Active Alerts Feed */}
        <MonitoringCard
          title="Live Alert Feed"
          className="col-span-full"
          status={activeAlerts > 0 ? 'danger' : 'safe'}
          glowEffect={activeAlerts > 0}
        >
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div 
                key={alert.id}
                className={`p-4 rounded-lg border ${
                  alert.status === 'active' && alert.type === 'critical'
                    ? 'bg-gov-danger/10 border-gov-danger/30 animate-pulse'
                    : 'bg-card border-border'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <StatusBadge 
                        status={getAlertTypeColor(alert.type) as 'safe' | 'caution' | 'danger'}
                        label={alert.type.toUpperCase()}
                      />
                      <StatusBadge 
                        status={getAlertStatusColor(alert.status) as 'safe' | 'caution' | 'danger'}
                        label={alert.status.toUpperCase()}
                      />
                      <span className="text-xs text-muted-foreground font-command">
                        {alert.id}
                      </span>
                    </div>
                    <h4 className="font-command font-bold text-foreground text-lg mb-1">
                      {alert.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {alert.description}
                    </p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 inline mr-1" />
                    {formatTime(alert.timestamp)}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{alert.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {alert.affectedWorkers.length} worker(s) affected
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-accent px-2 py-1 rounded text-accent-foreground font-command font-bold">
                      {alert.category.toUpperCase()}
                    </span>
                  </div>
                </div>

                {alert.acknowledgedBy && (
                  <div className="text-xs text-muted-foreground mb-2">
                    Acknowledged by: {alert.acknowledgedBy}
                  </div>
                )}

                {alert.status === 'active' && (
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-gov-caution hover:bg-gov-caution/90">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      ACKNOWLEDGE
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      ESCALATE
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </MonitoringCard>

        {/* Recent Incidents */}
        <MonitoringCard
          title="Recent Incidents"
          subtitle="Investigation and analysis"
        >
          <div className="space-y-4">
            {mockIncidents.map((incident) => (
              <div key={incident.id} className="p-3 bg-card border border-border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-command font-bold text-foreground">{incident.title}</h4>
                    <p className="text-sm text-muted-foreground">{incident.description}</p>
                  </div>
                  <StatusBadge 
                    status={incident.severity === 'critical' ? 'danger' : incident.severity === 'major' ? 'caution' : 'safe'}
                    label={incident.severity.toUpperCase()}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Location:</span> {incident.location}
                  </div>
                  <div>
                    <span className="font-medium">Injuries:</span> {incident.injuryCount}
                  </div>
                  <div>
                    <span className="font-medium">Investigation:</span> {incident.investigationStatus}
                  </div>
                  <div>
                    <span className="font-medium">Date:</span> {formatTime(incident.timestamp)}
                  </div>
                </div>
                
                {incident.rootCause && (
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Root Cause:</span> {incident.rootCause}
                  </div>
                )}
              </div>
            ))}
          </div>
        </MonitoringCard>
      </div>
    </MainLayout>
  );
}