import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.FINNHUB_KEY": JSON.stringify(env.FINNHUB_KEY),
    },
    plugins: [react()],
  };
});
