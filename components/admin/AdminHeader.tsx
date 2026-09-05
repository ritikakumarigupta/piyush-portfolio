'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Globe, LogOut } from 'lucide-react';

interface AdminHeaderProps {
  onLogout: () => void;
}

export default function AdminHeader({ onLogout }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 px-4 sm:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link href="/" className="p-2 text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-extrabold text-lg text-neutral-950 font-display">
              PIYUSH Portfolio CMS
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
              Live Engine
            </span>
          </div>
          <p className="text-[11px] text-neutral-500">Manage 52+ Videos, Client Inquiries, and Metrics</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>View Live Site</span>
        </Link>

        <button
          onClick={onLogout}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}