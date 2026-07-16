// server.js
// cloakbrowser WebSocket + HTTP server
// Auto-launched by start.sh on Fly.io

const http = require('http');
const { WebSocketServer } = require('ws');
const express = require('express');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

// ── HTTP endpoints ──────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    service: 'cloakbrowser-fly',
    status: 'running',
    version: '1.0.0',
    endpoints: ['/', '/health', '/ws']
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});

// ── WebSocket handler ──────────────────────────────────────────
wss.on('connection', (ws) => {
  console.log(`[WS] client connected (${wss.clients.size} total)`);

  ws.on('message', async (data) => {
    try {
      const msg = JSON.parse(data.toString());
      console.log('[WS] recv:', msg);

      // Echo for now — cloakbrowser integration TODO
      ws.send(JSON.stringify({ ack: true, received: msg }));
    } catch (e) {
      ws.send(JSON.stringify({ error: 'invalid_json', detail: e.message }));
    }
  });

  ws.on('close', () => {
    console.log(`[WS] client disconnected (${wss.clients.size} left)`);
  });

  // Welcome message
  ws.send(JSON.stringify({ type: 'welcome', service: 'cloakbrowser-fly' }));
});

// ── Boot ───────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`[boot] cloakbrowser-fly listening on 0.0.0.0:${PORT}`);
  console.log(`[boot] WebSocket: ws://0.0.0.0:${PORT}/ws`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('[shutdown] SIGTERM received');
  server.close(() => process.exit(0));
});
