// Utilisé uniquement par `pnpm dev`. Le build passe par scripts/build.mjs.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { variantIds } from './src/variants/index.js'

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

export default defineConfig({ plugins: [react(), variantAssets] })
