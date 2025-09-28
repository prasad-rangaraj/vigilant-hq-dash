import { useState } from 'react';
import { Search, Filter, MapPin, Battery, Heart, Thermometer, AlertTriangle } from 'lucide-react';
import { MainLayout } from '@/components/MainLayout';
import { MonitoringCard } from '@/components/MonitoringCard';
import { StatusBadge } from '@/components/StatusBadge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Worker {
  id: string;
  name: string;
  employeeId: string;
  role: string;
  zone: string;
  status: 'safe' | 'caution' | 'danger' | 'offline';
  heartRate: number;
  temperature: number;
  batteryLevel: number;
  lastUpdate: string;
  location: { lat: number; lng: number };
}

const mockWorkers: Worker[] = [
  {
    id: '1',
    name: 'Rajesh Kumar Singh',
    employeeId: 'EMP001',
    role: 'Mining Engineer',
    zone: 'Zone A - Mining',
    status: 'safe',
    heartRate: 72,
    temperature: 36.8,
    batteryLevel: 85,
    lastUpdate: '2 min ago',
    location: { lat: 28.6139, lng: 77.2090 }
  },
  {
    id: '2',
    name: 'Priya Sharma',
    employeeId: 'EMP002',
    role: 'Safety Inspector',
    zone: 'Zone B - Processing',
    status: 'caution',
    heartRate: 95,
    temperature: 37.2,
    batteryLevel: 45,
    lastUpdate: '1 min ago',
    location: { lat: 28.6141, lng: 77.2092 }
  },
  {
    id: '3',
    name: 'Mohammed Ali Khan',
    employeeId: 'EMP003',
    role: 'Equipment Operator',
    zone: 'Zone A - Mining',
    status: 'danger',
    heartRate: 110,
    temperature: 38.1,
    batteryLevel: 20,
    lastUpdate: '30 sec ago',
    location: { lat: 28.6138, lng: 77.2088 }
  },
  {
    id: '4',
    name: 'Anita Patel',
    employeeId: 'EMP004',
    role: 'Chemical Analyst',
    zone: 'Zone C - Storage',
    status: 'safe',
    heartRate: 68,
    temperature: 36.5,
    batteryLevel: 92,
    lastUpdate: '3 min ago',
    location: { lat: 28.6140, lng: 77.2094 }
  },
  {
    id: '5',
    name: 'Suresh Babu',
    employeeId: 'EMP005',
    role: 'Maintenance Tech',
    zone: 'Zone B - Processing',
    status: 'offline',
    heartRate: 0,
    temperature: 0,
    batteryLevel: 0,
    lastUpdate: '15 min ago',
    location: { lat: 28.6137, lng: 77.2091 }
  }
];

export default function WorkerMonitoring() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredWorkers = mockWorkers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || worker.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getVitalStatus = (worker: Worker) => {
    if (worker.status === 'offline') return 'offline';
    if (worker.heartRate > 100 || worker.temperature > 37.5) return 'danger';
    if (worker.heartRate > 90 || worker.temperature > 37.0) return 'caution';
    return 'safe';
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-command font-bold text-foreground tracking-wide">
              WORKER MONITORING CENTER
            </h1>
            <p className="text-muted-foreground mt-1">
              Real-time health and safety monitoring for all field personnel
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search workers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-card border border-border rounded-md text-sm font-medium"
            >
              <option value="all">All Status</option>
              <option value="safe">Safe</option>
              <option value="caution">Caution</option>
              <option value="danger">Danger</option>
              <option value="offline">Offline</option>
            </select>
          </div>
        </div>

        {/* Worker Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredWorkers.map((worker) => (
            <MonitoringCard
              key={worker.id}
              title={`${worker.name} (${worker.employeeId})`}
              status={worker.status === 'offline' ? 'safe' : worker.status}
              glowEffect={worker.status === 'danger'}
              className="relative"
            >
              <div className="space-y-4">
                {/* Worker Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Role:</span>
                    <span className="text-sm text-foreground">{worker.role}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Zone:</span>
                    <span className="text-sm text-foreground">{worker.zone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Status:</span>
                    <StatusBadge status={worker.status} />
                  </div>
                </div>

                {/* Vitals */}
                {worker.status !== 'offline' && (
                  <div className="space-y-2 pt-2 border-t border-border">
                    <h4 className="text-xs font-command font-bold text-muted-foreground uppercase tracking-wider">
                      VITAL SIGNS
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <Heart className={`h-4 w-4 ${getVitalStatus(worker) === 'danger' ? 'text-gov-danger' : 'text-muted-foreground'}`} />
                        <div>
                          <div className="text-sm font-bold">{worker.heartRate}</div>
                          <div className="text-xs text-muted-foreground">BPM</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Thermometer className={`h-4 w-4 ${worker.temperature > 37.5 ? 'text-gov-danger' : 'text-muted-foreground'}`} />
                        <div>
                          <div className="text-sm font-bold">{worker.temperature}°C</div>
                          <div className="text-xs text-muted-foreground">Temp</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Device Status */}
                <div className="space-y-2 pt-2 border-t border-border">
                  <h4 className="text-xs font-command font-bold text-muted-foreground uppercase tracking-wider">
                    DEVICE STATUS
                  </h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Battery className={`h-4 w-4 ${worker.batteryLevel < 30 ? 'text-gov-caution' : 'text-muted-foreground'}`} />
                      <span className="text-sm font-medium">Battery</span>
                    </div>
                    <span className={`text-sm font-bold ${worker.batteryLevel < 30 ? 'text-gov-caution' : 'text-foreground'}`}>
                      {worker.batteryLevel}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Last Update</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{worker.lastUpdate}</span>
                  </div>
                </div>

                {/* Emergency Actions */}
                {worker.status === 'danger' && (
                  <div className="pt-2 border-t border-border">
                    <Button 
                      size="sm" 
                      className="w-full bg-gov-danger hover:bg-gov-danger/90 text-white font-command font-bold"
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      EMERGENCY RESPONSE
                    </Button>
                  </div>
                )}
              </div>
            </MonitoringCard>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <MonitoringCard
            title="Total Active"
            value={mockWorkers.filter(w => w.status !== 'offline').length}
            status="safe"
          />
          <MonitoringCard
            title="Safe Workers"
            value={mockWorkers.filter(w => w.status === 'safe').length}
            status="safe"
          />
          <MonitoringCard
            title="Need Attention"
            value={mockWorkers.filter(w => w.status === 'caution').length}
            status="caution"
          />
          <MonitoringCard
            title="Critical Alerts"
            value={mockWorkers.filter(w => w.status === 'danger').length}
            status="danger"
            glowEffect={mockWorkers.filter(w => w.status === 'danger').length > 0}
          />
        </div>
      </div>
    </MainLayout>
  );
}