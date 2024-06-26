module.exports = {
  root: true,
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@next/next/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', '@typescript-eslint', '@next/next'],
  rules: {
    '@typescript-eslint/no-explicit-any': ['off'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
