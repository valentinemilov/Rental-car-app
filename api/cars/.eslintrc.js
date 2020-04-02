module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'js': 'never',
        'jsx': 'never',
        'ts': 'never',
        'tsx': 'never'
      }
    ],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*spec.ts'] },
    ],
    'no-useless-constructor': 'off',
    'no-return-await': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'lines-between-class-members': [
      "error",
      "always",
      { exceptAfterSingleLine: true }
    ],
    'class-methods-use-this': 'off',
    '@typescript-eslint/no-unused-vars': [
      "error",
      { 'ignoreRestSiblings': true }
    ]
  },
};
