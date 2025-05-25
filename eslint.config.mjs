import js from '@eslint/js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';

export default [
  js.configs.recommended,

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      camelcase: 'warn', // 변수명은 camelCase로 작성 권장
      'no-unused-vars': 'warn', // 사용하지 않는 변수를 경고
      '@typescript-eslint/no-unused-vars': 'warn', // TypeScript 변수 미사용 경고
      'no-redeclare': 'error', // 변수 중복 선언 방지
      'no-dupe-keys': 'error', // 객체에서 key 중복 방지
      eqeqeq: ['error', 'always'], // == 대신 === 사용 강제
      'consistent-return': 'warn', // 함수 return 일관성
    },
  },

  {
    files: ['**/*.jsx', '**/*.tsx'],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {},
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  prettier,
];
