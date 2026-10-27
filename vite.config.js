// Utilisé uniquement par `npm run dev`. Le build passe par scripts/build.mjs.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({ plugins: [react()] })
