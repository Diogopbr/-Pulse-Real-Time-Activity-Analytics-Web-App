import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatTimestamp(date: Date): string {
  return format(date, 'HH:mm:ss', { locale: ptBR });
}

export function formatDate(date: Date): string {
  return format(date, 'dd MMM yyyy', { locale: ptBR });
}

export function formatDateTime(date: Date): string {
  return format(date, "dd MMM yyyy 'às' HH:mm", { locale: ptBR });
}

export function formatRelativeTime(date: Date): string {
  return formatDistanceToNow(date, { 
    addSuffix: true,
    locale: ptBR 
  });
}

export function formatTimeGroup(date: Date): string {
  if (isToday(date)) {
    return 'Hoje';
  }
  if (isYesterday(date)) {
    return 'Ontem';
  }
  return format(date, 'dd MMM yyyy', { locale: ptBR });
}

export function groupEventsByTime<T extends { timestamp: Date }>(
  events: T[]
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();

  events.forEach(event => {
    const group = formatTimeGroup(event.timestamp);
    if (!grouped.has(group)) {
      grouped.set(group, []);
    }
    grouped.get(group)!.push(event);
  });

  return grouped;
}

export function calculateUptime(startTime: Date, downtime: number): number {
  const totalTime = Date.now() - startTime.getTime();
  const uptimeMs = totalTime - downtime;
  return (uptimeMs / totalTime) * 100;
}

export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  return `${seconds}s`;
}
