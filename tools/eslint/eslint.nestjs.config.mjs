import eslintNestJs from '@darraghor/eslint-plugin-nestjs-typed';
import parser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  // 针对NestJS的配置 https://github.com/darraghoriordan/eslint-plugin-nestjs-typed
  // 更多的配置参考：https://github.com/nestjs/nest/blob/master/eslint.config.mjs
  {
    linterOptions: {
      reportUnusedDisableDirectives: true, // 报告未使用的禁用指令
    },
    rules: {
      ...eslintNestJs.configs.flatRecommended.rules,
    },
    languageOptions: {
      globals: {
        ...globals.node, // 支持Node.js的全局变量
        ...globals.jest, // 支持Jest的全局变量
      },
      parser, // 使用TypeScript解析器
      ecmaVersion: 2022, // 支持ES2022
      sourceType: 'module', // 支持ES模块
      parserOptions: {
        // project: './tsconfig.json',
        // tsconfigRootDir: process.cwd(),
        allowDefaultProject: true, // 我们的monorepo项目的嵌套关系导致tsconfig.json路径是不确定的，所以选择默认项目
      },
    },
    ignores: [
      'node_modules',
      '**/node_modules/**',
      '**/*.js',
      '**/*.d.ts',
      'eslint.config.mjs',
    ],
  },
];
