'use client';

import React from 'react';
import { SiteStats, Testimonial } from '@/lib/types';
import { Star, BarChart3, Award, Sparkles, Check } from 'lucide-react';

interface AdminStatsTabProps {
  stats: SiteStats;
  setStats: React.Dispatch<React.SetStateAction<SiteStats>>;
  testimonials?: Testimonial[];
  onSaveStats: (e: React.FormEvent) => void;
  isSaving: boolean;
}

export default function AdminStatsTab({
  stats,
  setStats,
  testimonials = [],
  onSaveStats,
  isSaving
}: AdminStatsTabProps) {
  const safeStats: SiteStats = {
    videosEdited: stats?.videosEdited || '150+',
    totalViews: stats?.totalViews || '50M+',
    clientsCount: stats?.clientsCount || '35+',
    engagement: stats?.engagement || '88%+'
  };

  return (
    <div className="space-y-10">
      {/* Site Results Numbers Form */}
      <div className="max-w-3xl bg-neutral-900/60 border border-neutral-800/80 p-6 sm:p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-display">
              Results &amp; Impact Counters
            </h2>
            <p className="text-xs text-neutral-400">
              These values immediately update the &ldquo;Results That Speak&rdquo; and Hero stats sections on the website.
            </p>
          </div>
        </div>

        <form onSubmit={onSaveStats} className="space-y-6 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-neutral-300">
                Videos Edited Counter
              </label>
              <input
                type="text"
                value={safeStats.videosEdited}
                onChange={(e) => setStats({ ...safeStats, videosEdited: e.target.value })}
                className="w-full px-4 py-3 text-sm bg-neutral-950/80 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="e.g. 150+"
              />
              <span className="text-[11px] text-neutral-500">Displayed in Hero &amp; Results sections</span>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-neutral-300">
                Total Views Counter
              </label>
              <input
                type="text"
                value={safeStats.totalViews}
                onChange={(e) => setStats({ ...safeStats, totalViews: e.target.value })}
                className="w-full px-4 py-3 text-sm bg-neutral-950/80 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="e.g. 50M+"
              />
              <span className="text-[11px] text-neutral-500">Total organic impressions generated</span>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-neutral-300">
                Clients Count Counter
              </label>
              <input
                type="text"
                value={safeStats.clientsCount}
                onChange={(e) => setStats({ ...safeStats, clientsCount: e.target.value })}
                className="w-full px-4 py-3 text-sm bg-neutral-950/80 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="e.g. 35+"
              />
              <span className="text-[11px] text-neutral-500">Number of happy creators &amp; brands</span>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-neutral-300">
                Avg Retention Rate / Headline
              </label>
              <input
                type="text"
                value={safeStats.engagement}
                onChange={(e) => setStats({ ...safeStats, engagement: e.target.value })}
                className="w-full px-4 py-3 text-sm bg-neutral-950/80 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="e.g. 88%+"
              />
              <span className="text-[11px] text-neutral-500">Average 30s view retention percentage</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-50 min-h-[44px]"
          >
            {isSaving ? (
              <span>Saving Stats...</span>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Save Updated Stats</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Testimonials List */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white font-display">
            Client Testimonials ({testimonials.length})
          </h2>
        </div>
        
        {testimonials.length === 0 ? (
          <div className="p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800 text-neutral-500 text-xs text-center">
            No testimonials added yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 flex flex-col justify-between hover:border-neutral-700 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-neutral-300 italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white">{t.name}</div>
                    <div className="text-xs text-neutral-400">
                      {t.role} {t.company ? `• ${t.company}` : ''}
                    </div>
                  </div>
                  {t.project && (
                    <span className="text-xs font-mono text-neutral-500 px-2.5 py-1 rounded-lg bg-neutral-800/60 border border-neutral-700/50">
                      {t.project}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}