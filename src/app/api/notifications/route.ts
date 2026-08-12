// src/app/api/notifications/route.ts
import { NextRequest } from 'next/server';
import { forwardToGAS } from '@/app/api/_utils/forwardToGAS';

export async function GET(request: NextRequest) {
  return forwardToGAS('notifications', request);
}
