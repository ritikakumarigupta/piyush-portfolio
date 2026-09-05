import { NextResponse } from 'next/server';

export async function GET() {
  const resumeHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>PIYUSH - Short-form Video Editor Resume</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #18181b; max-width: 800px; margin: 40px auto; padding: 0 20px; }
    h1 { font-size: 28px; margin-bottom: 4px; letter-spacing: -0.03em; }
    .subtitle { color: #52525b; font-size: 16px; margin-bottom: 24px; }
    .contact { font-size: 14px; color: #71717a; margin-bottom: 32px; border-bottom: 1px solid #e4e4e7; padding-bottom: 16px; }
    h2 { font-size: 18px; border-bottom: 2px solid #18181b; padding-bottom: 4px; margin-top: 24px; text-transform: uppercase; letter-spacing: 0.05em; }
    .stat-grid { display: flex; gap: 24px; margin: 16px 0; }
    .stat-box { background: #f4f4f5; padding: 12px 18px; border-radius: 8px; flex: 1; }
    .stat-val { font-size: 20px; font-weight: bold; color: #111; }
    .stat-lbl { font-size: 12px; color: #71717a; }
    .skills-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
    .pill { background: #f4f4f5; border: 1px solid #e4e4e7; padding: 4px 10px; border-radius: 9999px; font-size: 13px; }
    .btn { display: inline-block; background: #111; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none; margin-top: 20px; font-weight: 500; }
  </style>
</head>
<body>
  <h1>PIYUSH</h1>
  <div class="subtitle">Short-form Video Editor • Motion Design • Reels & Social Content Specialist</div>
  <div class="contact">
    Email: chameliedits@gmail.com | Location: India (Available Worldwide Remote) | Portfolio: 52+ Videos | Total Views: 2.1M+
  </div>

  <h2>Summary</h2>
  <p>Piyush is a high-performance short-form video editor specializing in dynamic vertical content for Instagram Reels, YouTube Shorts, and TikTok. Expert in retention pacing, sound design, kinetic typography, and motion graphics that drive multi-million organic views.</p>

  <h2>Impact & Metrics</h2>
  <div class="stat-grid">
    <div class="stat-box"><div class="stat-val">52+</div><div class="stat-lbl">Videos Edited</div></div>
    <div class="stat-box"><div class="stat-val">2.1M+</div><div class="stat-lbl">Total Views Generated</div></div>
    <div class="stat-box"><div class="stat-val">30+</div><div class="stat-lbl">Creators & Brands</div></div>
    <div class="stat-box"><div class="stat-val">90%+</div><div class="stat-lbl">Average Retention</div></div>
  </div>

  <h2>Core Editing Skills</h2>
  <div class="skills-pills">
    <span class="pill">Fast-paced kinetic editing</span>
    <span class="pill">Cinematic cuts</span>
    <span class="pill">Motion graphics</span>
    <span class="pill">Text animations</span>
    <span class="pill">Captions & Subtitles</span>
    <span class="pill">Foley & Sound Design</span>
    <span class="pill">Color Grading</span>
    <span class="pill">Beat Synchronization</span>
    <span class="pill">Viral Hook Construction</span>
    <span class="pill">Social Media Algorithm Optimization</span>
  </div>

  <h2>Tools & Software</h2>
  <div class="skills-pills">
    <span class="pill">Adobe Premiere Pro</span>
    <span class="pill">Adobe After Effects</span>
    <span class="pill">DaVinci Resolve Studio</span>
    <span class="pill">CapCut Pro</span>
    <span class="pill">Adobe Photoshop</span>
    <span class="pill">Canva</span>
  </div>

  <p style="margin-top: 30px;"><a href="javascript:window.print()" class="btn">Print / Save as PDF</a></p>
</body>
</html>`;

  return new NextResponse(resumeHtml, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Disposition': 'inline; filename="PIYUSH_Video_Editor_Resume.html"'
    }
  });
}