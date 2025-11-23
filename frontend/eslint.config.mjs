import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Generate the Next.js + TS configs once
const baseConfigs = compat.extends("next/core-web-vitals", "next/typescript");

// IMPORTANT: the ignores config MUST be first in the array
const config = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  ...baseConfigs,
  {
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
];

export default config;
