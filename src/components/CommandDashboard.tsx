import { useState, useEffect } from 'react';
import { 
  Users, 
  Shield, 
  Activity, 
  Wifi, 
  AlertTriangle, 
  TrendingUp, 
  MapPin,
  Battery,
  Thermometer,
  Wind
} from 'lucide-react';
import { MonitoringCard } from './MonitoringCard';
import { StatusBadge } from './StatusBadge';

interface WorkerStats {
  total: number;
  safe: number;
  caution: number;
  danger: number;
}

interface EnvironmentData {
  temperature: number;
  humidity: number;
  co2Level: number;
  gasAlert: boolean;
}

export function CommandDashboard() {
  const [workerStats, setWorkerStats] = useState<WorkerStats>({
    total: 147,
    safe: 132,
    caution: 12,
    danger: 3
  });

  const [environmentData, setEnvironmentData] = useState<EnvironmentData>({
    temperature: 28.5,
    humidity: 67,
    co2Level: 450,
    gasAlert: false
  });

  const [devicesOnline, setDevicesOnline] = useState(144);
  const [activeAlerts, setActiveAlerts] = useState(5);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate minor fluctuations
      setWorkerStats(prev => ({
        ...prev,
        safe: prev.safe + Math.floor(Math.random() * 3) - 1,
        caution: Math.max(0, prev.caution + Math.floor(Math.random() * 2) - 1)
      }));
      
      setEnvironmentData(prev => ({
        ...prev,
        temperature: 28.5 + (Math.random() - 0.5) * 2,
        co2Level: 450 + Math.floor((Math.random() - 0.5) * 50)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MonitoringCard
          title="Total Workers"
          value={workerStats.total}
          subtitle="Currently Active"
          status="active"
          icon={<Users className="h-5 w-5 text-gov-info" />}
          glowEffect={true}
        />
        
        <MonitoringCard
          title="Safe Status"
          value={workerStats.safe}
          subtitle={`${Math.round((workerStats.safe / workerStats.total) * 100)}% of workforce`}
          status="safe"
          icon={<Shield className="h-5 w-5 text-gov-safe" />}
          glowEffect={true}
        />
        
        <MonitoringCard
          title="Active Alerts"
          value={activeAlerts}
          subtitle="Requires attention"
          status={activeAlerts > 3 ? "caution" : "safe"}
          icon={<AlertTriangle className="h-5 w-5 text-gov-caution" />}
          glowEffect={activeAlerts > 3}
        />
        
        <MonitoringCard
          title="Devices Online"
          value={devicesOnline}
          subtitle="Wearable sensors active"
          status="active"
          icon={<Wifi className="h-5 w-5 text-gov-info" />}
          glowEffect={true}
        />
      </div>

      {/* Monitoring Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Worker Status Overview */}
        <MonitoringCard
          title="Worker Status Distribution"
          className="lg:col-span-1"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <StatusBadge status="safe" label="SAFE" />
              <span className="font-command font-bold text-gov-safe">{workerStats.safe}</span>
            </div>
            <div className="flex items-center justify-between">
              <StatusBadge status="caution" label="CAUTION" />
              <span className="font-command font-bold text-gov-caution">{workerStats.caution}</span>
            </div>
            <div className="flex items-center justify-between">
              <StatusBadge status="danger" label="DANGER" />
              <span className="font-command font-bold text-gov-danger">{workerStats.danger}</span>
            </div>
          </div>
        </MonitoringCard>

        {/* Environmental Monitoring */}
        <MonitoringCard
          title="Environmental Sensors"
          status={environmentData.gasAlert ? "danger" : "safe"}
          glowEffect={environmentData.gasAlert}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Thermometer className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Temperature</span>
              </div>
              <span className="font-command font-bold">{environmentData.temperature.toFixed(1)}°C</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wind className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Humidity</span>
              </div>
              <span className="font-command font-bold">{environmentData.humidity}%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">CO₂ Level</span>
              </div>
              <span className={`font-command font-bold ${environmentData.co2Level > 500 ? 'text-gov-caution' : 'text-foreground'}`}>
                {environmentData.co2Level} ppm
              </span>
            </div>
          </div>
        </MonitoringCard>

        {/* Real-time Location */}
        <MonitoringCard
          title="Active Zones"
          icon={<MapPin className="h-5 w-5 text-gov-info" />}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Zone A - Mining</span>
              <StatusBadge status="safe" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Zone B - Processing</span>
              <StatusBadge status="caution" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Zone C - Storage</span>
              <StatusBadge status="safe" />
            </div>
          </div>
        </MonitoringCard>

        {/* Critical Alerts Feed */}
        <MonitoringCard
          title="Critical Alerts Feed"
          className="lg:col-span-2 xl:col-span-3"
          status={activeAlerts > 0 ? "caution" : "safe"}
          glowEffect={activeAlerts > 3}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gov-danger/10 border border-gov-danger/30 rounded-md">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-4 w-4 text-gov-danger" />
                <span className="text-sm font-medium">HIGH CO₂ detected in Zone B - Immediate evacuation required</span>
              </div>
              <span className="text-xs text-muted-foreground">2 min ago</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gov-caution/10 border border-gov-caution/30 rounded-md">
              <div className="flex items-center space-x-3">
                <Battery className="h-4 w-4 text-gov-caution" />
                <span className="text-sm font-medium">Low battery warning for 3 wearable devices</span>
              </div>
              <span className="text-xs text-muted-foreground">5 min ago</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gov-info/10 border border-gov-info/30 rounded-md">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-4 w-4 text-gov-info" />
                <span className="text-sm font-medium">Safety compliance improved by 12% this week</span>
              </div>
              <span className="text-xs text-muted-foreground">1 hour ago</span>
            </div>
          </div>
        </MonitoringCard>
      </div>
    </div>
  );
}