import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/send-sms": {
        target: "https://api.africastalking.com/version1/messaging",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/send-sms/, ""),
      },
      "/dummy-sms": {
        target: "https://api.sandbox.africastalking.com/version1/messaging",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dummy-sms/, ""),
      },
    },
  },
});
