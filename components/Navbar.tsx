'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, Download, SlidersHorizontal, CheckCircle2 } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('featured');
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { label: 'Featured', href: '#featured', id: 'featured' },
    { label: 'All Works', href: '#work', id: 'work' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Results', href: '#results', id: 'results' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);

      const sections = ['featured', 'work', 'services', 'about', 'results', 'contact'];
      const scrollPosition = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'glass-nav py-2.5 sm:py-3 shadow-[0_8px_30px_rgba(0,0,0,0.6)]' 
        : 'bg-[#050508]/90 py-3.5 sm:py-4.5 border-b border-white/[0.06]'
    }`}>
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Left with Avatar Photo */}
          <Link href="/" className="group flex items-center gap-2.5 sm:gap-3 focus:outline-none touch-manipulation">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-blue-500/80 shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform shrink-0">
              <img
                src="/images/piyush-avatar.png"
                alt="Piyush Video Editor"
                className="w-full h-full object-cover object-top"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border border-black rounded-full"></span>
            </div>

            <div className="flex flex-col">
              <span className="font-black text-base sm:text-lg tracking-tight text-white font-display flex items-center gap-1.5 group-hover:text-theme-primary transition-colors leading-none">
                PIYUSH
                <CheckCircle2 className="w-3.5 h-3.5 text-theme-primary fill-blue-400/20" />
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-neutral-400 mt-0.5">
                Video Editor &amp; VFX
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] p-1 rounded-full border border-white/[0.08] backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-neutral-950 font-bold shadow-md shadow-white/10'
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons Right (Desktop) */}
          <div className="hidden md:flex items-center gap-2.5">
            <Link
              href="/api/resume"
              target="_blank"
              download="PIYUSH_Video_Editor_Resume.html"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-300 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] rounded-xl transition-all shadow-sm"
              title="Download Piyush's Resume"
            >
              <Download className="w-3.5 h-3.5 text-neutral-400" />
              <span>Resume</span>
            </Link>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center gap-1.5 px-4.5 py-2 text-xs font-bold text-neutral-950 btn-theme-primary hover:opacity-95 rounded-xl transition-all shadow-lg  hover:scale-[1.02]"
            >
              <span>Free Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Admin CMS access */}
            <Link
              href="/admin"
              className="p-2 text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06] rounded-xl transition-colors"
              title="Admin CMS Dashboard"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-3 py-1.5 text-xs font-bold text-neutral-950 bg-gradient-to-r from-blue-400 to-indigo-200 rounded-xl"
            >
              Inquire
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white bg-white/[0.05] border border-white/[0.08] rounded-xl focus:outline-none touch-manipulation min-h-[38px] min-w-[38px] flex items-center justify-center"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.1] bg-[#0A0A0E]/98 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-3 duration-200 shadow-2xl">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between touch-manipulation min-h-[44px] ${
                  activeSection === link.id
                    ? 'bg-white/[0.1] text-white font-bold border border-white/10'
                    : 'text-neutral-300 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-500" />
              </a>
            ))}
          </nav>
          
          <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full text-center py-3 text-xs font-bold text-neutral-950 bg-gradient-to-r from-blue-400 to-indigo-300 rounded-xl transition-all touch-manipulation min-h-[44px] flex items-center justify-center"
            >
              Send Free Project Inquiry
            </a>

            <Link
              href="/api/resume"
              target="_blank"
              download="PIYUSH_Video_Editor_Resume.html"
              className="w-full text-center py-3 text-xs font-semibold text-neutral-300 bg-white/[0.05] border border-white/[0.08] rounded-xl touch-manipulation min-h-[44px] flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </Link>

            <Link
              href="/admin"
              className="w-full text-center py-2.5 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
            >
              Admin Dashboard Login →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
