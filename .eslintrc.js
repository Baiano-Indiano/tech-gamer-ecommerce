module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'storybook/no-renderer-packages': ['error', {
      allowedPackages: ['@storybook/react']
    }],
    '@typescript-eslint/no-unused-vars': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
