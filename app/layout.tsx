import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Piyush — Short-form Video Editor | Reels, Shorts & Social Content',
  description: 'Professional short-form video editor specializing in Reels, YouTube Shorts, TikTok videos, motion graphics, and engaging social media content.',
  keywords: [
    'Piyush',
    'Video Editor',
    'Short-form Video Editor',
    'Instagram Reels Editor',
    'YouTube Shorts Editor',
    'TikTok Video Editor',
    'Motion Graphics',
    'Viral Video Editing',
    'DaVinci Resolve Colorist',
    'Premiere Pro Editor'
  ],
  authors: [{ name: 'PIYUSH', url: 'https://piyushedits.com' }],
  creator: 'PIYUSH',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://piyushedits.com',
    title: 'Piyush — Short-form Video Editor | Reels, Shorts & Social Content',
    description: 'Professional short-form video editor specializing in Reels, YouTube Shorts, TikTok videos, motion graphics, and engaging social media content.',
    siteName: 'PIYUSH Portfolio',
    images: [
      {
        url: 'blob:https://web.whatsapp.com/582b327f-347a-4750-8fa0-a20f5b60d084',
        width: 1200,
        height: 630,
        alt: 'Piyush - Short-form Video Editor'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Piyush — Short-form Video Editor | Reels, Shorts & Social Content',
    description: 'Professional short-form video editor specializing in Reels, YouTube Shorts, TikTok videos, motion graphics, and engaging social media content.',
    images: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop']
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'PIYUSH',
    jobTitle: 'Short-form Video Editor & Motion Designer',
    url: 'https://piyushedits.com',
    email: 'piyushkumargupta159@gmail.com',
    sameAs: [
      'https://instagram.com',
      'https://linkedin.com',
      'https://behance.net'
    ],
    knowsAbout: [
      'Short-form Video Editing',
      'Instagram Reels',
      'YouTube Shorts',
      'TikTok',
      'Adobe Premiere Pro',
      'Adobe After Effects',
      'DaVinci Resolve',
      'CapCut',
      'Color Grading',
      'Sound Design'
    ],
    description: 'Professional short-form video editor specializing in high-retention vertical content for brands and creators.'
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#FAFAFA] text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}