'use client';

import React from 'react';
import { VideoProject } from '@/lib/types';
import VideoCard from './VideoCard';
import { Sparkles, ArrowRight, Flame } from 'lucide-react';

interface FeaturedWorkProps {
  videos: VideoProject[];
  onOpenVideo: (video: VideoProject) => void;
}

export default function FeaturedWork({ videos, onOpenVideo }: FeaturedWorkProps) {
  const featured = videos.filter((v) => (v.featured || v.isFeatured)).slice(0, 4);

  if (featured.length === 0) return null;

  return (
    <section id="featured" className="py-12 md:py-16 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>Spotlight Showreel</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-white tracking-tight">
              Curated Masterpieces & High-Retention Edits
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
              Hand-picked viral reels, AI commercials, and 3D visual trailers with millions of verified organic views.
            </p>
          </div>

          <a
            href="#work"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors group"
          >
            <span>Browse All 32+ Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 4-Column Spotlight Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((video) => (
            <VideoCard key={video.id} video={video} onOpen={onOpenVideo} />
          ))}
        </div>

      </div>
    </section>
  );
}
