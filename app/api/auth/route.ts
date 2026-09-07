import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const ADMIN_EMAIL = 'piyushkumargupta159@gmail.com';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'piyush2026';

    // Allow password check, or email + password check
    const isEmailValid = !email || email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();
    const isPasswordValid = password === ADMIN_PASSWORD;

    if (isEmailValid && isPasswordValid) {
      return NextResponse.json({
        success: true,
        token: 'auth_token_' + Buffer.from('piyush_admin').toString('base64'),
        user: { 
          name: 'Piyush Kumar Gupta', 
          email: 'piyushkumargupta159@gmail.com',
          role: 'owner_admin' 
        }
      });
    }

    return NextResponse.json(
      { error: 'Invalid admin credentials. Access is strictly restricted to Piyush Kumar Gupta.' }, 
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
