'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { VideoProject, SiteStats, Testimonial, ContactInquiry, SiteSettings } from '@/lib/types';
import AdminLogin from './admin/AdminLogin';
import AdminHeader from './admin/AdminHeader';
import AdminVideosTab from './admin/AdminVideosTab';
import AdminInquiriesTab from './admin/AdminInquiriesTab';
import AdminStatsTab from './admin/AdminStatsTab';
import AdminVideoModal from './admin/AdminVideoModal';

interface AdminDashboardProps {
  initialVideos: VideoProject[];
  initialStats: SiteStats;
  initialInquiries: ContactInquiry[];
  initialTestimonials: Testimonial[];
  initialSettings: SiteSettings;
}

export default function AdminDashboard({
  initialVideos,
  initialStats,
  initialInquiries,
  initialTestimonials,
  initialSettings
}: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'videos' | 'inquiries' | 'stats'>('videos');

  const [videos, setVideos] = useState<VideoProject[]>(initialVideos);
  const [stats, setStats] = useState<SiteStats>(initialStats);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(initialInquiries);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [actionNotice, setActionNotice] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Partial<VideoProject>>({});

  useEffect(() => {
    const token = localStorage.getItem('piyush_admin_auth');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(''), 3500);
  };

  const handleLogout = () => {
    localStorage.removeItem('piyush_admin_auth');
    setIsAuthenticated(false);
  };

  const handleOpenAddVideo = () => {
    setCurrentVideo({
      title: '',
      category: 'Lifestyle',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-coffee-maker-dripping-fresh-hot-coffee-42475-large.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
      duration: '0:30',
      views: '250K',
      viewsCount: 250000,
      clientName: 'New Creator',
      description: 'Dynamic vertical edit engineered for social engagement.',
      editingStyle: 'Kinetic cuts, Sound design',
      toolsUsed: ['Premiere Pro', 'After Effects'],
      results: '250K Views • 92% Retention',
      isFeatured: false,
      isPublished: true
    });
    setIsCreatingNew(true);
    setIsModalOpen(true);
  };

  const handleOpenEditVideo = (v: VideoProject) => {
    setCurrentVideo({ ...v });
    setIsCreatingNew(false);
    setIsModalOpen(true);
  };

  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (isCreatingNew) {
        const res = await fetch('/api/videos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentVideo)
        });
        const created = await res.json();
        setVideos([created, ...videos]);
        showNotice('Video added to portfolio!');
      } else {
        const res = await fetch(`/api/videos/${currentVideo.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentVideo)
        });
        const updated = await res.json();
        setVideos(videos.map((v) => (v.id === updated.id ? updated : v)));
        showNotice('Video updated successfully!');
      }
      setIsModalOpen(false);
    } catch (err) {
      alert('Failed to save video project.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (!confirm('Are you sure you want to delete this video project?')) return;
    try {
      const res = await fetch(`/api/videos/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setVideos(videos.filter((v) => v.id !== id));
        showNotice('Video deleted.');
      }
    } catch (err) {
      alert('Error deleting video.');
    }
  };

  const handleToggleFeatured = async (v: VideoProject) => {
    const nextStatus = !v.isFeatured;
    try {
      const res = await fetch(`/api/videos/${v.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: nextStatus })
      });
      if (res.ok) {
        setVideos(videos.map((item) => (item.id === v.id ? { ...item, isFeatured: nextStatus } : item)));
        showNotice(nextStatus ? 'Marked as Featured!' : 'Unmarked from Featured');
      }
    } catch (err) {
      alert('Failed to toggle featured status.');
    }
  };

  const handleTogglePublished = async (v: VideoProject) => {
    const nextStatus = !v.isPublished;
    try {
      const res = await fetch(`/api/videos/${v.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: nextStatus })
      });
      if (res.ok) {
        setVideos(videos.map((item) => (item.id === v.id ? { ...item, isPublished: nextStatus } : item)));
        showNotice(nextStatus ? 'Video Published' : 'Video set to Draft');
      }
    } catch (err) {
      alert('Failed to toggle published status.');
    }
  };

  const handleSaveStats = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch('/api/stats', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stats)
      });
      if (res.ok) {
        showNotice('Live statistics updated!');
      }
    } catch (err) {
      alert('Failed to save stats.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateInquiry = async (id: string, status: 'new' | 'read' | 'replied') => {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      if (res.ok) {
        setInquiries(inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq)));
        showNotice(`Inquiry marked as ${status}.`);
      }
    } catch (err) {
      alert('Failed to update inquiry.');
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    try {
      const res = await fetch(`/api/inquiries?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries(inquiries.filter((inq) => inq.id !== id));
        showNotice('Inquiry removed.');
      }
    } catch (err) {
      alert('Failed to delete inquiry.');
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-neutral-900">
      <AdminHeader onLogout={handleLogout} />

      {actionNotice && (
        <div className="fixed top-20 right-8 z-50 p-4 rounded-xl bg-neutral-950 text-white text-xs font-semibold flex items-center gap-2 shadow-2xl">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{actionNotice}</span>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metric Overview Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Total Videos</span>
            <div className="text-3xl font-extrabold text-neutral-950 font-display mt-1">{videos.length}</div>
            <span className="text-[10px] text-neutral-500 mt-1 block">Full Database Size</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Featured</span>
            <div className="text-3xl font-extrabold text-amber-600 font-display mt-1">
              {videos.filter((v) => v.isFeatured).length}
            </div>
            <span className="text-[10px] text-neutral-500 mt-1 block">Selected Work Section</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Inquiries</span>
            <div className="text-3xl font-extrabold text-indigo-600 font-display mt-1">{inquiries.length}</div>
            <span className="text-[10px] text-neutral-500 mt-1 block">
              {inquiries.filter((i) => i.status === 'new').length} Unread Messages
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Total Views</span>
            <div className="text-3xl font-extrabold text-neutral-950 font-display mt-1">{stats.totalViews}</div>
            <span className="text-[10px] text-neutral-500 mt-1 block">Dynamic Site Metric</span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 border-b border-neutral-200 pb-4 mb-6">
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'videos' ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            Manage Videos ({videos.length})
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'inquiries' ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <span>Inquiries</span>
            {inquiries.filter((i) => i.status === 'new').length > 0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'stats' ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            Site Results &amp; Testimonials
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'videos' && (
          <AdminVideosTab
            videos={videos}
            onOpenAddVideo={handleOpenAddVideo}
            onOpenEditVideo={handleOpenEditVideo}
            onDeleteVideo={handleDeleteVideo}
            onToggleFeatured={handleToggleFeatured}
            onTogglePublished={handleTogglePublished}
          />
        )}

        {activeTab === 'inquiries' && (
          <AdminInquiriesTab
            inquiries={inquiries}
            onUpdateInquiry={handleUpdateInquiry}
            onDeleteInquiry={handleDeleteInquiry}
          />
        )}

        {activeTab === 'stats' && (
          <AdminStatsTab
            stats={stats}
            setStats={setStats}
            testimonials={testimonials}
            onSaveStats={handleSaveStats}
            isSaving={isSaving}
          />
        )}
      </main>

      <AdminVideoModal
        isOpen={isModalOpen}
        isCreatingNew={isCreatingNew}
        currentVideo={currentVideo}
        setCurrentVideo={setCurrentVideo}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveVideo}
        isSaving={isSaving}
      />
    </div>
  );
}