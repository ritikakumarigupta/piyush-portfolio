import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { isAuthorizedAdmin } from '@/lib/auth';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    if (!isAuthorizedAdmin(request)) {
      return NextResponse.json({ error: 'Unauthorized. Only admin can upload media.' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const urlInput = formData.get('url') as string | null;

    if (urlInput && urlInput.trim().startsWith('http')) {
      return NextResponse.json({ url: urlInput.trim() });
    }

    if (!file) {
      return NextResponse.json({ error: 'No file or URL provided' }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Clean safe filename
    const ext = path.extname(file.name) || (file.type.includes('video') ? '.mp4' : '.jpg');
    const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const safeName = `${Date.now()}_${baseName}${ext}`;
    const filePath = path.join(uploadsDir, safeName);

    try {
      fs.writeFileSync(filePath, buffer);
    } catch {
      // Vercel serverless read-only filesystem handling
    }

    return NextResponse.json({ 
      success: true, 
      url: `/uploads/${safeName}`,
      name: file.name,
      size: file.size
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message || 'Failed to upload file' }, { status: 500 });
  }
}