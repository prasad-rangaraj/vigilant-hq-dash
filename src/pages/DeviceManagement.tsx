import { MainLayout } from '@/components/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  Battery, 
  Wifi, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  Settings,
  MapPin,
  Clock
} from 'lucide-react';

const mockDevices = [
  {
    id: 'WSM-001',
    type: 'Wearable Safety Monitor',
    workerId: 'W-2024-001',
    workerName: 'Rajesh Kumar',
    status: 'online',
    battery: 87,
    signal: 95,
    location: 'Tunnel Section A',
    lastSync: '2 mins ago',
    firmware: '2.1.4',
    temperature: 36.8,
    heartRate: 78
  },
  {
    id: 'WSM-002',
    type: 'Wearable Safety Monitor',
    workerId: 'W-2024-002',
    workerName: 'Priya Singh',
    status: 'low-battery',
    battery: 15,
    signal: 88,
    location: 'Surface Station',
    lastSync: '5 mins ago',
    firmware: '2.1.4',
    temperature: 37.2,
    heartRate: 85
  },
  {
    id: 'GSM-003',
    type: 'Gas Sensor Module',
    location: 'Tunnel Section B',
    status: 'critical',
    battery: 45,
    signal: 67,
    lastSync: '1 min ago',
    firmware: '1.8.2',
    co2Level: 1200,
    methaneLevel: 45
  },
  {
    id: 'WSM-004',
    type: 'Wearable Safety Monitor',
    workerId: 'W-2024-003',
    workerName: 'Amit Patel',
    status: 'offline',
    battery: 0,
    signal: 0,
    location: 'Unknown',
    lastSync: '2 hours ago',
    firmware: '2.0.8',
    temperature: null,
    heartRate: null
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'online': return 'safe';
    case 'low-battery': return 'caution';
    case 'critical': return 'danger';
    case 'offline': return 'danger';
    default: return 'safe';
  }
};

export default function DeviceManagement() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-command font-bold text-foreground tracking-wider">
              DEVICE MANAGEMENT
            </h1>
            <p className="text-muted-foreground mt-2">
              Monitor and manage all connected safety devices
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              SYNC ALL
            </Button>
            <Button size="sm">
              <Settings className="h-4 w-4 mr-2" />
              CONFIGURE
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">TOTAL DEVICES</p>
                  <p className="text-2xl font-bold text-foreground">124</p>
                </div>
                <Smartphone className="h-8 w-8 text-gov-info" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ONLINE</p>
                  <p className="text-2xl font-bold text-gov-safe">98</p>
                </div>
                <CheckCircle className="h-8 w-8 text-gov-safe" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">LOW BATTERY</p>
                  <p className="text-2xl font-bold text-gov-caution">12</p>
                </div>
                <Battery className="h-8 w-8 text-gov-caution" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">OFFLINE</p>
                  <p className="text-2xl font-bold text-gov-danger">14</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-gov-danger" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Device List */}
        <Card>
          <CardHeader>
            <CardTitle className="font-command tracking-wider">CONNECTED DEVICES</CardTitle>
            <CardDescription>Real-time status of all safety monitoring devices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockDevices.map((device) => (
                <div key={device.id} className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Smartphone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">{device.id}</p>
                          <p className="text-sm text-muted-foreground">{device.type}</p>
                        </div>
                      </div>
                      
                      <StatusBadge status={getStatusColor(device.status)} />
                      
                      {device.workerName && (
                        <div>
                          <p className="text-sm font-medium text-foreground">{device.workerName}</p>
                          <p className="text-xs text-muted-foreground">{device.workerId}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-6">
                      {/* Battery */}
                      <div className="flex items-center space-x-2">
                        <Battery className={`h-4 w-4 ${
                          device.battery > 50 ? 'text-gov-safe' : 
                          device.battery > 20 ? 'text-gov-caution' : 'text-gov-danger'
                        }`} />
                        <div className="w-24">
                          <Progress value={device.battery} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">{device.battery}%</p>
                        </div>
                      </div>

                      {/* Signal */}
                      <div className="flex items-center space-x-2">
                        <Wifi className={`h-4 w-4 ${
                          device.signal > 70 ? 'text-gov-safe' : 
                          device.signal > 40 ? 'text-gov-caution' : 'text-gov-danger'
                        }`} />
                        <span className="text-sm text-muted-foreground">{device.signal}%</span>
                      </div>

                      {/* Location */}
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{device.location}</span>
                      </div>

                      {/* Last Sync */}
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{device.lastSync}</span>
                      </div>

                      {/* Firmware */}
                      <Badge variant="outline" className="text-xs">
                        v{device.firmware}
                      </Badge>

                      <Button variant="outline" size="sm">
                        MANAGE
                      </Button>
                    </div>
                  </div>

                  {/* Additional metrics for wearable devices */}
                  {device.type === 'Wearable Safety Monitor' && device.temperature && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="flex space-x-6">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Body Temp: </span>
                          <span className="font-medium text-foreground">{device.temperature}°C</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Heart Rate: </span>
                          <span className="font-medium text-foreground">{device.heartRate} BPM</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Additional metrics for gas sensors */}
                  {device.type === 'Gas Sensor Module' && device.co2Level && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="flex space-x-6">
                        <div className="text-sm">
                          <span className="text-muted-foreground">CO₂: </span>
                          <span className="font-medium text-foreground">{device.co2Level} ppm</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">CH₄: </span>
                          <span className="font-medium text-foreground">{device.methaneLevel} %LEL</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}