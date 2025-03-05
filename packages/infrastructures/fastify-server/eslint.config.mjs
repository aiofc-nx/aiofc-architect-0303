import baseConfig from '../../../eslint.config.mjs';
import nestjsConfig from '../../../tools/eslint/eslint.nestjs.config.mjs';

export default [
  ...baseConfig,
  ...nestjsConfig,
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs}'],
        },
      ],
    },
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },
];
