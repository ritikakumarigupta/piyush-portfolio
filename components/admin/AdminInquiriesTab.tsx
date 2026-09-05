'use client';

import React from 'react';
import { Mail } from 'lucide-react';
import { ContactInquiry } from '@/lib/types';

interface AdminInquiriesTabProps {
  inquiries: ContactInquiry[];
  onUpdateInquiry: (id: string, status: 'new' | 'read' | 'replied') => void;
  onDeleteInquiry: (id: string) => void;
}

export default function AdminInquiriesTab({
  inquiries,
  onUpdateInquiry,
  onDeleteInquiry
}: AdminInquiriesTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-neutral-950 font-display">
          Client Messages &amp; Inquiries ({inquiries.length})
        </h2>
        <span className="text-xs text-neutral-500">
          Direct submissions from the contact form
        </span>
      </div>

      {inquiries.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-neutral-200 text-center">
          <Mail className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
          <p className="text-xs text-neutral-500">No contact inquiries received yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm flex flex-col sm:flex-row items-start justify-between gap-4"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      inq.status === 'new'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    {inq.status}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    {new Date(inq.createdAt).toLocaleString()}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-neutral-950">{inq.name}</h4>
                  <a href={`mailto:${inq.email}`} className="text-xs font-mono text-neutral-600 hover:underline">
                    {inq.email}
                  </a>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700">
                  <span>Project: {inq.projectType}</span>
                  <span>•</span>
                  <span>Budget: {inq.budgetRange}</span>
                </div>

                <p className="text-xs text-neutral-600 bg-[#FAFAFA] p-3 rounded-xl border border-neutral-150 leading-relaxed">
                  &ldquo;{inq.message}&rdquo;
                </p>
              </div>

              <div className="flex flex-row sm:flex-col items-end gap-2 shrink-0">
                <a
                  href={`mailto:${inq.email}?subject=Re:%20Video%20Editing%20Inquiry%20from%20Piyush`}
                  className="px-3 py-1.5 rounded-lg bg-neutral-950 text-white text-xs font-semibold hover:bg-neutral-800"
                >
                  Reply via Email
                </a>
                <button
                  onClick={() => onUpdateInquiry(inq.id, inq.status === 'read' ? 'new' : 'read')}
                  className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-medium cursor-pointer"
                >
                  Mark as {inq.status === 'read' ? 'New' : 'Read'}
                </button>
                <button
                  onClick={() => onDeleteInquiry(inq.id)}
                  className="px-3 py-1.5 rounded-lg text-red-500 hover:bg-red-50 text-xs font-medium cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}