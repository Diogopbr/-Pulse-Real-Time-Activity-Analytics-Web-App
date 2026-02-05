'use client';

import { Service, ServiceStatus } from '@/types';
import { motion } from 'framer-motion';
import { Activity, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  index: number;
}

const statusConfig: Record<ServiceStatus, {
  color: string;
  bgColor: string;
  borderColor: string;
  icon: typeof CheckCircle;
  label: string;
}> = {
  online: {
    color: 'text-success',
    bgColor: 'bg-success/10',
    borderColor: 'border-success/30',
    icon: CheckCircle,
    label: 'Online'
  },
  degraded: {
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    borderColor: 'border-warning/30',
    icon: AlertCircle,
    label: 'Degradado'
  },
  offline: {
    color: 'text-error',
    bgColor: 'bg-error/10',
    borderColor: 'border-error/30',
    icon: AlertCircle,
    label: 'Offline'
  }
};

export function ServiceCard({ service, index }: ServiceCardProps) {
  const config = statusConfig[service.status];
  const StatusIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`bg-surface border rounded-lg p-6 hover:border-info/30 transition-all ${config.borderColor}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">
            {service.name}
          </h3>
          <div className="flex items-center gap-2">
            <StatusIcon className={`w-4 h-4 ${config.color}`} />
            <span className={`text-sm font-medium ${config.color}`}>
              {config.label}
            </span>
          </div>
        </div>
        
        <div className={`w-3 h-3 rounded-full ${config.bgColor} ${config.borderColor} border-2`}>
          {service.status === 'online' && (
            <motion.div
              className="w-full h-full rounded-full bg-success"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
            <Activity className="w-3 h-3" />
            <span>Uptime</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {service.uptime.toFixed(2)}%
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
            <Clock className="w-3 h-3" />
            <span>Latência</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {Math.round(service.latency)}
            <span className="text-sm text-gray-400 ml-1">ms</span>
          </div>
        </div>
      </div>

      {service.recentEvents.length > 0 && (
        <div className="pt-4 border-t border-background">
          <div className="text-xs text-gray-400 mb-2">Eventos recentes</div>
          <div className="space-y-1">
            {service.recentEvents.slice(0, 3).map((event) => (
              <div 
                key={event.id}
                className="text-xs text-gray-500 truncate"
              >
                • {event.title}
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
