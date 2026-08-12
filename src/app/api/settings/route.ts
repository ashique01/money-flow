import { NextRequest } from 'next/server';
import { forwardToGAS } from '@/app/api/_utils/forwardToGAS';

export async function GET(request: NextRequest) {
  return forwardToGAS('settings', request);
}

export async function POST(request: NextRequest) {
  return forwardToGAS('settings', request, 'POST');
}
