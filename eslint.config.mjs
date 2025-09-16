// @ts-check

import eslint from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  [globalIgnores(["!node_modules/", "src/parsons/"])],
  eslint.configs.recommended,
  tseslint.configs.recommended,
);