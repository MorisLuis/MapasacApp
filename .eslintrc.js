module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'react-native', 'import'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    // Desactivar las reglas de Prettier que te están molestando
    'prettier/prettier': 'off',
    'react/prop-types': 'off',
    'react-native/no-unused-styles': 'error',
    'react-native/no-inline-styles': 'warn',
    'react-native/split-platform-components': 'warn',
    'no-console': 'warn',
    'no-unused-vars': ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
    '@typescript-eslint/no-var-requires': 'off',
    'import/order': [
      'off',
      {
        groups: ['builtin', 'external', 'internal'],
        'newlines-between': 'always',
      },
    ],
    'import/no-unresolved': 'error',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    // Si prefieres quitar el formato de Prettier, también puedes hacer esto:
    'no-magic-numbers': 'warn',
    "react-native/no-raw-text": [
      "error",
      { "skip": ["CustomText"] }
    ]
  },
  overrides: [
    {
      files: ["src/theme/**/*", "src/interface/**/*"], // 👈 Aquí pones la ruta del archivo
      rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "no-magic-numbers": "off"
      }
    }
  ]

};