/// <reference types="vitest" />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiHost = env.VITE_API_HOST;

  return {
    plugins: [react()],
    resolve: {
      tsconfigPaths: true,
    },
    css: {
      postcss: { plugins: [] },
    },
    server: {
      host: true,
      proxy: {
        "^/api/.*": {
          target: apiHost,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
