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
import ThemeCustomizer from './ThemeCustomizer';
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

  return (
    <div className="flex flex-col min-h-screen bg-[#000000] text-neutral-100 selection:bg-blue-500 selection:text-white relative overflow-hidden">
      
      {/* Deep Black / Pitch Dark Fade Ambient Background Layers */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(37,99,235,0.12),rgba(0,0,0,0))]"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.05),rgba(0,0,0,0))] blur-3xl"></div>
        <div className="absolute bottom-0 inset-x-0 h-96 bg-gradient-to-t from-black via-[#000000] to-transparent"></div>
      </div>

      {/* 1. Header / Navbar */}
      <Navbar />

      <main className="flex-grow">
        {/* 2. Hero Section with Live Rotating Video Showcase (All 28 Videos) */}
        <Hero stats={stats} videos={videoList} />

        {/* 3. Featured Work Spotlight */}
        <FeaturedWork
          videos={videoList}
          onOpenVideo={(video) => setSelectedVideo(video)}
        />

        {/* 4. Complete Portfolio Section */}
        <PortfolioSection
          videos={videoList}
          onOpenVideo={(video) => setSelectedVideo(video)}
        />

        {/* 5. Services & Capabilities */}
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

      {/* 10. Live Theme Color Customizer */}
      <ThemeCustomizer />

      {/* 11. Fullscreen Cinematic Video Player Modal */}
      <VideoPlayerModal
        video={selectedVideo}
        allVideos={videoList}
        onClose={() => setSelectedVideo(null)}
        onSelectVideo={(video) => setSelectedVideo(video)}
      />
    </div>
  );
}
