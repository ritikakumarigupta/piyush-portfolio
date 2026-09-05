'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { 
  Play, 
  ArrowUpRight, 
  Download, 
  Eye, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  TrendingUp, 
  CheckCircle, 
  Flame,
  Layers,
  Award
} from 'lucide-react';

interface HeroProps {
  onPlayShowreel?: () => void;
}

export default function Hero({ onPlayShowreel }: HeroProps) {
  const [heroVideoMuted, setHeroVideoMuted] = useState(true);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);

  const toggleHeroSound = () => {
    if (heroVideoRef.current) {
      heroVideoRef.current.muted = !heroVideoRef.current.muted;
      setHeroVideoMuted(heroVideoRef.current.muted);
    }
  };

  const creatorNiches = [
    'AI Brand Commercials',
    'Viral Instagram Reels',
    'YouTube Shorts Growth',
    'Mahabharat 3D Visuals',
    'Kinetic Typography & Captions',
    'Sound Design & SFX',
    'DaVinci Color Grading',
    'UGC & TikTok Ads',
    'Talking Head Podcasts'
  ];

  return (
    <section className="relative pt-4 pb-12 sm:pt-8 sm:pb-20 md:pt-12 md:pb-24 overflow-hidden">
      
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-10 left-1/4 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-40 right-1/4 translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Top Creator Status Pill */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] backdrop-blur-md shadow-lg shadow-black/40">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-neutral-200">
              Open for Projects • 100% Free Creative Consultation
            </span>
          </div>
        </div>

        {/* Main Grid: Left Headline & Bio, Right Live Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
            
            {/* Real Workstation Photo Pill Badge */}
            <div className="inline-flex items-center gap-2.5 p-1.5 pr-4 rounded-full bg-white/[0.04] border border-white/[0.08] mx-auto lg:mx-0">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-blue-400 shrink-0">
                <img
                  src="/images/piyush-avatar.png"
                  alt="Piyush at desk"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <span className="text-xs font-bold text-white">Piyush</span>
              <span className="text-[10px] text-neutral-400 font-medium">| Senior Video Editor</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-[1.1]">
              I Edit Videos That Don't Just Look Good — They{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                Dominate Feeds & Command Millions of Views.
              </span>
            </h1>

            <p className="text-xs sm:text-base lg:text-lg text-neutral-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Specialized in <strong className="text-white font-semibold">AI Commercials, Viral Reels, TikTok Ads, and Mahabharat Epic 3D Visuals</strong>. Combining retention-engineered hooks, kinetic typography, and Hollywood-grade sound design.
            </p>

            {/* Quick Metrics Bar (Touch-friendly cards) */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 max-w-lg mx-auto lg:mx-0 pt-1">
              <div className="glass-panel p-3 sm:p-3.5 rounded-2xl text-center lg:text-left">
                <div className="text-xl sm:text-3xl font-black text-white flex items-center justify-center lg:justify-start gap-1 font-display">
                  <span>50M+</span>
                  <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400" />
                </div>
                <div className="text-[9px] sm:text-[11px] font-medium text-neutral-400 uppercase tracking-wider mt-0.5">Total Views</div>
              </div>

              <div className="glass-panel p-3 sm:p-3.5 rounded-2xl text-center lg:text-left">
                <div className="text-xl sm:text-3xl font-black text-white flex items-center justify-center lg:justify-start gap-1 font-display">
                  <span>32+</span>
                  <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                </div>
                <div className="text-[9px] sm:text-[11px] font-medium text-neutral-400 uppercase tracking-wider mt-0.5">Real Projects</div>
              </div>

              <div className="glass-panel p-3 sm:p-3.5 rounded-2xl text-center lg:text-left">
                <div className="text-xl sm:text-3xl font-black text-white flex items-center justify-center lg:justify-start gap-1 font-display">
                  <span>88%+</span>
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                </div>
                <div className="text-[9px] sm:text-[11px] font-medium text-neutral-400 uppercase tracking-wider mt-0.5">Avg Retention</div>
              </div>
            </div>

            {/* Action Buttons (Full width on small phones, inline on larger screens) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-2">
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold text-neutral-950 bg-gradient-to-r from-blue-400 via-indigo-200 to-white hover:opacity-95 rounded-xl transition-all shadow-xl shadow-blue-500/25 active:scale-[0.98] min-h-[44px] touch-manipulation"
              >
                <Play className="w-4 h-4 fill-neutral-950" />
                <span>Explore 32+ Videos</span>
              </a>

              <a
                href="https://wa.me/?text=Hi%20Piyush,%20I%20saw%20your%20video%20editing%20portfolio%20and%20would%20love%20to%20discuss%20a%20project!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-lg shadow-emerald-600/20 active:scale-[0.98] min-h-[44px] touch-manipulation"
              >
                <span>WhatsApp Connect</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-neutral-300 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] rounded-xl transition-colors min-h-[44px] touch-manipulation"
              >
                <span>Free Strategy Call</span>
              </a>
            </div>

          </div>

          {/* Right Column (5 cols): Interactive Floating Reel Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-9-16 rounded-3xl overflow-hidden glass-panel border border-white/[0.15] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] group">
              
              {/* Video Element */}
              <video
                ref={heroVideoRef}
                src="/gdrive_videos/Ai video/Brand/aurabella 01.mp4"
                autoPlay
                loop
                muted={heroVideoMuted}
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Top Video Overlay Badge */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between z-10">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] sm:text-[11px] font-bold text-white flex items-center gap-1.5 border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  LIVE SHOWCASE
                </span>

                {/* Sound Button */}
                <button
                  onClick={toggleHeroSound}
                  className="p-2 sm:p-2.5 rounded-full bg-black/70 backdrop-blur-md text-white hover:bg-black/90 transition-colors border border-white/20 touch-manipulation min-w-[38px] min-h-[38px] flex items-center justify-center cursor-pointer"
                  title={heroVideoMuted ? "Click to Unmute" : "Mute Video"}
                >
                  {heroVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-blue-400" />}
                </button>
              </div>

              {/* Bottom Video Info Card */}
              <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 bg-gradient-to-t from-black via-black/80 to-transparent z-10 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-500/30 text-blue-300 border border-blue-500/40">
                    AI Commercial
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-neutral-300 font-medium truncate">
                    Aurabella Luxury Brand
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-white leading-tight">
                  High-Converting 3D Visual & AI Motion Master
                </h3>

                {/* Equalizer Wave Bars */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-end gap-1 h-4 sm:h-5">
                    <span className="w-1 bg-blue-400 rounded-full bar-1"></span>
                    <span className="w-1 bg-indigo-400 rounded-full bar-2"></span>
                    <span className="w-1 bg-purple-400 rounded-full bar-3"></span>
                    <span className="w-1 bg-cyan-400 rounded-full bar-4"></span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-neutral-400">
                    1.4M Views • 45s
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Infinite Creator & Brand Marquee Ticker */}
        <div className="mt-10 sm:mt-14 pt-4 sm:pt-6 border-t border-white/[0.08] overflow-hidden">
          <div className="text-center mb-2.5 sm:mb-3">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-neutral-500">
              TRUSTED CONTENT CATEGORIES & HIGH-IMPACT NICHES
            </span>
          </div>

          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="animate-marquee gap-3 sm:gap-4 py-2">
              {[...creatorNiches, ...creatorNiches].map((niche, idx) => (
                <div
                  key={idx}
                  className="px-3.5 sm:px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] sm:text-xs font-semibold text-neutral-300 whitespace-nowrap flex items-center gap-2"
                >
                  <Sparkles className="w-3 h-3 text-blue-400" />
                  <span>{niche}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
