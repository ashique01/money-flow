// src/app/api/analytics/summary/route.ts
import { GET as googleGET } from "../google/route";

/**
 * Forward analytics summary requests to the generic Google Apps Script proxy.
 * The generic proxy adds the required `key` query‑param and forwards the request
 * using the `action` parameter. Here we simply set `action=analytics/summary` so the
 * Apps Script backend can handle it, then delegate to the existing Google proxy.
 */
export async function GET(request: Request) {
  // Append the proper action for the backend.
  const url = new URL(request.url);
  url.searchParams.set("action", "analytics/summary");
  // Re‑create a Request object with the modified URL so the Google proxy sees it.
  const proxiedRequest = new Request(url.toString(), {
    method: request.method,
    headers: request.headers,
    body: request.body,
    // Preserve credentials, cache, etc. – defaults are fine for our use‑case.
  });
  // Delegate to the Google proxy which will handle key injection and error handling.
  return googleGET(proxiedRequest);
}
