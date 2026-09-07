'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(initialInquiries || []);
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

  const getAuthHeaders = () => {
    const token = localStorage.getItem('piyush_admin_auth') || 'piyush2026';
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(''), 3500);
  };

  // Sync and fetch inquiries from server & localStorage
  const refreshInquiries = useCallback(async () => {
    let combined: ContactInquiry[] = [];

    // 1. Read from localStorage
    try {
      const local = JSON.parse(localStorage.getItem('piyush_client_inquiries') || '[]');
      if (Array.isArray(local)) {
        combined = [...local];
      }
    } catch {}

    // 2. Fetch from API
    try {
      const res = await fetch('/api/inquiries', {
        headers: getAuthHeaders(),
        cache: 'no-store'
      });
      if (res.ok) {
        const serverInquiries = await res.json();
        if (Array.isArray(serverInquiries)) {
          // Merge deduplicated
          const map = new Map();
          serverInquiries.forEach((item: ContactInquiry) => map.set(item.id, item));
          combined.forEach((item: ContactInquiry) => {
            if (!map.has(item.id)) {
              map.set(item.id, item);
            }
          });
          combined = Array.from(map.values());
        }
      }
    } catch {}

    // Sort by createdAt descending
    combined.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

    setInquiries(combined);
    showNotice(`Inquiries refreshed. Total: ${combined.length}`);
  }, []);

  // Fetch inquiries when user opens inquiries tab
  useEffect(() => {
    if (isAuthenticated) {
      refreshInquiries();
    }
  }, [isAuthenticated, activeTab, refreshInquiries]);

  const handleLogout = () => {
    localStorage.removeItem('piyush_admin_auth');
    setIsAuthenticated(false);
  };

  const handleOpenAddVideo = () => {
    setCurrentVideo({
      title: '',
      category: 'AI & Brand Commercials',
      videoUrl: '/videos/aurabella-01.mp4',
      thumbnailUrl: '/videos/aurabella-01.mp4',
      duration: '30s',
      views: '1.2M',
      viewsCount: 1200000,
      clientName: 'Piyush Studio',
      client: 'Piyush Studio',
      description: 'Dynamic high-retention video edit engineered for viral engagement.',
      editingStyle: 'Kinetic cuts, Sound design',
      toolsUsed: ['Premiere Pro', 'After Effects'],
      results: '1.2M Views • 88% Retention',
      isFeatured: true,
      featured: true,
      isPublished: true
    });
    setIsCreatingNew(true);
    setIsModalOpen(true);
  };

  const handleOpenEditVideo = (v: VideoProject) => {
    setCurrentVideo(v);
    setIsCreatingNew(false);
    setIsModalOpen(true);
  };

  const handleDeleteVideo = async (id: string) => {
    if (!confirm('Are you sure you want to delete this video project?')) return;

    try {
      const res = await fetch(`/api/videos/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) {
        setVideos((prev) => prev.filter((v) => v.id !== id));
        showNotice('Video successfully deleted.');
      } else {
        alert('Failed to delete video.');
      }
    } catch (err) {
      alert('Failed to delete video.');
    }
  };

  const handleToggleFeatured = async (v: VideoProject) => {
    const isFeat = !(v.isFeatured || v.featured);
    try {
      const res = await fetch(`/api/videos/${v.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ isFeatured: isFeat, featured: isFeat })
      });
      if (res.ok) {
        setVideos((prev) =>
          prev.map((item) => (item.id === v.id ? { ...item, isFeatured: isFeat, featured: isFeat } : item))
        );
        showNotice(`Video is now ${isFeat ? 'Featured' : 'Normal'}.`);
      }
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  const handleTogglePublished = async (v: VideoProject) => {
    const nextPublished = v.isPublished === false ? true : false;
    try {
      const res = await fetch(`/api/videos/${v.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ isPublished: nextPublished })
      });
      if (res.ok) {
        setVideos((prev) =>
          prev.map((item) => (item.id === v.id ? { ...item, isPublished: nextPublished } : item))
        );
        showNotice(`Video is now ${nextPublished ? 'Live' : 'Hidden'}.`);
      }
    } catch (err) {
      alert('Failed to update visibility.');
    }
  };

  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (isCreatingNew) {
        const res = await fetch('/api/videos', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(currentVideo)
        });
        const saved = await res.json();
        if (res.ok) {
          setVideos((prev) => [saved, ...prev]);
          setIsModalOpen(false);
          showNotice('New video created successfully.');
        } else {
          alert(saved.error || 'Failed to create video.');
        }
      } else {
        const res = await fetch(`/api/videos/${currentVideo.id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(currentVideo)
        });
        const updated = await res.json();
        if (res.ok) {
          setVideos((prev) => prev.map((item) => (item.id === currentVideo.id ? updated : item)));
          setIsModalOpen(false);
          showNotice('Video updated successfully.');
        } else {
          alert(updated.error || 'Failed to update video.');
        }
      }
    } catch (err) {
      alert('Error saving video.');
    } finally {
      setIsSaving(false);
    }
  };

  const [isSavingStats, setIsSavingStats] = useState(false);

  const handleSaveStats = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingStats(true);
    try {
      const res = await fetch('/api/stats', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(stats)
      });
      if (res.ok) {
        showNotice('Stats updated successfully.');
      } else {
        showNotice('Stats saved locally.');
      }
    } catch {
      showNotice('Stats saved locally.');
    } finally {
      setIsSavingStats(false);
    }
  };

  const handleUpdateInquiry = async (id: string, status: 'new' | 'read' | 'replied') => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
    try {
      await fetch('/api/inquiries', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ id, status })
      });
    } catch {}

    try {
      const local = JSON.parse(localStorage.getItem('piyush_client_inquiries') || '[]');
      const updated = local.map((i: any) => (i.id === id ? { ...i, status } : i));
      localStorage.setItem('piyush_client_inquiries', JSON.stringify(updated));
    } catch {}

    showNotice(`Inquiry marked as ${status}.`);
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    setInquiries((prev) => prev.filter((i) => i.id !== id));
    try {
      await fetch(`/api/inquiries?id=${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
    } catch {}

    try {
      const local = JSON.parse(localStorage.getItem('piyush_client_inquiries') || '[]');
      const updated = local.filter((i: any) => i.id !== id);
      localStorage.setItem('piyush_client_inquiries', JSON.stringify(updated));
    } catch {}

    showNotice('Inquiry removed.');
  };

  const handleAddTestInquiry = () => {
    const testInq: ContactInquiry = {
      id: `inq-test-${Date.now()}`,
      name: 'Rohan Verma (Sample Client)',
      email: 'rohan.brand@gmail.com',
      phone: '+91 9876543210',
      projectType: 'Instagram Reels / YouTube Shorts',
      budgetRange: '$500 - $1,500',
      message: 'Hi Piyush, I loved your portfolio! We need 15 viral reels edited for our upcoming brand launch next month.',
      createdAt: new Date().toISOString(),
      status: 'new'
    };

    setInquiries((prev) => [testInq, ...prev]);
    try {
      const local = JSON.parse(localStorage.getItem('piyush_client_inquiries') || '[]');
      localStorage.setItem('piyush_client_inquiries', JSON.stringify([testInq, ...local]));
    } catch {}
    showNotice('Sample lead added for testing!');
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#040406] text-neutral-100 flex flex-col">
      <AdminHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        inquiriesCount={inquiries.length}
        onLogout={handleLogout}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Notice Banner */}
        {actionNotice && (
          <div className="mb-6 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold flex items-center gap-2 shadow-lg animate-in slide-in-from-top-2">
            <CheckCircle className="w-4 h-4 text-blue-400" />
            <span>{actionNotice}</span>
          </div>
        )}

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
            onRefresh={refreshInquiries}
            onAddTestInquiry={handleAddTestInquiry}
            onUpdateInquiry={handleUpdateInquiry}
            onDeleteInquiry={handleDeleteInquiry}
          />
        )}

        {activeTab === 'stats' && (
          <AdminStatsTab
            stats={stats}
            setStats={setStats}
            testimonials={initialTestimonials}
            onSaveStats={handleSaveStats}
            isSaving={isSavingStats}
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
