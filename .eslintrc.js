module.exports = {
  extends: 'standard',
  env: {
    mocha: true
  },
  rules: {
    semi: ['warn', 'never'],
    quotes: ['warn', 'single'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'true',
        asyncArrow: 'always'
      }
    ]
  },
  parser: 'babel-eslint'
}
