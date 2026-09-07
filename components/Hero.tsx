'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Play, 
  Pause,
  ArrowUpRight, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  TrendingUp, 
  Flame,
  Layers,
  ChevronLeft,
  ChevronRight,
  Film,
  RotateCw
} from 'lucide-react';
import { VideoProject, SiteStats } from '@/lib/types';

interface HeroProps {
  onPlayShowreel?: () => void;
  stats?: SiteStats;
  videos?: VideoProject[];
}

// Complete 28 Fallback Videos List
const DEFAULT_FALLBACK_VIDEOS: VideoProject[] = [
  {
    "id": "proj-1",
    "title": "Aurabella Luxury Brand Launch",
    "category": "AI & Brand Commercials",
    "videoUrl": "/videos/aurabella-01.mp4",
    "thumbnailUrl": "/videos/aurabella-01.mp4",
    "duration": "45s",
    "client": "Aurabella Skin",
    "clientName": "Aurabella Skin",
    "views": "1.4M",
    "featured": true,
    "isFeatured": true,
    "description": "Cinematic product visualization for Aurabella with AI motion rendering, 3D lighting, and high-converting hook editing.",
    "tags": [
      "AI Video",
      "Commercial",
      "Luxury",
      "Color Grading"
    ],
    "isPublished": true,
    "createdAt": "2026-09-05T10:00:00Z"
  },
  {
    "id": "proj-2",
    "title": "The Bald Lion \u2014 AI Character Reel",
    "category": "AI & Brand Commercials",
    "videoUrl": "/videos/bald-lion.mp4",
    "thumbnailUrl": "/videos/bald-lion.mp4",
    "duration": "32s",
    "client": "Lion Studio",
    "clientName": "Lion Studio",
    "views": "890K",
    "featured": true,
    "isFeatured": true,
    "description": "Photorealistic AI generated cinematic sequence with dynamic sound design, dramatic lighting, and 4K visual upscale.",
    "tags": [
      "AI Generation",
      "CGI",
      "Sound Design"
    ],
    "isPublished": true,
    "createdAt": "2026-09-05T10:00:00Z"
  },
  {
    "id": "proj-3",
    "title": "Age Transformation VFX Reel",
    "category": "AI & Brand Commercials",
    "videoUrl": "/videos/facial-old-to-young.mp4",
    "thumbnailUrl": "/videos/facial-old-to-young.mp4",
    "duration": "28s",
    "client": "Dr. Derma Lab",
    "clientName": "Dr. Derma Lab",
    "views": "2.8M",
    "featured": true,
    "isFeatured": true,
    "description": "Hyper-realistic AI age regression visual transition reel created with seamless morphing and retention-optimized pacing.",
    "tags": [
      "AI VFX",
      "Morphing",
      "Viral Hook"
    ],
    "isPublished": true,
    "createdAt": "2026-09-05T10:00:00Z"
  },
  {
    "id": "proj-4",
    "title": "Kingdom Momo Brand Commercial",
    "category": "AI & Brand Commercials",
    "videoUrl": "/videos/kingdom-momo.mp4",
    "thumbnailUrl": "/videos/kingdom-momo.mp4",
    "duration": "25s",
    "client": "Kingdom Momo",
    "clientName": "Kingdom Momo",
    "views": "650K",
    "featured": false,
    "isFeatured": false,
    "description": "High-energy food commercial with sizzling macro cuts, rhythmic beat-matching, and kinetic motion text.",
    "tags": [
      "Food Commercial",
      "Fast Pacing",
      "SFX"
    ],
    "isPublished": true,
    "createdAt": "2026-09-05T10:00:00Z"
  },
  {
    "id": "proj-5",
    "title": "Mahadev Shiv Celestial VFX Concept",
    "category": "Cinematic Short Films",
    "videoUrl": "/videos/shiv-vfx.mp4",
    "thumbnailUrl": "/videos/shiv-vfx.mp4",
    "duration": "40s",
    "client": "Mythos Art",
    "clientName": "Mythos Art",
    "views": "3.5M",
    "featured": true,
    "isFeatured": true,
    "description": "Mythological celestial visual spectacle with volumetric fog, cosmic particles, and divine cinematic sound score.",
    "tags": [
      "Cinematic VFX",
      "Mythology",
      "3D Particles"
    ],
    "isPublished": true,
    "createdAt": "2026-09-05T10:00:00Z"
  },
  {
    "id": "proj-6",
    "title": "Siwon Premium Brand Master Commercial",
    "category": "AI & Brand Commercials",
    "videoUrl": "/videos/siwon-final-video.mp4",
    "thumbnailUrl": "/videos/siwon-final-video.mp4",
    "duration": "50s",
    "client": "Siwon Global",
    "clientName": "Siwon Global",
    "views": "1.9M",
    "featured": true,
    "isFeatured": true,
    "description": "Flagship brand commercial featuring AI product integration, kinetic subtitle typography, and studio color grade.",
    "tags": [
      "Brand Master",
      "Premiere Pro",
      "After Effects"
    ],
    "isPublished": true,
    "createdAt": "2026-09-05T10:00:00Z"
  },
  {
    "id": "proj-7",
    "title": "Siwon Lighting Innovation Ad",
    "category": "AI & Brand Commercials",
    "videoUrl": "/videos/siwon-bulb-01.mp4",
    "thumbnailUrl": "/videos/siwon-bulb-01.mp4",
    "duration": "22s",
    "client": "Siwon Lighting",
    "clientName": "Siwon Lighting",
    "views": "420K",
    "featured": false,
    "isFeatured": false,
    "description": "Minimalist product reveal ad showcasing warm bulb aesthetics with soft camera moves and smooth audio layering.",
    "tags": [
      "Product Ad",
      "Lighting",
      "Clean Aesthetic"
    ],
    "isPublished": true,
    "createdAt": "2026-09-05T10:00:00Z"
  },
  {
    "id": "proj-8",
    "title": "Siwon Sneak Peek Teaser",
    "category": "AI & Brand Commercials",
    "videoUrl": "/videos/siwon-pending-video.mp4",
    "thumbnailUrl": "/videos/siwon-pending-video.mp4",
    "duration": "18s",
    "client": "Siwon Media",
    "clientName": "Siwon Media",
    "views": "310K",
    "featured": false,
    "isFeatured": false,
    "description": "High-curiosity teaser cut designed for Instagram Stories & TikTok with fast text flashes and suspenseful build-up.",
    "tags": [
      "Teaser",
      "Short Form",
      "Curiosity Gap"
    ],
    "isPublished": true,
    "createdAt": "2026-09-05T10:00:00Z"
  },
  {
    "id": "proj-9",
    "title": "Steam Momo Sizzle Reel",
    "category": "AI & Brand Commercials",
    "videoUrl": "/videos/steam-momo.mp4",
    "thumbnailUrl": "/videos/steam-momo.mp4",
    "duration": "26s",
    "client": "Momo Express",
    "clientName": "Momo Express",
    "views": "780K",
    "featured": false,
    "isFeatured": false,
    "description": "Mouth-watering steam & sizzle cuts with crisp Foley sound design and vibrant color enhancement.",
    "tags": [
      "Food Video",
      "Sound Design",
      "Reels"
    ],
    "isPublished": true,
    "createdAt": "2026-09-05T10:00:00Z"
  },
  {
    "id": "proj-10",
    "title": "Fitness Transformation Hook Cut",
    "category": "Personal Brand",
    "videoUrl": "/videos/fitness-transformation.mp4",
    "thumbnailUrl": "/videos/fitness-transformation.mp4",
    "duration": "35s",
    "client": "FitCore Global",
    "clientName": "FitCore Global",
    "views": "4.2M",
    "featured": true,
    "isFeatured": true,
    "description": "High-retention health and fitness hook video with zoom transitions, sound risers, and kinetic subtitle typography.",
    "tags": [
      "Fitness",
      "Retention",
      "Subtitles"
    ],
    "isPublished": true,
    "createdAt": "2026-09-05T10:00:00Z"
  },
  {
    "id": "proj-11",
    "title": "Swion Brand Identity Reveal",
    "category": "AI & Brand Commercials",
    "videoUrl": "/videos/swion-reveal.mp4",
    "thumbnailUrl": "/videos/swion-reveal.mp4",
    "duration": "42s",
    "client": "Swion Brand",
    "clientName": "Swion Brand",
    "views": "1.1M",
    "featured": true,
    "isFeatured": true,
    "description": "Futuristic 3D logo reveal and brand identity video with synchronized bass drops and glowing particle streams.",
    "tags": [
      "3D Reveal",
      "Motion Graphics",
      "Sound FX"
    ],
    "isPublished": true,
    "createdAt": "2026-09-05T10:00:00Z"
  },
  {
    "id": "proj-12",
    "title": "AI Product Showcase Edition 01",
    "category": "Product Ads & UGC",
    "videoUrl": "/videos/ai-product-showcase.mp4",
    "thumbnailUrl": "/videos/ai-product-showcase.mp4",
    "duration": "20s",
    "client": "NextGen AI",
    "clientName": "NextGen AI",
    "views": "540K",
    "featured": false,
    "isFeatured": false,
    "description": "AI-generated commercial product demonstration featuring futuristic lighting and seamless camera pans.",
    "tags": [
      "AI Product",
      "3D Pan",
      "Commercial"
    ],
    "isPublished": true,
    "createdAt": "2026-09-05T10:00:00Z"
  },
  {
    "id": "proj-13",
    "title": "Luxury Skincare AI Commercial MVP",
    "category": "Product Ads & UGC",
    "videoUrl": "/videos/luxury-skincare-ai.mp4",
    "thumbnailUrl": "/videos/luxury-skincare-ai.mp4",
    "duration": "30s",
    "client": "GlowSkin Lux",
    "clientName": "GlowSkin Lux",
    "views": "1.6M",
    "featured": true,
    "isFeatured": true,
    "description": "Top-tier luxury beauty brand commercial generated with AI prompts and refined with DaVinci Resolve color grading.",
    "tags": [
      "Luxury Beauty",
      "Color Grade",
      "AI Video"
    ],
    "isPublished": true,
    "createdAt": "2026-09-05T10:00:00Z"
  },
  {
    "id": "proj-14",
    "title": "Dermacare High-End Ad Spot",
    "category": "Product Ads & UGC",
    "videoUrl": "/videos/dermacare-ad.mp4",
    "thumbnailUrl": "/videos/dermacare-ad.mp4",
    "duration": "28s",
    "client": "DermaCare Pure",
    "clientName": "DermaCare Pure",
    "views": "920K",
    "featured": false,
    "isFeatured": false,
    "description": "Ultra-clean dermatological commercial ad featuring smooth slow-motion water drops and pristine typography.",
    "tags": [
      "Skincare",
      "Slow Motion",
      "Clean Cut"
    ],
    "isPublished": true,
    "createdAt": "2026-09-05T10:00:00Z"
  },
  {
    "id": "proj-15",
    "title": "Siwon Product Ad \u2014 Reel 01",
    "category": "Product Ads & UGC",
    "videoUrl": "/videos/siwon-ads-01.mp4",
    "thumbnailUrl": "/videos/siwon-ads-01.mp4",
    "duration": "24s",
    "client": "Siwon Ads",
    "clientName": "Siwon Ads",
    "views": "490K",
    "featured": false,
    "isFeatured": false,
    "description": "Dynamic social media advertisement optimized for conversion with direct hook, value delivery, and clear CTA.",
    "tags": [
      "UGC Ad",
      "Social Media",
      "CTA"
    ],
    "isPublished": true,
    "createdAt": "2026-09-05T10:00:00Z"
  },
  {
    "id": "proj-16",
    "title": "Siwon Location Targeted UGC",
    "category": "Product Ads & UGC",
    "videoUrl": "/videos/siwon-target-place.mp4",
    "thumbnailUrl": "/videos/siwon-target-place.mp4",
    "duration": "22s",
    "client": "Siwon Retail",
    "clientName": "Siwon Retail",
    "views": "380K",
    "featured": false,
    "isFeatured": false,
    "description": "Geo-targeted promotional video with engaging b-roll sequences and energetic background music.",
    "tags": [
      "Targeted UGC",
      "B-Roll",
      "Pacing"
    ],
    "isPublished": true,
    "createdAt": "2026-09-05T10:00:00Z"
  },
  {
    "id": "proj-17",
    "title": "Aurabella Strategic Reel Cut",
    "category": "AI & Brand Commercials",
    "videoUrl": "/videos/aurabella-reels-plan.mp4",
    "thumbnailUrl": "/videos/aurabella-reels-plan.mp4",
    "duration": "38s",
    "client": "Aurabella Studios",
    "clientName": "Aurabella Studios",
    "views": "1.3M",
    "featured": true,
    "isFeatured": true,
    "description": "Strategic short-form reel built from storyboard concept to final retention-optimized vertical master.",
    "tags": [
      "Strategy",
      "Vertical Reel",
      "Premiere Pro"
    ],
    "isPublished": true,
    "createdAt": "2026-09-05T10:00:00Z"
  },
  {
    "id": "proj-18",
    "title": "GMD Nation Dialogue & Story Reel",
    "category": "Personal Brand",
    "videoUrl": "/videos/gmd-modi-ji.mp4",
    "thumbnailUrl": "/videos/gmd-modi-ji.mp4",
    "duration": "48s",
    "client": "GMD Media",
    "clientName": "GMD Media",
    "views": "5.8M",
    "featured": true,
    "isFeatured": true,
    "description": "High-impact political & cultural narrative reel with dynamic text animations, orchestral score, and emotional pacing.",
    "tags": [
      "Viral Storytelling",
      "Kinetic Text",
      "Sound Track"
    ],
    "isPublished": true,
    "createdAt": "2026-09-05T10:00:00Z"
  },
  {
    "id": "proj-19",
    "title": "Aurabella AI Remix Master Reel",
    "category": "AI & Brand Commercials",
    "videoUrl": "/videos/aurabella-final-reels.mp4",
    "thumbnailUrl": "/videos/aurabella-final-reels.mp4",
    "duration": "44s",
    "client": "Aurabella Fashion",
    "clientName": "Aurabella Fashion",
    "views": "3.1M",
    "featured": true,
    "isFeatured": true,
    "description": "Stunning fusion of high-fashion cinematography and generative AI visuals with rhythmic sound design.",
    "tags": [
      "Fashion Reel",
      "AI Remix",
      "After Effects"
    ],
    "isPublished": true,
    "createdAt": "2026-09-05T10:00:00Z"
  },
  {
    "id": "proj-20",
    "title": "Aurabella Luxury Animated Outro",
    "category": "Motion Graphics & Logo Stings",
    "videoUrl": "/videos/aurabella-final-outro.mp4",
    "thumbnailUrl": "/videos/aurabella-final-outro.mp4",
    "duration": "12s",
    "client": "Aurabella Studios",
    "clientName": "Aurabella Studios",
    "views": "460K",
    "featured": false,
    "isFeatured": false,
    "description": "Sleek luxury brand outro bumper with gold shimmer, smooth bezier easing, and signature audio chime.",
    "tags": [
      "Motion Graphics",
      "Outro",
      "Logo Animation"
    ],
    "isPublished": true,
    "createdAt": "2026-09-05T10:00:00Z"
  },
  {
    "id": "proj-21",
    "title": "GMD Stinger & Motion Logo",
    "category": "Motion Graphics & Logo Stings",
    "videoUrl": "/videos/gmd-stinger.mp4",
    "thumbnailUrl": "/videos/gmd-stinger.mp4",
    "duration": "15s",
    "client": "GMD Global",
    "clientName": "GMD Global",
    "views": "620K",
    "featured": false,
    "isFeatured": false,
    "description": "Modern 3D stinger animation featuring bold typography, glitch distortion accents, and heavy bass impact.",
    "tags": [
      "Stinger",
      "Glitch FX",
      "Motion Design"
    ],
    "isPublished": true,
    "createdAt": "2026-09-05T10:00:00Z"
  },
  {
    "id": "proj-22",
    "title": "Sea Water Sports 4K Reel",
    "category": "Cinematic Short Films",
    "videoUrl": "/videos/sea-water-sports.mp4",
    "thumbnailUrl": "/videos/sea-water-sports.mp4",
    "duration": "34s",
    "client": "Goa Adventure Co.",
    "clientName": "Goa Adventure Co.",
    "views": "2.4M",
    "featured": true,
    "isFeatured": true,
    "description": "Adrenaline-fueled ocean action reel featuring high-fps speed ramps, water droplets VFX, and summer beats.",
    "tags": [
      "Sports Reel",
      "Speed Ramp",
      "4K Action"
    ],
    "isPublished": true,
    "createdAt": "2026-09-05T10:00:00Z"
  },
  {
    "id": "proj-23",
    "title": "Swion Brand Identity Outro",
    "category": "Motion Graphics & Logo Stings",
    "videoUrl": "/videos/swion-final-outro.mp4",
    "thumbnailUrl": "/videos/swion-final-outro.mp4",
    "duration": "14s",
    "client": "Swion Global",
    "clientName": "Swion Global",
    "views": "510K",
    "featured": false,
    "isFeatured": false,
    "description": "Ultra-clean minimalist brand closing card with smooth typography animations and subtle sound design.",
    "tags": [
      "Brand Outro",
      "Minimalist",
      "Typography"
    ],
    "isPublished": true,
    "createdAt": "2026-09-05T10:00:00Z"
  },
  {
    "id": "proj-24",
    "title": "Partik Personal Brand Reel \u2014 Part 01",
    "category": "Personal Brand",
    "videoUrl": "/videos/partik-video-01.mp4",
    "thumbnailUrl": "/videos/partik-video-01.mp4",
    "duration": "42s",
    "client": "Partik Sharma",
    "clientName": "Partik Sharma",
    "views": "3.8M",
    "featured": true,
    "isFeatured": true,
    "description": "Viral talking-head personal branding reel with punchy jump-cuts, animated icons, sound pops, and bold captions.",
    "tags": [
      "Personal Branding",
      "Talking Head",
      "Viral Captions"
    ],
    "isPublished": true,
    "createdAt": "2026-09-05T10:00:00Z"
  },
  {
    "id": "proj-25",
    "title": "Cinematic Visual Grading Sample",
    "category": "Cinematic Short Films",
    "videoUrl": "/videos/cinematic-sample.mov",
    "thumbnailUrl": "/videos/cinematic-sample.mov",
    "duration": "25s",
    "client": "Piyush Studio",
    "clientName": "Piyush Studio",
    "views": "870K",
    "featured": false,
    "isFeatured": false,
    "description": "Color grading showcase showing raw flat log footage transformed into rich cinematic film tones.",
    "tags": [
      "Color Grading",
      "Film Look",
      "DaVinci Resolve"
    ],
    "isPublished": true,
    "createdAt": "2026-09-05T10:00:00Z"
  },
  {
    "id": "proj-26",
    "title": "Fast-Paced Motion Hook Showcase",
    "category": "Personal Brand",
    "videoUrl": "/videos/hook-showcase-01.mov",
    "thumbnailUrl": "/videos/hook-showcase-01.mov",
    "duration": "30s",
    "client": "Piyush Studio",
    "clientName": "Piyush Studio",
    "views": "1.2M",
    "featured": true,
    "isFeatured": true,
    "description": "Dynamic editing compilation highlighting retention hooks, kinetic transitions, and sound layering.",
    "tags": [
      "Hook Editing",
      "Retention",
      "Fast Cuts"
    ],
    "isPublished": true,
    "createdAt": "2026-09-05T10:00:00Z"
  },
  {
    "id": "proj-27",
    "title": "Upcoming Project Epic \u2014 Scene 01 (Kurukshetra Genesis)",
    "category": "Upcoming Project",
    "videoUrl": "/videos/upcoming-scene-01.mp4",
    "thumbnailUrl": "/videos/upcoming-scene-01.mp4",
    "duration": "58s",
    "client": "Epic Studio",
    "clientName": "Epic Studio",
    "views": "6.4M",
    "featured": true,
    "isFeatured": true,
    "description": "Exclusive cinematic trailer for upcoming Upcoming Project project featuring epic CGI battlefield, warriors, and thunderous score.",
    "tags": [
      "Upcoming Project",
      "Epic CGI",
      "Cinematic VFX"
    ],
    "isPublished": true,
    "createdAt": "2026-09-05T10:00:00Z"
  },
  {
    "id": "proj-28",
    "title": "Upcoming Project Epic \u2014 Scene 05 (Divine Cosmic Astra)",
    "category": "Upcoming Project",
    "videoUrl": "/videos/upcoming-scene-05.mp4",
    "thumbnailUrl": "/videos/upcoming-scene-05.mp4",
    "duration": "62s",
    "client": "Epic Studio",
    "clientName": "Epic Studio",
    "views": "7.9M",
    "featured": true,
    "isFeatured": true,
    "description": "Mind-bending divine weapon sequence with celestial VFX, volumetric lightning, and epic mythological soundscape.",
    "tags": [
      "Upcoming Project",
      "Divine Astra",
      "Cosmic VFX"
    ],
    "isPublished": true,
    "createdAt": "2026-09-05T10:00:00Z"
  }
];

