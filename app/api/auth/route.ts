import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    // Secure default password
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'piyush2026';

    if (password === ADMIN_PASSWORD) {
      return NextResponse.json({
        success: true,
        token: 'auth_token_' + Buffer.from('piyush_admin').toString('base64'),
        user: { name: 'PIYUSH', role: 'admin' }
      });
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}