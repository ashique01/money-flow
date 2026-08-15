import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Generic API gateway that forwards actions to the Google Apps Script backend.
// All actions (including "login") are forwarded to the Google Apps Script backend.

import { GET as googleGET, POST as googlePOST } from './google/route';

// NOTE: Login is now handled by the real Google Apps Script backend.
// The route simply forwards all actions (including "login") to the Google proxy.


export async function GET(request: NextRequest) {
  const action = request.nextUrl.searchParams.get('action');
  if (!action) {
    return NextResponse.json({ success: false, message: 'Missing action' }, { status: 400 });
  }
  // Forward all GET actions (including "login") to the Google Apps Script proxy.
  return googleGET(request);
}

export async function POST(request: NextRequest) {
  const action = request.nextUrl.searchParams.get('action');
  if (!action) {
    return NextResponse.json({ success: false, message: 'Missing action' }, { status: 400 });
  }
  // Forward all POST actions (including "login") to the Google Apps Script proxy.
  return googlePOST(request);
}
