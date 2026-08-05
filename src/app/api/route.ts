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

// Mock dashboard handler – returns static data for dev
function handleDashboard(_request: NextRequest) {
  const mockData = {
    period: "month",
    accounts: [
      { name: "Checking", type: "Bank", balance: 1234.56, currency: "USD" },
      { name: "Savings", type: "Bank", balance: 9876.54, currency: "USD" },
    ],
    summary: { balance: 11111.1, income: 5000, expense: 3000, savingRate: 0.4 },
    monthly: { income: 5000, expense: 3000 },
    categories: [
      { name: "Food", amount: 800 },
      { name: "Rent", amount: 1200 },
    ],
    people: { "John Doe": 200 },
    recentTransactions: [],
  };
  return NextResponse.json({ success: true, data: mockData }, { status: 200 });
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
  if (action === 'dashboard') {
    return handleDashboard(request);
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
