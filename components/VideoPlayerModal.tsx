'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  Clock,
  Trash2,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { VideoProject } from '@/lib/types';

interface VideoPlayerModalProps {
  video: VideoProject | null;
  allVideos: VideoProject[];
  onClose: () => void;
  onSelectVideo: (video: VideoProject) => void;
  onDeleteVideo?: (video: VideoProject) => void;
}

export default function VideoPlayerModal({
  video,
  allVideos,
  onClose,
  onSelectVideo,
  onDeleteVideo
}: VideoPlayerModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!video) return;

    setIsPlaying(true);
    setCurrentTime(0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [video]);

  if (!video) return null;

  const currentIndex = allVideos.findIndex((v) => v.id === video.id);

  const handleNext = () => {
    if (currentIndex < allVideos.length - 1) {
      onSelectVideo(allVideos[currentIndex + 1]);
    } else {
      onSelectVideo(allVideos[0]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectVideo(allVideos[currentIndex - 1]);
    } else {
      onSelectVideo(allVideos[allVideos.length - 1]);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted && videoRef.current.volume === 0) {
        videoRef.current.volume = 0.8;
        setVolume(0.8);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTo = parseFloat(e.target.value);
    setCurrentTime(seekTo);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTo;
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      
      {/* Outer Container */}
      <div className="relative w-full max-w-5xl bg-[#0E0E14] border border-white/[0.12] rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto max-h-[96vh]">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/[0.08] bg-[#121218]/90 z-20">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-xs font-bold text-neutral-300">
              {video.category} • <strong className="text-white">{video.client || video.clientName || 'Piyush Studio'}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            
            {/* Delete Button inside modal */}
            {onDeleteVideo && (
              <button
                onClick={() => onDeleteVideo(video)}
                className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors mr-2 cursor-pointer"
                title="Delete this video from portfolio"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={handlePrev}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/[0.08] rounded-lg transition-colors cursor-pointer"
              title="Previous Video (Left Arrow)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-[11px] font-semibold text-neutral-500">
              {currentIndex + 1} / {allVideos.length}
            </span>
            <button
              onClick={handleNext}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/[0.08] rounded-lg transition-colors cursor-pointer"
              title="Next Video (Right Arrow)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="ml-2 p-1.5 text-neutral-400 hover:text-white hover:bg-white/[0.08] rounded-lg transition-colors cursor-pointer"
              title="Close Modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Body: 2 Columns on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">
          
          {/* Left Column: 9:16 Video Player Stage (7 cols) */}
          <div className="lg:col-span-7 bg-black flex flex-col items-center justify-center relative p-2 sm:p-6 min-h-[420px] lg:min-h-[580px]">
            
            <div className="relative w-full max-w-[320px] sm:max-w-[340px] aspect-9-16 rounded-2xl overflow-hidden shadow-2xl border border-white/[0.1] bg-neutral-950">
              <video
                ref={videoRef}
                src={video.videoUrl}
                autoPlay
                playsInline
                loop
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                className="w-full h-full object-cover cursor-pointer"
              />

              {/* Center Play Overlay when paused */}
              {!isPlaying && (
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-white/90 text-neutral-950 flex items-center justify-center shadow-2xl scale-110">
                    <Play className="w-7 h-7 fill-neutral-950 ml-1" />
                  </div>
                </div>
              )}
            </div>

            {/* Video Controls Bar */}
            <div className="w-full max-w-[340px] mt-3 space-y-2">
              
              {/* Scrubber */}
              <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-mono">
                <span>{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <span>{formatTime(duration)}</span>
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="text-white hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={toggleMute}
                      className="text-white hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-16 h-1 bg-neutral-700 rounded appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.06]">
                    HD 1080p
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Project Details & Info (5 cols) */}
          <div className="lg:col-span-5 p-5 sm:p-7 space-y-5 bg-[#0E0E14] border-t lg:border-t-0 lg:border-l border-white/[0.08]">
            
            {/* Title & Client */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                {video.client || video.clientName || 'Piyush Studio'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-display text-white leading-tight">
                {video.title}
              </h3>
            </div>

            {/* Metrics Chips */}
            <div className="grid grid-cols-2 gap-3">
              <div className="glass-panel p-3 rounded-xl">
                <span className="text-[10px] text-neutral-400 font-semibold uppercase">Organic Views</span>
                <div className="text-lg font-black text-white flex items-center gap-1 mt-0.5">
                  <Eye className="w-4 h-4 text-blue-400" />
                  <span>{video.views}</span>
                </div>
              </div>

              <div className="glass-panel p-3 rounded-xl">
                <span className="text-[10px] text-neutral-400 font-semibold uppercase">Duration</span>
                <div className="text-lg font-black text-white flex items-center gap-1 mt-0.5">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span>{video.duration}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h5 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Editing Breakdown</h5>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {video.description}
              </p>
            </div>

            {/* Software Stack */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Software & Stack</h5>
              <div className="flex flex-wrap gap-1.5">
                {['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'CapCut Pro', 'Topaz Video AI'].map((tool, idx) => (
                  <span key={idx} className="text-[10px] font-semibold text-neutral-300 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Connect Call to Action */}
            <div className="pt-3 border-t border-white/[0.08] space-y-2">
              <a
                href={`https://wa.me/?text=Hi%20Piyush,%20I%20love%20the%20${encodeURIComponent(video.title)}%20video%20edit!%20Let's%20work%20together.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-400 via-indigo-300 to-white text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-lg shadow-blue-500/20"
              >
                <span>Discuss Similar Project (Free)</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <p className="text-[10px] text-neutral-500 text-center">
                100% Free Consultation • Quick WhatsApp Response
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
