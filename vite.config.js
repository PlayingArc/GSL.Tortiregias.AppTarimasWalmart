import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// `vite build` targets GitHub Pages with real data; `vite build --mode demo` (.env.demo)
// builds the sample-data demo served at gsanchez.me/demos/tarimas/.
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.')
    return {
        plugins: [react()],
        base: env.VITE_BASE,
        publicDir: mode === 'demo' ? 'public-demo' : 'public',
    }
})
