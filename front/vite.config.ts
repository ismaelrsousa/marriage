import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig(() => ({
  base: "/",
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      ignored: ["**/public/images/**"],
    },
    proxy: {
      "/api": {
        target: "https://api.nayara-ismael.com.br",//"http://127.0.0.1:8080",
        changeOrigin: true,
      },
    },
  },
}))
