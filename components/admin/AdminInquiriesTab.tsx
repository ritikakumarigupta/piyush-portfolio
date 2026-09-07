'use client';

import React from 'react';
import { Mail, Trash2, CheckCircle2, Clock, Send, MessageSquare, Phone, MessageCircle, RefreshCw, Plus } from 'lucide-react';
import { ContactInquiry } from '@/lib/types';

interface AdminInquiriesTabProps {
  inquiries: ContactInquiry[];
  onRefresh?: () => void;
  onAddTestInquiry?: () => void;
  onUpdateInquiry?: (id: string, status: 'new' | 'read' | 'replied') => void;
  onDeleteInquiry: (id: string) => void;
}

export default function AdminInquiriesTab({
  inquiries,
  onRefresh,
  onAddTestInquiry,
  onUpdateInquiry,
  onDeleteInquiry
}: AdminInquiriesTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-neutral-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-400" />
            Client Inquiries &amp; Leads
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
              {inquiries.length}
            </span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Realtime client inquiries received through the portfolio contact form.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold border border-neutral-700 transition-colors cursor-pointer active:scale-95"
              title="Refresh inquiries list"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Inquiries</span>
            </button>
          )}

          {onAddTestInquiry && inquiries.length === 0 && (
            <button
              onClick={onAddTestInquiry}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-semibold border border-blue-500/30 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Sample Lead</span>
            </button>
          )}
        </div>
      </div>

      {inquiries.length === 0 ? (
        <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-3xl p-16 text-center backdrop-blur-xl">
          <div className="w-16 h-16 rounded-2xl bg-neutral-800/50 border border-neutral-700/50 flex items-center justify-center mx-auto mb-4 text-neutral-500">
            <Mail className="w-8 h-8" />
          </div>
          <h3 className="text-base font-semibold text-white mb-1">No Inquiries Yet</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto mb-4">
            Client proposals and project messages submitted on your portfolio contact form will appear here instantly.
          </p>
          {onAddTestInquiry && (
            <button
              onClick={onAddTestInquiry}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-lg shadow-blue-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Create Test Inquiry</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {inquiries.map((inq) => {
            const isNew = inq.status === 'new';
            const cleanPhone = (inq.phone || '').replace(/[^0-9+]/g, '');

            return (
              <div
                key={inq.id}
                className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col md:flex-row items-start justify-between gap-6 ${
                  isNew
                    ? 'bg-neutral-900/90 border-blue-500/40 shadow-[0_0_25px_rgba(59,130,246,0.12)]'
                    : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="space-y-3 max-w-3xl flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                        isNew
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                      }`}
                    >
                      {isNew ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                      {inq.status}
                    </span>
                    <span className="text-xs font-mono text-neutral-500">
                      {new Date(inq.createdAt || Date.now()).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">{inq.name}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      <a
                        href={`mailto:${inq.email}`}
                        className="text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>{inq.email}</span>
                      </a>

                      {inq.phone && (
                        <a
                          href={`tel:${cleanPhone}`}
                          className="text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{inq.phone}</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {inq.projectType && (
                      <span className="px-3 py-1 rounded-lg bg-neutral-800/80 text-neutral-300 border border-neutral-700/60 font-medium">
                        Category: <span className="text-white font-semibold">{inq.projectType}</span>
                      </span>
                    )}
                    {inq.budgetRange && (
                      <span className="px-3 py-1 rounded-lg bg-neutral-800/80 text-neutral-300 border border-neutral-700/60 font-medium">
                        Budget: <span className="text-emerald-400 font-semibold">{inq.budgetRange}</span>
                      </span>
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800/80 text-neutral-300 text-sm leading-relaxed">
                    &ldquo;{inq.message}&rdquo;
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-stretch gap-2 shrink-0 w-full md:w-auto">
                  <a
                    href={`mailto:${inq.email}?subject=Re:%20Video%20Editing%20Project%20Inquiry%20from%20Piyush&body=Hi%20${encodeURIComponent(
                      inq.name
                    )},%0D%0A%0D%0AThank%20you%20for%20reaching%20out!%20I'd%20love%20to%20help%20you%20with%20your%20project.`}
                    className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Email Reply</span>
                  </a>

                  {cleanPhone && (
                    <a
                      href={`https://wa.me/${cleanPhone.replace('+', '')}?text=Hi%20${encodeURIComponent(
                        inq.name
                      )},%20thank%20you%20for%20your%20project%20inquiry%20on%20my%20portfolio!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  )}

                  {onUpdateInquiry && (
                    <button
                      onClick={() => onUpdateInquiry(inq.id, inq.status === 'read' ? 'new' : 'read')}
                      className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium border border-neutral-700 transition-colors cursor-pointer"
                    >
                      Mark as {inq.status === 'read' ? 'New' : 'Read'}
                    </button>
                  )}

                  <button
                    onClick={() => onDeleteInquiry(inq.id)}
                    className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-medium transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
