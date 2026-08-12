import { NextRequest, NextResponse } from "next/server";
import { jsonError } from "./responseHelpers";
import { getMockResponse } from "../_mock";

export async function forwardToGAS(
  path: string,
  request: NextRequest,
  method?: "GET" | "POST",
): Promise<NextResponse> {
  const GAS_BASE = process.env.GOOGLE_SCRIPT_URL;

  // Mock layer shortcut
  if (process.env.USE_MOCK === "true") {
    const mock = await getMockResponse(path, request);

    if (mock) {
      return mock;
    }
  }

  if (!GAS_BASE) {
    return jsonError("GOOGLE_SCRIPT_URL is not configured.", 500);
  }

  let url: URL;

  try {
    url = new URL(GAS_BASE);
  } catch {
    return jsonError("GOOGLE_SCRIPT_URL is invalid.", 500);
  }

  url.searchParams.set("path", path);

  // Preserve original query parameters for GET requests
  const chosenMethod = method ?? (request.method as "GET" | "POST");

  if (chosenMethod === "GET") {
    const originalUrl = new URL(request.url);

    originalUrl.searchParams.forEach((value, key) => {
      if (key !== "path") {
        url.searchParams.append(key, value);
      }
    });
  }

  const fetchOptions: RequestInit = {
    method: chosenMethod,
    headers: {
      Accept: "application/json, text/plain, */*",
    },
    cache: "no-store",
  };

  if (chosenMethod === "POST") {
    const body = await request.text();

    fetchOptions.body = body;

    const contentType = request.headers.get("content-type");

    if (contentType) {
      (fetchOptions.headers as Record<string, string>)["Content-Type"] =
        contentType;
    }
  }

  try {
    const response = await fetch(url.toString(), fetchOptions);

    const data = await response.text();

    const contentType = response.headers.get("content-type") ?? "";

    // Google Apps Script sometimes returns an HTML error page
    if (contentType.includes("text/html") || data.trim().startsWith("<")) {
      return jsonError(
        "Google Apps Script returned HTML. Check the Apps Script URL and deployment configuration.",
        response.status || 502,
      );
    }

    try {
      const json = JSON.parse(data);

      return NextResponse.json(json, {
        status: response.status,
      });
    } catch {
      return jsonError("Invalid JSON returned from Google Apps Script.", 502);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    return jsonError(
      `Failed to connect to Google Apps Script: ${message}`,
      502,
    );
  }
}
