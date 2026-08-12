// Smoke‑test script – verifies that each public API endpoint returns JSON.
// Run with: node scripts/smoke-test.js

const fetch = require('node-fetch');

// Adjust base URL to your dev server (Vercel preview, localhost, etc.)
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// List of API routes to test (relative to the root).
const endpoints = [
  '/api/notifications',
  '/api/notifications/read',
  '/api/reports',
  '/api/settings',
  '/api/analytics/summary',
  // Add more as needed.
];

(async () => {
  let passed = 0;
  for (const ep of endpoints) {
    const url = `${BASE_URL}${ep}`;
    try {
      const res = await fetch(url, { method: 'GET' });
      const ct = res.headers.get('content-type') || '';
      if (!res.ok) {
        console.error(`❌ ${ep} → HTTP ${res.status}`);
        continue;
      }
      if (!ct.includes('application/json')) {
        console.warn(`⚠️ ${ep} returned non‑JSON content‑type: ${ct}`);
      }
      await res.json(); // will throw if not valid JSON
      console.log(`✅ ${ep}`);
      passed++;
    } catch (e) {
      console.error(`❌ ${ep} – error:`, e.message);
    }
  }
  console.log(`\nSmoke test complete: ${passed}/${endpoints.length} passed.`);
})();
