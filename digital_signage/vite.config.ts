import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3002,
    hmr: {
      protocol: "ws",
      clientPort: 3002,
    },
  },
  base: "/digital_signage/",
})
