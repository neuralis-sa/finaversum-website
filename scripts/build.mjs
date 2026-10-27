// Génère un site 100 % statique par proposition : build client + build SSR,
// puis pré-rendu de chaque route en HTML.
//
//   npm run build                          → dist/<variante>/… + dist/index.html (sélecteur)
//   VARIANT=classique BASE=/ npm run build → une seule variante à la racine de dist/ (mise en ligne)
//
// SITE_URL (défaut https://finaversum.ch) sert aux URL canoniques et au sitemap.

import { build } from 'vite'
import react from '@vitejs/plugin-react'
import { mkdir, readFile, rm, writeFile, cp } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'
import { variantIds } from '../src/variants/index.js'
import { curtainHead, curtainBody } from '../src/curtain.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const siteUrl = (process.env.SITE_URL || 'https://finaversum.ch').replace(/\/$/, '')
const single = process.env.VARIANT
if (single && !variantIds.includes(single)) throw new Error(`VARIANT inconnue : ${single} (${variantIds.join(', ')})`)
const ids = single ? [single] : variantIds

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function viteConfig(id, base, extra) {
  return {
    configFile: false,
    root,
    base,
    logLevel: 'warn',
    plugins: [react()],
    resolve: { alias: { '@variant': path.join(root, 'src/variants', id, 'index.jsx') } },
    ...extra,
  }
}

function jsonLd(company) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: company.name,
    url: siteUrl + '/',
    telephone: company.phoneIntl,
    email: company.email,
    foundingDate: String(company.founded),
    address: { '@type': 'PostalAddress', streetAddress: company.street, postalCode: '1920', addressLocality: 'Martigny', addressCountry: 'CH' },
    geo: { '@type': 'GeoCoordinates', latitude: company.geo.lat, longitude: company.geo.lng },
  }
}

function page({ route, html, base, css, js, meta, company, publicPath }) {
  const canonical = siteUrl + publicPath + route.path.slice(1)
  return `<!doctype html>
<html lang="fr-CH">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(route.title)}</title>
<meta name="description" content="${esc(route.description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:locale" content="fr_CH">
<meta property="og:site_name" content="Finaversum">
<meta property="og:title" content="${esc(route.title)}">
<meta property="og:description" content="${esc(route.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${siteUrl}${publicPath}img/photo-2-1920.webp">
<meta name="theme-color" content="${meta.themeColor}">
<link rel="icon" href="${base}favicon.svg" type="image/svg+xml">
${curtainHead()}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200..800;1,400&display=swap">
${css.map((f) => `<link rel="stylesheet" href="${base}${f}">`).join('\n')}
${route.path === '/' ? `<script type="application/ld+json">${JSON.stringify(jsonLd(company))}</script>` : ''}
</head>
<body>
<div id="root">${html}</div>
${curtainBody(base)}
<script id="__page" type="application/json">${JSON.stringify({ path: route.path, base })}</script>
<script type="module" src="${base}${js}"></script>
</body>
</html>
`
}

await rm(dist, { recursive: true, force: true })
await rm(path.join(root, '.ssr'), { recursive: true, force: true })

const built = []
for (const id of ids) {
  const base = single ? process.env.BASE || '/' : `/${id}/`
  const outDir = single ? dist : path.join(dist, id)
  const ssrDir = path.join(root, '.ssr', id)

  await build(viteConfig(id, base, { build: { outDir, manifest: true, rollupOptions: { input: path.join(root, 'src/entry-client.jsx') } } }))
  await build(viteConfig(id, base, { publicDir: false, build: { outDir: ssrDir, ssr: path.join(root, 'src/entry-server.jsx') } }))

  const server = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)
  const manifest = JSON.parse(await readFile(path.join(outDir, '.vite/manifest.json'), 'utf8'))
  const entry = manifest['src/entry-client.jsx']
  const css = entry.css || []
  // URL publique de la variante sur le domaine final (canonical / sitemap).
  const publicPath = single ? base : `/${id}/`

  for (const route of server.routes) {
    const html = server.render(route.path, base)
    const file = path.join(outDir, route.path, 'index.html')
    await mkdir(path.dirname(file), { recursive: true })
    await writeFile(file, page({ route, html, base, css, js: entry.file, meta: server.meta, company: server.company, publicPath }))
  }

  const notFound = path.join(outDir, '404.html')
  await cp(path.join(outDir, 'index.html'), notFound)

  await writeFile(path.join(outDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${server.routes.map((r) => `  <url><loc>${siteUrl}${publicPath}${r.path.slice(1)}</loc></url>`).join('\n')}
</urlset>
`)
  await writeFile(path.join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}${publicPath}sitemap.xml\n`)
  await rm(path.join(outDir, '.vite'), { recursive: true, force: true })

  built.push({ ...server.meta, href: `${id}/`, server })
  console.log(`✓ ${id} → ${path.relative(root, outDir)}/ (${server.routes.length} pages)`)
}

if (!single) {
  const { server } = built[0]
  const body = server.renderChooser(built.map(({ id, name, summary, href }) => ({ id, name, summary, href })))
  await cp(path.join(root, 'public/img/logo.png'), path.join(dist, 'img/logo.png'), { recursive: true })
  await cp(path.join(root, 'public/favicon.svg'), path.join(dist, 'favicon.svg'))
  await writeFile(path.join(dist, 'index.html'), `<!doctype html>
<html lang="fr-CH">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Finaversum – Propositions</title>
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Karla:wght@300..700&display=swap">
<style>${await readFile(path.join(root, 'src/chooser.css'), 'utf8')}</style>
</head>
<body>${body}</body>
</html>
`)
  console.log('✓ dist/index.html (sélecteur)')
}

await rm(path.join(root, '.ssr'), { recursive: true, force: true })
