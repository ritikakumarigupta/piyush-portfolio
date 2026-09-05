'use client';

import React, { useState } from 'react';
import { Plus, Search, Edit3, Trash2, Play, Eye, Clock, Film, Sparkles, CheckCircle2 } from 'lucide-react';
import { VideoProject } from '@/lib/types';

interface AdminVideosTabProps {
  videos: VideoProject[];
  onOpenAddVideo: () => void;
  onOpenEditVideo: (v: VideoProject) => void;
  onDeleteVideo: (id: string) => void;
  onToggleFeatured: (v: VideoProject) => void;
  onTogglePublished: (v: VideoProject) => void;
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
    const matchesCat = categoryFilter === 'All' || v.category === categoryFilter;
    const clientStr = v.clientName || v.client || '';
    const matchesSearch =
      searchQuery === '' ||
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clientStr.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const isMediaVideo = (url?: string) => {
    if (!url) return false;
    const clean = url.toLowerCase().split('?')[0];
    return clean.endsWith('.mp4') || clean.endsWith('.mov') || clean.endsWith('.webm') || clean.endsWith('.m4v');
  };

  return (
    <div className="space-y-6">
      
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-white/[0.08]">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, client..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white/[0.04] border border-white/[0.08] text-white rounded-xl placeholder-neutral-500 focus:outline-none focus:border-blue-500/50"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-[#14141B] border border-white/[0.08] text-neutral-200 rounded-xl focus:outline-none cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="AI & Brand Commercials">AI & Brand Commercials</option>
            <option value="Personal Brand">Personal Brand</option>
            <option value="Upcoming Mahabharat Project">Upcoming Mahabharat Project</option>
            <option value="Product Ads & UGC">Product Ads & UGC</option>
            <option value="Cinematic Short Films">Cinematic Short Films</option>
            <option value="Motion Graphics & Logo Stings">Motion Graphics & Logo Stings</option>
          </select>
        </div>

        <button
          onClick={onOpenAddVideo}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/30 active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Upload New Video</span>
        </button>
      </div>

      {/* Videos Table */}
      <div className="glass-panel rounded-2xl border border-white/[0.08] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.02] text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                <th className="py-3.5 px-4">Preview</th>
                <th className="py-3.5 px-4">Title & Client</th>
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
                          (v.isFeatured || v.featured)
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30' 
                            : 'bg-white/[0.04] text-neutral-400 border border-white/[0.06] hover:bg-white/[0.08]'
                        }`}
                      >
                        {(v.isFeatured || v.featured) ? '★ Featured' : 'Normal'}
                      </button>
                    </td>

                    {/* Published Toggle */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => onTogglePublished(v)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                          v.isPublished !== false
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-neutral-800 text-neutral-500'
                        }`}
                      >
                        {v.isPublished !== false ? 'Live' : 'Hidden'}
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
