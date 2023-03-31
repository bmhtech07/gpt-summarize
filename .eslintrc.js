module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-essential", "plugin:@typescript-eslint/recommended", "@nuxt/eslint-config"],
  overrides: [],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  root: true,
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-explicit-any": 0,
    indent: ["error", 2],
    // quotes: ["error", "double"],
    semi: ["error", "always"],
    "vue/max-attributes-per-line": ["error", {
      "singleline": { "max": 6 },      
      "multiline": { "max": 4 }
    }],
    "max-len": ["error", { "code": 150 }],
    "no-console": "off",
    "vue/multi-word-component-names": "off",
    "linebreak-style": ["error", "unix"],
    "vue/html-indent": ["error", 2, type, {
       "alignAttributesVertically": false,
    }],
  },
};
