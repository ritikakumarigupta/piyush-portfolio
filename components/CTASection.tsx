'use client';

import React from 'react';
import { ArrowUpRight, Mail, Sparkles } from 'lucide-react';
import { SiteSettings } from '@/lib/types';

interface CTASectionProps {
  settings?: SiteSettings;
}

export default function CTASection({ settings }: CTASectionProps) {
  const email = settings?.contactEmail || 'chameliedits@gmail.com';

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 md:py-28 bg-neutral-950 text-white relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neutral-800/40 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-neutral-300 backdrop-blur-md mb-6 border border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Open for Creative Projects &amp; Collaborations</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display max-w-3xl mx-auto leading-[1.1]">
          Have a video project in mind?
        </h2>

        <p className="mt-5 text-base sm:text-xl text-neutral-400 max-w-xl mx-auto font-normal leading-relaxed">
          Let&apos;s turn your raw footage into scroll-stopping content that drives views, followers, and engagement.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            onClick={handleScrollToContact}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-white text-neutral-950 hover:bg-neutral-200 transition-all shadow-xl active:scale-95 cursor-pointer"
          >
            <span>Let&apos;s Work Together</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${email}?subject=Video%20Editing%20Collaboration%20-%20Piyush`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/15 backdrop-blur-md transition-all active:scale-95"
          >
            <Mail className="w-4 h-4" />
            <span>Email Me</span>
          </a>
        </div>

      </div>
    </section>
  );
}