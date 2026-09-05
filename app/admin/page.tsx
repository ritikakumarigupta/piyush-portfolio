import React from 'react';
import { Metadata } from 'next';
import { getAllVideos, getStats, getInquiries, getTestimonials, getSettings } from '@/lib/db';
import AdminDashboard from '@/components/AdminDashboard';

export const metadata: Metadata = {
  title: 'PIYUSH CMS — Video Portfolio Admin Dashboard',
  description: 'Manage 52+ vertical videos, client inquiries, and results metrics.',
  robots: {
    index: false,
    follow: false
  }
};

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  const videos = getAllVideos();
  const stats = getStats();
  const inquiries = getInquiries();
  const testimonials = getTestimonials();
  const settings = getSettings();

  return (
    <AdminDashboard
      initialVideos={videos}
      initialStats={stats}
      initialInquiries={inquiries}
      initialTestimonials={testimonials}
      initialSettings={settings}
    />
  );
}