export default function Hero({ onPlayShowreel, stats, videos = [] }: HeroProps) {
  const [heroVideoMuted, setHeroVideoMuted] = useState(true);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);

  // Use provided published videos or complete fallback list
  const showcaseVideos = (videos && videos.length > 0)
    ? videos.filter((v) => v.isPublished !== false)
    : DEFAULT_FALLBACK_VIDEOS;

  const currentVideo = showcaseVideos[activeVideoIndex] || showcaseVideos[0] || DEFAULT_FALLBACK_VIDEOS[0];

  const displayViews = stats?.totalViews || '50M+';
  const displayProjects = stats?.videosEdited || '150+';
  const displayRetention = stats?.engagement || '88%+';

  // Navigate to next video
  const handleNextVideo = useCallback(() => {
    setActiveVideoIndex((prev) => (prev + 1) % showcaseVideos.length);
    setProgress(0);
  }, [showcaseVideos.length]);

  // Navigate to previous video
  const handlePrevVideo = useCallback(() => {
    setActiveVideoIndex((prev) => (prev - 1 + showcaseVideos.length) % showcaseVideos.length);
    setProgress(0);
  }, [showcaseVideos.length]);

  // Update video element source when active video changes
  useEffect(() => {
    if (heroVideoRef.current && currentVideo?.videoUrl) {
      heroVideoRef.current.src = currentVideo.videoUrl;
      heroVideoRef.current.load();
      heroVideoRef.current.play().catch(() => {});
    }
  }, [activeVideoIndex, currentVideo?.videoUrl]);

  // Auto-advance timer: Every 7 seconds, advance to next video
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 7000; // 7 seconds per showcase preview
    const stepTime = 100;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += stepTime;
      setProgress(Math.min((elapsed / intervalTime) * 100, 100));

      if (elapsed >= intervalTime) {
        handleNextVideo();
        elapsed = 0;
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isPlaying, activeVideoIndex, handleNextVideo]);

  const toggleHeroSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (heroVideoRef.current) {
      heroVideoRef.current.muted = !heroVideoRef.current.muted;
      setHeroVideoMuted(heroVideoRef.current.muted);
    }
  };

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (heroVideoRef.current) {
      if (heroVideoRef.current.paused) {
        heroVideoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        heroVideoRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const creatorNiches = [
    'AI Brand Commercials',
    'Viral Instagram Reels',
    'YouTube Shorts Growth',
    'Upcoming Epic 3D Projects',
    'Kinetic Typography & Captions',
    'Sound Design & SFX',
    'DaVinci Color Grading',
    'UGC & TikTok Ads',
    'Talking Head Podcasts'
  ];

  return (
    <section className="relative pt-4 pb-12 sm:pt-8 sm:pb-20 md:pt-12 md:pb-24 overflow-hidden">
      
      {/* Background Ambient Glow Orbs with Deep Black Fade */}
      <div className="absolute top-10 left-1/4 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-40 right-1/4 translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Top Creator Status Pill */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md shadow-lg shadow-black/60">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-neutral-200">
              Open for Projects • 100% Free Creative Consultation
            </span>
          </div>
        </div>

        {/* Main Grid: Left Headline & Bio, Right Live Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
            
            {/* Real Workstation Photo Pill Badge */}
            <div className="inline-flex items-center gap-2.5 p-1.5 pr-4 rounded-full bg-white/[0.03] border border-white/[0.08] mx-auto lg:mx-0 shadow-sm">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-blue-400 shrink-0">
                <img
                  src="/images/piyush-avatar.png"
                  alt="Piyush at desk"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <span className="text-xs font-bold text-white">Piyush</span>
              <span className="text-[10px] text-neutral-400 font-medium">| Senior Video Editor</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-[1.1]">
              I Edit Videos That Don&apos;t Just Look Good — They{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                Dominate Feeds &amp; Command Millions of Views.
              </span>
            </h1>

            <p className="text-xs sm:text-base lg:text-lg text-neutral-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Specialized in <strong className="text-white font-semibold">AI Commercials, Viral Reels, TikTok Ads, and Upcoming Epic 3D Visuals</strong>. Combining retention-engineered hooks, kinetic typography, and Hollywood-grade sound design.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 max-w-lg mx-auto lg:mx-0 pt-1">
              <div className="glass-panel p-3 sm:p-3.5 rounded-2xl text-center lg:text-left bg-black/40 border-white/[0.08]">
                <div className="text-xl sm:text-3xl font-black text-white flex items-center justify-center lg:justify-start gap-1 font-display">
                  <span>{displayViews}</span>
                  <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400" />
                </div>
                <div className="text-[9px] sm:text-[11px] font-medium text-neutral-400 uppercase tracking-wider mt-0.5">Total Views</div>
              </div>

              <div className="glass-panel p-3 sm:p-3.5 rounded-2xl text-center lg:text-left bg-black/40 border-white/[0.08]">
                <div className="text-xl sm:text-3xl font-black text-white flex items-center justify-center lg:justify-start gap-1 font-display">
                  <span>{displayProjects}</span>
                  <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                </div>
                <div className="text-[9px] sm:text-[11px] font-medium text-neutral-400 uppercase tracking-wider mt-0.5">Videos Edited</div>
              </div>

              <div className="glass-panel p-3 sm:p-3.5 rounded-2xl text-center lg:text-left bg-black/40 border-white/[0.08]">
                <div className="text-xl sm:text-3xl font-black text-white flex items-center justify-center lg:justify-start gap-1 font-display">
                  <span>{displayRetention}</span>
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                </div>
                <div className="text-[9px] sm:text-[11px] font-medium text-neutral-400 uppercase tracking-wider mt-0.5">Avg Retention</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-2">
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold text-neutral-950 bg-gradient-to-r from-blue-400 via-indigo-200 to-white hover:opacity-95 rounded-xl transition-all shadow-xl shadow-blue-500/25 active:scale-[0.98] min-h-[44px] touch-manipulation"
              >
                <Play className="w-4 h-4 fill-neutral-950" />
                <span>Explore All {showcaseVideos.length} Videos</span>
              </a>

              <a
                href="https://wa.me/916202842908?text=Hi%20Piyush,%20I%20saw%20your%20video%20editing%20portfolio%20and%20would%20love%20to%20discuss%20a%20project!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-lg shadow-emerald-600/20 active:scale-[0.98] min-h-[44px] touch-manipulation"
              >
                <span>WhatsApp Connect</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-neutral-300 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] rounded-xl transition-colors min-h-[44px] touch-manipulation"
              >
                <span>Free Strategy Call</span>
              </a>
            </div>

          </div>

          {/* Right Column (5 cols): Interactive Floating Reel Showcase Card that Auto-rotates & Plays All 28 Videos */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-9-16 rounded-3xl overflow-hidden bg-black/90 border border-white/[0.15] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.95)] group">
              
              {/* Dynamic Top Progress Bar showing auto-rotation countdown */}
              <div className="absolute top-0 inset-x-0 h-1 bg-white/10 z-30">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Dynamic Video Element */}
              <video
                ref={heroVideoRef}
                src={currentVideo?.videoUrl || '/videos/aurabella-01.mp4'}
                autoPlay
                playsInline
                muted={heroVideoMuted}
                onEnded={handleNextVideo}
                className="w-full h-full object-cover transition-opacity duration-300"
              />

              {/* Top Video Overlay Badge */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between z-20">
                <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] sm:text-[11px] font-bold text-white flex items-center gap-1.5 border border-white/20 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  LIVE ROTATION ({activeVideoIndex + 1}/{showcaseVideos.length})
                </span>

                {/* Sound and Play Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={togglePlayPause}
                    className="p-2 rounded-full bg-black/80 backdrop-blur-md text-white hover:bg-black transition-colors border border-white/20 touch-manipulation min-w-[34px] min-h-[34px] flex items-center justify-center cursor-pointer shadow-md"
                    title={isPlaying ? "Pause Auto-Rotation" : "Play Auto-Rotation"}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5 text-neutral-300" /> : <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />}
                  </button>

                  <button
                    onClick={toggleHeroSound}
                    className="p-2 rounded-full bg-black/80 backdrop-blur-md text-white hover:bg-black transition-colors border border-white/20 touch-manipulation min-w-[34px] min-h-[34px] flex items-center justify-center cursor-pointer shadow-md"
                    title={heroVideoMuted ? "Click to Unmute" : "Mute Video"}
                  >
                    {heroVideoMuted ? <VolumeX className="w-3.5 h-3.5 text-neutral-400" /> : <Volume2 className="w-3.5 h-3.5 text-blue-400" />}
                  </button>
                </div>
              </div>

              {/* Prev / Next Quick Switching Floating Buttons */}
              <button
                onClick={handlePrevVideo}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md border border-white/20 opacity-80 group-hover:opacity-100 transition-opacity z-20 cursor-pointer shadow-lg"
                title="Previous Video"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNextVideo}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md border border-white/20 opacity-80 group-hover:opacity-100 transition-opacity z-20 cursor-pointer shadow-lg"
                title="Next Video"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Bottom Video Info Card (Dynamically updates per video!) */}
              <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 bg-gradient-to-t from-black via-black/85 to-transparent z-10 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-500/30 text-blue-300 border border-blue-500/40 truncate max-w-[140px]">
                    {currentVideo?.category || 'AI Commercial'}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-neutral-300 font-medium truncate">
                    {currentVideo?.clientName || currentVideo?.client || 'Piyush Studio'}
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-white leading-tight line-clamp-1">
                  {currentVideo?.title}
                </h3>

                {/* Equalizer Wave Bars & Views / Duration */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-end gap-1 h-4 sm:h-5">
                    <span className="w-1 bg-blue-400 rounded-full bar-1"></span>
                    <span className="w-1 bg-indigo-400 rounded-full bar-2"></span>
                    <span className="w-1 bg-purple-400 rounded-full bar-3"></span>
                    <span className="w-1 bg-cyan-400 rounded-full bar-4"></span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-neutral-300">
                    {currentVideo?.views || '1.2M'} Views • {currentVideo?.duration || '30s'}
                  </span>
                </div>
              </div>

            </div>

            {/* Micro Video Switcher Bar */}
            <div className="flex items-center justify-center gap-1.5 mt-3 max-w-[300px] overflow-x-auto py-1 px-2 scrollbar-none">
              {showcaseVideos.slice(0, 14).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveVideoIndex(idx);
                    setProgress(0);
                  }}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    activeVideoIndex === idx 
                      ? 'w-6 bg-blue-500' 
                      : 'w-1.5 bg-neutral-700 hover:bg-neutral-500'
                  }`}
                  title={`Jump to video ${idx + 1}`}
                />
              ))}
              {showcaseVideos.length > 14 && (
                <span className="text-[9px] text-neutral-500 font-mono pl-1">
                  +{showcaseVideos.length - 14}
                </span>
              )}
            </div>

          </div>

        </div>

        {/* Bottom Infinite Creator & Brand Marquee Ticker */}
        <div className="mt-10 sm:mt-14 pt-4 sm:pt-6 border-t border-white/[0.08] overflow-hidden">
          <div className="text-center mb-2.5 sm:mb-3">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-neutral-500">
              TRUSTED CONTENT CATEGORIES &amp; HIGH-IMPACT NICHES
            </span>
          </div>

          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="animate-marquee gap-3 sm:gap-4 py-2">
              {[...creatorNiches, ...creatorNiches].map((niche, idx) => (
                <div
                  key={idx}
                  className="px-3.5 sm:px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] sm:text-xs font-semibold text-neutral-300 whitespace-nowrap flex items-center gap-2"
                >
                  <Sparkles className="w-3 h-3 text-blue-400" />
                  <span>{niche}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
