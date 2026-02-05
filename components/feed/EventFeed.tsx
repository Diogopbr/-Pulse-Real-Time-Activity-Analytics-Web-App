'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useEventsStore } from '@/store/useEventsStore';
import { EventItem } from './EventItem';
import { Pause, Play, Trash2, Activity } from 'lucide-react';
import { groupEventsByTime } from '@/lib/time';
import { Event } from '@/types';

export function EventFeed() {
  const { events, isPaused, togglePause, clearEvents, highlightedEventId, autoScroll, toggleAutoScroll } = useEventsStore();
  const [manualScrollDetected, setManualScrollDetected] = useState(false);
  const [newEventIds, setNewEventIds] = useState<Set<string>>(new Set());
  const feedRef = useRef<HTMLDivElement>(null);
  const prevEventsLengthRef = useRef(events.length);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (events.length > prevEventsLengthRef.current) {
      const newEvent = events[0];
      setNewEventIds(prev => {
        const updated = new Set(prev);
        updated.add(newEvent.id);
        return updated;
      });
      
      setTimeout(() => {
        setNewEventIds(prev => {
          const updated = new Set(prev);
          updated.delete(newEvent.id);
          return updated;
        });
      }, 3000);
    }
    prevEventsLengthRef.current = events.length;
  }, [events]);

  useEffect(() => {
    if (autoScroll && !isPaused && !manualScrollDetected && feedRef.current) {
      feedRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [events.length, autoScroll, isPaused, manualScrollDetected]);

  const handleScroll = () => {
    if (feedRef.current) {
      const { scrollTop } = feedRef.current;
      const isAtTop = scrollTop < 50;
      
      if (!isAtTop && autoScroll) {
        setManualScrollDetected(true);
        toggleAutoScroll();
      } else if (isAtTop && !autoScroll && manualScrollDetected) {
        setManualScrollDetected(false);
        toggleAutoScroll();
      }
    }
  };

  const groupedEvents = isClient ? groupEventsByTime(events) : new Map();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Live Feed</h2>
          <p className="text-sm text-gray-400 mt-1">
            {events.length} evento{events.length !== 1 ? 's' : ''} (máx. 10) • {isPaused ? 'Pausado' : 'Ao vivo'}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={togglePause}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              isPaused 
                ? 'bg-warning/20 text-warning border border-warning/30 hover:bg-warning/30' 
                : 'bg-surface text-gray-300 border border-surface hover:border-info/30'
            }`}
          >
            {isPaused ? (
              <>
                <Play className="w-4 h-4" />
                <span className="text-sm font-medium">Retomar</span>
              </>
            ) : (
              <>
                <Pause className="w-4 h-4" />
                <span className="text-sm font-medium">Pausar</span>
              </>
            )}
          </button>
          
          <button
            onClick={clearEvents}
            className="px-4 py-2 rounded-lg flex items-center gap-2 bg-surface text-gray-300 border border-surface hover:border-error/30 hover:text-error transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm font-medium">Limpar</span>
          </button>
        </div>
      </div>

      <div 
        ref={feedRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-thin scrollbar-thumb-surface scrollbar-track-background"
      >
        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Activity className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-lg">Aguardando eventos...</p>
            <p className="text-sm mt-2">Novos eventos aparecerão aqui em tempo real</p>
          </div>
        ) : (
          Array.from(groupedEvents.entries()).map(([timeGroup, groupEvents]) => (
            <div key={timeGroup}>
              <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 py-2 mb-3">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                  {timeGroup}
                </h3>
              </div>
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {groupEvents.map((event: Event) => (
                    <EventItem 
                      key={event.id} 
                      event={event}
                      isHighlighted={event.id === highlightedEventId}
                      isNew={newEventIds.has(event.id)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))
        )}
      </div>

      {!autoScroll && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <button
            onClick={() => {
              feedRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
              setManualScrollDetected(false);
              if (!autoScroll) toggleAutoScroll();
            }}
            className="px-4 py-2 bg-info text-white rounded-full text-sm font-medium shadow-lg hover:bg-info/90 transition-colors flex items-center gap-2"
          >
            <Activity className="w-4 h-4" />
            Voltar ao topo • Auto-scroll
          </button>
        </div>
      )}
    </div>
  );
}
