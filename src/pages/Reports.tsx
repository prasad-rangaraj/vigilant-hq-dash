import { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, BarChart3, PieChart, Users, Shield } from 'lucide-react';
import { MainLayout } from '@/components/MainLayout';
import { MonitoringCard } from '@/components/MonitoringCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Report {
  id: string;
  title: string;
  type: 'compliance' | 'safety' | 'operational' | 'incident' | 'training';
  description: string;
  generatedDate: Date;
  period: string;
  status: 'ready' | 'generating' | 'scheduled';
  size: string;
  format: 'PDF' | 'CSV' | 'Excel';
}

const mockReports: Report[] = [
  {
    id: 'RPT001',
    title: 'Monthly Safety Compliance Report',
    type: 'compliance',
    description: 'Comprehensive safety compliance analysis including incident rates, training completion, and regulatory adherence.',
    generatedDate: new Date(),
    period: 'November 2024',
    status: 'ready',
    size: '2.4 MB',
    format: 'PDF'
  },
  {
    id: 'RPT002',
    title: 'Worker Health & Safety Analytics',
    type: 'safety',
    description: 'Detailed analysis of worker health metrics, incident patterns, and safety performance indicators.',
    generatedDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
    period: 'Last 30 Days',
    status: 'ready',
    size: '1.8 MB',
    format: 'Excel'
  },
  {
    id: 'RPT003',
    title: 'Environmental Monitoring Summary',
    type: 'operational',
    description: 'Gas levels, air quality, temperature and humidity trends across all operational zones.',
    generatedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    period: 'Weekly Report',
    status: 'ready',
    size: '945 KB',
    format: 'PDF'
  },
  {
    id: 'RPT004',
    title: 'Incident Investigation Report',
    type: 'incident',
    description: 'Detailed investigation findings for recent safety incidents with root cause analysis.',
    generatedDate: new Date(),
    period: 'Case #INC001-003',
    status: 'generating',
    size: 'Calculating...',
    format: 'PDF'
  },
  {
    id: 'RPT005',
    title: 'Training & Certification Status',
    type: 'training',
    description: 'Worker training completion rates, certification renewals, and skill assessments.',
    generatedDate: new Date(),
    period: 'Q4 2024',
    status: 'scheduled',
    size: 'Pending',
    format: 'Excel'
  }
];

interface ComplianceMetric {
  category: string;
  compliance: number;
  target: number;
  status: 'compliant' | 'warning' | 'non-compliant';
  lastAudit: string;
}

