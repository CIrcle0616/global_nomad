import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      camelcase: 'warn', // 변수명은 camelCase로 작성 권장

      '@typescript-eslint/no-unused-vars': 'warn', // TypeScript 변수 미사용 경고
      'no-redeclare': 'error', // 변수 중복 선언 방지
      'no-dupe-keys': 'error', // 객체에서 key 중복 방지
      eqeqeq: ['error', 'always'], // == 대신 === 사용 강제
      'consistent-return': 'warn', // 함수 return 일관성
    },
  },
];
