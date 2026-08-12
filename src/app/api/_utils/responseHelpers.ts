import { NextResponse } from 'next/server';

/** Simple JSON error response helper */
export function jsonError(message: string, status: number = 500) {
  return NextResponse.json({ success: false, message }, { status });
}

/** Simple JSON success response helper */
export function jsonSuccess<T>(payload: T, status: number = 200) {
  return NextResponse.json({ success: true, data: payload }, { status });
}
