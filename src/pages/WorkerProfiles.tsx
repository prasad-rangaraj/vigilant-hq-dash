import { useState } from 'react';
import { User, Search, Phone, Mail, MapPin, Calendar, Award, AlertTriangle, Heart, Shield } from 'lucide-react';
import { MainLayout } from '@/components/MainLayout';
import { MonitoringCard } from '@/components/MonitoringCard';
import { StatusBadge } from '@/components/StatusBadge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface WorkerProfile {
  id: string;
  name: string;
  employeeId: string;
  role: string;
  department: string;
  zone: string;
  profileImage: string;
  contactInfo: {
    phone: string;
    email: string;
    emergencyContact: string;
    address: string;
  };
  medicalInfo: {
    bloodType: string;
    allergies: string[];
    medications: string[];
    lastCheckup: Date;
    fitnessLevel: 'excellent' | 'good' | 'fair' | 'poor';
  };
  safetyRecord: {
    incidentCount: number;
    lastIncident: Date | null;
    trainingCompleted: number;
    certificationsExpiring: number;
    safetyScore: number;
  };
  deviceInfo: {
    deviceId: string;
    batteryLevel: number;
    lastSync: Date;
    wearTime: number; // hours per day
  };
  status: 'active' | 'inactive' | 'leave' | 'training';
  joinDate: Date;
}

const mockProfiles: WorkerProfile[] = [
  {
    id: 'EMP001',
    name: 'Rajesh Kumar Singh',
    employeeId: 'EMP001',
    role: 'Senior Mining Engineer',
    department: 'Operations',
    zone: 'Zone A - Mining',
    profileImage: '/api/placeholder/64/64',
    contactInfo: {
      phone: '+91 98765 43210',
      email: 'rajesh.kumar@company.com',
      emergencyContact: '+91 98765 43211 (Wife - Sunita Singh)',
      address: 'B-204, Sector 15, New Delhi'
    },
    medicalInfo: {
      bloodType: 'B+',
      allergies: ['Dust', 'Pollen'],
      medications: ['Inhaler (Asthma)'],
      lastCheckup: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      fitnessLevel: 'good'
    },
    safetyRecord: {
      incidentCount: 0,
      lastIncident: null,
      trainingCompleted: 12,
      certificationsExpiring: 1,
      safetyScore: 95
    },
    deviceInfo: {
      deviceId: 'WSDEV001',
      batteryLevel: 85,
      lastSync: new Date(Date.now() - 5 * 60 * 1000),
      wearTime: 8.5
    },
    status: 'active',
    joinDate: new Date(Date.now() - 3 * 365 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'EMP002',
    name: 'Priya Sharma',
    employeeId: 'EMP002',
    role: 'Safety Inspector',
    department: 'Safety & Compliance',
    zone: 'Zone B - Processing',
    profileImage: '/api/placeholder/64/64',
    contactInfo: {
      phone: '+91 98765 43220',
      email: 'priya.sharma@company.com',
      emergencyContact: '+91 98765 43221 (Father - Mr. R.K. Sharma)',
      address: 'A-301, Model Town, Delhi'
    },
    medicalInfo: {
      bloodType: 'O+',
      allergies: [],
      medications: [],
      lastCheckup: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      fitnessLevel: 'excellent'
    },
    safetyRecord: {
      incidentCount: 1,
      lastIncident: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
      trainingCompleted: 15,
      certificationsExpiring: 0,
      safetyScore: 88
    },
    deviceInfo: {
      deviceId: 'WSDEV002',
      batteryLevel: 45,
      lastSync: new Date(Date.now() - 2 * 60 * 1000),
      wearTime: 9.2
    },
    status: 'active',
    joinDate: new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'EMP003',
    name: 'Mohammed Ali Khan',
    employeeId: 'EMP003',
    role: 'Equipment Operator',
    department: 'Operations',
    zone: 'Zone A - Mining',
    profileImage: '/api/placeholder/64/64',
    contactInfo: {
      phone: '+91 98765 43230',
      email: 'mohammed.ali@company.com',
      emergencyContact: '+91 98765 43231 (Brother - Ahmad Khan)',
      address: 'C-15, Jamia Nagar, New Delhi'
    },
    medicalInfo: {
      bloodType: 'A+',
      allergies: ['Shellfish'],
      medications: ['Blood Pressure Medication'],
      lastCheckup: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      fitnessLevel: 'fair'
    },
    safetyRecord: {
      incidentCount: 2,
      lastIncident: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      trainingCompleted: 8,
      certificationsExpiring: 2,
      safetyScore: 72
    },
    deviceInfo: {
      deviceId: 'WSDEV003',
      batteryLevel: 20,
      lastSync: new Date(Date.now() - 1 * 60 * 1000),
      wearTime: 8.8
    },
    status: 'active',
    joinDate: new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000)
  }
];

