import { NextRequest, NextResponse } from 'next/server';
import { jsonError } from './responseHelpers';
import { getMockResponse } from '../_mock';

/**
 * Forward a request to the Google Apps Script backend (or mock layer).
 * @param path   GAS endpoint path (e.g. 'notifications' or 'notifications/read').
 * @param request Incoming NextRequest.
 * @param method Optional HTTP method override (defaults to request.method).
 */
export async function forwardToGAS(
  path: string,
  request: NextRequest,
  method?: 'GET' | 'POST'
): Promise<NextResponse> {
  const GAS_BASE = process.env.NEXT_PUBLIC_GAS_URL;

  // Mock layer shortcut – useful for CI or local development.
  if (process.env.USE_MOCK === 'true') {
    const mock = await getMockResponse(path, request);
    if (mock) return mock;
  }

  if (!GAS_BASE) {
    return jsonError('NEXT_PUBLIC_GAS_URL is not configured.', 500);
  }

  const url = new URL(GAS_BASE);
  url.searchParams.set('path', path);

  // Preserve original query params for GET requests.
  if ((method ?? request.method) === 'GET') {
    const orig = new URL(request.url);
    orig.searchParams.forEach((value, key) => {
      if (key !== 'path') url.searchParams.append(key, value);
    });
  }

  const chosenMethod = method ?? (request.method as 'GET' | 'POST');
  const fetchOpts: RequestInit = {
    method: chosenMethod,
    headers: {
      Accept: 'application/json, text/plain, */*',
    },
  };

  if (chosenMethod === 'POST') {
    const body = await request.text();
    fetchOpts.body = body;
    const ct = request.headers.get('content-type');
    if (ct) (fetchOpts.headers as any)['Content-Type'] = ct;
  }

  try {
    const resp = await fetch(url.toString(), fetchOpts);
    const data = await resp.text();
    const contentType = resp.headers.get('content-type') ?? '';
    if (contentType.includes('text/html') || data.trim().startsWith('<')) {
      return jsonError('Google Apps Script returned HTML – likely misconfiguration.', resp.status);
    }
    try {
      const json = JSON.parse(data);
      return NextResponse.json(json, { status: resp.status });
    } catch {
      return jsonError('Invalid JSON returned from Google Apps Script.', 500);
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return jsonError(msg, 500);
  }
}
