import { NextRequest } from 'next/server';

export const ADMIN_TOKEN = 'auth_token_' + Buffer.from('piyush_admin').toString('base64');

export function isAuthorizedAdmin(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.replace('Bearer ', '').trim();

  if (token === ADMIN_TOKEN || token === 'piyush2026') {
    return true;
  }

  // Also check custom header
  const customHeader = request.headers.get('x-admin-token') || '';
  if (customHeader === ADMIN_TOKEN || customHeader === 'piyush2026') {
    return true;
  }

  return false;
}
