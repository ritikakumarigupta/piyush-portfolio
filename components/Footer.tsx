'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, SlidersHorizontal, MessageCircle, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-white/[0.08] bg-[#0A0A0C] text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500/80 shrink-0">
              <img
                src="/images/piyush-avatar.png"
                alt="Piyush Video Editor"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <span className="font-extrabold text-white text-sm">PIYUSH</span>
              <p className="text-[11px] text-neutral-500">Short Video Editor & VFX Specialist</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs">
            <a 
              href="https://wa.me/916202842908" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>+91 6202842908</span>
            </a>

            <a 
              href="mailto:piyushkumargupta159@gmail.com" 
              className="hover:text-blue-400 flex items-center gap-1.5 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>piyushkumargupta159@gmail.com</span>
            </a>

            <Link href="/admin" className="text-neutral-500 hover:text-white flex items-center gap-1 transition-colors">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>CMS</span>
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-neutral-600">
          <div>© {new Date().getFullYear()} PIYUSH. All rights reserved. 100% Free Open Portfolio.</div>
          <div className="flex items-center gap-1">
            <span>Built for Speed, Retention & Scale</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