const mockCompliance: ComplianceMetric[] = [
  {
    category: 'OSHA Safety Standards',
    compliance: 96,
    target: 95,
    status: 'compliant',
    lastAudit: '15 Nov 2024'
  },
  {
    category: 'Environmental Regulations',
    compliance: 89,
    target: 90,
    status: 'warning',
    lastAudit: '10 Nov 2024'
  },
  {
    category: 'Worker Training Requirements',
    compliance: 94,
    target: 95,
    status: 'warning',
    lastAudit: '12 Nov 2024'
  },
  {
    category: 'Equipment Maintenance',
    compliance: 98,
    target: 95,
    status: 'compliant',
    lastAudit: '18 Nov 2024'
  }
];

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedType, setSelectedType] = useState('all');

  const filteredReports = mockReports.filter(report => 
    selectedType === 'all' || report.type === selectedType
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'safe';
      case 'generating': return 'caution';
      case 'scheduled': return 'safe';
      default: return 'safe';
    }
  };

  const getComplianceStatus = (compliance: number, target: number) => {
    if (compliance >= target) return 'compliant';
    if (compliance >= target - 5) return 'warning';
    return 'non-compliant';
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-command font-bold text-foreground tracking-wide">
              REPORTS & COMPLIANCE CENTER
            </h1>
            <p className="text-muted-foreground mt-1">
              Automated report generation and regulatory compliance monitoring
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 bg-card border border-border rounded-md text-sm font-medium"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 bg-card border border-border rounded-md text-sm font-medium"
            >
              <option value="all">All Types</option>
              <option value="compliance">Compliance</option>
              <option value="safety">Safety</option>
              <option value="operational">Operational</option>
              <option value="incident">Incident</option>
              <option value="training">Training</option>
            </select>
          </div>
        </div>

        {/* Report Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MonitoringCard
            title="Reports Generated"
            value="247"
            subtitle="This month"
            status="safe"
            icon={<FileText className="h-5 w-5 text-gov-info" />}
          />
          
          <MonitoringCard
            title="Compliance Score"
            value="94.3%"
            subtitle="Above industry standard"
            status="safe"
            icon={<Shield className="h-5 w-5 text-gov-safe" />}
          />
          
          <MonitoringCard
            title="Auto Reports"
            value="28"
            subtitle="Scheduled this week"
            status="safe"
            icon={<Calendar className="h-5 w-5 text-gov-info" />}
          />
          
          <MonitoringCard
            title="Data Analysis"
            value="1.2TB"
            subtitle="Processed monthly"
            status="safe"
            icon={<BarChart3 className="h-5 w-5 text-gov-info" />}
          />
        </div>

        {/* Available Reports */}
        <MonitoringCard
          title="Available Reports"
          subtitle="Click to download or view details"
        >
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <div key={report.id} className="p-4 bg-card border border-border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-command font-bold ${
                        report.type === 'compliance' ? 'bg-gov-info/20 text-gov-info' :
                        report.type === 'safety' ? 'bg-gov-safe/20 text-gov-safe' :
                        report.type === 'incident' ? 'bg-gov-danger/20 text-gov-danger' :
                        'bg-accent text-accent-foreground'
                      }`}>
                        {report.type.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-command font-bold ${
                        report.status === 'ready' ? 'bg-gov-safe/20 text-gov-safe' :
                        report.status === 'generating' ? 'bg-gov-caution/20 text-gov-caution' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {report.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <h4 className="font-command font-bold text-foreground text-lg mb-1">
                      {report.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {report.description}
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-muted-foreground">Period:</span>
                        <div className="font-command font-bold">{report.period}</div>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">Format:</span>
                        <div className="font-command font-bold">{report.format}</div>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">Size:</span>
                        <div className="font-command font-bold">{report.size}</div>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">Generated:</span>
                        <div className="font-command font-bold">
                          {report.generatedDate.toLocaleDateString('en-IN')}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4 space-y-2">
                    {report.status === 'ready' && (
                      <>
                        <Button size="sm" className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          <FileText className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                      </>
                    )}
                    {report.status === 'generating' && (
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-2">Generating...</div>
                        <Progress value={65} className="w-24" />
                      </div>
                    )}
                    {report.status === 'scheduled' && (
                      <Button size="sm" variant="outline" className="w-full">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </MonitoringCard>

        {/* Compliance Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MonitoringCard
            title="Regulatory Compliance Status"
            icon={<Shield className="h-5 w-5 text-gov-info" />}
          >
            <div className="space-y-4">
              {mockCompliance.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.category}</span>
                    <span className={`text-sm font-command font-bold ${
                      item.status === 'compliant' ? 'text-gov-safe' :
                      item.status === 'warning' ? 'text-gov-caution' :
                      'text-gov-danger'
                    }`}>
                      {item.compliance}%
                    </span>
                  </div>
                  <Progress value={item.compliance} className="h-2" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Target: {item.target}%</span>
                    <span>Last audit: {item.lastAudit}</span>
                  </div>
                </div>
              ))}
            </div>
          </MonitoringCard>

          <MonitoringCard
            title="Report Analytics"
            icon={<TrendingUp className="h-5 w-5 text-gov-info" />}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-card border border-border rounded">
                  <PieChart className="h-8 w-8 mx-auto mb-2 text-gov-info" />
                  <div className="text-lg font-command font-bold">87%</div>
                  <div className="text-xs text-muted-foreground">Automation Rate</div>
                </div>
                <div className="text-center p-3 bg-card border border-border rounded">
                  <Users className="h-8 w-8 mx-auto mb-2 text-gov-safe" />
                  <div className="text-lg font-command font-bold">23</div>
                  <div className="text-xs text-muted-foreground">Active Subscribers</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Weekly Reports</span>
                  <span className="font-command font-bold">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Monthly Reports</span>
                  <span className="font-command font-bold">8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>On-Demand Reports</span>
                  <span className="font-command font-bold">156</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Compliance Reports</span>
                  <span className="font-command font-bold">24</span>
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <Button className="w-full" variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Custom Report
                </Button>
              </div>
            </div>
          </MonitoringCard>
        </div>
      </div>
    </MainLayout>
  );
}