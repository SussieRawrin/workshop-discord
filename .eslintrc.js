module.exports = {
  root: true,
  env: {
    node: true,
  },

  parser: '@typescript-eslint/parser',
  extends: [
    // 'plugin:@typescript-eslint/recommended',
    'airbnb-typescript/base',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',

    /* make sure files are in "include" in tsconfig.json */
    project: __dirname + '/tsconfig.json',
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    /* 02/12/2020 */
    'max-len': 0,
    'object-curly-newline': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'template-curly-spacing': ['error', 'always'],

    'import/prefer-default-export': 0,
    'object-curly-spacing': ['error', 'always'],
    // 'padded-blocks': ["error", "always"],
    'padded-blocks': 0,
  },
};
