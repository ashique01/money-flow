// src/hooks/useAuth.ts
// Minimal stub – replace with your real auth implementation.
import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState<{ id: string } | null>(null);

  useEffect(() => {
    // Simulate a logged‑in user after a short delay (remove in prod).
    const timeout = setTimeout(() => setUser({ id: 'demo-user-id' }), 200);
    return () => clearTimeout(timeout);
  }, []);

  return { user };
}
