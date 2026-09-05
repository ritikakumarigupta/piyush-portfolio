'use client';

import React from 'react';
import { TrendingUp, Award, Eye, Flame, Users } from 'lucide-react';
import { SiteStats } from '@/lib/types';

interface ResultsSectionProps {
  stats?: SiteStats;
}

export default function ResultsSection({ stats }: ResultsSectionProps) {
  const displayViews = stats?.totalViews || '50M+';
  const displayRetention = stats?.engagement || '88%+';
  const displayVideos = stats?.videosEdited || '150+';
  const displayClients = stats?.clientsCount || '35+';

  const statItems = [
    { value: displayViews, label: 'Organic Video Views Generated', icon: <Eye className="w-5 h-5 text-blue-400" /> },
    { value: displayRetention, label: 'Average 30s View Retention', icon: <TrendingUp className="w-5 h-5 text-emerald-400" /> },
    { value: displayVideos, label: 'High-Retention Reels & Shorts Delivered', icon: <Flame className="w-5 h-5 text-orange-400" /> },
    { value: displayClients, label: 'Happy Global Creators & Brands', icon: <Users className="w-5 h-5 text-amber-400" /> }
  ];

  return (
    <section id="results" className="py-16 md:py-24 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Proven Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
            Retention Numbers That Speak For Themselves
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {statItems.map((s, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl text-center space-y-2 hover:border-white/20 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-3">
                {s.icon}
              </div>
              <div className="text-3xl sm:text-4xl font-black font-display text-white">
                {s.value}
              </div>
              <p className="text-xs text-neutral-400 font-medium">
                {s.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
