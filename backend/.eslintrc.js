module.exports = {
    env: {
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: 'eslint:recommended',
    plugins: ['import'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
    },
    rules: {
        // indent: ['error', 2],
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
    },
}