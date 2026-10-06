import { createServer } from 'node:http';

const VERSION = 'v2';

const server = createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ ok: true, version: VERSION }));
    return;
  }
  res.writeHead(404, { 'content-type': 'text/plain' });
  res.end('Not found');
});

const port = Number(process.env.PORT || 8080);
server.listen(port, '0.0.0.0');
