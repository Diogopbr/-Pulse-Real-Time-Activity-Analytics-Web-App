'use client';

import { motion } from 'framer-motion';

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}

export function StatCard({ label, value, change, trend = 'neutral', icon }: StatCardProps) {
  const trendColors = {
    up: 'text-success',
    down: 'text-error',
    neutral: 'text-gray-400'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-surface border border-surface rounded-lg p-6 hover:border-info/30 transition-colors"
    >
      <div className="flex items-start justify-between mb-2">
        <p className="text-sm text-gray-400">{label}</p>
        {icon && <div className="text-gray-500">{icon}</div>}
      </div>
      
      <div className="flex items-end gap-2">
        <p className="text-3xl font-bold text-white">{value}</p>
        {change && (
          <p className={`text-sm mb-1 ${trendColors[trend]}`}>
            {change}
          </p>
        )}
      </div>
    </motion.div>
  );
}
