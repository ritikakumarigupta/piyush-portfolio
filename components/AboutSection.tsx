'use client';

import React from 'react';
import { 
  CheckCircle2, 
  ArrowUpRight, 
  Sparkles, 
  Layers, 
  Film, 
  Scissors, 
  Wand2, 
  Video, 
  Tv, 
  Zap, 
  Palette,
  MessageCircle,
  FileCode2
} from 'lucide-react';

export default function AboutSection() {
  const expertiseItems = [
    { title: 'Skilled in Video Editing', desc: 'Fast-paced storytelling, dynamic cuts, and retention hooks' },
    { title: 'Motion Graphics & VFX', desc: 'Kinetic title design, logo stings, and particle animations' },
    { title: 'DaVinci Resolve Color Grading', desc: 'Cinematic color depth, skin tone balancing, and film look' },
    { title: 'AI Video & Generative Visuals', desc: 'Midjourney + Runway Gen-3 photorealistic motion integration' },
    { title: 'Social Media Growth Engineering', desc: 'Instagram Reels, YouTube Shorts, and TikTok ads' },
    { title: 'Sound Design & Foley SFX', desc: 'Custom risers, bass drops, ambient textures, and vocal mixing' }
  ];

  const tools = [
    { name: 'Premiere Pro', category: 'NLE Editing' },
    { name: 'After Effects', category: 'Motion Design' },
    { name: 'DaVinci Resolve', category: 'Color & Studio' },
    { name: 'Photoshop', category: 'Graphics & Thumbnails' },
    { name: 'Midjourney', category: 'AI Visuals' },
    { name: 'Runway Gen-3', category: 'AI Video Motion' },
    { name: 'ElevenLabs', category: 'Voice Synthesis' },
    { name: 'Blender 3D', category: '3D VFX Elements' }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 md:py-28 border-t border-white/[0.08] relative bg-[#020204]">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-10 w-96 h-96 glow-theme-orb rounded-full blur-[130px] pointer-events-none -z-10 opacity-20"></div>

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Main Side-by-Side Grid: Left Photo Card, Right Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT COLUMN (5 cols): Behance-Style Layered Framed Portrait Photo */}
          <div className="lg:col-span-5 flex justify-center lg:sticky lg:top-24">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Background Color Frame Box (Layered behind photo like in Behance reference) */}
              <div className="absolute -inset-2 sm:-inset-3 rounded-3xl bg-gradient-to-br from-theme-primary/40 via-red-950/30 to-black border border-white/10 -rotate-2 scale-[1.02] -z-10 shadow-2xl"></div>

              {/* Main Photo Card */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-950 border border-white/[0.15] shadow-[0_20px_50px_rgba(0,0,0,0.9)] group">
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <img
                    src="/images/piyush-portrait.jpg"
                    alt="Piyush Kumar Gupta"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle Dark Gradient Overlay at Bottom */}
                  <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

                  {/* Floating Creator Badge */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] sm:text-xs font-bold text-white border border-white/20 flex items-center gap-1.5 shadow-xl">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      PIYUSH KUMAR GUPTA
                    </span>
                  </div>

                  {/* Bottom Text Over Photo */}
                  <div className="absolute bottom-3.5 inset-x-3.5 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-left">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Film className="w-3.5 h-3.5 text-theme-primary" />
                      <span>Senior Video Editor &amp; Motion Artist</span>
                    </div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">
                      DaVinci Resolve • Premiere Pro • After Effects • AI
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN (7 cols): Bagal Me Content (Hi I am Piyush Kumar Gupta + Bio + Expertise + Software) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* 1. Header & Bio */}
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold tracking-widest text-neutral-400 uppercase font-mono">
                  Hi I am,
                </span>
                <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-none">
                  Piyush <span className="text-theme-primary">Kumar Gupta</span>
                </h2>
                <div className="text-xs sm:text-sm font-bold text-neutral-300 pt-1 tracking-wide">
                  Video Editor <span className="text-theme-primary">·</span> Motion Graphics Designer <span className="text-theme-primary">·</span> AI Video Creator
                </div>
              </div>

              {/* Exact Bio Text from User */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal shadow-sm">
                <p>
                  <strong className="text-white font-semibold">3+ years turning raw footage and half-formed ideas into videos people actually watch till the end.</strong> I cut, color, and animate across <span className="text-white font-medium">DaVinci Resolve, Premiere Pro, and After Effects</span> — and lately I&apos;ve been folding AI video tools into that workflow to move faster without losing craft. Whether it&apos;s a narrative edit, a motion graphics package, or a fully AI-assisted piece, the goal stays the same: <strong className="text-theme-primary font-semibold">make every frame earn its place.</strong>
                </p>
              </div>
            </div>

            {/* 2. EXPERTISE SECTION (Matching Behance Style Layout) */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2">
                <ArrowUpRight className="w-5 h-5 text-theme-primary" />
                <h3 className="text-lg sm:text-xl font-black font-display text-white tracking-tight uppercase">
                  EXPERTISE &amp; SKILLS
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {expertiseItems.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-theme transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-theme shrink-0"></span>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-theme-primary transition-colors">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1 pl-3.5 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. SOFTWARE & AI PROFICIENCY */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-theme-primary" />
                <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Software &amp; AI Proficiency
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {tools.map((tool, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-theme transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span className="text-xs font-semibold text-white">{tool.name}</span>
                    <span className="text-[10px] text-neutral-500 font-mono">({tool.category})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="https://wa.me/916202842908?text=Hi%20Piyush,%20I%20saw%20your%20portfolio%20and%20want%20to%20collaborate%20on%20a%20video!"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-theme-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-lg active:scale-[0.98] min-h-[44px] touch-manipulation"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Let&apos;s Work Together (WhatsApp)</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-neutral-300 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] rounded-xl transition-colors min-h-[44px] touch-manipulation"
              >
                <span>Free Strategy Call</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
