import { GET as googleGetHandler, POST as googlePostHandler } from "../google/route";

/**
 * Dashboard endpoint – forwards the request to the Google Apps Script proxy.
 * The Google proxy expects an `action` query param; we simply pass through
 * everything the client sent (period, email, etc.). This keeps the same
 * shape as the original Google‑Script implementation.
 */
export const GET = googleGetHandler;
export const POST = googlePostHandler;
