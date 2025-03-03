import baseConfig from '../../eslint.config.mjs';
import nestjsConfig from '../../tools/eslint/eslint.nestjs.config.mjs';

export default [...baseConfig, ...nestjsConfig];
