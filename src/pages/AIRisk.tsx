import { useState } from 'react';
import { Brain, TrendingUp, AlertTriangle, Users, Clock, Target, Zap } from 'lucide-react';
import { MainLayout } from '@/components/MainLayout';
import { MonitoringCard } from '@/components/MonitoringCard';
import { StatusBadge } from '@/components/StatusBadge';
import { Progress } from '@/components/ui/progress';

interface RiskPrediction {
  workerId: string;
  workerName: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  riskScore: number;
  riskFactors: string[];
  predictedIncident: string;
  timeToIncident: string;
  confidence: number;
}

const mockRiskPredictions: RiskPrediction[] = [
  {
    workerId: 'EMP003',
    workerName: 'Mohammed Ali Khan',
    riskLevel: 'critical',
    riskScore: 92,
    riskFactors: ['Elevated heart rate', 'High temperature exposure', 'Fatigue indicators'],
    predictedIncident: 'Heat exhaustion',
    timeToIncident: '15-30 minutes',
    confidence: 87
  },
  {
    workerId: 'EMP002',
    workerName: 'Priya Sharma',
    riskLevel: 'high',
    riskScore: 78,
    riskFactors: ['Low battery device', 'Irregular movement patterns', 'Zone B gas exposure'],
    predictedIncident: 'Equipment failure risk',
    timeToIncident: '45-60 minutes',
    confidence: 73
  },
  {
    workerId: 'EMP007',
    workerName: 'Ravi Kumar',
    riskLevel: 'medium',
    riskScore: 65,
    riskFactors: ['Extended shift hours', 'Slight deviation from safety protocols'],
    predictedIncident: 'Fatigue-related incident',
    timeToIncident: '2-3 hours',
    confidence: 68
  },
  {
    workerId: 'EMP009',
    workerName: 'Sunita Devi',
    riskLevel: 'low',
    riskScore: 32,
    riskFactors: ['Normal vitals', 'Proper equipment usage'],
    predictedIncident: 'No significant risk',
    timeToIncident: 'N/A',
    confidence: 94
  }
];

interface AIInsight {
  category: string;
  insight: string;
  impact: string;
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
}

const mockAIInsights: AIInsight[] = [
  {
    category: 'Fatigue Pattern Analysis',
    insight: 'Workers in Zone A show 23% higher fatigue levels after 6 hours',
    impact: 'Increased accident probability by 34%',
    recommendation: 'Implement mandatory 15-min breaks every 3 hours in Zone A',
    priority: 'high'
  },
  {
    category: 'Environmental Correlation',
    insight: 'Gas leak incidents correlate with humidity levels above 75%',
    impact: 'Detection time increased by 12 seconds',
    recommendation: 'Deploy additional sensors in high-humidity zones',
    priority: 'high'
  },
  {
    category: 'Equipment Performance',
    insight: 'Wearable devices show battery degradation in Zone B',
    impact: 'Monitoring gaps of 5-8 minutes observed',
    recommendation: 'Upgrade battery technology for harsh environments',
    priority: 'medium'
  }
];

