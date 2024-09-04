// Import necessary ESLint plugins and parser
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
  {
    // Specify file extensions to lint directly
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['dist', 'eslint.config.mjs'],
    languageOptions: {
      // Use the TypeScript parser
      parser: typescriptParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'unused-imports': unusedImports,
    },
    rules: {
      // Apply recommended rules from TypeScript ESLint
      ...typescriptEslint.configs.recommended.rules,
      // Apply recommended rules from React Hooks plugin
      ...reactHooks.configs.recommended.rules,

      // Unused imports detection
      'unused-imports/no-unused-imports': 'warn',

      // Unused variables detection (via @typescript-eslint version of the rule)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all', // Check all variables
          varsIgnorePattern: '^_', // Ignore variables starting with _
          args: 'after-used', // Check function arguments after the last used one
          argsIgnorePattern: '^_', // Ignore function arguments starting with _
          ignoreRestSiblings: true, // Ignore rest siblings (used in object destructuring)
        },
      ],

      // Custom rules
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];
