import { readdirSync } from "node:fs";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import dts from "vite-plugin-dts";

// One entry per icon file, so each can be imported individually
// (e.g. "lucide-solid-animated/icons/book"), plus the barrel entry.
const iconEntries = Object.fromEntries(
  readdirSync("./src/icons")
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => [
      `icons/${file.replace(/\.tsx$/, "")}`,
      `./src/icons/${file}`,
    ]),
);

export default defineConfig({
  plugins: [solid(), dts()],

  build: {
    lib: {
      entry: { index: "./src/index.ts", ...iconEntries },
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`,
    },

    rollupOptions: {
      external: ["solid-js"],
    },
  },
});
