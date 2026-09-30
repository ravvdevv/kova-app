/* Zero-dependency preview server that matches production routing.
 *
 * Vercel resolves /hevy-alternative to hevy-alternative.html because
 * vercel.json sets cleanUrls true. A plain static server does not, so every
 * internal link on the site 404s in local preview while working fine in
 * production. That is a confusing way to lose an afternoon, so this mirrors the
 * production rules exactly.
 *
 *   node dev-server.cjs            # http://localhost:8080
 *   node dev-server.cjs 3000       # a different port
 *
 * No dependencies, no build step, nothing to install. Same as the site itself.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = Number(process.argv[2]) || 8080;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
};

/* Resolve a URL path the way Vercel does with cleanUrls: true and
   trailingSlash: false. Extensionless paths gain .html; real files win. */
function resolve(urlPath) {
  let p = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  if (p.includes('\0') || p.includes('..')) return null;
  if (p === '/' || p === '') p = '/index.html';

  const direct = path.join(ROOT, p);
  if (isFile(direct)) return direct;

  if (!path.extname(p)) {
    const asHtml = path.join(ROOT, p + '.html');
    if (isFile(asHtml)) return asHtml;
    const asDir = path.join(ROOT, p, 'index.html');
    if (isFile(asDir)) return asDir;
  }
  return null;
}

function isFile(p) {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

const server = http.createServer((req, res) => {
  const file = resolve(req.url);

  if (!file) {
    const notFound = path.join(ROOT, '404.html');
    const body = isFile(notFound) ? fs.readFileSync(notFound) : 'Not found';
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(body);
  }

  const ext = path.extname(file).toLowerCase();
  const headers = { 'Content-Type': TYPES[ext] || 'application/octet-stream' };
  // assets are content-addressed by Vercel in prod; mirror that locally
  if (file.includes(path.sep + 'assets' + path.sep)) {
    headers['Cache-Control'] = 'public, max-age=31536000, immutable';
  }
  res.writeHead(200, headers);
  fs.createReadStream(file).pipe(res);
});

server.listen(PORT, () => {
  console.log('KOVA preview on http://localhost:' + PORT);
  console.log('cleanUrls mirrored, so /hevy-alternative resolves like production');
});
