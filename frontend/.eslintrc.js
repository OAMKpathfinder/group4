module.exports = {
  root: true,

  env: {
    browser: true,
    node: true
  },

  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },

  extends: ['@nuxtjs', 'plugin:nuxt/recommended'],

  rules: {
    'space-before-function-paren': 'off',
    'no-console': 'off',
    'vue/html-self-closing': 'off',
    'vue/singleline-html-element-content-newline': 'off'
  }
}
