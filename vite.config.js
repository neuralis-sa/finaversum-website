// Utilisé uniquement par `npm run dev`. Le build passe par scripts/build.mjs.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { curtainHead, curtainBody } from './src/curtain.js'

const curtain = {
  name: 'curtain',
  transformIndexHtml: (html) =>
    html.replace('</head>', `${curtainHead()}\n</head>`).replace('<div id="root"></div>', `<div id="root"></div>\n${curtainBody('/')}`),
}

export default defineConfig({ plugins: [react(), curtain] })
