import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, //dev env
    proxy: {
      // En el backend llamar "/api/endPointBuscado"
      "/api/": {
        target: "http://localhost:4000", //backend
        changeOrigin: true,
      },
    },
  },
})
