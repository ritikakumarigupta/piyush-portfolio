'use client';

import React, { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import FeaturedWork from './FeaturedWork';
import PortfolioSection from './PortfolioSection';
import ServicesSection from './ServicesSection';
import ResultsSection from './ResultsSection';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import VideoPlayerModal from './VideoPlayerModal';
import DirectUploadModal from './DirectUploadModal';
import { VideoProject, SiteStats, Testimonial, ServiceItem, SiteSettings } from '@/lib/types';

interface PortfolioHomeProps {
  videos: VideoProject[];
  featuredVideos: VideoProject[];
  stats: SiteStats;
  testimonials: Testimonial[];
  services: ServiceItem[];
  settings: SiteSettings;
}

export default function PortfolioHome({
  videos: initialVideos,
  featuredVideos,
  stats,
  testimonials,
  services,
  settings
}: PortfolioHomeProps) {
  const [videoList, setVideoList] = useState<VideoProject[]>(initialVideos || []);
  const [selectedVideo, setSelectedVideo] = useState<VideoProject | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  // Handle Video Upload Success
  const handleVideoCreated = (newVideo: VideoProject) => {
    setVideoList((prev) => [newVideo, ...prev]);
  };

  // Handle Video Delete
  const handleDeleteVideo = async (eOrVideo: React.MouseEvent | VideoProject, maybeVideo?: VideoProject) => {
    const videoToDelete = maybeVideo || (eOrVideo as VideoProject);
    if ('stopPropagation' in eOrVideo) {
      eOrVideo.stopPropagation();
    }

    if (!confirm(`Are you sure you want to delete "${videoToDelete.title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/videos/${videoToDelete.id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setVideoList((prev) => prev.filter((v) => v.id !== videoToDelete.id));
        if (selectedVideo?.id === videoToDelete.id) {
          setSelectedVideo(null);
        }
      } else {
        alert('Failed to delete video.');
      }
    } catch (err) {
      alert('Error deleting video.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0C] text-neutral-100 selection:bg-blue-500 selection:text-white">
      {/* 1. Header / Navbar */}
      <Navbar
        onOpenUpload={() => setIsUploadOpen(true)}
        isDeleteMode={isDeleteMode}
        onToggleDeleteMode={() => setIsDeleteMode(!isDeleteMode)}
      />

      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero stats={stats} />

        {/* 3. Featured Work Spotlight */}
        <FeaturedWork
          videos={videoList}
          onOpenVideo={(video) => setSelectedVideo(video)}
        />

        {/* 4. Complete Portfolio Section with Upload & Delete Actions */}
        <PortfolioSection
          videos={videoList}
          onOpenVideo={(video) => setSelectedVideo(video)}
          onOpenUpload={() => setIsUploadOpen(true)}
          isDeleteMode={isDeleteMode}
          onToggleDeleteMode={() => setIsDeleteMode(!isDeleteMode)}
          onDeleteVideo={(e, video) => handleDeleteVideo(e, video)}
        />

        {/* 5. Services & Editing Capabilities */}
        <ServicesSection />

        {/* 6. Proven Retention Results */}
        <ResultsSection stats={stats} />

        {/* 7. About Piyush */}
        <AboutSection />

        {/* 8. Contact & Free Project Inquiry */}
        <ContactSection />
      </main>

      {/* 9. Footer */}
      <Footer />

      {/* 10. Direct Video Upload Modal */}
      <DirectUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onVideoCreated={handleVideoCreated}
      />

      {/* 11. Fullscreen Cinematic Video Player Modal with Delete Button */}
      <VideoPlayerModal
        video={selectedVideo}
        allVideos={videoList}
        onClose={() => setSelectedVideo(null)}
        onSelectVideo={(video) => setSelectedVideo(video)}
        onDeleteVideo={(video) => handleDeleteVideo(video)}
      />
    </div>
  );
}
