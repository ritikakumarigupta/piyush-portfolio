'use client';

import React, { useState, useMemo } from 'react';
import { VideoProject } from '@/lib/types';
import VideoCard from './VideoCard';
import { Search, Film, Filter, X } from 'lucide-react';

interface PortfolioSectionProps {
  videos: VideoProject[];
  onOpenVideo: (video: VideoProject) => void;
}

export default function PortfolioSection({
  videos,
  onOpenVideo
}: PortfolioSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'views' | 'recent' | 'duration'>('views');

  const categories = [
    'All',
    'AI & Brand Commercials',
    'Viral Shorts & Reels',
    'Upcoming Project',
    'Product Ads & UGC',
    'Cinematic Visuals & VFX',
    'Personal Brand'
  ];

  const filteredVideos = useMemo(() => {
    return videos
      .filter((video) => {
        const matchesCategory =
          selectedCategory === 'All' ||
          (video.category || '').toLowerCase().includes(selectedCategory.toLowerCase()) ||
          (selectedCategory === 'Upcoming Project' && (video.category || '').toLowerCase().includes('upcoming'));

        const matchesSearch =
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (video.client || video.clientName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (video.tags || []).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'views') {
          const parseViews = (v: string | undefined) => {
            if (!v) return 0;
            if (v.includes('M')) return parseFloat(v) * 1000000;
            if (v.includes('K')) return parseFloat(v) * 1000;
            return parseFloat(v) || 0;
          };
          return parseViews(b.views) - parseViews(a.views);
        }
        if (sortBy === 'recent') {
          const dateB = new Date(b.createdAt || b.date || 0).getTime();
          const dateA = new Date(a.createdAt || a.date || 0).getTime();
          return dateB - dateA;
        }
        return 0;
      });
  }, [videos, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="work" className="py-14 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Film className="w-3.5 h-3.5" />
              <span>Complete Video Library</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
              Explore {videos.length}+ Short-Form Projects
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Click any project to watch in fullscreen theater mode with high quality video and sound.
            </p>
          </div>

          <div className="text-xs font-mono text-neutral-400 bg-white/[0.04] px-3.5 py-2 rounded-xl border border-white/[0.06] shrink-0 self-start md:self-auto">
            Showing <strong className="text-white">{filteredVideos.length}</strong> of {videos.length} videos
          </div>
        </div>

        {/* Filter Pills & Controls */}
        <div className="space-y-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none [mask-image:linear-gradient(to_right,black_92%,transparent)]">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-white text-neutral-950 shadow-lg shadow-white/10 scale-105'
                      : 'bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, style, niche, client..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs text-neutral-400 flex items-center gap-1 shrink-0">
                <Filter className="w-3.5 h-3.5" />
                <span>Sort by:</span>
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 rounded-xl bg-[#14141B] border border-white/[0.08] text-xs text-white focus:outline-none cursor-pointer"
              >
                <option value="views">Most Views</option>
                <option value="recent">Latest Uploads</option>
              </select>
            </div>

          </div>
        </div>

        {/* Video Grid */}
        {filteredVideos.length === 0 ? (
          <div className="glass-panel p-16 rounded-3xl text-center space-y-3">
            <Film className="w-10 h-10 text-neutral-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No Videos Found</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              No project matches your filter or search query. Try clearing filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onOpen={onOpenVideo}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
