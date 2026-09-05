'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, SlidersHorizontal, Heart, Shield } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-white/[0.08] bg-[#0A0A0C] text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-black text-xs">
              P
            </div>
            <div>
              <span className="font-extrabold text-white text-sm">PIYUSH</span>
              <p className="text-[11px] text-neutral-500">Short Video Editor & VFX Specialist</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <a href="#work" className="hover:text-white transition-colors">Works</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            <Link href="/admin" className="text-neutral-500 hover:text-white flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>CMS Admin</span>
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-neutral-400 hover:text-white transition-colors"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-neutral-600">
          <div>© {new Date().getFullYear()} PIYUSH. All rights reserved. 100% Free Open Portfolio.</div>
          <div className="flex items-center gap-1">
            <span>Built with Next.js 15 & React 19</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
