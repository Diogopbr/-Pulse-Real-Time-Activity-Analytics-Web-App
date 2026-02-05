'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, Zap, Eye, Bell } from 'lucide-react';
import { FadeIn, SlideIn } from '@/components/motion/Animations';
import { LiveEventsPreview } from '@/components/motion/LiveEventsPreview';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-info/5 via-transparent to-success/5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-info/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-success/10 rounded-full blur-3xl"></div>

        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-info/30 rounded-full mb-8">
                <Activity className="w-4 h-4 text-info" />
                <span className="text-sm text-gray-300">Real-Time Monitoring Platform</span>
              </div>
            </FadeIn>

            <SlideIn delay={0.2}>
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
                Pulse
              </h1>
            </SlideIn>

            <SlideIn delay={0.3}>
              <p className="text-xl md:text-2xl text-gray-400 mb-4">
                Monitoramento e Analytics em Tempo Real
              </p>
            </SlideIn>

            <SlideIn delay={0.4}>
              <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
                Acompanhe eventos, status de serviços e incidentes com interface moderna,
                atualizações em tempo real e visualizações intuitivas.
              </p>
            </SlideIn>

            <SlideIn delay={0.5}>
              <div className="flex items-center justify-center gap-4">
                <Link
                  href="/monitor"
                  className="group px-8 py-4 bg-info text-white rounded-lg font-semibold hover:bg-info/90 transition-all flex items-center gap-2 shadow-lg shadow-info/20"
                >
                  Abrir Monitor
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-surface border border-surface text-gray-300 rounded-lg font-semibold hover:border-info/30 transition-all"
                >
                  Ver no GitHub
                </a>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <FadeIn delay={0.6}>
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Recursos Principais
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            <SlideIn delay={0.7} direction="up" className="h-full">
              <div className="h-full bg-surface border border-surface rounded-xl p-8 hover:border-info/30 transition-all flex flex-col">
                <div className="w-12 h-12 bg-info/10 border border-info/30 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-info" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Eventos em Tempo Real
                </h3>
                <p className="text-gray-400 flex-1">
                  Feed ao vivo com eventos de sistema, deployments, incidentes e métricas,
                  com atualizações instantâneas via WebSocket.
                </p>
              </div>
            </SlideIn>

            <SlideIn delay={0.8} direction="up" className="h-full">
              <div className="h-full bg-surface border border-surface rounded-xl p-8 hover:border-info/30 transition-all flex flex-col">
                <div className="w-12 h-12 bg-success/10 border border-success/30 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Status de Serviços
                </h3>
                <p className="text-gray-400 flex-1">
                  Visualize o health status de todos os seus serviços,
                  com métricas de uptime, latência e eventos recentes.
                </p>
              </div>
            </SlideIn>

            <SlideIn delay={0.9} direction="up" className="h-full">
              <div className="h-full bg-surface border border-surface rounded-xl p-8 hover:border-info/30 transition-all flex flex-col">
                <div className="w-12 h-12 bg-warning/10 border border-warning/30 rounded-lg flex items-center justify-center mb-4">
                  <Bell className="w-6 h-6 text-warning" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Gestão de Incidentes
                </h3>
                <p className="text-gray-400 flex-1">
                  Acompanhe incidentes ativos com logs em tempo real,
                  atualizações automáticas e histórico completo.
                </p>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <FadeIn delay={1.0}>
            <div className="bg-surface border border-surface rounded-2xl p-1 overflow-hidden">
              <div className="bg-gradient-to-br from-info/20 to-success/20 rounded-xl p-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  className="bg-background rounded-lg p-8 border border-info/30"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-error"></div>
                      <div className="w-3 h-3 rounded-full bg-warning"></div>
                      <div className="w-3 h-3 rounded-full bg-success"></div>
                    </div>
                    <div className="flex-1 bg-surface rounded px-4 py-2 text-sm text-gray-500 font-mono">
                      pulse.monitor.app
                    </div>
                  </div>
                  
                  <LiveEventsPreview />
                </motion.div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <footer className="border-t border-surface py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
            <p>
              Desenvolvido com Next.js 14, TypeScript, TailwindCSS e Framer Motion
            </p>
            <p className="mt-2">
              Um projeto de portfólio para demonstrar habilidades em sistemas de tempo real
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
