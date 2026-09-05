'use client';

import React from 'react';
import { 
  Sparkles, 
  Layers, 
  Flame, 
  Sliders, 
  Type, 
  Volume2, 
  Wand2, 
  Target,
  ArrowUpRight
} from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      icon: <Flame className="w-5 h-5 text-orange-400" />,
      title: 'Viral Hook Engineering',
      desc: 'First 2.5 seconds designed to halt the scroll with high-impact visual punches, pattern interrupts, and curiosity pacing.'
    },
    {
      icon: <Wand2 className="w-5 h-5 text-purple-400" />,
      title: 'AI Commercials & Generative VFX',
      desc: 'Next-generation AI video generation, character age morphing, seamless transitions, and photorealistic 3D rendering.'
    },
    {
      icon: <Type className="w-5 h-5 text-blue-400" />,
      title: 'Kinetic Subtitles & Typography',
      desc: 'Custom animated subtitles with pop-in emojis, sound synchronized highlights, and branded typography.'
    },
    {
      icon: <Volume2 className="w-5 h-5 text-emerald-400" />,
      title: 'Cinematic Sound Design & SFX',
      desc: 'Multi-layered Foley SFX, whooshes, risers, bass impacts, and clean vocal EQ to create an immersive audio journey.'
    },
    {
      icon: <Sliders className="w-5 h-5 text-cyan-400" />,
      title: 'DaVinci Film Color Grading',
      desc: 'Rich Hollywood color science, skin tone preservation, custom film LUTs, and atmospheric mood lighting.'
    },
    {
      icon: <Target className="w-5 h-5 text-amber-400" />,
      title: 'Retention & Pacing Architecture',
      desc: 'Eliminating dead air with dynamic jump-cuts, speed ramps, whip pans, and retention-maximizing b-roll layering.'
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Editing Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
            How I Make Short-Form Videos Go Viral
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            A comprehensive editing system tailored for creators, founders, and modern brands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl space-y-3.5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                {s.icon}
              </div>
              <h3 className="text-base font-bold text-white">
                {s.title}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
