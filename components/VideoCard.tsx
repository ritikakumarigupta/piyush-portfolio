'use client';

import React, { useState, useRef } from 'react';
import { Play, Eye, Clock, Trash2, Sparkles, Volume2, Film } from 'lucide-react';
import { VideoProject } from '@/lib/types';

interface VideoCardProps {
  video: VideoProject;
  onOpen: (video: VideoProject) => void;
  isDeleteMode?: boolean;
  onDelete?: (e: React.MouseEvent, video: VideoProject) => void;
}

export default function VideoCard({ video, onOpen, isDeleteMode, onDelete }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onClick={() => onOpen(video)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative cursor-pointer rounded-2xl overflow-hidden glass-panel border transition-all duration-300 hover:-translate-y-1.5 shadow-lg hover:shadow-2xl hover:shadow-black/60 flex flex-col ${
        isDeleteMode ? 'border-red-500/50 hover:border-red-500' : 'border-white/[0.08] hover:border-white/25'
      }`}
    >
      {/* 9:16 Media Container */}
      <div className="relative w-full aspect-9-16 bg-neutral-900 overflow-hidden">
        
        {/* Video Preview Element */}
        <video
          ref={videoRef}
          src={video.videoUrl}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-bold text-white border border-white/10 uppercase tracking-wide">
            {video.category.split(' ')[0]}
          </span>

          <span className="px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-bold text-neutral-200 flex items-center gap-1 border border-white/10">
            <Eye className="w-3 h-3 text-blue-400" />
            <span>{video.views}</span>
          </span>
        </div>

        {/* Quick Delete Overlay Button in Delete Mode */}
        {isDeleteMode && onDelete && (
          <div className="absolute top-2 right-2 z-20">
            <button
              onClick={(e) => onDelete(e, video)}
              className="p-2 rounded-xl bg-red-600 hover:bg-red-500 text-white shadow-xl shadow-red-600/50 transition-all hover:scale-110 cursor-pointer"
              title="Delete This Video"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Hover Center Play Action Button */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/90 group-hover:bg-white text-neutral-950 flex items-center justify-center shadow-xl shadow-black/50 transition-transform duration-300 group-hover:scale-110">
            <Play className="w-5 h-5 fill-neutral-950 ml-0.5" />
          </div>
        </div>

        {/* Bottom Duration Badge */}
        <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
          <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-semibold text-neutral-300 flex items-center gap-1 border border-white/10">
            <Clock className="w-3 h-3 text-neutral-400" />
            <span>{video.duration}</span>
          </span>
        </div>

      </div>

      {/* Card Info Footer */}
      <div className="p-3.5 space-y-1 bg-[#121218]/90">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-blue-400 truncate max-w-[150px]">
            {video.client || video.clientName || 'Piyush Studio'}
          </span>
          {(video.featured || video.isFeatured) && (
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Featured
            </span>
          )}
        </div>

        <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-blue-300 transition-colors">
          {video.title}
        </h4>

        {/* Tag pills */}
        <div className="flex items-center gap-1 pt-1 overflow-hidden">
          {(video.tags || []).slice(0, 2).map((t, idx) => (
            <span key={idx} className="text-[9px] text-neutral-400 bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/[0.06] whitespace-nowrap">
              #{t}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}
