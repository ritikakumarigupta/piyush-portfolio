'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, LogOut, Video, Inbox, BarChart2, Shield, CheckCircle2 } from 'lucide-react';

interface AdminHeaderProps {
  activeTab: 'videos' | 'inquiries' | 'stats';
  setActiveTab: (tab: 'videos' | 'inquiries' | 'stats') => void;
  inquiriesCount: number;
  onLogout: () => void;
}

export default function AdminHeader({
  activeTab,
  setActiveTab,
  inquiriesCount,
  onLogout
}: AdminHeaderProps) {
  return (
    <header className="glass-nav sticky top-0 z-40 py-3.5 border-b border-white/[0.08] bg-black/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 text-neutral-400 hover:text-white hover:bg-white/[0.08] rounded-xl transition-colors"
              title="Return to Public Site"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-theme shrink-0">
                <img
                  src="/images/piyush-avatar.png"
                  alt="Piyush Kumar Gupta"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5 font-black text-white font-display text-sm leading-none">
                  <span>Piyush Kumar Gupta</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400/20" />
                </div>
                <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                  piyushkumargupta159@gmail.com
                </div>
              </div>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-full border border-white/[0.08]">
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'videos'
                  ? 'bg-white text-neutral-950 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Videos</span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'inquiries'
                  ? 'bg-white text-neutral-950 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Inbox className="w-3.5 h-3.5" />
              <span>Inquiries</span>
              {inquiriesCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-theme text-black font-black">
                  {inquiriesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('stats')}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'stats'
                  ? 'bg-white text-neutral-950 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Stats</span>
            </button>
          </div>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>

        </div>
      </div>
    </header>
  );
}
