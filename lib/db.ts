import fs from 'fs';
import path from 'path';
import { VideoProject, SiteStats, Testimonial, ContactInquiry, SiteSettings, ServiceItem, Category } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const INITIAL_DATA_FILE = path.join(process.cwd(), 'public', 'data', 'initialData.json');

export interface DatabaseSchema {
  videos: VideoProject[];
  stats: SiteStats;
  testimonials: Testimonial[];
  services: ServiceItem[];
  settings: SiteSettings;
  inquiries: ContactInquiry[];
}

function ensureDb(): DatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    if (fs.existsSync(INITIAL_DATA_FILE)) {
      const initialRaw = fs.readFileSync(INITIAL_DATA_FILE, 'utf8');
      fs.writeFileSync(DB_FILE, initialRaw, 'utf8');
      return JSON.parse(initialRaw);
    }
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    if (fs.existsSync(INITIAL_DATA_FILE)) {
      const initialRaw = fs.readFileSync(INITIAL_DATA_FILE, 'utf8');
      fs.writeFileSync(DB_FILE, initialRaw, 'utf8');
      return JSON.parse(initialRaw);
    }
    throw err;
  }
}

function saveDb(data: DatabaseSchema): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const tempFile = `${DB_FILE}.tmp`;
  fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(tempFile, DB_FILE);
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
  let list = [...db.videos];

  // Published filter
  if (options?.publishedOnly !== false) {
    list = list.filter(v => v.isPublished !== false);
  }

  // Featured only
  if (options?.featuredOnly) {
    list = list.filter(v => (v.isFeatured || v.featured));
  }

  // Category filter
  if (options?.category && options.category !== 'All') {
    list = list.filter(v => (v.category || '').toLowerCase() === options.category!.toLowerCase());
  }

  // Search filter
  if (options?.search && options.search.trim()) {
    const q = options.search.toLowerCase().trim();
    list = list.filter(v => 
      (v.title || '').toLowerCase().includes(q) ||
      (v.description || '').toLowerCase().includes(q) ||
      (v.clientName || v.client || '').toLowerCase().includes(q) ||
      (v.editingStyle || '').toLowerCase().includes(q) ||
      (v.category || '').toLowerCase().includes(q) ||
      (v.toolsUsed || v.tags || []).some(t => t.toLowerCase().includes(q))
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
    list.sort((a, b) => new Date(a.date || a.createdAt || 0).getTime() - new Date(b.date || b.createdAt || 0).getTime());
  } else {
    // Default 'recent'
    list.sort((a, b) => new Date(b.date || b.createdAt || 0).getTime() - new Date(a.date || a.createdAt || 0).getTime());
  }

  const total = list.length;
  const page = options?.page || 1;
  const limit = options?.limit || total;
  const startIndex = (page - 1) * limit;
  const paginated = list.slice(startIndex, startIndex + limit);

  return {
    videos: paginated,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasMore: startIndex + limit < total
  };
}

export function getAllVideos(): VideoProject[] {
  const db = ensureDb();
  return db.videos;
}

export function getVideoById(id: string): VideoProject | null {
  const db = ensureDb();
  return db.videos.find(v => v.id === id) || null;
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
  const index = db.videos.findIndex(v => v.id === id);
  if (index === -1) return null;
  db.videos[index] = { ...db.videos[index], ...updates };
  saveDb(db);
  return db.videos[index];
}

export function deleteVideo(id: string): boolean {
  const db = ensureDb();
  const before = db.videos.length;
  db.videos = db.videos.filter(v => v.id !== id);
  if (db.videos.length !== before) {
    saveDb(db);
    return true;
  }
  return false;
}

export function reorderVideos(orderedIds: string[]): boolean {
  const db = ensureDb();
  const videoMap = new Map(db.videos.map(v => [v.id, v]));
  const reordered: VideoProject[] = [];

  orderedIds.forEach((id, index) => {
    const item = videoMap.get(id);
    if (item) {
      reordered.push({ ...item, sortOrder: index + 1 });
      videoMap.delete(id);
    }
  });

  // Append any remaining
  videoMap.forEach(item => {
    reordered.push({ ...item, sortOrder: reordered.length + 1 });
  });

  db.videos = reordered;
  saveDb(db);
  return true;
}

// STATS
export function getStats(): SiteStats {
  const db = ensureDb();
  return db.stats;
}

export function updateStats(updates: Partial<SiteStats>): SiteStats {
  const db = ensureDb();
  db.stats = { ...db.stats, ...updates };
  saveDb(db);
  return db.stats;
}

// TESTIMONIALS
export function getTestimonials(): Testimonial[] {
  const db = ensureDb();
  return db.testimonials;
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
  const idx = db.testimonials.findIndex(t => t.id === id);
  if (idx === -1) return null;
  db.testimonials[idx] = { ...db.testimonials[idx], ...updates };
  saveDb(db);
  return db.testimonials[idx];
}

export function deleteTestimonial(id: string): boolean {
  const db = ensureDb();
  const before = db.testimonials.length;
  db.testimonials = db.testimonials.filter(t => t.id !== id);
  if (db.testimonials.length !== before) {
    saveDb(db);
    return true;
  }
  return false;
}

// SERVICES
export function getServices(): ServiceItem[] {
  const db = ensureDb();
  return db.services;
}

// SETTINGS
export function getSettings(): SiteSettings {
  const db = ensureDb();
  return db.settings;
}

export function updateSettings(updates: Partial<SiteSettings>): SiteSettings {
  const db = ensureDb();
  db.settings = { ...db.settings, ...updates };
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
  const inq = db.inquiries.find(i => i.id === id);
  if (!inq) return false;
  inq.status = status;
  saveDb(db);
  return true;
}

export function deleteInquiry(id: string): boolean {
  const db = ensureDb();
  if (!db.inquiries) return false;
  const before = db.inquiries.length;
  db.inquiries = db.inquiries.filter(i => i.id !== id);
  if (db.inquiries.length !== before) {
    saveDb(db);
    return true;
  }
  return false;
}
