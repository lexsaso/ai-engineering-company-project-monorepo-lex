import javascript from '@eslint/js';
import typescript from 'typescript-eslint';

export default [
  { ignores: ['node_modules/**', '.build/**'] },
  javascript.configs.recommended,
  ...typescript.configs.recommended,
];