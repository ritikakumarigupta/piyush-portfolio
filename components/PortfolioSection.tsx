'use client';

import React, { useState, useMemo } from 'react';
import { VideoProject } from '@/lib/types';
import VideoCard from './VideoCard';
import { Search, Plus, Trash2, Film, Sparkles, Filter, X } from 'lucide-react';

interface PortfolioSectionProps {
  videos: VideoProject[];
  onOpenVideo: (video: VideoProject) => void;
  onOpenUpload?: () => void;
  isDeleteMode?: boolean;
  onToggleDeleteMode?: () => void;
  onDeleteVideo?: (e: React.MouseEvent, video: VideoProject) => void;
}

export default function PortfolioSection({
  videos,
  onOpenVideo,
  onOpenUpload,
  isDeleteMode,
  onToggleDeleteMode,
  onDeleteVideo
}: PortfolioSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'views' | 'recent' | 'duration'>('views');

  const categories = [
    'All',
    'AI & Brand Commercials',
    'Personal Brand',
    'Upcoming Mahabharat Project',
    'Product Ads & UGC',
    'Cinematic Short Films',
    'Motion Graphics & Logo Stings'
  ];

  const filteredVideos = useMemo(() => {
    return videos
      .filter((video) => {
        const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
        const matchesSearch =
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (video.client || video.clientName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (video.tags || []).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'views') {
          const parseViews = (v: string) => {
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
              Click any video to watch in theater mode with sound, custom controls, and project details.
            </p>
          </div>

          {/* Upload & Manage Quick Action Buttons */}
          <div className="flex items-center gap-2.5">
            {onOpenUpload && (
              <button
                onClick={onOpenUpload}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:scale-[1.02] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Upload New Video</span>
              </button>
            )}

            {onToggleDeleteMode && (
              <button
                onClick={onToggleDeleteMode}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                  isDeleteMode
                    ? 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse'
                    : 'text-neutral-400 bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] hover:text-white'
                }`}
                title="Toggle Delete Mode"
              >
                <Trash2 className="w-4 h-4" />
                <span>{isDeleteMode ? 'Exit Delete Mode' : 'Delete Mode'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills & Controls */}
        <div className="space-y-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none [mask-image:linear-gradient(to_right,black_90%,transparent)]">
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
            
            {/* Search Box */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Search by client, title, tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Results Count & Sort Dropdown */}
            <div className="flex items-center justify-between w-full sm:w-auto gap-4">
              <span className="text-xs font-semibold text-neutral-400">
                Showing <strong className="text-white font-bold">{filteredVideos.length}</strong> videos
              </span>

              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs font-semibold text-neutral-300 focus:outline-none cursor-pointer"
                >
                  <option value="views" className="bg-neutral-900 text-white">🔥 Most Views</option>
                  <option value="recent" className="bg-neutral-900 text-white">✨ Newest</option>
                </select>
              </div>
            </div>

          </div>

        </div>

        {/* Video Grid: 4 cols on desktop, 2 cols on mobile */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onOpen={onOpenVideo}
                isDeleteMode={isDeleteMode}
                onDelete={onDeleteVideo}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/[0.02] border border-white/[0.06] rounded-3xl space-y-3">
            <Film className="w-10 h-10 text-neutral-600 mx-auto" />
            <p className="text-base font-bold text-white">No videos found matching your search.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-blue-400 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
