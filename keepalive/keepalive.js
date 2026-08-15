const http = require('http');
const https = require('https');
const url = require('url');
const schedule = require('node-schedule');

// ------------------------------------------------------------------
// Target & frequency
// ------------------------------------------------------------------
const KEEPALIVE_URL = process.env.KEEPALIVE_URL || 'https://money-flow-67uy.onrender.com';
const KEEPALIVE_INTERVAL = process.env.KEEPALIVE_INTERVAL || '*/5 * * * *'; // every 5 minutes

const targetUrl = url.parse(KEEPALIVE_URL);

// ------------------------------------------------------------------
// Ping helper
// ------------------------------------------------------------------
function ping() {
  const opts = {
    hostname: targetUrl.hostname,
    port:     targetUrl.port,
    path:     targetUrl.path || '/',
    method:  'GET',
    timeout: 8000,
  };

  const client = (targetUrl.protocol === 'https:' ? https : http);
  const req = client.request(opts, (res) => {
    console.log(`[keepalive] ${new Date().toISOString()} – ${KEEPALIVE_URL} – ${res.statusCode}`);
  });

  req.on('error', (e) => console.error(`[keepalive] error pinging ${KEEPALIVE_URL}: ${e.message}`));
  req.end();
}

// ------------------------------------------------------------------
// Scheduler
// ------------------------------------------------------------------
schedule.scheduleJob(KEEPALIVE_INTERVAL, ping);
console.log(`[keepalive] Scheduled ping every ${KEEPALIVE_INTERVAL} to ${KEEPALIVE_URL}`);

// ------------------------------------------------------------------
// Keep the process alive forever – the ping loop never exits
// ------------------------------------------------------------------
setInterval(() => {}, 1e12);
