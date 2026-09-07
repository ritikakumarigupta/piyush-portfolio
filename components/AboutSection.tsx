'use client';

import React from 'react';
import { Award, CheckCircle2, Flame, ArrowUpRight, Film, Monitor, Sparkles } from 'lucide-react';

export default function AboutSection() {
  const highlights = [
    '5+ Years of Dedicated Short-Form & Vertical Video Crafting',
    'Specialist in AI Video Generation & Hollywood Sound Design',
    'Edited for Top Tier Tech Creators, Celebrities & E-Commerce Brands',
    'Proven Retention Architecture: 88%+ Average View Duration',
    'Fast Turnaround Times & 100% Free Open Collaboration'
  ];

  return (
    <section id="about" className="py-14 sm:py-20 md:py-24 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Real Workstation Photo Showcase (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden glass-panel border border-white/[0.15] p-2 sm:p-2.5 shadow-2xl group">
              
              <div className="relative w-full aspect-[4/3] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-950">
                <img
                  src="/images/piyush-workstation.png"
                  alt="Piyush at Video Editing Workstation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Live Workstation Tag Overlay */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-bold text-white border border-white/20 flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    PIYUSH AT TIMELINE
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-0 inset-x-0 p-3.5 bg-gradient-to-t from-black via-black/70 to-transparent">
                  <span className="text-xs font-bold text-blue-400">Premiere Pro & DaVinci Suite</span>
                  <p className="text-[11px] text-neutral-300">Crafting high-retention cuts & Hollywood sound design</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Bio & Highlights (7 cols) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
            
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                About the Editor
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-display text-white tracking-tight leading-tight">
                Turning Raw Footage into High-Impact Viral Media.
              </h2>
            </div>

            <p className="text-xs sm:text-base text-neutral-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Hey, I&apos;m <strong className="text-white font-bold">Piyush</strong>. I don&apos;t treat video editing as simple cutting and pasting — I treat it as visual psychology. Every frame, every sound effect, every animated subtitle, and every color grade is engineered to hold attention from the first second to the last.
            </p>

            {/* Checklist */}
            <div className="space-y-2.5 pt-1 text-left max-w-lg mx-auto lg:mx-0">
              {highlights.map((h, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-neutral-300 font-medium">
                    {h}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold text-neutral-950 bg-gradient-to-r from-blue-400 to-indigo-300 rounded-xl hover:opacity-95 transition-opacity min-h-[44px] touch-manipulation"
              >
                <span>Let&apos;s Connect (Free Consultation)</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/916202842908?text=Hi%20Piyush,%20let's%20collaborate%20on%20a%20video%20project!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-xs font-bold text-neutral-300 hover:text-white bg-white/[0.04] border border-white/[0.08] rounded-xl transition-colors min-h-[44px] touch-manipulation"
              >
                <span>Quick WhatsApp Chat</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
