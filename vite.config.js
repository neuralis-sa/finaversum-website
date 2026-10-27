// Utilisé uniquement par `pnpm dev`. Le build passe par scripts/build.mjs.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { variantIds } from './src/variants/index.js'
import { curtainHead, curtainBody } from './src/curtain.js'

// En dev, les pages sont servies sous /<variante>/ et les composants demandent
// /<variante>/img/… ; le dossier public/ n'étant servi qu'à la racine, on retire
// le préfixe de variante pour les fichiers qui existent dans public/.
const variantAssets = {
  name: 'variant-assets',
  configureServer(server) {
    const publicDir = server.config.publicDir
    server.middlewares.use((req, _res, next) => {
      const [, id, ...rest] = req.url.split('?')[0].split('/')
      const file = rest.join('/')
      if (variantIds.includes(id) && file && existsSync(path.join(publicDir, decodeURIComponent(file)))) {
        req.url = '/' + req.url.slice(id.length + 2)
      }
      next()
    })
  },
}

// Comme au build : une clé de session par variante, rien sur le sélecteur.
const curtain = {
  name: 'curtain',
  transformIndexHtml(html, { originalUrl = '/' }) {
    const id = originalUrl.split('?')[0].split('/')[1]
    if (!variantIds.includes(id)) return html
    return html.replace('</head>', `${curtainHead(`/${id}/`)}\n</head>`).replace('<div id="root"></div>', `<div id="root"></div>\n${curtainBody('/')}`)
  },
}

export default defineConfig({ plugins: [react(), variantAssets, curtain] })
