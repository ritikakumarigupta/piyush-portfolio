'use client';

import React, { useState } from 'react';
import { VideoProject } from '@/lib/types';
import { Plus, Edit3, Trash2, Search, Play, Eye, Clock, Star, Sparkles, CheckCircle2 } from 'lucide-react';

interface AdminVideosTabProps {
  videos: VideoProject[];
  onOpenAddVideo: () => void;
  onOpenEditVideo: (video: VideoProject) => void;
  onDeleteVideo: (id: string) => void;
  onToggleFeatured: (video: VideoProject) => void;
  onTogglePublished: (video: VideoProject) => void;
}

export default function AdminVideosTab({
  videos,
  onOpenAddVideo,
  onOpenEditVideo,
  onDeleteVideo,
  onToggleFeatured,
  onTogglePublished
}: AdminVideosTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredList = videos.filter((v) => {
    const matchesCategory = categoryFilter === 'All' || v.category === categoryFilter;
    const matchesSearch =
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (v.clientName || v.client || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const isMediaVideo = (url: string) => {
    if (!url) return false;
    const clean = url.toLowerCase();
    return clean.endsWith('.mp4') || clean.endsWith('.mov') || clean.endsWith('.webm') || clean.includes('/videos/');
  };

  return (
    <div className="space-y-5 max-w-full overflow-hidden">
      
      {/* Top Header & Search Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-neutral-900/40 p-3 sm:p-4 rounded-2xl border border-white/[0.08]">
        
        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-1">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, client..."
              className="w-full pl-9 pr-3 py-2.5 text-xs bg-white/[0.04] border border-white/[0.08] text-white rounded-xl placeholder-neutral-500 focus:outline-none focus:border-blue-500/50"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2.5 text-xs bg-[#14141B] border border-white/[0.08] text-neutral-200 rounded-xl focus:outline-none cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="AI & Brand Commercials">AI & Brand Commercials</option>
            <option value="Viral Shorts & Reels">Viral Shorts & Reels</option>
            <option value="Upcoming Project">Upcoming Project</option>
            <option value="Product Ads & UGC">Product Ads & UGC</option>
            <option value="Cinematic Visuals & VFX">Cinematic Visuals & VFX</option>
            <option value="Personal Brand">Personal Brand</option>
          </select>
        </div>

        {/* Upload Button */}
        <button
          onClick={onOpenAddVideo}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/30 active:scale-95 cursor-pointer shrink-0 min-h-[42px]"
        >
          <Plus className="w-4 h-4" />
          <span>+ Upload New Video</span>
        </button>
      </div>

      {/* 1. Mobile Cards View (Visible on mobile screens, zero overflow!) */}
      <div className="block md:hidden space-y-3">
        {filteredList.map((v) => {
          const mediaUrl = v.thumbnailUrl || v.videoUrl;
          const isVideo = isMediaVideo(mediaUrl);
          const isFeat = v.isFeatured || v.featured;
          const isPub = v.isPublished !== false;

          return (
            <div
              key={v.id}
              className="p-3.5 rounded-2xl bg-neutral-900/60 border border-white/[0.08] flex flex-col gap-3 shadow-md"
            >
              <div className="flex items-start gap-3">
                {/* 9:16 Video Thumbnail Box */}
                <div className="relative w-16 h-24 rounded-xl overflow-hidden bg-neutral-950 border border-white/10 shadow-sm shrink-0 flex items-center justify-center">
                  {isVideo ? (
                    <>
                      <video
                        src={mediaUrl}
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play className="w-4 h-4 fill-white text-white opacity-80" />
                      </div>
                    </>
                  ) : (
                    <img
                      src={mediaUrl || '/images/piyush-avatar.png'}
                      alt={v.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Info Center */}
                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                    {v.title}
                  </h4>
                  <p className="text-[11px] text-neutral-400 truncate">
                    {v.clientName || v.client || 'Piyush Studio'}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                    <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase bg-white/[0.06] text-neutral-300 border border-white/[0.08]">
                      {v.category.split(' ')[0]}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {v.views} • {v.duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mobile Actions Bottom Row */}
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onToggleFeatured(v)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                      isFeat
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-white/[0.04] text-neutral-400 border border-white/[0.06]'
                    }`}
                  >
                    {isFeat ? '★ Featured' : 'Normal'}
                  </button>

                  <button
                    onClick={() => onTogglePublished(v)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                      isPub
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-neutral-800 text-neutral-500'
                    }`}
                  >
                    {isPub ? 'Live' : 'Hidden'}
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onOpenEditVideo(v)}
                    className="p-2 text-neutral-300 hover:text-white bg-white/[0.05] border border-white/[0.08] rounded-xl transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onDeleteVideo(v.id)}
                    className="p-2 text-red-400 hover:text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* 2. Desktop Videos Table (Visible on medium and larger screens) */}
      <div className="hidden md:block glass-panel rounded-2xl border border-white/[0.08] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.02] text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                <th className="py-3.5 px-4">Preview</th>
                <th className="py-3.5 px-4">Title &amp; Client</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Duration</th>
                <th className="py-3.5 px-4">Views</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-xs">
              {filteredList.map((v) => {
                const mediaUrl = v.thumbnailUrl || v.videoUrl;
                const isVideo = isMediaVideo(mediaUrl);
                const isFeat = v.isFeatured || v.featured;
                const isPub = v.isPublished !== false;

                return (
                  <tr key={v.id} className="hover:bg-white/[0.02] transition-colors">
                    
                    {/* Live Video Preview / Thumbnail */}
                    <td className="py-3 px-4">
                      <div className="relative w-12 h-18 rounded-lg overflow-hidden bg-neutral-900 border border-white/10 shadow-sm flex items-center justify-center">
                        {isVideo ? (
                          <>
                            <video
                              src={mediaUrl}
                              muted
                              playsInline
                              preload="metadata"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <Play className="w-3.5 h-3.5 fill-white text-white opacity-80" />
                            </div>
                          </>
                        ) : (
                          <img
                            src={mediaUrl || '/images/piyush-avatar.png'}
                            alt={v.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    </td>

                    {/* Title & Client */}
                    <td className="py-3 px-4 max-w-xs">
                      <div className="font-bold text-white truncate">{v.title}</div>
                      <div className="text-[11px] text-neutral-400 truncate mt-0.5">
                        {v.clientName || v.client || 'Piyush Studio'}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide bg-white/[0.06] text-neutral-300 border border-white/[0.08]">
                        {v.category}
                      </span>
                    </td>

                    {/* Duration */}
                    <td className="py-3 px-4 font-mono text-neutral-300">
                      {v.duration}
                    </td>

                    {/* Views */}
                    <td className="py-3 px-4 font-bold text-white">
                      {v.views}
                    </td>

                    {/* Featured Toggle */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => onToggleFeatured(v)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                          isFeat
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30' 
                            : 'bg-white/[0.04] text-neutral-400 border border-white/[0.06] hover:bg-white/[0.08]'
                        }`}
                      >
                        {isFeat ? '★ Featured' : 'Normal'}
                      </button>
                    </td>

                    {/* Published Toggle */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => onTogglePublished(v)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                          isPub
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-neutral-800 text-neutral-500'
                        }`}
                      >
                        {isPub ? 'Live' : 'Hidden'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onOpenEditVideo(v)}
                          className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/[0.08] rounded-lg transition-colors cursor-pointer"
                          title="Edit Project"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteVideo(v.id)}
                          className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                          title="Delete Video"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