export default function AIRisk() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  
  const getRiskStatusColor = (level: string) => {
    switch (level) {
      case 'critical': return 'danger';
      case 'high': return 'caution';
      case 'medium': return 'caution';
      case 'low': return 'safe';
      default: return 'safe';
    }
  };

  const criticalRisks = mockRiskPredictions.filter(p => p.riskLevel === 'critical').length;
  const highRisks = mockRiskPredictions.filter(p => p.riskLevel === 'high').length;

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-command font-bold text-foreground tracking-wide">
              AI RISK & PREDICTION CENTER
            </h1>
            <p className="text-muted-foreground mt-1">
              Advanced machine learning algorithms for predictive safety analysis
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-3 py-2 bg-card border border-border rounded-md text-sm font-medium"
            >
              <option value="1h">Last 1 Hour</option>
              <option value="6h">Last 6 Hours</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
            </select>
          </div>
        </div>

        {/* AI Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MonitoringCard
            title="AI Model Accuracy"
            value="94.7%"
            subtitle="Prediction reliability"
            status="safe"
            icon={<Brain className="h-5 w-5 text-gov-info" />}
            glowEffect={true}
          />
          
          <MonitoringCard
            title="Critical Risks"
            value={criticalRisks}
            subtitle="Immediate attention required"
            status="danger"
            icon={<AlertTriangle className="h-5 w-5 text-gov-danger" />}
            glowEffect={criticalRisks > 0}
          />
          
          <MonitoringCard
            title="High Risk Workers"
            value={highRisks + criticalRisks}
            subtitle="Enhanced monitoring active"
            status={highRisks + criticalRisks > 2 ? 'caution' : 'safe'}
            icon={<Users className="h-5 w-5 text-gov-caution" />}
            glowEffect={highRisks + criticalRisks > 2}
          />
          
          <MonitoringCard
            title="Incidents Prevented"
            value="12"
            subtitle="This month"
            status="safe"
            icon={<Target className="h-5 w-5 text-gov-safe" />}
          />
        </div>

        {/* Risk Predictions */}
        <MonitoringCard
          title="Real-time Risk Predictions"
          className="col-span-full"
          icon={<Zap className="h-5 w-5 text-gov-caution" />}
          status={criticalRisks > 0 ? 'danger' : 'safe'}
          glowEffect={criticalRisks > 0}
        >
          <div className="space-y-4">
            {mockRiskPredictions.map((prediction) => (
              <div 
                key={prediction.workerId}
                className={`p-4 rounded-lg border ${
                  prediction.riskLevel === 'critical' 
                    ? 'bg-gov-danger/10 border-gov-danger/30' 
                    : prediction.riskLevel === 'high'
                    ? 'bg-gov-caution/10 border-gov-caution/30'
                    : 'bg-card border-border'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-command font-bold text-foreground">
                      {prediction.workerName} ({prediction.workerId})
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {prediction.predictedIncident}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <StatusBadge 
                      status={getRiskStatusColor(prediction.riskLevel) as 'safe' | 'caution' | 'danger'} 
                      label={prediction.riskLevel.toUpperCase()}
                    />
                    <div className="text-sm font-command font-bold">
                      Score: {prediction.riskScore}%
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="text-xs font-command font-bold text-muted-foreground uppercase mb-2">
                      Risk Factors
                    </h5>
                    <ul className="text-sm space-y-1">
                      {prediction.riskFactors.map((factor, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 bg-current rounded-full opacity-60" />
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-xs font-command font-bold text-muted-foreground uppercase mb-2">
                      Time to Incident
                    </h5>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{prediction.timeToIncident}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-xs font-command font-bold text-muted-foreground uppercase mb-2">
                      Confidence Level
                    </h5>
                    <div className="space-y-2">
                      <Progress value={prediction.confidence} className="h-2" />
                      <span className="text-sm font-medium">{prediction.confidence}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </MonitoringCard>

        {/* AI Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MonitoringCard
            title="AI-Powered Insights"
            icon={<TrendingUp className="h-5 w-5 text-gov-info" />}
          >
            <div className="space-y-4">
              {mockAIInsights.map((insight, index) => (
                <div key={index} className="p-3 bg-card border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-command font-bold text-sm text-foreground">
                      {insight.category}
                    </h4>
                    <StatusBadge 
                      status={insight.priority === 'high' ? 'danger' : insight.priority === 'medium' ? 'caution' : 'safe'}
                      label={insight.priority.toUpperCase()}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{insight.insight}</p>
                  <p className="text-xs text-gov-caution mb-2">
                    <span className="font-medium">Impact:</span> {insight.impact}
                  </p>
                  <p className="text-xs text-gov-safe">
                    <span className="font-medium">Recommendation:</span> {insight.recommendation}
                  </p>
                </div>
              ))}
            </div>
          </MonitoringCard>

          <MonitoringCard
            title="Model Performance Metrics"
            icon={<Brain className="h-5 w-5 text-gov-info" />}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Prediction Accuracy</span>
                  <span className="font-command font-bold text-gov-safe">94.7%</span>
                </div>
                <Progress value={94.7} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">False Positive Rate</span>
                  <span className="font-command font-bold text-gov-caution">3.2%</span>
                </div>
                <Progress value={3.2} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Response Time</span>
                  <span className="font-command font-bold text-gov-safe">1.3s</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Model Confidence</span>
                  <span className="font-command font-bold text-gov-safe">87.4%</span>
                </div>
                <Progress value={87.4} className="h-2" />
              </div>

              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Model last retrained: 2 hours ago
                </p>
                <p className="text-xs text-muted-foreground">
                  Training dataset: 50,000+ incidents
                </p>
              </div>
            </div>
          </MonitoringCard>
        </div>
      </div>
    </MainLayout>
  );
}