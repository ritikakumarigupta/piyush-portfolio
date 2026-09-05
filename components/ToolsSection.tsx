'use client';

import React from 'react';
import { Wrench } from 'lucide-react';

const TOOLS = [
  { name: 'Adobe Premiere Pro', category: 'Assembly & Master Cut', color: '#9999FF' },
  { name: 'After Effects', category: 'Motion Graphics & 3D', color: '#9999FF' },
  { name: 'CapCut', category: 'Fast Viral Mobile FX', color: '#000000' },
  { name: 'DaVinci Resolve', category: 'Broadcast Color Grading', color: '#FF7744' },
  { name: 'Photoshop', category: 'Thumbnail & Texture Design', color: '#31A8FF' },
  { name: 'Canva', category: 'Asset Prep & Layouts', color: '#00C4CC' },
];

export default function ToolsSection() {
  return (
    <section className="py-16 md:py-20 bg-[#FAFAFA] border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-neutral-200/70 text-neutral-800 mb-3">
            <Wrench className="w-3.5 h-3.5" />
            <span>Hardware & Software Stack</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 font-display">
            Tools I Use
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-500">
            Industry-standard digital post-production suite utilized daily to deliver crisp 4K vertical exports.
          </p>
        </div>

        {/* Clean Badges Grid (No Fake Percentages) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {TOOLS.map((tool) => (
            <div
              key={tool.name}
              className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm hover:border-neutral-400 hover:shadow-md transition-all duration-200 flex flex-col items-center text-center justify-center group"
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-neutral-100 text-neutral-900 font-bold font-display text-sm group-hover:scale-110 transition-transform"
              >
                {tool.name.slice(0, 2).toUpperCase()}
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900 leading-tight">
                {tool.name}
              </h4>
              <span className="text-[10px] text-neutral-400 mt-1 font-mono">
                {tool.category}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}