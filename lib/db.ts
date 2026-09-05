import fs from 'fs';
import path from 'path';
import { VideoProject, SiteStats, Testimonial, ContactInquiry, SiteSettings, ServiceItem } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const INITIAL_DATA_FILE = path.join(process.cwd(), 'public', 'data', 'initialData.json');

const DEFAULT_STATS: SiteStats = {
  videosEdited: '150+',
  totalViews: '50M+',
  clientsCount: '35+',
  engagement: '88%+'
};

const DEFAULT_SETTINGS: SiteSettings = {
  name: 'PIYUSH',
  tagline: 'Short Video Editor & VFX Specialist',
  email: 'piyushkumargupta159@gmail.com',
  phone: '6202842908',
  whatsapp: '+916202842908',
  heroHeadline: "I Edit Videos That Don't Just Look Good — They Dominate Feeds & Command Millions of Views.",
  heroSubtitle: 'Specialized in AI Commercials, Viral Reels, TikTok Ads, and Mahabharat Epic 3D Visuals.',
  availabilityText: 'Open for Projects • 100% Free Creative Consultation'
};

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Alex Vance',
    role: 'Brand Director',
    company: 'Aurabella Skin',
    avatar: '/images/piyush-avatar.png',
    quote: 'Piyush transformed our product video with insane AI visuals and hook editing. Our conversions jumped 3.4x in the first week.',
    rating: 5,
    project: 'Commercial Reel'
  },
  {
    id: 'test-2',
    name: 'David Ross',
    role: 'Creator & Founder',
    company: 'Ross Media',
    avatar: '/images/piyush-avatar.png',
    quote: "Best short-form editor I've worked with. The pacing, sound effects, and kinetic text keep viewers glued till the last second.",
    rating: 5,
    project: 'Viral Shorts Campaign'
  }
];

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'serv-1',
    title: 'Viral Reels & TikTok Ads',
    description: 'High-retention vertical editing with psychological hooks, kinetic subtitles, dynamic sound design, and viral pacing.',
    icon: 'Flame',
    features: ['Hook Pacing', 'Kinetic Subtitles', 'Sound SFX', 'Color Pop']
  },
  {
    id: 'serv-2',
    title: 'AI Video & Cinematic Commercials',
    description: 'Photorealistic AI motion sequences, CGI background replacements, 3D product renders, and Hollywood-grade grade.',
    icon: 'Sparkles',
    features: ['AI Motion', '3D Camera VFX', 'DaVinci Grading', '4K Render']
  },
  {
    id: 'serv-3',
    title: 'Epic Mythological & 3D VFX',
    description: 'Battlefield environments, celestial energy effects, divine weapons, and hyper-immersive mythological storytelling.',
    icon: 'Layers',
    features: ['Epic VFX', 'Sound Design', 'CGI Models', 'Story Pacing']
  }
];

export interface DatabaseSchema {
  videos: VideoProject[];
  stats: SiteStats;
  testimonials: Testimonial[];
  services: ServiceItem[];
  settings: SiteSettings;
  inquiries: ContactInquiry[];
}

let cachedDb: DatabaseSchema | null = null;

function sanitizeDbData(data: Partial<DatabaseSchema>): DatabaseSchema {
  return {
    videos: Array.isArray(data.videos) ? data.videos : [],
    stats: { ...DEFAULT_STATS, ...(data.stats || {}) },
    testimonials: Array.isArray(data.testimonials) && data.testimonials.length > 0 ? data.testimonials : DEFAULT_TESTIMONIALS,
    services: Array.isArray(data.services) && data.services.length > 0 ? data.services : DEFAULT_SERVICES,
    settings: { ...DEFAULT_SETTINGS, ...(data.settings || {}) },
    inquiries: Array.isArray(data.inquiries) ? data.inquiries : []
  };
}

