import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import devtoolsJson from 'vite-plugin-devtools-json'

export default defineConfig({
    server: { port: 5199, strictPort: true },
    plugins: [
        react(),
        tailwindcss(),
        // https://github.com/ChromeDevTools/vite-plugin-devtools-json
        // Enables Chrome DevTools to auto-connect to the local project folder as a Workspace
        devtoolsJson(),
    ],
})
