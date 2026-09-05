'use client';

import React from 'react';
import { FileText, Scissors, MessageSquare, Send } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    title: 'Brief',
    description: 'Understand the brand, project, audience, and creative direction.',
    icon: <FileText className="w-5 h-5 text-neutral-900" />,
    details: 'Asset transfer via Google Drive/Dropbox, review of references, script pacing alignment, and audio selection.'
  },
  {
    number: '02',
    title: 'Edit',
    description: 'Create engaging cuts, pacing, captions, transitions, motion graphics, and sound design.',
    icon: <Scissors className="w-5 h-5 text-neutral-900" />,
    details: 'Rough cut assembly, velocity ramps, sound effects layering, kinetic titles, and DaVinci color grading.'
  },
  {
    number: '03',
    title: 'Review',
    description: 'Collect client feedback and make revisions.',
    icon: <MessageSquare className="w-5 h-5 text-neutral-900" />,
    details: 'Frame-accurate review via Frame.io or timestamped notes, rapid turnaround on tweaks until 100% satisfied.'
  },
  {
    number: '04',
    title: 'Deliver',
    description: 'Deliver the final optimized video ready for social media.',
    icon: <Send className="w-5 h-5 text-neutral-900" />,
    details: 'Master exports in 9:16 vertical 4K/1080p, optimized bitrates for Instagram, TikTok, and YouTube Shorts.'
  }
];

export default function ProcessSection() {
  return (
    <section className="py-20 md:py-28 bg-[#FAFAFA] border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-neutral-200/70 text-neutral-800 mb-3">
            <span>Seamless Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 font-display">
            How I Work
          </h2>
          <p className="mt-3 text-neutral-600 text-sm sm:text-base">
            A battle-tested 4-step production framework from raw camera cards to final viral social delivery.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((step, idx) => (
            <div
              key={step.number}
              className="editorial-card p-6 sm:p-7 rounded-3xl bg-white border border-neutral-200 shadow-sm flex flex-col justify-between relative"
            >
              <div>
                {/* Step Header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-black font-display text-neutral-300">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold font-display text-neutral-950">
                  {step.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm font-medium text-neutral-800 leading-snug">
                  {step.description}
                </p>

                <p className="mt-4 pt-4 border-t border-neutral-100 text-xs text-neutral-500 leading-relaxed">
                  {step.details}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1 text-[11px] font-mono text-neutral-400">
                <span>Phase {idx + 1} of 4</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}