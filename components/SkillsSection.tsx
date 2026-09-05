'use client';

import React from 'react';
import { Layers, Sparkles } from 'lucide-react';

const SKILLS = [
  { name: 'Fast-paced editing', category: 'Pacing' },
  { name: 'Cinematic cuts', category: 'Narrative' },
  { name: 'Motion graphics', category: 'VFX' },
  { name: 'Text animations', category: 'Typography' },
  { name: 'Captions/Subtitles', category: 'Retention' },
  { name: 'Sound design', category: 'Audio' },
  { name: 'Color correction', category: 'Grading' },
  { name: 'Beat synchronization', category: 'Rhythm' },
  { name: 'Viral-style storytelling', category: 'Hooks' },
  { name: 'Social media optimization', category: 'Growth' },
];

export default function SkillsSection() {
  return (
    <section className="py-16 md:py-20 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-neutral-100 text-neutral-800 mb-2 border border-neutral-200">
              <Layers className="w-3.5 h-3.5" />
              <span>Technical Craft</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 font-display">
              Editing Skills
            </h2>
          </div>
          <p className="text-neutral-500 text-xs sm:text-sm max-w-md">
            Proven post-production capabilities focused on high retention, visual engagement, and broadcast polish without gimmick bars.
          </p>
        </div>

        {/* Elegant Tag Pills */}
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {SKILLS.map((skill) => (
            <div
              key={skill.name}
              className="group cursor-default inline-flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#FAFAFA] hover:bg-neutral-900 border border-neutral-200/90 hover:border-neutral-900 transition-all duration-200 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-neutral-400 group-hover:bg-emerald-400 transition-colors" />
              <span className="text-xs sm:text-sm font-semibold text-neutral-900 group-hover:text-white transition-colors">
                {skill.name}
              </span>
              <span className="text-[10px] font-mono uppercase text-neutral-400 group-hover:text-neutral-400 transition-colors ml-1">
                {skill.category}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}