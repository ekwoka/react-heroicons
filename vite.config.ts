import { defineConfig } from "vitest/config";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  server: {
    port: 8081,
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./vitest.setup.ts"],
    watch: false,
    typecheck: { tsconfig: "./tsconfig.test.json" },
  },
});
