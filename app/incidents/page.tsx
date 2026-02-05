'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, AlertCircle, Clock, CheckCircle, Eye } from 'lucide-react';
import { Incident, IncidentUpdate } from '@/types';
import { formatDateTime, formatRelativeTime } from '@/lib/time';

function generateMockIncident(): Incident {
  const baseTime = new Date('2026-02-05T10:00:00').getTime();
  return {
    id: 'inc_001',
    title: 'Degradação de Performance no Database',
    description: 'Detectamos um aumento significativo no tempo de resposta das queries do banco de dados principal, afetando múltiplos serviços.',
    severity: 'error',
    status: 'monitoring',
    startTime: new Date(baseTime),
    affectedServices: ['Database', 'API Gateway', 'Auth Service'],
    updates: [
      {
        id: 'upd_001',
        timestamp: new Date(baseTime),
        message: 'Incidente detectado. Equipe de engenharia investigando a causa raiz.',
        status: 'investigating'
      },
      {
        id: 'upd_002',
        timestamp: new Date(baseTime + 1200000),
        message: 'Identificamos queries lentas causadas por lock de tabelas. Implementando otimizações.',
        status: 'identified'
      },
      {
        id: 'upd_003',
        timestamp: new Date(baseTime + 2400000),
        message: 'Otimizações aplicadas. Monitorando métricas de performance para confirmar resolução.',
        status: 'monitoring'
      }
    ]
  };
}

const statusConfig = {
  investigating: { color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30', label: 'Investigando' },
  identified: { color: 'text-info', bg: 'bg-info/10', border: 'border-info/30', label: 'Identificado' },
  monitoring: { color: 'text-success', bg: 'bg-success/10', border: 'border-success/30', label: 'Monitorando' },
  resolved: { color: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-400/30', label: 'Resolvido' }
};

export default function IncidentPage() {
  const [incident, setIncident] = useState<Incident | null>(null);
  const [liveUpdates, setLiveUpdates] = useState<IncidentUpdate[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setIncident(generateMockIncident());
    const interval = setInterval(() => {
      const newUpdate: IncidentUpdate = {
        id: `upd_${Date.now()}`,
        timestamp: new Date(),
        message: `Atualização automática: Todas as métricas normalizadas. Latência em ${Math.floor(Math.random() * 50 + 50)}ms.`,
        status: 'monitoring'
      };
      
      setLiveUpdates(prev => [newUpdate, ...prev].slice(0, 5));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  if (!isClient || !incident) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-surface sticky top-0 bg-background/80 backdrop-blur-sm z-50">
          <div className="container mx-auto px-6 py-4">
            <Link
              href="/monitor"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Voltar ao Monitor</span>
            </Link>
          </div>
        </header>
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-info mx-auto mb-4 animate-pulse" />
              <p className="text-gray-400">Carregando incidente...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const config = statusConfig[incident.status];
  const allUpdates = [...liveUpdates, ...incident.updates].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-surface sticky top-0 bg-background/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/monitor"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Voltar ao Monitor</span>
            </Link>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
              <span className="text-sm text-gray-400">Atualizações ao vivo</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="mb-8">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${config.bg} ${config.border} ${config.color} border`}>
            <Eye className="w-4 h-4" />
            {config.label}
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">
            {incident.title}
          </h1>

          <p className="text-lg text-gray-400 mb-6">
            {incident.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Iniciado {formatRelativeTime(incident.startTime)}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Serviços Afetados:</span>
              <div className="flex gap-2">
                {incident.affectedServices.map(service => (
                  <span key={service} className="px-2 py-1 bg-surface rounded text-gray-300 text-xs">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Timeline de Atualizações</h2>
          
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-surface"></div>

            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {allUpdates.map((update, index) => {
                  const updateConfig = statusConfig[update.status];
                  const isNew = liveUpdates.includes(update);
                  
                  return (
                    <motion.div
                      key={update.id}
                      initial={isNew ? { opacity: 0, x: -20 } : false}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="relative pl-20"
                    >
                      <div className={`absolute left-6 w-5 h-5 rounded-full border-2 ${updateConfig.bg} ${updateConfig.border} flex items-center justify-center`}>
                        {update.status === 'resolved' && (
                          <CheckCircle className="w-3 h-3 text-success" />
                        )}
                      </div>

                      <div className={`bg-surface border rounded-lg p-6 ${isNew ? 'border-info/50' : 'border-surface'}`}>
                        <div className="flex items-start justify-between mb-3">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${updateConfig.bg} ${updateConfig.color}`}>
                            {updateConfig.label}
                          </span>
                          <time className="text-xs text-gray-500 font-mono">
                            {formatDateTime(update.timestamp)}
                          </time>
                        </div>
                        
                        <p className="text-gray-300">
                          {update.message}
                        </p>

                        {isNew && (
                          <div className="mt-3 flex items-center gap-2 text-xs text-info">
                            <div className="w-1.5 h-1.5 rounded-full bg-info animate-pulse"></div>
                            <span>Nova atualização</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
