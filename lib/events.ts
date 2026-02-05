import { Event, EventType, Severity, Service, ServiceStatus } from '@/types';

const eventTitles: Record<EventType, string[]> = {
  deployment: [
    'Deployment initiated',
    'Build completed',
    'Container deployed',
    'Service restarted',
    'Version rollout started'
  ],
  incident: [
    'Database connection timeout',
    'High error rate detected',
    'Service degradation',
    'API timeout increased',
    'Memory leak detected'
  ],
  metric: [
    'CPU usage spike',
    'Memory threshold exceeded',
    'Request rate increased',
    'Response time degraded',
    'Disk usage warning'
  ],
  alert: [
    'SSL certificate expiring soon',
    'Backup failed',
    'Security scan completed',
    'Rate limit exceeded',
    'Unusual traffic pattern'
  ],
  system: [
    'Auto-scaling triggered',
    'Cache cleared',
    'Configuration updated',
    'Backup completed',
    'Health check passed'
  ],
  api_call: [
    'Payment processed',
    'User authentication',
    'Data sync completed',
    'Email notification sent',
    'Webhook delivered'
  ]
};

const services = [
  'API Gateway',
  'Auth Service',
  'Database',
  'Cache Layer',
  'Message Queue',
  'CDN',
  'Storage',
  'Analytics'
];

function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateEventId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function generateRandomEvent(): Event {
  const type = randomItem<EventType>([
    'deployment',
    'incident',
    'metric',
    'alert',
    'system',
    'api_call'
  ]);
  
  const severityMap: Record<EventType, Severity[]> = {
    deployment: ['info', 'success'],
    incident: ['warning', 'error'],
    metric: ['info', 'warning'],
    alert: ['warning', 'error'],
    system: ['info', 'success'],
    api_call: ['info', 'success']
  };

  const severity = randomItem(severityMap[type]);
  const title = randomItem(eventTitles[type]);
  const service = randomItem(services);

  return {
    id: generateEventId(),
    type,
    severity,
    title,
    description: generateDescription(type, title),
    timestamp: new Date(),
    service,
    metadata: generateMetadata(type)
  };
}

function generateDescription(type: EventType, title: string): string {
  const descriptions: Record<EventType, string> = {
    deployment: `${title} on production environment`,
    incident: `${title} - investigating root cause`,
    metric: `${title} - current value exceeds threshold`,
    alert: `${title} - immediate attention required`,
    system: `${title} - operation completed successfully`,
    api_call: `${title} - request processed`
  };

  return descriptions[type];
}

function generateMetadata(type: EventType): Record<string, any> {
  const baseMetadata = {
    source: randomItem(['production', 'staging', 'development']),
    region: randomItem(['us-east-1', 'eu-west-1', 'ap-southeast-1'])
  };

  const typeSpecificMetadata: Record<EventType, Record<string, any>> = {
    deployment: {
      version: `v${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 20)}.${Math.floor(Math.random() * 100)}`,
      duration: `${Math.floor(Math.random() * 300)}s`
    },
    incident: {
      errorCount: Math.floor(Math.random() * 1000),
      affectedUsers: Math.floor(Math.random() * 500)
    },
    metric: {
      value: Math.floor(Math.random() * 100),
      threshold: 75
    },
    alert: {
      priority: randomItem(['low', 'medium', 'high', 'critical'])
    },
    system: {
      duration: `${Math.floor(Math.random() * 60)}s`
    },
    api_call: {
      statusCode: randomItem([200, 201, 204]),
      duration: `${Math.floor(Math.random() * 500)}ms`
    }
  };

  return {
    ...baseMetadata,
    ...typeSpecificMetadata[type]
  };
}

export function generateInitialServices(): Service[] {
  return services.map((name, index) => ({
    id: `svc_${index}`,
    name,
    status: randomItem<ServiceStatus>(['online', 'online', 'online', 'degraded']),
    uptime: 95 + Math.random() * 4.9,
    latency: Math.floor(Math.random() * 200) + 50,
    recentEvents: []
  }));
}

export function updateServiceStatus(service: Service): Service {
  const shouldChangeStatus = Math.random() < 0.05;
  
  if (shouldChangeStatus) {
    const statusOptions: ServiceStatus[] = ['online', 'degraded', 'offline'];
    const currentIndex = statusOptions.indexOf(service.status);
    const newIndex = (currentIndex + 1) % statusOptions.length;
    
    return {
      ...service,
      status: statusOptions[newIndex],
      latency: service.status === 'degraded' 
        ? Math.floor(Math.random() * 500) + 200 
        : Math.floor(Math.random() * 200) + 50
    };
  }

  return {
    ...service,
    latency: Math.max(50, service.latency + (Math.random() - 0.5) * 50)
  };
}
