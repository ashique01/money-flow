import { NextRequest, NextResponse } from 'next/server';
import { forwardToGAS } from './forwardToGAS';

/**
 * Thin wrapper around forwardToGAS that can later be extended with logging,
 * retries, request cancellation, etc.
 */
export async function apiClient(
  path: string,
  request: NextRequest,
  method?: 'GET' | 'POST'
): Promise<NextResponse> {
  // For now we simply delegate to forwardToGAS.
  return forwardToGAS(path, request, method);
}
