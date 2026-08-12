import { NextRequest, NextResponse } from 'next/server';

/** Simple mock dispatcher – extend this map to add more mock endpoints */
const mockHandlers: Record<string, (req: NextRequest) => Promise<NextResponse>> = {
  // Example: mock login (used by the main gateway when action=login)
  login: async (req: NextRequest) => {
    try {
      const body = await req.json();
      const email = body?.email ?? 'test@example.com';
      const user = {
        user_id: Buffer.from(email).toString('base64'),
        name: email.split('@')[0] ?? 'User',
        email,
        avatar: '',
      };
      return NextResponse.json({ success: true, data: { authenticated: true, user } }, { status: 200 });
    } catch {
      return NextResponse.json({ success: false, message: 'Invalid mock payload' }, { status: 400 });
    }
  },
  // Add other path mocks as needed, e.g., 'notifications', 'reports', etc.
};

/** Retrieve a mock response for a given path if one exists */
export async function getMockResponse(path: string, request: NextRequest): Promise<NextResponse | undefined> {
  const handler = mockHandlers[path];
  if (!handler) return undefined;
  return await handler(request);
}
