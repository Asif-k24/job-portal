import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      "@chakra-ui/react",
      "@chakra-ui/system",
      "@chakra-ui/theme",
      "@chakra-ui/theme-utils",
    ],
  },
});
