import { NextRequest, NextResponse } from 'next/server';
import { getInquiries, createInquiry, updateInquiryStatus, deleteInquiry } from '@/lib/db';
import { isAuthorizedAdmin } from '@/lib/auth';
import { notifyAdminOfInquiry } from '@/lib/notifications';

// GET: Fetch all inquiries (Admin Only)
export async function GET(request: NextRequest) {
  try {
    if (!isAuthorizedAdmin(request)) {
      return NextResponse.json({ error: 'Unauthorized. Admin credentials required.' }, { status: 401 });
    }

    const inquiries = getInquiries();
    return NextResponse.json(inquiries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

// POST: Submit a new inquiry (Public visitor)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, projectType, budgetRange, message } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
    }

    if (!email || !email.trim()) {
      return NextResponse.json({ error: 'Please enter your email address.' }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Please provide project details or description.' }, { status: 400 });
    }

    const newInquiry = createInquiry({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      projectType: projectType || 'Viral Reels & Shorts',
      budgetRange: budgetRange || 'Flexible',
      message: message.trim()
    });

    // Notify admin
    await notifyAdminOfInquiry(newInquiry);

    return NextResponse.json(
      {
        success: true,
        inquiry: newInquiry,
        message: 'Your inquiry has been successfully sent to Piyush!'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return NextResponse.json({ error: 'Failed to submit inquiry. Please try again or reach out on WhatsApp.' }, { status: 500 });
  }
}

// PUT: Update inquiry status (Admin Only)
export async function PUT(request: NextRequest) {
  try {
    if (!isAuthorizedAdmin(request)) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status are required' }, { status: 400 });
    }

    const success = updateInquiryStatus(id, status);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 });
  }
}

// DELETE: Remove an inquiry (Admin Only)
export async function DELETE(request: NextRequest) {
  try {
    if (!isAuthorizedAdmin(request)) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const success = deleteInquiry(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 });
  }
}