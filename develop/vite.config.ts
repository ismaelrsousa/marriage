import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/marriage/" : "/",
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      ignored: ["**/public/images/**"],
    },
  },
}))
