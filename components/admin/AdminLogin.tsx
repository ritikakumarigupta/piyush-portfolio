'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Lock, ArrowLeft, AlertCircle, Eye, EyeOff, Shield, Mail, UserCheck } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [emailInput, setEmailInput] = useState('piyushkumargupta159@gmail.com');
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
        body: JSON.stringify({ 
          email: emailInput.trim().toLowerCase(),
          password: passwordInput 
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed. Please check credentials.');
      }

      localStorage.setItem('piyush_admin_auth', data.token);
      localStorage.setItem('piyush_admin_email', data.user?.email || 'piyushkumargupta159@gmail.com');
      onLoginSuccess();
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed. Only Piyush Kumar Gupta can access this portal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000] p-4 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 glow-theme-orb rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="w-full max-w-md bg-[#0c0c10] rounded-3xl p-8 sm:p-10 border border-white/[0.12] shadow-2xl relative z-10 space-y-6">
        
        {/* Header Lockup */}
        <div className="text-center space-y-3">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-theme mx-auto shadow-xl">
            <img
              src="/images/piyush-avatar.png"
              alt="Piyush Kumar Gupta Admin"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-[11px] font-bold text-blue-400 mb-2">
              <Shield className="w-3.5 h-3.5" />
              <span>Exclusive Admin Portal</span>
            </div>
            <h1 className="text-2xl font-black text-white font-display">
              Piyush Kumar Gupta
            </h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              Portfolio &amp; Client Inquiries Management
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
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="piyushkumargupta159@gmail.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-theme shadow-sm"
              />
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

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
                placeholder="Enter password"
                className="w-full pl-10 pr-11 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-theme shadow-sm"
              />
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-theme-primary w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-lg active:scale-[0.98] cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 min-h-[44px]"
          >
            <UserCheck className="w-4 h-4" />
            <span>{loading ? 'Verifying Admin...' : 'Sign In as Piyush'}</span>
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
