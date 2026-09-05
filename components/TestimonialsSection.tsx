'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Testimonial } from '@/lib/types';

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-01',
    name: 'Aakash Mehta',
    role: 'Founder & Head of Content',
    company: 'ChronoTech Horology',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    quote: 'Piyush transformed our watch launch campaign. The vertical edits felt like luxury commercials, driving over 950K organic views and tripling our pre-orders in 48 hours. Absolute master of retention pacing.',
    rating: 5,
    project: 'Titanium EDC Watch Campaign'
  },
  {
    id: 'test-02',
    name: 'Elena Rostova',
    role: 'Creative Director',
    company: 'NeoHarajuku Tokyo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    quote: 'Finding an editor who understands kinetic typography, sound design, and viral social hooks is rare. Piyush delivered on the first cut with zero revisions. Our collection completely sold out.',
    rating: 5,
    project: 'Cyberpunk Streetwear Drop'
  },
  {
    id: 'test-03',
    name: 'Devendra Patel',
    role: 'CEO & Creator',
    company: 'Creator Blueprint Media',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    quote: 'Our YouTube Shorts channel went from 15K views to averaging 400K+ per video after bringing Piyush on board. He understands algorithm retention curves better than most creators.',
    rating: 5,
    project: '1M Views Hook Formula Series'
  },
  {
    id: 'test-04',
    name: 'Rhea Sen',
    role: 'Brand Marketing Lead',
    company: 'Brew Culture Co.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    quote: 'The ASMR audio editing and subtle color grades Piyush produced gave our coffee brand an untouchable editorial aesthetic. Working with him is seamless and deadline-perfect.',
    rating: 5,
    project: 'Minimalist Coffee Morning Reel'
  }
];

export default function TestimonialsSection({ testimonials = DEFAULT_TESTIMONIALS }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const current = items[currentIndex];

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-neutral-100 text-neutral-800 mb-3 border border-neutral-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Client Endorsements</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 font-display">
              What Clients Say
            </h2>
            <p className="mt-3 text-neutral-600 text-sm sm:text-base max-w-xl">
              Trusted by high-growth creators, boutique brands, and digital agencies across the globe.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-3 rounded-xl bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-800 transition-colors shadow-sm cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-xl bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-800 transition-colors shadow-sm cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Testimonial Carousel Card */}
        <div className="bg-[#FAFAFA] rounded-3xl border border-neutral-200 p-8 sm:p-12 relative overflow-hidden shadow-sm">
          <div className="max-w-4xl">
            
            {/* 5 Stars */}
            <div className="flex items-center gap-1 mb-6 text-amber-500">
              {[...Array(current.rating || 5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-500" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-xl sm:text-2xl md:text-3xl font-medium text-neutral-900 leading-relaxed font-display">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            {/* Author details */}
            <div className="mt-8 pt-8 border-t border-neutral-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md bg-neutral-200">
                  <Image
                    src={current.avatar}
                    alt={current.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-base font-bold text-neutral-950">
                    {current.name}
                  </h4>
                  <p className="text-xs text-neutral-500">
                    {current.role} • <span className="font-semibold text-neutral-700">{current.company}</span>
                  </p>
                </div>
              </div>

              {current.project && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-xs font-mono text-neutral-700">
                  <span>Project: {current.project}</span>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Mini Preview Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === i ? 'w-8 bg-neutral-950' : 'w-2 bg-neutral-300'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}