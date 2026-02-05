'use client';

import { useState, useEffect } from 'react';
import { useEventsStore } from '@/store/useEventsStore';
import { ServiceCard } from './ServiceCard';

export function ServicesGrid() {
  const services = useEventsStore((state) => state.services);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">System Status</h2>
          <p className="text-sm text-gray-400">Carregando serviços...</p>
        </div>
      </div>
    );
  }

  const onlineCount = services.filter(s => s.status === 'online').length;
  const degradedCount = services.filter(s => s.status === 'degraded').length;
  const offlineCount = services.filter(s => s.status === 'offline').length;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">System Status</h2>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success"></div>
            <span className="text-gray-400">
              {onlineCount} Online
            </span>
          </div>
          {degradedCount > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-warning"></div>
              <span className="text-gray-400">
                {degradedCount} Degraded
              </span>
            </div>
          )}
          {offlineCount > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-error"></div>
              <span className="text-gray-400">
                {offlineCount} Offline
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </div>
  );
}
