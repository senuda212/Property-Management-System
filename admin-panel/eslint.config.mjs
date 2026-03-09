import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Legacy seed scripts use CommonJS require()
    "lib/seedAdmin.js",
  ]),
  {
    rules: {
      // Downgrade from error to warn — admin panel uses pragmatic `any` types
      // for Prisma and API response objects throughout the codebase
      "@typescript-eslint/no-explicit-any": "warn",
      // Ignore variables/args prefixed with _ (intentionally unused)
      "@typescript-eslint/no-unused-vars": ["warn", {
        "varsIgnorePattern": "^_",
        "argsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }],
    },
  },
]);

export default eslintConfig;
