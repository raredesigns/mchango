import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// const { VITE_AT_API_KEY: apiKey } = import.meta.env;

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/send-sms": {
        target: "https://api.africastalking.com/version1/messaging",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
