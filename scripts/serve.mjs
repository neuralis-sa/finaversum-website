// Serveur statique minimal pour prévisualiser dist/ (aucune dépendance).
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist')
const port = Number(process.env.PORT) || 4173
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.xml': 'application/xml', '.txt': 'text/plain' }

createServer(async (req, res) => {
  let file = path.join(dist, decodeURIComponent(new URL(req.url, 'http://x').pathname))
  if (!file.startsWith(dist)) return res.writeHead(403).end()
  try {
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html')
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' }).end(await readFile(file))
  } catch {
    res.writeHead(404, { 'Content-Type': types['.html'] }).end(await readFile(path.join(dist, '404.html')).catch(() => 'Not found'))
  }
}).listen(port, () => console.log(`http://localhost:${port}/`))
