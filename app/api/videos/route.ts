import { NextRequest, NextResponse } from 'next/server';
import { getVideos, createVideo, reorderVideos } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;
    const sort = (searchParams.get('sort') as 'recent' | 'views' | 'oldest') || 'recent';
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const featuredOnly = searchParams.get('featured') === 'true';
    const publishedOnly = searchParams.get('all') === 'true' ? false : true;

    const data = getVideos({
      category,
      search,
      sort,
      page,
      limit,
      featuredOnly,
      publishedOnly
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.action === 'reorder') {
      reorderVideos(body.orderedIds);
      return NextResponse.json({ success: true });
    }

    if (!body.title || !body.category) {
      return NextResponse.json({ error: 'Title and category are required' }, { status: 400 });
    }

    const video = createVideo({
      title: body.title,
      category: body.category,
      videoUrl: body.videoUrl || '',
      thumbnailUrl: body.thumbnailUrl || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
      duration: body.duration || '0:30',
      views: body.views || '0',
      viewsCount: body.viewsCount || parseInt(body.views) || 0,
      date: body.date || new Date().toISOString().split('T')[0],
      description: body.description || '',
      editingStyle: body.editingStyle || 'Kinetic cuts, Sound design',
      toolsUsed: Array.isArray(body.toolsUsed) ? body.toolsUsed : ['Premiere Pro'],
      clientName: body.clientName || 'Private Client',
      results: body.results || 'High retention reel',
      isFeatured: Boolean(body.isFeatured),
      isPublished: body.isPublished !== undefined ? Boolean(body.isPublished) : true
    });

    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error('Error creating video:', error);
    return NextResponse.json({ error: 'Failed to create video' }, { status: 500 });
  }
}