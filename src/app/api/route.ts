import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Generic API gateway that forwards actions to the Google Apps Script backend.
// Added special handling for the 'login' action to work in development without the Google script.

import { GET as googleGET, POST as googlePOST } from './google/route';

// Mock login handler – used when action is 'login'.
async function handleLogin(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body?.email;
    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    }
    // Deterministic mock user based on email.
    const user = {
      user_id: 'mock-' + Buffer.from(email).toString('base64'),
      name: email.split('@')[0] ?? 'User',
      email,
      avatar: '',
    };
    const payload = { authenticated: true, user };
    return NextResponse.json({ success: true, data: payload }, { status: 200 });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unexpected error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const action = request.nextUrl.searchParams.get('action');
  if (!action) {
    return NextResponse.json({ success: false, message: 'Missing action' }, { status: 400 });
  }
  if (action === 'login') {
    // Login is POST‑only, but handle GET gracefully.
    return handleLogin(request);
  }
  // Forward all other GET actions to the Google Apps Script proxy.
  return googleGET(request);
}

export async function POST(request: NextRequest) {
  const action = request.nextUrl.searchParams.get('action');
  if (!action) {
    return NextResponse.json({ success: false, message: 'Missing action' }, { status: 400 });
  }
  if (action === 'login') {
    return handleLogin(request);
  }
  // Forward all other POST actions to the Google Apps Script proxy.
  return googlePOST(request);
}
