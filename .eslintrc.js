module.exports = {
    'env': {
      'amd': false,
      'es6': true,
      'browser': false,
      'worker': false,
      'node': true,
      'shared-node-browser': false,
    },
  
    'extends': [
      'eslint:recommended',
    ],
  
    'parserOptions': {
      'ecmaVersion': 2018,
      'ecmaFeatures': {},
      'sourceType': 'module',
    },
  
    'rules': {
      // possible errors
      'no-cond-assign': ['error', 'always'],
      'valid-jsdoc': ['warn', {
        'prefer': {
          'param': 'arg',
          'parameter': 'argument',
          'return': 'returns',
        },
      }],
      // best practice rules
      'curly': 'error',
      'dot-location': ['error', 'property'],
      'dot-notation': ['error', {
        'allowKeywords': true
      }],
      'eqeqeq': ['error', 'smart'],
      'guard-for-in': 'error',
      'no-caller': 'error',
      'no-else-return': 'error',
      'no-eq-null': 'error',
      'no-eval': 'error',
      'no-magic-numbers': ['error', {
        'ignore': [0, 1, 100]
      }],
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-param-reassign': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-useless-call': 'error',
      'no-useless-concat': 'error',
      'no-useless-return': 'error',
      'prefer-promise-reject-errors': 'error',
      'require-await': 'error',
      // variable rules
      'no-undef-init': 'error',
      'no-use-before-define': 'error',
      // style rules
      'comma-dangle': ['warn', 'only-multiline'],
      'eol-last': ['warn', 'always'],
      'indent': ['error', 2, {
        "VariableDeclarator": {
          "var": 2,
          "let": 2,
          "const": 3
        },
        "SwitchCase": 1,
      }],
      'implicit-arrow-linebreak': ['error', 'beside'],
      'linebreak-style': ['warn', 'unix'],
      'new-cap': 'error',
      'no-lonely-if': 'error',
      'no-tabs': 'warn',
      'no-trailing-spaces': 'warn',
      'quotes': ['error', 'single', {'avoidEscape': true}],
      'semi': ['error', 'never']
    }
  }
