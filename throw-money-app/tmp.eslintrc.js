module.exports = {
  env: {
    browser: true, //ブラウザで使用するjsとしてチェック
    es6: true, // ES6構文としてチェック
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier', // Prettier の設定が優先されるようになる
  ],
  plugins: ['react'],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module', //ES2015+の構文のなかでもimport/exportだけは特別扱いであり、専用の設定が必要。parserOptionsプロパティのなかで"sourceType": "module"を設定しないとパースできない
  },
  root: true, // 上位ディレクトリにある他のeslintrcを参照しないようにする
  rules: {
    'no-unused-vars': 'off',
  },
}
