// @ts-check

import eslint from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  [globalIgnores(["!node_modules/", "src/parsons/", "src/@custom-types/monaco.d.ts"])],
  {
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': [0],
      '@typescript-eslint/no-unused-expressions': ["error", { "allowShortCircuit": true }],
    }
  }
);
