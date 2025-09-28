import { useState, useEffect } from 'react';
import { Thermometer, Wind, Droplets, Activity, AlertTriangle, TrendingUp, Eye } from 'lucide-react';
import { MainLayout } from '@/components/MainLayout';
import { MonitoringCard } from '@/components/MonitoringCard';
import { StatusBadge } from '@/components/StatusBadge';
import { Progress } from '@/components/ui/progress';

interface EnvironmentData {
  zone: string;
  temperature: number;
  humidity: number;
  co2Level: number;
  o2Level: number;
  gasLeakDetected: boolean;
  airQualityIndex: number;
  noiseLevel: number;
  visibility: number;
  lastUpdate: string;
}

const mockEnvironmentData: EnvironmentData[] = [
  {
    zone: 'Zone A - Mining',
    temperature: 32.5,
    humidity: 78,
    co2Level: 520,
    o2Level: 19.2,
    gasLeakDetected: false,
    airQualityIndex: 85,
    noiseLevel: 92,
    visibility: 15,
    lastUpdate: '1 min ago'
  },
  {
    zone: 'Zone B - Processing',
    temperature: 28.8,
    humidity: 65,
    co2Level: 680,
    o2Level: 18.5,
    gasLeakDetected: true,
    airQualityIndex: 45,
    noiseLevel: 88,
    visibility: 25,
    lastUpdate: '30 sec ago'
  },
  {
    zone: 'Zone C - Storage',
    temperature: 24.2,
    humidity: 55,
    co2Level: 410,
    o2Level: 20.8,
    gasLeakDetected: false,
    airQualityIndex: 95,
    noiseLevel: 65,
    visibility: 50,
    lastUpdate: '2 min ago'
  },
  {
    zone: 'Zone D - Control Room',
    temperature: 22.0,
    humidity: 45,
    co2Level: 380,
    o2Level: 21.0,
    gasLeakDetected: false,
    airQualityIndex: 98,
    noiseLevel: 45,
    visibility: 100,
    lastUpdate: '1 min ago'
  }
];

interface GasReading {
  name: string;
  level: number;
  limit: number;
  unit: string;
  status: 'safe' | 'caution' | 'danger';
}

const mockGasReadings: GasReading[] = [
  { name: 'Methane (CH₄)', level: 0.8, limit: 5.0, unit: '%', status: 'safe' },
  { name: 'Carbon Monoxide (CO)', level: 15, limit: 50, unit: 'ppm', status: 'safe' },
  { name: 'Hydrogen Sulfide (H₂S)', level: 8, limit: 10, unit: 'ppm', status: 'caution' },
  { name: 'Ammonia (NH₃)', level: 25, limit: 25, unit: 'ppm', status: 'caution' },
  { name: 'Sulfur Dioxide (SO₂)', level: 12, limit: 5, unit: 'ppm', status: 'danger' }
];

export default function Environment() {
  const [selectedZone, setSelectedZone] = useState('Zone A - Mining');
  
  const getStatusFromValue = (value: number, thresholds: { safe: number; caution: number }) => {
    if (value >= thresholds.caution) return 'danger';
    if (value >= thresholds.safe) return 'caution';
    return 'safe';
  };

  const getAQIStatus = (aqi: number) => {
    if (aqi >= 80) return 'safe';
    if (aqi >= 50) return 'caution';
    return 'danger';
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-command font-bold text-foreground tracking-wide">
              GAS & ENVIRONMENT ANALYTICS
            </h1>
            <p className="text-muted-foreground mt-1">
              Real-time atmospheric monitoring and hazardous gas detection
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="px-3 py-2 bg-card border border-border rounded-md text-sm font-medium"
            >
              {mockEnvironmentData.map(zone => (
                <option key={zone.zone} value={zone.zone}>{zone.zone}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Environment Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockEnvironmentData.map((zone) => (
            <MonitoringCard
              key={zone.zone}
              title={zone.zone}
              status={zone.gasLeakDetected ? 'danger' : getAQIStatus(zone.airQualityIndex)}
              glowEffect={zone.gasLeakDetected}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Temperature</span>
                  </div>
                  <span className="font-command font-bold">{zone.temperature}°C</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Droplets className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Humidity</span>
                  </div>
                  <span className="font-command font-bold">{zone.humidity}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">CO₂ Level</span>
                  </div>
                  <span className={`font-command font-bold ${zone.co2Level > 500 ? 'text-gov-caution' : 'text-foreground'}`}>
                    {zone.co2Level} ppm
                  </span>
                </div>
                {zone.gasLeakDetected && (
                  <div className="pt-2 border-t border-border">
                    <StatusBadge status="danger" label="GAS LEAK DETECTED" />
                  </div>
                )}
              </div>
            </MonitoringCard>
          ))}
        </div>

        {/* Gas Detection Panel */}
        <MonitoringCard
          title="Hazardous Gas Detection System"
          className="col-span-full"
          status={mockGasReadings.some(g => g.status === 'danger') ? 'danger' : 'safe'}
          glowEffect={mockGasReadings.some(g => g.status === 'danger')}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {mockGasReadings.map((gas) => (
              <div key={gas.name} className="p-4 bg-card border border-border rounded-lg">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-command font-bold text-foreground">{gas.name}</h4>
                    <StatusBadge status={gas.status} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>Current</span>
                      <span className="font-bold">{gas.level} {gas.unit}</span>
                    </div>
                    <Progress 
                      value={(gas.level / gas.limit) * 100} 
                      className="h-2"
                    />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>0</span>
                      <span>Limit: {gas.limit} {gas.unit}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </MonitoringCard>

        {/* Detailed Zone Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MonitoringCard
            title={`Detailed Analysis - ${selectedZone}`}
          >
            {(() => {
              const zoneData = mockEnvironmentData.find(z => z.zone === selectedZone);
              if (!zoneData) return null;
              
              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Wind className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Air Quality Index</span>
                      </div>
                      <div className="text-2xl font-bold text-foreground">{zoneData.airQualityIndex}</div>
                      <StatusBadge status={getAQIStatus(zoneData.airQualityIndex)} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Visibility</span>
                      </div>
                      <div className="text-2xl font-bold text-foreground">{zoneData.visibility}m</div>
                      <StatusBadge status={zoneData.visibility < 20 ? 'danger' : 'safe'} />
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-border space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Oxygen Level</span>
                      <span className={`font-command font-bold ${zoneData.o2Level < 19.5 ? 'text-gov-danger' : 'text-gov-safe'}`}>
                        {zoneData.o2Level}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Noise Level</span>
                      <span className={`font-command font-bold ${zoneData.noiseLevel > 85 ? 'text-gov-caution' : 'text-foreground'}`}>
                        {zoneData.noiseLevel} dB
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Last updated: {zoneData.lastUpdate}
                    </div>
                  </div>
                </div>
              );
            })()}
          </MonitoringCard>

          <MonitoringCard
            title="Environmental Trends (24h)"
            icon={<TrendingUp className="h-5 w-5 text-gov-info" />}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Temperature Trend</span>
                  <span className="text-gov-safe text-sm font-bold">↓ 2.3°C</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">CO₂ Levels</span>
                  <span className="text-gov-caution text-sm font-bold">↑ 45 ppm</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Air Quality</span>
                  <span className="text-gov-safe text-sm font-bold">↑ 12 AQI</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>

              <div className="pt-2 border-t border-border">
                <div className="text-xs text-muted-foreground">
                  ↑ Improving • ↓ Deteriorating • → Stable
                </div>
              </div>
            </div>
          </MonitoringCard>
        </div>
      </div>
    </MainLayout>
  );
}