export default function WorkerProfiles() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWorker, setSelectedWorker] = useState<WorkerProfile | null>(null);

  const filteredProfiles = mockProfiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFitnessColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'safe';
      case 'good': return 'safe';
      case 'fair': return 'caution';
      case 'poor': return 'danger';
      default: return 'safe';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'safe';
      case 'inactive': return 'danger';
      case 'leave': return 'caution';
      case 'training': return 'safe';
      default: return 'safe';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-command font-bold text-foreground tracking-wide">
              WORKER PROFILES & MEDICAL RECORDS
            </h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive worker information and health management system
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
            <Button className="bg-gov-info hover:bg-gov-info/90">
              <User className="h-4 w-4 mr-2" />
              Add Worker
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Worker List */}
          <div className="lg:col-span-1">
            <MonitoringCard title="Worker Directory">
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {filteredProfiles.map((profile) => (
                  <div
                    key={profile.id}
                    onClick={() => setSelectedWorker(profile)}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedWorker?.id === profile.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-accent/50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-accent-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-command font-bold text-sm text-foreground truncate">
                            {profile.name}
                          </h4>
                          <StatusBadge 
                            status={getStatusColor(profile.status) as 'safe' | 'caution' | 'danger'}
                            label={profile.status.toUpperCase()}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {profile.employeeId} • {profile.role}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {profile.zone}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </MonitoringCard>
          </div>

          {/* Worker Details */}
          <div className="lg:col-span-2 space-y-6">
            {selectedWorker ? (
              <>
                {/* Profile Header */}
                <MonitoringCard title="Worker Profile">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-accent-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h2 className="text-xl font-command font-bold text-foreground">
                            {selectedWorker.name}
                          </h2>
                          <StatusBadge 
                            status={getStatusColor(selectedWorker.status) as 'safe' | 'caution' | 'danger'}
                            label={selectedWorker.status.toUpperCase()}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-muted-foreground">Employee ID:</span>
                            <div className="font-command font-bold">{selectedWorker.employeeId}</div>
                          </div>
                          <div>
                            <span className="font-medium text-muted-foreground">Role:</span>
                            <div className="font-command font-bold">{selectedWorker.role}</div>
                          </div>
                          <div>
                            <span className="font-medium text-muted-foreground">Department:</span>
                            <div className="font-command font-bold">{selectedWorker.department}</div>
                          </div>
                          <div>
                            <span className="font-medium text-muted-foreground">Join Date:</span>
                            <div className="font-command font-bold">{formatDate(selectedWorker.joinDate)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </MonitoringCard>

                {/* Contact & Medical Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <MonitoringCard
                    title="Contact Information"
                    icon={<Phone className="h-5 w-5 text-gov-info" />}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">Phone</div>
                          <div className="text-sm text-foreground font-command">{selectedWorker.contactInfo.phone}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">Email</div>
                          <div className="text-sm text-foreground font-command">{selectedWorker.contactInfo.email}</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="h-4 w-4 text-gov-danger mt-1" />
                        <div>
                          <div className="text-sm font-medium">Emergency Contact</div>
                          <div className="text-sm text-foreground font-command">{selectedWorker.contactInfo.emergencyContact}</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                        <div>
                          <div className="text-sm font-medium">Address</div>
                          <div className="text-sm text-foreground">{selectedWorker.contactInfo.address}</div>
                        </div>
                      </div>
                    </div>
                  </MonitoringCard>

                  <MonitoringCard
                    title="Medical Information"
                    icon={<Heart className="h-5 w-5 text-gov-danger" />}
                    status={selectedWorker.medicalInfo.fitnessLevel === 'poor' ? 'danger' : 'safe'}
                  >
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">Blood Type</div>
                          <div className="text-lg font-command font-bold text-gov-danger">{selectedWorker.medicalInfo.bloodType}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">Fitness Level</div>
                          <StatusBadge 
                            status={getFitnessColor(selectedWorker.medicalInfo.fitnessLevel) as 'safe' | 'caution' | 'danger'}
                            label={selectedWorker.medicalInfo.fitnessLevel.toUpperCase()}
                          />
                        </div>
                      </div>
                      
                      {selectedWorker.medicalInfo.allergies.length > 0 && (
                        <div>
                          <div className="text-sm font-medium text-muted-foreground mb-1">Allergies</div>
                          <div className="text-sm text-gov-caution">
                            {selectedWorker.medicalInfo.allergies.join(', ')}
                          </div>
                        </div>
                      )}
                      
                      {selectedWorker.medicalInfo.medications.length > 0 && (
                        <div>
                          <div className="text-sm font-medium text-muted-foreground mb-1">Current Medications</div>
                          <div className="text-sm text-foreground">
                            {selectedWorker.medicalInfo.medications.join(', ')}
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Last Checkup</div>
                        <div className="text-sm text-foreground font-command">
                          {formatDate(selectedWorker.medicalInfo.lastCheckup)}
                        </div>
                      </div>
                    </div>
                  </MonitoringCard>
                </div>

                {/* Safety Record & Device Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <MonitoringCard
                    title="Safety Record"
                    icon={<Shield className="h-5 w-5 text-gov-safe" />}
                    status={selectedWorker.safetyRecord.safetyScore >= 90 ? 'safe' : selectedWorker.safetyRecord.safetyScore >= 70 ? 'caution' : 'danger'}
                  >
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-command font-bold text-foreground mb-1">
                          {selectedWorker.safetyRecord.safetyScore}%
                        </div>
                        <div className="text-sm text-muted-foreground">Safety Score</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-muted-foreground">Incidents</div>
                          <div className="text-lg font-command font-bold text-foreground">
                            {selectedWorker.safetyRecord.incidentCount}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground">Training</div>
                          <div className="text-lg font-command font-bold text-foreground">
                            {selectedWorker.safetyRecord.trainingCompleted}
                          </div>
                        </div>
                      </div>
                      
                      {selectedWorker.safetyRecord.certificationsExpiring > 0 && (
                        <div className="p-2 bg-gov-caution/10 border border-gov-caution/30 rounded">
                          <div className="text-sm font-medium text-gov-caution">
                            {selectedWorker.safetyRecord.certificationsExpiring} certification(s) expiring soon
                          </div>
                        </div>
                      )}
                    </div>
                  </MonitoringCard>

                  <MonitoringCard
                    title="Wearable Device Status"
                    icon={<Calendar className="h-5 w-5 text-gov-info" />}
                    status={selectedWorker.deviceInfo.batteryLevel < 30 ? 'caution' : 'safe'}
                  >
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">Device ID</div>
                          <div className="font-command font-bold text-foreground">{selectedWorker.deviceInfo.deviceId}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">Battery</div>
                          <div className={`font-command font-bold ${
                            selectedWorker.deviceInfo.batteryLevel < 30 ? 'text-gov-caution' : 'text-foreground'
                          }`}>
                            {selectedWorker.deviceInfo.batteryLevel}%
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Daily Wear Time</div>
                        <div className="font-command font-bold text-foreground">
                          {selectedWorker.deviceInfo.wearTime} hours
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Last Sync</div>
                        <div className="text-sm text-foreground">
                          {selectedWorker.deviceInfo.lastSync.toLocaleTimeString('en-IN')}
                        </div>
                      </div>
                    </div>
                  </MonitoringCard>
                </div>
              </>
            ) : (
              <MonitoringCard title="Select a Worker">
                <div className="text-center py-12">
                  <User className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Select a worker from the directory to view detailed profile information
                  </p>
                </div>
              </MonitoringCard>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}