import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import nextPlugin from "@next/eslint-plugin-next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Base Next.js config
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Ignore patterns
  {
    ignores: [
      "**/dist",
      "**/node_modules",
      "**/*.test.js",
      "**/*.spec.js",
      "**/*.config.js",
      "**/build/**",
      "**/.next/",
      "**/public/",
      "**/.vscode",
      "**/tmp",
      "**/eslint.config.mjs",
      "next.config.ts",
      "postcss.config.mjs"
    ],
  },

  // General JS/TS rules
  {
    files: ["**/*.{ts,tsx,js,jsx,cjs,mjs,cts,mts}"],
    rules: {
      // Enforce consistent linebreaks
      "linebreak-style": ["error", "unix"],

      // Enforce 2 spaces for indentation
      indent: ["error", 2],

      // Enforce === and !==
      eqeqeq: ["error", "always"],

      // Prevent alert / prompt
      "no-alert": "error",

      // Prevent unused variables (ignore unused args starting with "_")
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],

      // Enforce single quotes
      quotes: ["error", "single", { avoidEscape: true }],

      // Enforce semicolons
      semi: ["error", "always"],

      // Disable forcing return type on functions
      "@typescript-eslint/explicit-module-boundary-types": "off",

      // Disallow `any`
      "@typescript-eslint/no-explicit-any": "error",

      // Disallow console.log (allow console.error)
      "no-console": ["error", { allow: ["error"] }],
    },
  },

  // React/Next-specific rules
  {
    files: ["**/*.tsx", "**/*.jsx"],
    plugins: {
      next: nextPlugin,
    },
    rules: {
      "next/no-img-element": "error",
    },
  },
];
