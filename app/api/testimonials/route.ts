import { NextRequest, NextResponse } from 'next/server';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '@/lib/db';

export async function GET() {
  try {
    const items = getTestimonials();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name || !body.quote) {
      return NextResponse.json({ error: 'Name and quote are required' }, { status: 400 });
    }
    const created = createTestimonial({
      name: body.name,
      role: body.role || 'Client',
      company: body.company || 'Creator',
      avatar: body.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      quote: body.quote,
      rating: body.rating || 5,
      project: body.project || 'Video Editing'
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ error: 'Testimonial ID is required' }, { status: 400 });
    }
    const updated = updateTestimonial(body.id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const success = deleteTestimonial(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}