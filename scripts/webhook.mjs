/**
 * Lightweight webhook listener for Strapi blog rebuild triggers.
 * Listens on port 9000 (localhost only) for POST /rebuild.
 * Validates a shared secret, then runs the rebuild script.
 *
 * Start with pm2: pm2 start scripts/webhook.mjs --name webhook
 */

import { createServer } from 'http';
import { execFile } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { randomBytes } from 'crypto';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 9000;

// Load or generate webhook secret
const SECRET_FILE = resolve(__dirname, '../.webhook-secret');
let WEBHOOK_SECRET;
if (existsSync(SECRET_FILE)) {
  WEBHOOK_SECRET = readFileSync(SECRET_FILE, 'utf-8').trim();
} else {
  WEBHOOK_SECRET = randomBytes(32).toString('hex');
  writeFileSync(SECRET_FILE, WEBHOOK_SECRET + '\n', { mode: 0o600 });
  console.log(`Generated webhook secret → ${SECRET_FILE}`);
}

const REBUILD_SCRIPT = resolve(__dirname, 'rebuild.sh');

const server = createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/rebuild') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      // Validate secret via Authorization header
      const auth = req.headers['authorization'];
      if (auth !== `Bearer ${WEBHOOK_SECRET}`) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Unauthorized' }));
        return;
      }

      console.log(`[${new Date().toISOString()}] Rebuild triggered`);

      // Run rebuild script asynchronously
      execFile('/bin/bash', [REBUILD_SCRIPT], { timeout: 120000 }, (err, stdout, stderr) => {
        if (err) {
          console.error('Rebuild error:', err.message);
          if (stderr) console.error(stderr);
        } else {
          console.log('Rebuild complete');
        }
      });

      // Respond immediately
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, message: 'Rebuild started' }));
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Webhook listener running on http://127.0.0.1:${PORT}/rebuild`);
  console.log(`Secret: ${WEBHOOK_SECRET.slice(0, 8)}…`);
});