function ensureDb(): DatabaseSchema {
  if (cachedDb) {
    return cachedDb;
  }

  // 1. Try reading from DB_FILE
  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf8');
      cachedDb = sanitizeDbData(JSON.parse(raw));
      return cachedDb;
    } catch {
      // fallback
    }
  }

  // 2. Try reading from INITIAL_DATA_FILE
  if (fs.existsSync(INITIAL_DATA_FILE)) {
    try {
      const initialRaw = fs.readFileSync(INITIAL_DATA_FILE, 'utf8');
      cachedDb = sanitizeDbData(JSON.parse(initialRaw));
      // Try initializing DB_FILE if possible
      try {
        if (!fs.existsSync(DATA_DIR)) {
          fs.mkdirSync(DATA_DIR, { recursive: true });
        }
        fs.writeFileSync(DB_FILE, initialRaw, 'utf8');
      } catch {
        // Read-only environment on Vercel
      }
      return cachedDb;
    } catch {
      // fallback
    }
  }

  // 3. Fallback to in-memory defaults
  cachedDb = sanitizeDbData({});
  return cachedDb;
}

function saveDb(data: DatabaseSchema): void {
  cachedDb = sanitizeDbData(data);

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(cachedDb, null, 2), 'utf8');
    fs.renameSync(tempFile, DB_FILE);
  } catch {
    // Read-only filesystem on serverless (Vercel) - safely fallback to cached in-memory state
  }
}

// VIDEOS
export function getVideos(options?: {
  category?: string;
  search?: string;
  sort?: 'recent' | 'views' | 'oldest';
  page?: number;
  limit?: number;
  featuredOnly?: boolean;
  publishedOnly?: boolean;
}) {
  const db = ensureDb();
  let list = [...(db.videos || [])];

  // Published filter
  if (options?.publishedOnly !== false) {
    list = list.filter((v) => v.isPublished !== false);
  }

  // Featured only
  if (options?.featuredOnly) {
    list = list.filter((v) => v.isFeatured || v.featured);
  }

  // Category filter
  if (options?.category && options.category !== 'All') {
    list = list.filter((v) => (v.category || '').toLowerCase() === options.category!.toLowerCase());
  }

  // Search filter
  if (options?.search && options.search.trim()) {
    const q = options.search.toLowerCase().trim();
    list = list.filter(
      (v) =>
        (v.title || '').toLowerCase().includes(q) ||
        (v.description || '').toLowerCase().includes(q) ||
        (v.clientName || v.client || '').toLowerCase().includes(q) ||
        (v.editingStyle || '').toLowerCase().includes(q) ||
        (v.category || '').toLowerCase().includes(q) ||
        (v.toolsUsed || v.tags || []).some((t) => t.toLowerCase().includes(q))
    );
  }

  // Sort
  const getViewsNum = (v: any) => {
    if (typeof v.viewsCount === 'number') return v.viewsCount;
    if (typeof v.views === 'string') {
      if (v.views.includes('M')) return parseFloat(v.views) * 1000000;
      if (v.views.includes('K')) return parseFloat(v.views) * 1000;
      return parseFloat(v.views) || 0;
    }
    return 0;
  };

  if (options?.sort === 'views') {
    list.sort((a, b) => getViewsNum(b) - getViewsNum(a));
  } else if (options?.sort === 'oldest') {
    list.sort(
      (a, b) =>
        new Date(a.date || a.createdAt || 0).getTime() -
        new Date(b.date || b.createdAt || 0).getTime()
    );
  } else {
    // Default 'recent'
    list.sort(
      (a, b) =>
        new Date(b.date || b.createdAt || 0).getTime() -
        new Date(a.date || a.createdAt || 0).getTime()
    );
  }

  const total = list.length;
  const page = options?.page || 1;
  const limit = options?.limit || total || 1;
  const startIndex = (page - 1) * limit;
  const paginated = list.slice(startIndex, startIndex + limit);

  return {
    videos: paginated,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit) || 1,
    hasMore: startIndex + limit < total
  };
}

export function getAllVideos(): VideoProject[] {
  const db = ensureDb();
  return db.videos || [];
}

export function getVideoById(id: string): VideoProject | null {
  const db = ensureDb();
  return db.videos.find((v) => v.id === id) || null;
}

export function createVideo(video: Omit<VideoProject, 'id' | 'sortOrder'>): VideoProject {
  const db = ensureDb();
  const id = `proj-${Date.now().toString().slice(-4)}${Math.floor(Math.random() * 100)}`;
  const newVideo: VideoProject = {
    ...video,
    id,
    sortOrder: db.videos.length + 1
  };
  db.videos.unshift(newVideo);
  saveDb(db);
  return newVideo;
}

