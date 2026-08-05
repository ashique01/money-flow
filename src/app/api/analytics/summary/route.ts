// src/app/api/analytics/summary/route.ts
import { NextRequest } from "next/server";
import { GET as googleGET } from "@/app/api/google/route";

/**
 * Forward analytics summary requests to the generic Google Apps Script proxy.
 * The generic proxy adds the required `key` query‑param and forwards the request
 * using the `action` parameter. Here we simply set `action=analytics/summary` so the
 * Apps Script backend can handle it, then delegate to the existing Google proxy.
 */
export async function GET(request: NextRequest) {
  // Append the proper action for the backend.
  const url = request.nextUrl;
  url.searchParams.set("action", "analytics/summary");
  // Delegate directly to the Google proxy; it will handle key injection and response.
  return googleGET(request);
}
