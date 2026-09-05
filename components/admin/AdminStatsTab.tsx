'use client';

import React from 'react';
import { SiteStats, Testimonial } from '@/lib/types';
import { Star } from 'lucide-react';

interface AdminStatsTabProps {
  stats: SiteStats;
  setStats: React.Dispatch<React.SetStateAction<SiteStats>>;
  testimonials: Testimonial[];
  onSaveStats: (e: React.FormEvent) => void;
  isSaving: boolean;
}

export default function AdminStatsTab({
  stats,
  setStats,
  testimonials,
  onSaveStats,
  isSaving
}: AdminStatsTabProps) {
  return (
    <div className="space-y-8">
      {/* Site Results Numbers Form */}
      <div className="max-w-2xl bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
        <h2 className="text-lg font-bold text-neutral-950 font-display mb-1">
          Results &amp; Impact Counters
        </h2>
        <p className="text-xs text-neutral-500 mb-6">
          These values immediately update the &ldquo;Results That Speak&rdquo; and Hero stats sections on the website.
        </p>

        <form onSubmit={onSaveStats} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                Videos Edited
              </label>
              <input
                type="text"
                value={stats.videosEdited}
                onChange={(e) => setStats({ ...stats, videosEdited: e.target.value })}
                className="w-full px-4 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                Total Views
              </label>
              <input
                type="text"
                value={stats.totalViews}
                onChange={(e) => setStats({ ...stats, totalViews: e.target.value })}
                className="w-full px-4 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                Clients Count
              </label>
              <input
                type="text"
                value={stats.clientsCount}
                onChange={(e) => setStats({ ...stats, clientsCount: e.target.value })}
                className="w-full px-4 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                Engagement Headline
              </label>
              <input
                type="text"
                value={stats.engagement}
                onChange={(e) => setStats({ ...stats, engagement: e.target.value })}
                className="w-full px-4 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="mt-6 px-6 py-3 rounded-xl bg-neutral-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            {isSaving ? 'Saving Stats...' : 'Save Updated Results'}
          </button>
        </form>
      </div>

      {/* Testimonials List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-neutral-950 font-display">
          Active Testimonials ({testimonials.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-2">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-neutral-700 italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-neutral-950">{t.name}</div>
                  <div className="text-[11px] text-neutral-500">{t.role} • {t.company}</div>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">{t.project}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}