export function updateVideo(id: string, updates: Partial<VideoProject>): VideoProject | null {
  const db = ensureDb();
  const index = db.videos.findIndex((v) => v.id === id);
  if (index === -1) return null;
  db.videos[index] = { ...db.videos[index], ...updates };
  saveDb(db);
  return db.videos[index];
}

export function deleteVideo(id: string): boolean {
  const db = ensureDb();
  const before = db.videos.length;
  db.videos = db.videos.filter((v) => v.id !== id);
  if (db.videos.length !== before) {
    saveDb(db);
    return true;
  }
  return false;
}

export function reorderVideos(orderedIds: string[]): boolean {
  const db = ensureDb();
  const videoMap = new Map(db.videos.map((v) => [v.id, v]));
  const reordered: VideoProject[] = [];

  orderedIds.forEach((id, index) => {
    const item = videoMap.get(id);
    if (item) {
      reordered.push({ ...item, sortOrder: index + 1 });
      videoMap.delete(id);
    }
  });

  videoMap.forEach((item) => {
    reordered.push({ ...item, sortOrder: reordered.length + 1 });
  });

  db.videos = reordered;
  saveDb(db);
  return true;
}

// STATS
export function getStats(): SiteStats {
  const db = ensureDb();
  return db.stats || DEFAULT_STATS;
}

export function updateStats(updates: Partial<SiteStats>): SiteStats {
  const db = ensureDb();
  db.stats = { ...DEFAULT_STATS, ...(db.stats || {}), ...updates };
  saveDb(db);
  return db.stats;
}

// TESTIMONIALS
export function getTestimonials(): Testimonial[] {
  const db = ensureDb();
  return db.testimonials || DEFAULT_TESTIMONIALS;
}

export function createTestimonial(testimonial: Omit<Testimonial, 'id'>): Testimonial {
  const db = ensureDb();
  const id = `test-${Date.now().toString().slice(-4)}`;
  const item: Testimonial = { ...testimonial, id };
  db.testimonials.push(item);
  saveDb(db);
  return item;
}

export function updateTestimonial(id: string, updates: Partial<Testimonial>): Testimonial | null {
  const db = ensureDb();
  const idx = db.testimonials.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  db.testimonials[idx] = { ...db.testimonials[idx], ...updates };
  saveDb(db);
  return db.testimonials[idx];
}

export function deleteTestimonial(id: string): boolean {
  const db = ensureDb();
  const before = db.testimonials.length;
  db.testimonials = db.testimonials.filter((t) => t.id !== id);
  if (db.testimonials.length !== before) {
    saveDb(db);
    return true;
  }
  return false;
}

// SERVICES
export function getServices(): ServiceItem[] {
  const db = ensureDb();
  return db.services || DEFAULT_SERVICES;
}

// SETTINGS
export function getSettings(): SiteSettings {
  const db = ensureDb();
  return db.settings || DEFAULT_SETTINGS;
}

export function updateSettings(updates: Partial<SiteSettings>): SiteSettings {
  const db = ensureDb();
  db.settings = { ...DEFAULT_SETTINGS, ...(db.settings || {}), ...updates };
  saveDb(db);
  return db.settings;
}

// INQUIRIES
export function getInquiries(): ContactInquiry[] {
  const db = ensureDb();
  return db.inquiries || [];
}

export function createInquiry(inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>): ContactInquiry {
  const db = ensureDb();
  const newInq: ContactInquiry = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'new'
  };
  if (!db.inquiries) db.inquiries = [];
  db.inquiries.unshift(newInq);
  saveDb(db);
  return newInq;
}

export function updateInquiryStatus(id: string, status: 'new' | 'read' | 'replied'): boolean {
  const db = ensureDb();
  if (!db.inquiries) return false;
  const inq = db.inquiries.find((i) => i.id === id);
  if (!inq) return false;
  inq.status = status;
  saveDb(db);
  return true;
}

export function deleteInquiry(id: string): boolean {
  const db = ensureDb();
  if (!db.inquiries) return false;
  const before = db.inquiries.length;
  db.inquiries = db.inquiries.filter((i) => i.id !== id);
  if (db.inquiries.length !== before) {
    saveDb(db);
    return true;
  }
  return false;
}
