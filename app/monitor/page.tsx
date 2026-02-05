'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useEventsStore } from '@/store/useEventsStore';
import { EventFeed } from '@/components/feed/EventFeed';
import { ServicesGrid } from '@/components/status/ServicesGrid';
import { StatCard } from '@/components/charts/StatCard';
import { Activity, ArrowLeft, TrendingUp, Zap, Clock } from 'lucide-react';

export default function MonitorPage() {
  const { startWebSocket, stopWebSocket, events, services } = useEventsStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    startWebSocket();
    
    return () => {
      stopWebSocket();
    };
  }, [startWebSocket, stopWebSocket]);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-surface sticky top-0 bg-background/80 backdrop-blur-sm z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="text-sm">Voltar</span>
                </Link>
                
                <div className="flex items-center gap-3">
                  <Activity className="w-6 h-6 text-info" />
                  <h1 className="text-2xl font-bold text-white">Pulse Monitor</h1>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Activity className="w-12 h-12 text-info mx-auto mb-4 animate-pulse" />
              <p className="text-gray-400">Carregando monitor...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalEvents = events.length;
  const errorEvents = events.filter(e => e.severity === 'error').length;
  const onlineServices = services.filter(s => s.status === 'online').length;
  const avgLatency = services.reduce((acc, s) => acc + s.latency, 0) / services.length;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-surface sticky top-0 bg-background/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm">Voltar</span>
              </Link>
              
              <div className="flex items-center gap-3">
                <Activity className="w-6 h-6 text-info" />
                <h1 className="text-2xl font-bold text-white">Pulse Monitor</h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                <span className="text-sm text-gray-400">Live</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total de Eventos"
            value={totalEvents}
            icon={<Activity className="w-5 h-5" />}
          />
          <StatCard
            label="Eventos de Erro"
            value={errorEvents}
            trend={errorEvents > 5 ? 'down' : 'neutral'}
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <StatCard
            label="Serviços Online"
            value={`${onlineServices}/${services.length}`}
            trend="up"
            icon={<Zap className="w-5 h-5" />}
          />
          <StatCard
            label="Latência Média"
            value={`${Math.round(avgLatency)}ms`}
            icon={<Clock className="w-5 h-5" />}
          />
        </div>

        <div className="mb-8">
          <ServicesGrid />
        </div>

        <div className="relative h-[800px]">
          <EventFeed />
        </div>
      </div>
    </div>
  );
}
