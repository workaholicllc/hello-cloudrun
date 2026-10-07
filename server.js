import { createServer } from 'node:http';

const VERSION = 'v3';
const STARTED = new Date().toISOString();

// Five endpoints for the Ruph/Telemetry multi-check (RU-45). This sample has no
// database: /readyz answers for the in-process store, so it is a stand-in, not DB proof.
const routes = {
  '/': ['text/html', `<!doctype html><html><head><title>hello-cloudrun</title><script src="/assets/app.js"></script></head><body><h1>hello-cloudrun ${VERSION}</h1></body></html>`],
  '/assets/app.js': ['text/javascript', `export const version = '${VERSION}';\n`],
  '/health': ['application/json', JSON.stringify({ ok: true, version: VERSION })],
  '/api/version': ['application/json', JSON.stringify({ version: VERSION, started: STARTED })],
  '/readyz': ['application/json', JSON.stringify({ ok: true, store: 'memory', database: 'none' })],
};

const server = createServer((req, res) => {
  const hit = req.method === 'GET' || req.method === 'HEAD' ? routes[req.url] : undefined;
  if (hit) {
    res.writeHead(200, { 'content-type': hit[0] });
    res.end(hit[1]);
    return;
  }
  res.writeHead(404, { 'content-type': 'text/plain' });
  res.end('Not found');
});

const port = Number(process.env.PORT || 8080);
server.listen(port, '0.0.0.0');
