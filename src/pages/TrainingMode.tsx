import { MainLayout } from '@/components/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  Play, 
  CheckCircle, 
  Clock, 
  Users, 
  Target,
  Trophy,
  AlertTriangle,
  BookOpen,
  Video
} from 'lucide-react';

const mockTrainingModules = [
  {
    id: 'TM-001',
    title: 'Gas Leak Emergency Response',
    description: 'Learn proper evacuation procedures and emergency protocols',
    duration: '15 mins',
    type: 'Simulation',
    difficulty: 'Critical',
    completionRate: 87,
    lastAttempt: '2 days ago',
    status: 'completed',
    score: 92
  },
  {
    id: 'TM-002', 
    title: 'Tunnel Collapse Drill',
    description: 'Practice immediate response to structural emergencies',
    duration: '20 mins',
    type: 'VR Simulation',
    difficulty: 'Advanced',
    completionRate: 65,
    lastAttempt: 'Never',
    status: 'not-started',
    score: null
  },
  {
    id: 'TM-003',
    title: 'Equipment Safety Check',
    description: 'Daily safety equipment inspection procedures',
    duration: '10 mins', 
    type: 'Interactive',
    difficulty: 'Basic',
    completionRate: 95,
    lastAttempt: '1 week ago',
    status: 'in-progress',
    score: 78
  },
  {
    id: 'TM-004',
    title: 'First Aid & Medical Emergency',
    description: 'Basic medical response in underground environments',
    duration: '25 mins',
    type: 'Video + Quiz',
    difficulty: 'Intermediate',
    completionRate: 73,
    lastAttempt: '5 days ago',
    status: 'completed',
    score: 85
  }
];

const mockTrainingStats = [
  { label: 'Active Participants', value: '156', icon: Users },
  { label: 'Modules Completed', value: '89%', icon: CheckCircle },
  { label: 'Average Score', value: '82.5', icon: Target },
  { label: 'Certification Rate', value: '76%', icon: Trophy }
];

const upcomingDrills = [
  {
    title: 'Quarterly Safety Drill',
    date: '2024-01-15',
    time: '10:00 AM',
    participants: 45,
    type: 'Mandatory',
    location: 'Tunnel Sector A'
  },
  {
    title: 'Emergency Response Training',
    date: '2024-01-18',
    time: '2:00 PM', 
    participants: 32,
    type: 'Voluntary',
    location: 'Training Center'
  },
  {
    title: 'Equipment Familiarization',
    date: '2024-01-22',
    time: '9:00 AM',
    participants: 28,
    type: 'New Hires',
    location: 'Equipment Bay'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'safe';
    case 'in-progress': return 'caution'; 
    case 'not-started': return 'danger';
    default: return 'safe';
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Basic': return 'gov-safe';
    case 'Intermediate': return 'gov-caution';
    case 'Advanced': return 'gov-danger';
    case 'Critical': return 'gov-danger';
    default: return 'gov-info';
  }
};

export default function TrainingMode() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-command font-bold text-foreground tracking-wider">
              TRAINING & SIMULATION
            </h1>
            <p className="text-muted-foreground mt-2">
              Virtual drills and safety training modules for workforce preparedness
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <BookOpen className="h-4 w-4 mr-2" />
              TRAINING GUIDE
            </Button>
            <Button size="sm">
              <Play className="h-4 w-4 mr-2" />
              START DRILL
            </Button>
          </div>
        </div>

        {/* Training Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {mockTrainingStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label.toUpperCase()}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <Icon className="h-8 w-8 text-gov-info" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Training Modules */}
          <Card>
            <CardHeader>
              <CardTitle className="font-command tracking-wider">TRAINING MODULES</CardTitle>
              <CardDescription>Interactive safety training and simulation programs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTrainingModules.map((module) => (
                  <div key={module.id} className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-foreground">{module.title}</h3>
                          <Badge 
                            variant="outline" 
                            className={`text-xs text-${getDifficultyColor(module.difficulty)}`}
                          >
                            {module.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{module.description}</p>
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{module.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Video className="h-3 w-3" />
                            <span>{module.type}</span>
                          </div>
                          {module.score && (
                            <div className="flex items-center space-x-1">
                              <Target className="h-3 w-3" />
                              <span>Score: {module.score}%</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-24">
                              <Progress value={module.completionRate} className="h-2" />
                            </div>
                            <span className="text-xs text-muted-foreground">{module.completionRate}% completed</span>
                          </div>
                          <Badge variant={module.status === 'completed' ? 'default' : 'outline'}>
                            {module.status.replace('-', ' ').toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <Button size="sm" variant={module.status === 'completed' ? 'outline' : 'default'}>
                          {module.status === 'completed' ? 'REVIEW' : 
                           module.status === 'in-progress' ? 'CONTINUE' : 'START'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Drills */}
          <Card>
            <CardHeader>
              <CardTitle className="font-command tracking-wider">SCHEDULED DRILLS</CardTitle>
              <CardDescription>Upcoming safety drills and training sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDrills.map((drill, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-foreground">{drill.title}</h3>
                      <Badge variant={drill.type === 'Mandatory' ? 'destructive' : 'default'}>
                        {drill.type}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Date & Time</p>
                        <p className="font-medium text-foreground">{drill.date} at {drill.time}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Participants</p>
                        <p className="font-medium text-foreground">{drill.participants} workers</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-muted-foreground">Location</p>
                        <p className="font-medium text-foreground">{drill.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" className="flex-1">JOIN DRILL</Button>
                      <Button size="sm" variant="outline">DETAILS</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="font-command tracking-wider">TRAINING PERFORMANCE</CardTitle>
            <CardDescription>Individual and team training metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gov-safe mb-2">94%</div>
                <p className="text-sm text-muted-foreground">Safety Protocol Mastery</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gov-caution mb-2">7.2s</div>
                <p className="text-sm text-muted-foreground">Avg Emergency Response Time</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gov-info mb-2">156</div>
                <p className="text-sm text-muted-foreground">Certified Workers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}