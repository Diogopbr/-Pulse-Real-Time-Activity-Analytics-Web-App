import { create } from 'zustand';
import { Event, Service } from '@/types';
import { websocketSimulator } from '@/lib/websocket';
import { generateInitialServices, updateServiceStatus } from '@/lib/events';

interface EventsState {
  events: Event[];
  services: Service[];
  isPaused: boolean;
  highlightedEventId: string | null;
  autoScroll: boolean;
  
  addEvent: (event: Event) => void;
  togglePause: () => void;
  toggleAutoScroll: () => void;
  highlightEvent: (eventId: string | null) => void;
  updateServices: () => void;
  startWebSocket: () => void;
  stopWebSocket: () => void;
  clearEvents: () => void;
}

const MAX_EVENTS = 10;

function shouldGroupEvents(event1: Event, event2: Event): boolean {
  return (
    event1.title === event2.title &&
    event1.service === event2.service &&
    event1.severity === event2.severity &&
    Date.now() - event2.timestamp.getTime() < 60000
  );
}

const getInitialServices = (): Service[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  return generateInitialServices();
};

export const useEventsStore = create<EventsState>((set, get) => ({
  events: [],
  services: getInitialServices(),
  isPaused: false,
  highlightedEventId: null,
  autoScroll: true,

  addEvent: (event: Event) => {
    const { isPaused, events } = get();
    
    if (isPaused) return;

    set((state) => {
      const existingEventIndex = state.events.findIndex(e => shouldGroupEvents(event, e));
      
      let newEvents: Event[];
      let highlightId: string;
      
      if (existingEventIndex !== -1) {
        newEvents = [...state.events];
        const existingEvent = newEvents[existingEventIndex];
        newEvents[existingEventIndex] = {
          ...existingEvent,
          count: (existingEvent.count || 1) + 1,
          timestamp: event.timestamp,
        };
        highlightId = existingEvent.id;
      } else {
        newEvents = [{ ...event, count: 1 }, ...state.events].slice(0, MAX_EVENTS);
        highlightId = event.id;
      }
      
      const updatedServices = state.services.map(service => {
        if (service.name === event.service) {
          return {
            ...service,
            recentEvents: [event, ...service.recentEvents].slice(0, 5),
            lastIncident: event.severity === 'error' ? event.timestamp : service.lastIncident
          };
        }
        return service;
      });

      return {
        events: newEvents,
        services: updatedServices,
        highlightedEventId: highlightId
      };
    });

    setTimeout(() => {
      const currentHighlight = get().highlightedEventId;
      if (currentHighlight === event.id || get().events.some(e => e.id === currentHighlight)) {
        set({ highlightedEventId: null });
      }
    }, 2000);
  },

  togglePause: () => {
    set((state) => ({ isPaused: !state.isPaused }));
  },

  toggleAutoScroll: () => {
    set((state) => ({ autoScroll: !state.autoScroll }));
  },

  highlightEvent: (eventId: string | null) => {
    set({ highlightedEventId: eventId });
  },

  updateServices: () => {
    set((state) => ({
      services: state.services.map(updateServiceStatus)
    }));
  },

  startWebSocket: () => {
    if (get().services.length === 0) {
      set({ services: generateInitialServices() });
    }

    const unsubscribe = websocketSimulator.subscribe((event) => {
      get().addEvent(event);
    });

    websocketSimulator.start(3000);

    const servicesInterval = setInterval(() => {
      get().updateServices();
    }, 10000);

    if (typeof window !== 'undefined') {
      (window as any).__websocketCleanup = () => {
        unsubscribe();
        clearInterval(servicesInterval);
        websocketSimulator.stop();
      };
    }
  },

  stopWebSocket: () => {
    websocketSimulator.stop();
    if (typeof window !== 'undefined' && (window as any).__websocketCleanup) {
      (window as any).__websocketCleanup();
    }
  },

  clearEvents: () => {
    set({ events: [] });
  }
}));
