export type EventType = 
  | 'deployment'
  | 'incident'
  | 'metric'
  | 'alert'
  | 'system'
  | 'api_call';

export type ServiceStatus = 'online' | 'degraded' | 'offline';

export type Severity = 'info' | 'warning' | 'error' | 'success';

export interface Event {
  id: string;
  type: EventType;
  severity: Severity;
  title: string;
  description: string;
  timestamp: Date;
  service?: string;
  metadata?: Record<string, any>;
  count?: number;
}

export interface Service {
  id: string;
  name: string;
  status: ServiceStatus;
  uptime: number;
  latency: number;
  lastIncident?: Date;
  recentEvents: Event[];
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved';
  startTime: Date;
  endTime?: Date;
  affectedServices: string[];
  updates: IncidentUpdate[];
}

export interface IncidentUpdate {
  id: string;
  timestamp: Date;
  message: string;
  status: Incident['status'];
}

export interface MetricData {
  timestamp: Date;
  value: number;
}

export interface SystemMetrics {
  cpu: MetricData[];
  memory: MetricData[];
  requests: MetricData[];
}
