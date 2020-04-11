module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  extends: ['@yoyoys/vue-typescript-prettier-airbnb'],
  rules: {
    '@typescript-eslint/no-unnecessary-condition': ['error', { ignoreRhs: true }],
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
