'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PreviewEvent {
  id: number;
  service: string;
  message: string;
  status: 'success' | 'warning' | 'error';
  timestamp: string;
}

const mockEvents: Omit<PreviewEvent, 'id' | 'timestamp'>[] = [
  { service: 'API Gateway', message: 'Latency spike detected', status: 'warning' },
  { service: 'Auth Service', message: 'Recovered successfully', status: 'success' },
  { service: 'Database', message: 'Connection restored', status: 'success' },
  { service: 'Cache Layer', message: 'High memory usage', status: 'error' },
  { service: 'Message Queue', message: 'Processing backlog', status: 'warning' },
  { service: 'CDN', message: 'Deployment completed', status: 'success' },
];

const statusColors = {
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
};

const timestamps = ['just now', '2s ago', '12s ago', '1m ago', '2m ago', '5m ago'];

export function LiveEventsPreview() {
  const [events, setEvents] = useState<PreviewEvent[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const initialEvents = mockEvents.slice(0, 3).map((event, index) => ({
      ...event,
      id: index,
      timestamp: timestamps[index + 1] || 'just now',
    }));
    setEvents(initialEvents);
    setCounter(3);

    const interval = setInterval(() => {
      setCounter((prev) => {
        const newId = prev;
        const eventTemplate = mockEvents[prev % mockEvents.length];
        
        setEvents((currentEvents) => {
          const newEvent: PreviewEvent = {
            ...eventTemplate,
            id: newId,
            timestamp: 'just now',
          };
          
          const updatedEvents = [newEvent, ...currentEvents].slice(0, 4);
          
          return updatedEvents.map((evt, idx) => ({
            ...evt,
            timestamp: timestamps[idx] || `${idx}m ago`,
          }));
        });
        
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {events.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20, height: 0 }}
            animate={{ opacity: 1, x: 0, height: 'auto' }}
            exit={{ opacity: 0, x: 20, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex items-center gap-3 px-4 py-3 bg-surface/50 backdrop-blur-sm rounded-lg border border-info/10"
          >
            <div className="relative flex-shrink-0">
              <motion.div
                className={`w-2.5 h-2.5 rounded-full ${statusColors[event.status]}`}
                animate={{
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              {event.timestamp === 'just now' && (
                <motion.div
                  className={`absolute inset-0 w-2.5 h-2.5 rounded-full ${statusColors[event.status]} opacity-50`}
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="font-medium text-white text-sm">
                  {event.service}
                </span>
                <span className="text-gray-500 text-sm">—</span>
                <span className="text-gray-400 text-sm truncate">
                  {event.message}
                </span>
              </div>
            </div>

            <div className="flex-shrink-0">
              <span className="text-xs text-gray-500 font-mono">
                {event.timestamp}
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
