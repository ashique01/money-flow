import { NextRequest, NextResponse } from "next/server";

// Google Apps Script proxy configuration.
// The URL and the secret key must be defined in the Next.js environment.
const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
const SCRIPT_KEY = process.env.GOOGLE_SCRIPT_KEY;
const REQUEST_TIMEOUT_MS = 60_000; // 60 seconds – enough for long‑running script actions.

/**
 * Forward the incoming request to the Google Apps Script deployment.
 * Handles missing configuration, network errors, time‑outs and HTML error pages.
 */
async function forwardRequest(request: NextRequest) {
  try {
    // Validate configuration early – give a clear error if the URL/key is missing.
    if (!SCRIPT_URL) {
      throw new Error("GOOGLE_SCRIPT_URL is not configured – check your .env or Vercel settings.");
    }
    if (!SCRIPT_KEY) {
      throw new Error("GOOGLE_SCRIPT_KEY is not configured – check your .env or Vercel settings.");
    }

    const action = request.nextUrl.searchParams.get("action");
    console.log(`⚡️ Google proxy received action="${action}"`);

    if (!action) {
      return NextResponse.json({ success: false, message: "Missing action" }, { status: 400 });
    }

    const url = new URL(SCRIPT_URL);
    // Preserve all query params except `action` which we re‑set.
    url.searchParams.set("action", action);
    url.searchParams.set("key", SCRIPT_KEY);
    request.nextUrl.searchParams.forEach((value, key) => {
      if (key !== "action") {
        url.searchParams.set(key, value);
      }
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    const headers: Record<string, string> = {
      Accept: "application/json, text/plain, */*",
    };
    if (request.method === "POST") {
      headers["Content-Type"] = "application/json";
    }

    let response: Response;
    try {
      response = await fetch(url.toString(), {
        method: request.method,
        headers,
        redirect: "follow",
        signal: controller.signal,
        body: request.method === "POST" ? await request.text() : undefined,
      });
    } finally {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      const statusMsg = response.status === 403
        ? "(403) – the deployment likely lacks 'Anyone' access."
        : "";
      const msg = response.status === 404
        ? `Google Script not found (404). Verify that the web app is deployed and the URL in GOOGLE_SCRIPT_URL is correct. URL: ${url.toString()}`
        : `Google Script returned HTTP ${response.status} ${statusMsg}`;
      throw new Error(msg);
    }

    const contentType = response.headers.get("content-type") ?? "";
    const text = await response.text();

    // Detect HTML error pages – those indicate the script isn’t reachable.
    if (contentType.includes("text/html") || text.trim().startsWith("<")) {
      const preview = text.trim().slice(0, 500);
      console.error(`Google Script returned HTML (HTTP ${response.status}): ${preview}`);
      throw new Error(
        `Apps Script deployment returned HTML – likely broken. Ensure the web app is deployed with "Execute as: Me" and "Who has access: Anyone".`
      );
    }

    // Expect JSON response.
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: response.status });
    } catch {
      throw new Error("Apps Script returned invalid JSON: " + text.slice(0, 500));
    }
  } catch (error) {
    // Distinguish abort (timeout) from other errors.
    if (error instanceof DOMException && error.name === "AbortError") {
      console.error("Google Proxy Timeout:", error);
      return NextResponse.json({ success: false, message: `Google Apps Script did not respond within ${REQUEST_TIMEOUT_MS / 1000}s.` }, { status: 504 });
    }
    console.error("Google Proxy Error:", error);
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return forwardRequest(request);
}

export async function POST(request: NextRequest) {
  return forwardRequest(request);
}
