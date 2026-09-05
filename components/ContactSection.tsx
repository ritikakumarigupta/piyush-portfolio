'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, MessageCircle, Mail, Phone, MapPin, Sparkles, ArrowUpRight } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Instagram Reels / YouTube Shorts',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', projectType: 'Instagram Reels / YouTube Shorts', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-14 sm:py-20 md:py-24 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-center sm:text-left">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                Get in Touch
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-display text-white tracking-tight leading-tight">
                Let&apos;s Create Your Next Viral Video.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-md mx-auto sm:mx-0">
                Have raw footage, an upcoming brand campaign, or a channel you want to scale? Contact Piyush directly for a 100% free creative consultation.
              </p>
            </div>

            <div className="space-y-3 pt-1 text-left max-w-md mx-auto sm:mx-0">
              
              {/* WhatsApp Card */}
              <a
                href="https://wa.me/916202842908?text=Hi%20Piyush,%20I%20saw%20your%20video%20editing%20portfolio%20and%20want%20to%20collaborate!"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-2xl glass-panel hover:border-emerald-500/40 transition-all group active:scale-[0.99] touch-manipulation"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                    <span>WhatsApp Chat</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  </div>
                  <div className="text-xs text-neutral-300 font-mono mt-0.5">+91 6202842908</div>
                  <div className="text-[10px] text-neutral-500">Instant response</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors shrink-0" />
              </a>

              {/* Direct Phone Call Card */}
              <a
                href="tel:+916202842908"
                className="flex items-center gap-3.5 p-4 rounded-2xl glass-panel hover:border-blue-500/40 transition-all group active:scale-[0.99] touch-manipulation"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                    Direct Call
                  </div>
                  <div className="text-xs text-neutral-300 font-mono mt-0.5">+91 6202842908</div>
                  <div className="text-[10px] text-neutral-500">Available 9 AM - 9 PM IST</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors shrink-0" />
              </a>

              {/* Direct Email Card */}
              <a
                href="mailto:piyushkumargupta159@gmail.com"
                className="flex items-center gap-3.5 p-4 rounded-2xl glass-panel hover:border-purple-500/40 transition-all group active:scale-[0.99] touch-manipulation"
              >
                <div className="w-11 h-11 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                    Direct Email
                  </div>
                  <div className="text-xs text-neutral-300 font-mono mt-0.5 truncate">
                    piyushkumargupta159@gmail.com
                  </div>
                  <div className="text-[10px] text-neutral-500">Replies within 2 hours</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors shrink-0" />
              </a>

            </div>
          </div>

          {/* Right Column: Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-5 sm:p-8 rounded-3xl border border-white/[0.1] shadow-2xl">
              
              {status === 'success' ? (
                <div className="text-center py-10 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="text-xl font-bold text-white">Inquiry Received!</h3>
                  <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                    Thank you! Piyush will review your project details and get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-3 px-4 py-2 text-xs font-semibold text-blue-400 hover:underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-base sm:text-lg font-bold text-white font-display mb-1">
                    Send a Free Project Inquiry
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-neutral-300 uppercase">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Sharma"
                        className="w-full px-3.5 py-3 sm:py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm sm:text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500/50"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-neutral-300 uppercase">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@brand.com"
                        className="w-full px-3.5 py-3 sm:py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm sm:text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-neutral-300 uppercase">Project Category</label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-3.5 py-3 sm:py-2.5 rounded-xl bg-[#14141B] border border-white/[0.08] text-sm sm:text-xs text-white focus:outline-none cursor-pointer"
                    >
                      <option value="Instagram Reels / YouTube Shorts">Instagram Reels / YouTube Shorts</option>
                      <option value="AI Brand Commercial / CGI">AI Brand Commercial / CGI</option>
                      <option value="Personal Brand & Talking Head">Personal Brand & Talking Head</option>
                      <option value="Cinematic VFX & Color Grading">Cinematic VFX & Color Grading</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-neutral-300 uppercase">Project Details / Footage Link</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your footage, vision, timeline, or links..."
                      className="w-full px-3.5 py-3 sm:py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm sm:text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500/50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-400 via-indigo-300 to-white text-neutral-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-lg shadow-blue-500/20 cursor-pointer disabled:opacity-50 min-h-[44px] touch-manipulation"
                  >
                    <Send className="w-4 h-4" />
                    <span>{status === 'submitting' ? 'Sending...' : 'Send Free Consultation Request'}</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
