'use client';

import React, { useState, useEffect } from 'react';
import { Palette, Check, Sparkles, X } from 'lucide-react';

export interface ThemeOption {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  glow: string;
  gradient: string;
  textAccent: string;
  bgGradient: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'blue',
    name: 'Electric Blue',
    primary: '#3B82F6',
    secondary: '#60A5FA',
    glow: 'rgba(59, 130, 246, 0.35)',
    gradient: 'from-blue-400 via-indigo-300 to-white',
    textAccent: 'text-blue-400',
    bgGradient: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59,130,246,0.15), rgba(0,0,0,0))'
  },
  {
    id: 'emerald',
    name: 'Emerald Green',
    primary: '#10B981',
    secondary: '#34D399',
    glow: 'rgba(16, 185, 129, 0.35)',
    gradient: 'from-emerald-400 via-teal-300 to-white',
    textAccent: 'text-emerald-400',
    bgGradient: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(16,185,129,0.15), rgba(0,0,0,0))'
  },
  {
    id: 'purple',
    name: 'Purple Nebula',
    primary: '#A855F7',
    secondary: '#C084FC',
    glow: 'rgba(168, 85, 247, 0.35)',
    gradient: 'from-purple-400 via-pink-300 to-white',
    textAccent: 'text-purple-400',
    bgGradient: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(168,85,247,0.15), rgba(0,0,0,0))'
  },
  {
    id: 'amber',
    name: 'Sunset Gold',
    primary: '#F59E0B',
    secondary: '#FBBF24',
    glow: 'rgba(245, 158, 11, 0.35)',
    gradient: 'from-amber-400 via-orange-300 to-white',
    textAccent: 'text-amber-400',
    bgGradient: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(245,158,11,0.15), rgba(0,0,0,0))'
  },
  {
    id: 'crimson',
    name: 'Ruby Crimson',
    primary: '#EF4444',
    secondary: '#F87171',
    glow: 'rgba(239, 68, 68, 0.35)',
    gradient: 'from-rose-400 via-red-300 to-white',
    textAccent: 'text-rose-400',
    bgGradient: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(239,68,68,0.15), rgba(0,0,0,0))'
  },
  {
    id: 'cyan',
    name: 'Cyber Cyan',
    primary: '#06B6D4',
    secondary: '#22D3EE',
    glow: 'rgba(6, 182, 212, 0.35)',
    gradient: 'from-cyan-400 via-sky-300 to-white',
    textAccent: 'text-cyan-400',
    bgGradient: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(6,182,212,0.15), rgba(0,0,0,0))'
  },
  {
    id: 'silver',
    name: 'Titanium White',
    primary: '#E4E4E7',
    secondary: '#FFFFFF',
    glow: 'rgba(255, 255, 255, 0.25)',
    gradient: 'from-white via-neutral-300 to-neutral-400',
    textAccent: 'text-white',
    bgGradient: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255,255,255,0.08), rgba(0,0,0,0))'
  }
];

export default function ThemeCustomizer() {
  const [selectedThemeId, setSelectedThemeId] = useState('blue');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('piyush_portfolio_theme');
    if (saved && THEME_OPTIONS.some((t) => t.id === saved)) {
      applyTheme(saved);
    }
  }, []);

  const applyTheme = (themeId: string) => {
    const theme = THEME_OPTIONS.find((t) => t.id === themeId) || THEME_OPTIONS[0];
    setSelectedThemeId(theme.id);
    localStorage.setItem('piyush_portfolio_theme', theme.id);

    const root = document.documentElement;
    root.style.setProperty('--theme-primary', theme.primary);
    root.style.setProperty('--theme-secondary', theme.secondary);
    root.style.setProperty('--theme-glow', theme.glow);
    root.setAttribute('data-theme', theme.id);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Popover Panel */}
      {isOpen && (
        <div className="mb-3 p-4 rounded-3xl bg-[#0E0E14]/95 border border-white/[0.15] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] w-72 sm:w-80 animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-white font-display">
                Theme Color Palette
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-neutral-400 hover:text-white rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-neutral-400 my-2.5">
            Choose your custom accent color for the entire portfolio:
          </p>

          <div className="grid grid-cols-1 gap-1.5">
            {THEME_OPTIONS.map((theme) => {
              const isSelected = selectedThemeId === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => applyTheme(theme.id)}
                  className={`flex items-center justify-between p-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white/[0.1] text-white border border-white/20'
                      : 'text-neutral-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-4 h-4 rounded-full border border-white/30 shadow-md"
                      style={{ backgroundColor: theme.primary }}
                    ></span>
                    <span>{theme.name}</span>
                  </div>

                  {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#121218]/90 hover:bg-[#1a1a24] border border-white/20 shadow-2xl backdrop-blur-xl text-white text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer touch-manipulation"
        title="Change Portfolio Color Theme"
      >
        <span
          className="w-3 h-3 rounded-full animate-pulse"
          style={{
            backgroundColor:
              THEME_OPTIONS.find((t) => t.id === selectedThemeId)?.primary || '#3B82F6'
          }}
        ></span>
        <Palette className="w-4 h-4 text-neutral-200 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">Theme Color</span>
      </button>
    </div>
  );
}
