'use client';

import { motion } from 'framer-motion';
import { Event } from '@/types';
import { formatTimestamp } from '@/lib/time';
import { AlertCircle, CheckCircle, Info, AlertTriangle, Activity, Zap } from 'lucide-react';
import { useEventsStore } from '@/store/useEventsStore';

interface EventItemProps {
  event: Event;
  isHighlighted?: boolean;
  isNew?: boolean;
}

const severityColors = {
  info: 'border-info bg-info/10 text-info',
  success: 'border-success bg-success/10 text-success',
  warning: 'border-warning bg-warning/10 text-warning',
  error: 'border-error bg-error/10 text-error',
};

const severityIcons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
};

const typeIcons = {
  deployment: Zap,
  incident: AlertCircle,
  metric: Activity,
  alert: AlertTriangle,
  system: CheckCircle,
  api_call: Activity,
};

export function EventItem({ event, isHighlighted, isNew = false }: EventItemProps) {
  const SeverityIcon = severityIcons[event.severity];
  const TypeIcon = typeIcons[event.type];
  const isCritical = event.severity === 'error' || event.severity === 'warning';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        backgroundColor: isHighlighted && isNew ? 'rgba(56, 189, 248, 0.1)' : 'rgba(17, 22, 42, 1)'
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`border rounded-lg p-4 hover:border-info/30 transition-colors ${
        isCritical ? 'border-l-4' : 'border'
      } ${
        event.severity === 'error' ? 'border-l-error bg-error/5' : 
        event.severity === 'warning' ? 'border-l-warning bg-warning/5' : 
        'border-surface bg-surface'
      } ${
        isHighlighted && isNew ? 'ring-2 ring-info/50' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border ${severityColors[event.severity]}`}>
          <SeverityIcon className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <TypeIcon className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400 uppercase tracking-wide">
                  {event.type.replace('_', ' ')}
                </span>
                {event.count && event.count > 1 && (
                  <span className="px-2 py-0.5 bg-info/20 text-info text-xs rounded-full font-semibold">
                    x{event.count}
                  </span>
                )}
              </div>
              <h3 className="text-base font-semibold text-white mb-1">
                {event.title}
              </h3>
              <p className="text-sm text-gray-400">
                {event.description}
              </p>
            </div>
            <time className="text-xs text-gray-500 flex-shrink-0 font-mono">
              {formatTimestamp(event.timestamp)}
            </time>
          </div>

          {event.service && (
            <div className="mt-3 flex items-center gap-3 text-xs">
              <span className="px-2 py-1 bg-background rounded text-gray-400">
                {event.service}
              </span>
              {event.metadata && Object.entries(event.metadata).slice(0, 2).map(([key, value]) => (
                <span key={key} className="text-gray-500">
                  <span className="text-gray-600">{key}:</span> {String(value)}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
