'use client';

import React, { useState, useEffect } from 'react';
import { Palette, Check, Sparkles, X } from 'lucide-react';

export interface ThemeOption {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  rgb: string;
  glow: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'blue',
    name: 'Electric Blue',
    primary: '#3B82F6',
    secondary: '#60A5FA',
    rgb: '59, 130, 246',
    glow: 'rgba(59, 130, 246, 0.4)'
  },
  {
    id: 'emerald',
    name: 'Emerald Green',
    primary: '#10B981',
    secondary: '#34D399',
    rgb: '16, 185, 129',
    glow: 'rgba(16, 185, 129, 0.4)'
  },
  {
    id: 'purple',
    name: 'Purple Nebula',
    primary: '#A855F7',
    secondary: '#C084FC',
    rgb: '168, 85, 247',
    glow: 'rgba(168, 85, 247, 0.4)'
  },
  {
    id: 'amber',
    name: 'Sunset Gold',
    primary: '#F59E0B',
    secondary: '#FBBF24',
    rgb: '245, 158, 11',
    glow: 'rgba(245, 158, 11, 0.4)'
  },
  {
    id: 'crimson',
    name: 'Ruby Crimson',
    primary: '#EF4444',
    secondary: '#F87171',
    rgb: '239, 68, 68',
    glow: 'rgba(239, 68, 68, 0.4)'
  },
  {
    id: 'cyan',
    name: 'Cyber Cyan',
    primary: '#06B6D4',
    secondary: '#22D3EE',
    rgb: '6, 182, 212',
    glow: 'rgba(6, 182, 212, 0.4)'
  },
  {
    id: 'silver',
    name: 'Titanium White',
    primary: '#E4E4E7',
    secondary: '#FFFFFF',
    rgb: '228, 228, 231',
    glow: 'rgba(255, 255, 255, 0.3)'
  }
];

export default function ThemeCustomizer() {
  const [selectedThemeId, setSelectedThemeId] = useState('blue');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('piyush_portfolio_theme');
    if (saved && THEME_OPTIONS.some((t) => t.id === saved)) {
      applyTheme(saved);
    } else {
      applyTheme('blue');
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
    root.style.setProperty('--theme-rgb', theme.rgb);
    root.setAttribute('data-theme', theme.id);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Popover Panel */}
      {isOpen && (
        <div className="mb-3 p-4 rounded-3xl bg-[#0E0E14]/95 border border-white/[0.15] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] w-72 sm:w-80 animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-theme-primary" />
              <span className="text-xs font-bold text-white font-display">
                Portfolio Theme Palette
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
            Click any color to transform the entire portfolio in real-time:
          </p>

          <div className="grid grid-cols-1 gap-1.5">
            {THEME_OPTIONS.map((theme) => {
              const isSelected = selectedThemeId === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => applyTheme(theme.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white/[0.12] text-white border border-white/30 shadow-sm'
                      : 'text-neutral-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-4 h-4 rounded-full border border-white/40 shadow-md transition-transform"
                      style={{ backgroundColor: theme.primary }}
                    ></span>
                    <span>{theme.name}</span>
                  </div>

                  {isSelected && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-theme-primary">
                      <Check className="w-3.5 h-3.5" />
                      Active
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#121218]/95 hover:bg-[#1a1a24] border border-white/20 shadow-2xl backdrop-blur-xl text-white text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer touch-manipulation"
        title="Change Portfolio Color Theme"
      >
        <span
          className="w-3.5 h-3.5 rounded-full animate-pulse border border-white/40"
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
