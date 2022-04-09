module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/strongly-recommended', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'vue/no-v-html': 'off',
    'vue/prop-name-casing': 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
    camelcase: 'off',
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'always',
      },
    ],
    'no-extra-parens': 1,
    'no-multi-spaces': 2,
    'no-multiple-empty-lines': [2, { max: 1 }],
    'func-call-spacing': [2, 'never'],
    'no-unneeded-ternary': 2,
    semi: [2, 'never'],
    quotes: [2, 'single'],
    'no-var': 2,
    indent: [2, 2],
    'space-in-parens': [2, 'never'],
    'comma-spacing': 2,
    'computed-property-spacing': 2,
    'key-spacing': 2,
    'keyword-spacing': 2,
    // この先はPrettierのルール
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        arrowParens: 'avoid',
        semi: false,
      },
    ],
  },
}
