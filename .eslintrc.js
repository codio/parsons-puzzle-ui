module.exports = {
  "root": true,
  "parser": '@typescript-eslint/parser',
  "plugins": [
    '@typescript-eslint',
  ],
  "extends": [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  "parserOptions":  {
    "project": './tsconfig.json'
  },
  "rules": {
    "semi": "off",
    "@typescript-eslint/semi": ["error", "never"],
    "guard-for-in": 2,
    "no-invalid-this": 2,
    "radix": [2, "always"],
    "no-multi-spaces": ["error", {
      "ignoreEOLComments": true
    }],
    "camelcase": [ 2, {
      "allow": [
        "max_wrong_lines",
        "can_indent",
        "executable_code",
        "feedback_cb",
        "x_indent",
        "exec_limit",
        "unittest_code_prepend"
      ]
    }],
    "comma-dangle": [2, "only-multiline"],
    "indent": ["error", 2, {
      "MemberExpression": "off",
      "SwitchCase": 1
    }],
    "max-len": ["error", {"code": 120}],
    "linebreak-style": 2,
    "no-multiple-empty-lines": 0,
    "space-before-function-paren": [2, {"anonymous": "always", "named": "never"}],
    "quote-props": [2, "as-needed"],

    "arrow-body-style": [2, "as-needed", { "requireReturnForObjectLiteral": true }],
    "no-var": 2,
    "prefer-const": ["error", {
      "destructuring": "any"
    }],
    "prefer-rest-params": 2,
    "prefer-spread": 2,
    "prefer-template": 2,

    "import/first": 0,
  }
};