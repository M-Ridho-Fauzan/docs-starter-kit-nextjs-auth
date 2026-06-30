import type { Config } from "tailwindcss";

/**
 * Tailwind CSS configuration.
 *
 * Note: With Tailwind CSS v4 and the `@tailwindcss/postcss` plugin, most
 * configuration is handled via CSS in `app/globals.css` using `@theme inline`.
 * This file exists for tooling compatibility (IDE autocompletion, shadcn/ui CLI).
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
