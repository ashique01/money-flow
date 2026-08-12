// src/app/api/notifications/read/route.ts
import { NextRequest } from 'next/server';
import { forwardToGAS } from '@/app/api/_utils/forwardToGAS';

export async function POST(request: NextRequest) {
  return forwardToGAS('notifications/read', request, 'POST');
}
