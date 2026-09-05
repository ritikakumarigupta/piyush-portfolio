'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { X, Upload, Film, Image as ImageIcon, Link as LinkIcon, CheckCircle2, Loader2, Play } from 'lucide-react';
import { VideoProject } from '@/lib/types';

interface AdminVideoModalProps {
  isOpen: boolean;
  isCreatingNew: boolean;
  currentVideo: Partial<VideoProject>;
  setCurrentVideo: React.Dispatch<React.SetStateAction<Partial<VideoProject>>>;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
  isSaving: boolean;
}

export default function AdminVideoModal({
  isOpen,
  isCreatingNew,
  currentVideo,
  setCurrentVideo,
  onClose,
  onSave,
  isSaving
}: AdminVideoModalProps) {
  const [videoUploadMode, setVideoUploadMode] = useState<'file' | 'url'>('file');
  const [thumbUploadMode, setThumbUploadMode] = useState<'file' | 'url'>('file');

  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingThumb, setUploadingThumb] = useState(false);

  const videoFileInputRef = useRef<HTMLInputElement | null>(null);
  const thumbFileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  // Handle direct video file upload
  const handleVideoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingVideo(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        setCurrentVideo((prev) => ({
          ...prev,
          videoUrl: data.url
        }));
      } else {
        alert(data.error || 'Failed to upload video');
      }
    } catch (err) {
      alert('Error uploading video file.');
    } finally {
      setUploadingVideo(false);
    }
  };

  // Handle direct thumbnail file upload
  const handleThumbFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingThumb(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        setCurrentVideo((prev) => ({
          ...prev,
          thumbnailUrl: data.url
        }));
      } else {
        alert(data.error || 'Failed to upload image');
      }
    } catch (err) {
      alert('Error uploading thumbnail file.');
    } finally {
      setUploadingThumb(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-150 mb-6 sticky top-0 bg-white z-10">
          <div>
            <h3 className="text-xl font-extrabold font-display text-neutral-950">
              {isCreatingNew ? 'Upload & Add New Reel' : 'Edit Project Details'}
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Upload video MP4 directly from your computer or provide media links.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-950 hover:bg-neutral-100 rounded-xl cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSave} className="space-y-6">
          
          {/* 1. Video Upload Box */}
          <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-neutral-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
                <Film className="w-4 h-4 text-neutral-600" />
                <span>1. Video Source (9:16 Vertical Video) *</span>
              </label>

              {/* Mode Switcher */}
              <div className="flex items-center gap-1 p-1 bg-neutral-200/70 rounded-lg text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setVideoUploadMode('file')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    videoUploadMode === 'file' ? 'bg-white text-neutral-950 shadow-sm' : 'text-neutral-600'
                  }`}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setVideoUploadMode('url')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    videoUploadMode === 'url' ? 'bg-white text-neutral-950 shadow-sm' : 'text-neutral-600'
                  }`}
                >
                  Enter URL
                </button>
              </div>
            </div>

            {videoUploadMode === 'file' ? (
              <div>
                <input
                  ref={videoFileInputRef}
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime,video/*"
                  onChange={handleVideoFileChange}
                  className="hidden"
                />

                <div
                  onClick={() => videoFileInputRef.current?.click()}
                  className="border-2 border-dashed border-neutral-300 hover:border-neutral-900 bg-white rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group"
                >
                  {uploadingVideo ? (
                    <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700">
                      <Loader2 className="w-5 h-5 animate-spin text-neutral-950" />
                      <span>Uploading Video File to Server...</span>
                    </div>
                  ) : currentVideo.videoUrl ? (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-bold text-neutral-950 block">
                          Video Ready &amp; Uploaded
                        </span>
                        <span className="text-[11px] font-mono text-neutral-500 truncate block max-w-sm">
                          {currentVideo.videoUrl}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-full bg-neutral-100 group-hover:bg-neutral-950 group-hover:text-white flex items-center justify-center transition-colors">
                        <Upload className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-neutral-900">
                        Click to select MP4 / WebM video from your device
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        Supports 9:16 vertical reels up to 100MB
                      </span>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <input
                  type="url"
                  value={currentVideo.videoUrl || ''}
                  onChange={(e) => setCurrentVideo({ ...currentVideo, videoUrl: e.target.value })}
                  placeholder="https://...mp4 or video stream URL"
                  className="w-full px-4 py-3 text-xs bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
            )}

            {/* Video preview preview */}
            {currentVideo.videoUrl && (
              <div className="mt-2 flex items-center gap-2 text-[11px] text-neutral-500 bg-white p-2 rounded-lg border border-neutral-200">
                <Play className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-mono truncate">Current Source: {currentVideo.videoUrl}</span>
              </div>
            )}
          </div>

          {/* 2. Thumbnail Upload Box */}
          <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-neutral-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-neutral-600" />
                <span>2. Poster Thumbnail (Cover Image) *</span>
              </label>

              {/* Mode Switcher */}
              <div className="flex items-center gap-1 p-1 bg-neutral-200/70 rounded-lg text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setThumbUploadMode('file')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    thumbUploadMode === 'file' ? 'bg-white text-neutral-950 shadow-sm' : 'text-neutral-600'
                  }`}
                >
                  Upload Image
                </button>
                <button
                  type="button"
                  onClick={() => setThumbUploadMode('url')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    thumbUploadMode === 'url' ? 'bg-white text-neutral-950 shadow-sm' : 'text-neutral-600'
                  }`}
                >
                  Enter URL
                </button>
              </div>
            </div>

            {thumbUploadMode === 'file' ? (
              <div>
                <input
                  ref={thumbFileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/*"
                  onChange={handleThumbFileChange}
                  className="hidden"
                />

                <div
                  onClick={() => thumbFileInputRef.current?.click()}
                  className="border-2 border-dashed border-neutral-300 hover:border-neutral-900 bg-white rounded-2xl p-4 text-center cursor-pointer transition-all flex items-center justify-center gap-4 group"
                >
                  {uploadingThumb ? (
                    <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700">
                      <Loader2 className="w-5 h-5 animate-spin text-neutral-950" />
                      <span>Uploading Image...</span>
                    </div>
                  ) : currentVideo.thumbnailUrl ? (
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-neutral-900 border border-neutral-200">
                        <Image
                          src={currentVideo.thumbnailUrl}
                          alt="Thumbnail preview"
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-bold text-neutral-950 block">
                          Thumbnail Loaded
                        </span>
                        <span className="text-[11px] text-neutral-400 block">
                          Click to change cover image
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Upload className="w-4 h-4 text-neutral-500" />
                      <span className="text-xs font-semibold text-neutral-800">
                        Upload Cover Photo / Poster (JPG, PNG, WebP)
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <input
                  type="url"
                  value={currentVideo.thumbnailUrl || ''}
                  onChange={(e) => setCurrentVideo({ ...currentVideo, thumbnailUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/... or image link"
                  className="w-full px-4 py-3 text-xs bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
            )}
          </div>

          {/* 3. Project Metadata Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={currentVideo.title || ''}
                onChange={(e) => setCurrentVideo({ ...currentVideo, title: e.target.value })}
                placeholder="e.g. Nike Air Max Kinetic Cut"
                className="w-full px-4 py-3 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                Category *
              </label>
              <select
                value={currentVideo.category || 'Lifestyle'}
                onChange={(e) => setCurrentVideo({ ...currentVideo, category: e.target.value as any })}
                className="w-full px-4 py-3 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 cursor-pointer"
              >
                <option value="Lifestyle">Lifestyle</option>
                <option value="Product">Product</option>
                <option value="Travel">Travel</option>
                <option value="Fashion">Fashion</option>
                <option value="Food">Food</option>
                <option value="Educational">Educational</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                Duration
              </label>
              <input
                type="text"
                value={currentVideo.duration || '0:30'}
                onChange={(e) => setCurrentVideo({ ...currentVideo, duration: e.target.value })}
                placeholder="0:30"
                className="w-full px-3 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                Views Counter
              </label>
              <input
                type="text"
                value={currentVideo.views || '150K'}
                onChange={(e) => setCurrentVideo({ ...currentVideo, views: e.target.value })}
                placeholder="450K"
                className="w-full px-3 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                Client / Creator
              </label>
              <input
                type="text"
                value={currentVideo.clientName || ''}
                onChange={(e) => setCurrentVideo({ ...currentVideo, clientName: e.target.value })}
                placeholder="Brand / Creator"
                className="w-full px-3 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              Project Description &amp; Story
            </label>
            <textarea
              rows={2}
              value={currentVideo.description || ''}
              onChange={(e) => setCurrentVideo({ ...currentVideo, description: e.target.value })}
              placeholder="Brief description of the pacing, story, and creative intent..."
              className="w-full px-4 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl resize-y"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                Editing Style
              </label>
              <input
                type="text"
                value={currentVideo.editingStyle || ''}
                onChange={(e) => setCurrentVideo({ ...currentVideo, editingStyle: e.target.value })}
                placeholder="ASMR sound design, kinetic cuts"
                className="w-full px-4 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                Results / Performance
              </label>
              <input
                type="text"
                value={currentVideo.results || ''}
                onChange={(e) => setCurrentVideo({ ...currentVideo, results: e.target.value })}
                placeholder="450K Views • 94% Retention"
                className="w-full px-4 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={currentVideo.isFeatured || false}
                onChange={(e) => setCurrentVideo({ ...currentVideo, isFeatured: e.target.checked })}
                className="w-4 h-4 rounded accent-neutral-950 cursor-pointer"
              />
              <span className="text-xs font-bold text-neutral-900">Feature in &ldquo;Selected Work&rdquo;</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={currentVideo.isPublished !== false}
                onChange={(e) => setCurrentVideo({ ...currentVideo, isPublished: e.target.checked })}
                className="w-4 h-4 rounded accent-neutral-950 cursor-pointer"
              />
              <span className="text-xs font-bold text-neutral-900">Publish (Visible to public)</span>
            </label>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-neutral-150 flex items-center justify-end gap-3 sticky bottom-0 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || uploadingVideo || uploadingThumb}
              className="px-7 py-3 rounded-xl bg-neutral-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-md cursor-pointer disabled:opacity-70 flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Project...</span>
                </>
              ) : (
                <span>Save Video Project</span>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}