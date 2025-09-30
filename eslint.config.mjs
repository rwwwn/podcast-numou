// eslint.config.mjs (flat config)
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import nextPlugin from '@next/eslint-plugin-next'

export default [
  // Ignore build/output folders (replaces .eslintignore)
  {
    ignores: ['.next/**', 'node_modules/**', 'dist/**', 'out/**'],
  },

  // Base JS + TS recommended configs
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Project rules
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      // IMPORTANT: the key must be '@next/next' because rules use that prefix
      '@next/next': nextPlugin,
      react: reactPlugin,
    },
    rules: {
      // Next.js Core Web Vitals rules
      ...nextPlugin.configs['core-web-vitals'].rules,

      // React 17+ / Next.js doesn't require React in scope for JSX
      'react/react-in-jsx-scope': 'off',
    },
  },
]
