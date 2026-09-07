'use client';

import React, { useState, useRef } from 'react';
import { X, Upload, Film, Image as ImageIcon, Sparkles, CheckCircle2, Loader2, Play, Trash2, AlertCircle } from 'lucide-react';
import { VideoProject } from '@/lib/types';

interface DirectUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVideoCreated: (newVideo: VideoProject) => void;
}

export default function DirectUploadModal({
  isOpen,
  onClose,
  onVideoCreated
}: DirectUploadModalProps) {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>('');
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');

  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [category, setCategory] = useState('AI & Brand Commercials');
  const [views, setViews] = useState('1.2M');
  const [duration, setDuration] = useState('35s');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('Viral, Reels, Editing');
  const [isFeatured, setIsFeatured] = useState(true);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const objUrl = URL.createObjectURL(file);
      setVideoPreviewUrl(objUrl);
      if (!title) {
        const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
        setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (uploadMode === 'file' && !videoFile && !videoPreviewUrl) {
      setErrorMsg('Please select a video file to upload.');
      return;
    }

    if (uploadMode === 'url' && !videoPreviewUrl.trim()) {
      setErrorMsg('Please enter a valid video URL.');
      return;
    }

    if (!title.trim()) {
      setErrorMsg('Please enter a video title.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(20);

    let finalVideoUrl = videoPreviewUrl;

    try {
      // 1. Upload File if selected
      if (uploadMode === 'file' && videoFile) {
        setUploadProgress(40);
        const formData = new FormData();
        formData.append('file', videoFile);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok || !uploadData.url) {
          throw new Error(uploadData.error || 'Failed to upload video file.');
        }

        finalVideoUrl = uploadData.url;
        setUploadProgress(70);
      }

      // 2. Save video record in DB
      const tags = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        title: title.trim(),
        client: client.trim() || 'Piyush Studio',
        clientName: client.trim() || 'Piyush Studio',
        category,
        videoUrl: finalVideoUrl,
        thumbnailUrl: finalVideoUrl,
        views: views.trim() || '500K',
        duration: duration.trim() || '30s',
        description: description.trim() || `High-retention short-form video edit by Piyush.`,
        tags: tags.length > 0 ? tags : ['Viral', 'Reels'],
        isFeatured: isFeatured,
        featured: isFeatured,
        isPublished: true,
        createdAt: new Date().toISOString()
      };

      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const savedVideo = await res.json();
      if (!res.ok) {
        throw new Error(savedVideo.error || 'Failed to save video to database.');
      }

      setUploadProgress(100);
      onVideoCreated(savedVideo);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0E0E14] border border-white/[0.15] rounded-3xl p-6 sm:p-8 shadow-2xl my-auto max-h-[92vh] overflow-y-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] sticky top-0 bg-[#0E0E14] z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black font-display text-white">
                Upload New Short-Form Video
              </h3>
              <p className="text-xs text-neutral-400">
                Upload .mp4 / .mov video from your computer or paste video link.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-white/[0.08] rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Video Selector Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                <Film className="w-4 h-4 text-blue-400" />
                <span>1. Select Video Source (9:16 Vertical) *</span>
              </label>

              {/* Mode Selector */}
              <div className="flex items-center gap-1 bg-white/[0.06] p-1 rounded-lg text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setUploadMode('file')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    uploadMode === 'file' ? 'bg-white text-neutral-950 shadow-sm' : 'text-neutral-400'
                  }`}
                >
                  Choose File
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMode('url')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    uploadMode === 'url' ? 'bg-white text-neutral-950 shadow-sm' : 'text-neutral-400'
                  }`}
                >
                  Paste URL
                </button>
              </div>
            </div>

            {uploadMode === 'file' ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/[0.15] hover:border-blue-500/50 rounded-2xl p-6 text-center cursor-pointer bg-white/[0.02] hover:bg-white/[0.04] transition-all"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/mp4,video/quicktime,video/webm,video/mov"
                  onChange={handleFileChange}
                  className="hidden"
                />
                
                {videoPreviewUrl ? (
                  <div className="space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                    <p className="text-xs font-bold text-white truncate max-w-sm mx-auto">
                      {videoFile?.name || 'Video Selected'}
                    </p>
                    <span className="text-[10px] text-neutral-400">Click to replace file</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 text-neutral-400 mx-auto" />
                    <p className="text-xs font-bold text-neutral-200">
                      Click or Drag & Drop MP4, MOV, or WEBM video
                    </p>
                    <p className="text-[11px] text-neutral-500">
                      Standard 9:16 vertical short format recommended
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <input
                type="url"
                placeholder="https://example.com/video.mp4 or /gdrive_videos/..."
                value={videoPreviewUrl}
                onChange={(e) => setVideoPreviewUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500/50"
              />
            )}
          </div>

          {/* Title & Client */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-neutral-300 uppercase">Video Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Aurabella Luxury Brand Launch"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500/50"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-neutral-300 uppercase">Client / Brand Name</label>
              <input
                type="text"
                placeholder="e.g. Partik Sharma / Aurabella"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500/50"
              />
            </div>
          </div>

          {/* Category & Duration & Views */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-neutral-300 uppercase">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141B] border border-white/[0.08] text-xs text-white focus:outline-none cursor-pointer"
              >
                <option value="AI & Brand Commercials">AI & Brand Commercials</option>
                <option value="Viral Shorts & Reels">Viral Shorts & Reels</option>
                <option value="Upcoming Project">Upcoming Project</option>
                <option value="Product Ads & UGC">Product Ads & UGC</option>
                <option value="Cinematic Visuals & VFX">Cinematic Visuals & VFX</option>
                <option value="Personal Brand">Personal Brand</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-neutral-300 uppercase">Duration</label>
              <input
                type="text"
                placeholder="e.g. 35s"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-neutral-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-neutral-300 uppercase">Views Metric</label>
              <input
                type="text"
                placeholder="e.g. 1.5M"
                value={views}
                onChange={(e) => setViews(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-neutral-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-neutral-300 uppercase">Editing Breakdown & Notes</label>
            <textarea
              rows={3}
              placeholder="Explain hook pacing, SFX layering, color grading, or software used..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-neutral-500 focus:outline-none"
            />
          </div>

          {/* Tags & Featured Checkbox */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
            <div className="w-full sm:w-2/3 space-y-1">
              <label className="text-[11px] font-bold text-neutral-300 uppercase">Tags (comma separated)</label>
              <input
                type="text"
                placeholder="AI, CGI, Hook, Sound FX"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-neutral-500 focus:outline-none"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer pt-4">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 rounded border-neutral-700 text-blue-500 focus:ring-blue-400"
              />
              <span className="text-xs font-semibold text-neutral-200">
                Feature on Homepage Spotlight
              </span>
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-neutral-400 hover:text-white rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUploading}
              className="px-6 py-2.5 text-xs font-bold text-neutral-950 bg-gradient-to-r from-blue-400 via-indigo-300 to-white hover:opacity-95 rounded-xl transition-opacity flex items-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Uploading Video ({uploadProgress}%)...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Publish & Add to Portfolio</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
