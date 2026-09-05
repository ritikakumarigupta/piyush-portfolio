'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Search, Edit3, Trash2 } from 'lucide-react';
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

  return (
    <div className="space-y-6">
      
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-neutral-200">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, client..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-800"
          >
            <option value="All">All Categories</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Product">Product</option>
            <option value="Travel">Travel</option>
            <option value="Fashion">Fashion</option>
            <option value="Food">Food</option>
            <option value="Educational">Educational</option>
          </select>
        </div>

        <button
          onClick={onOpenAddVideo}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Reel</span>
        </button>
      </div>

      {/* Videos Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/50 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                <th className="py-3 px-4">Preview</th>
                <th className="py-3 px-4">Title &amp; Client</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Views</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-150 text-xs">
              {filteredList.map((v) => (
                <tr key={v.id} className="hover:bg-neutral-50/80 transition-colors">
                  
                  {/* Thumbnail */}
                  <td className="py-3 px-4">
                    <div className="relative w-10 h-16 rounded-md overflow-hidden bg-neutral-900 border border-neutral-200">
                      <Image
                        src={v.thumbnailUrl}
                        alt={v.title}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                  </td>

                  {/* Title & Client */}
                  <td className="py-3 px-4 max-w-xs">
                    <div className="font-bold text-neutral-950 truncate">{v.title}</div>
                    <div className="text-[11px] text-neutral-500 truncate">{v.clientName || v.client || 'Piyush Studio'} {v.editingStyle ? `• ${v.editingStyle}` : ''}</div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide bg-neutral-100 text-neutral-700">
                      {v.category}
                    </span>
                  </td>

                  {/* Duration */}
                  <td className="py-3 px-4 font-mono text-neutral-600">
                    {v.duration}
                  </td>

                  {/* Views */}
                  <td className="py-3 px-4 font-bold text-neutral-900">
                    {v.views}
                  </td>

                  {/* Featured Toggle */}
                  <td className="py-3 px-4">
                    <button
                      onClick={() => onToggleFeatured(v)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                        (v.isFeatured || v.featured)
                          ? 'bg-amber-100 text-amber-900 hover:bg-amber-200' 
                          : 'bg-neutral-100 text-neutral-400 hover:bg-neutral-200'
                      }`}
                    >
                      {(v.isFeatured || v.featured) ? '★ Featured' : 'Normal'}
                    </button>
                  </td>

                  {/* Published Toggle */}
                  <td className="py-3 px-4">
                    <button
                      onClick={() => onTogglePublished(v)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                        v.isPublished !== false
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-neutral-100 text-neutral-400'
                      }`}
                    >
                      {v.isPublished !== false ? 'Live' : 'Draft'}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onOpenEditVideo(v)}
                        className="p-1.5 rounded-lg text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 cursor-pointer"
                        title="Edit Video"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteVideo(v.id)}
                        className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                        title="Delete Video"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}