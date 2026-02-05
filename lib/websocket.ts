import { Event } from '@/types';
import { generateRandomEvent } from './events';

type EventCallback = (event: Event) => void;

class WebSocketSimulator {
  private subscribers: Set<EventCallback> = new Set();
  private intervalId: NodeJS.Timeout | null = null;
  private isRunning: boolean = false;

  start(intervalMs: number = 3000) {
    if (this.isRunning) return;

    this.isRunning = true;
    this.intervalId = setInterval(() => {
      const event = generateRandomEvent();
      this.notifySubscribers(event);
    }, intervalMs);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
  }

  subscribe(callback: EventCallback): () => void {
    this.subscribers.add(callback);
    
    return () => {
      this.subscribers.delete(callback);
    };
  }

  private notifySubscribers(event: Event) {
    this.subscribers.forEach(callback => {
      try {
        callback(event);
      } catch (error) {
        console.error('Error in event subscriber:', error);
      }
    });
  }

  getStatus(): { isRunning: boolean; subscriberCount: number } {
    return {
      isRunning: this.isRunning,
      subscriberCount: this.subscribers.size
    };
  }
}

export const websocketSimulator = new WebSocketSimulator();
