import React from 'react';
import { getVideos, getStats, getTestimonials, getServices, getSettings } from '@/lib/db';
import PortfolioHome from '@/components/PortfolioHome';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const { videos } = getVideos({ publishedOnly: true, limit: 100 });
  const featured = videos.filter((v) => v.isFeatured);
  const stats = getStats();
  const testimonials = getTestimonials();
  const services = getServices();
  const settings = getSettings();

  return (
    <PortfolioHome
      videos={videos}
      featuredVideos={featured.length > 0 ? featured : videos.slice(0, 6)}
      stats={stats}
      testimonials={testimonials}
      services={services}
      settings={settings}
    />
  );
}