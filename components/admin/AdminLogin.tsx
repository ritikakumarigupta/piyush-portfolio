'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Lock, ArrowLeft, AlertCircle, Eye, EyeOff, CheckCircle2, Shield } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid admin password');
      }

      localStorage.setItem('piyush_admin_auth', data.token);
      onLoginSuccess();
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed. Please check password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0C] p-4 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="w-full max-w-md bg-[#121218] rounded-3xl p-8 sm:p-10 border border-white/[0.12] shadow-2xl relative z-10 space-y-6">
        
        {/* Header Lockup */}
        <div className="text-center space-y-3">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-blue-500/80 mx-auto shadow-xl shadow-blue-500/20">
            <img
              src="/images/piyush-avatar.png"
              alt="Piyush Admin"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white font-display flex items-center justify-center gap-2">
              <span>PIYUSH CMS</span>
              <Shield className="w-5 h-5 text-blue-400" />
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Admin & Video Portfolio Management
            </p>
          </div>
        </div>

        {authError && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter admin password"
                className="w-full pl-4 pr-11 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500/60 shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-white transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-400 via-indigo-300 to-white text-neutral-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity shadow-lg shadow-blue-500/20 active:scale-[0.98] cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div className="pt-2 text-center border-t border-white/[0.08]">
          <Link 
            href="/" 
            className="text-xs text-neutral-400 hover:text-white transition-colors inline-flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
