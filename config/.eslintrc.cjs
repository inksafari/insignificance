/** @type { import("eslint/rules").ESLintRules } */
// https://eslint.org/docs/rules
var rulesFromESLint = {
  "indent": [
    "warn",
    "tab",
    {
      SwitchCase: 1,
    },
  ],

  "max-len": [
    "error",
    {
      code: 100,
      tabWidth: 2,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreUrls: true,
    },
  ],
  "quotes": [
    "warn",
    "double", 
    { avoidEscape: true }
  ],
  "no-console": ["warn"],
  "no-alert": ["error"],
  "no-debugger": ["error"],
  "prefer-named-capture-group": ["error"],
  "func-names": ["error", "as-needed"],
};

var rulesFromPlugins = {
  // https://github.com/mysticatea/eslint-plugin-node#-rules
  "node/file-extension-in-import": ["warn", "always"],

  // Let eslint-import-plugin deal with resolving modules
  "node/no-missing-import": "off",
  "node/no-missing-require": "off",
  "node/no-unsupported-features/es-syntax": [
    "error",
    { ignores: ["modules", "dynamicImport"] },
  ],
  "node/no-unpublished-require": "off",
  "node/no-unpublished-import": "off",

  // https://github.com/benmosher/eslint-plugin-import#rules
  "import/no-unresolved": [
    "error",
    {
      commonjs: true,
    },
  ],
};

/** @type { import("eslint").Linter.Config } */
module.exports = {
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2021
  },
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: "@typescript-eslint/parser",
  extends: [
    // https://github.com/eslint/eslint/blob/master/conf/eslint-recommended.js
    "eslint:recommended",
    // https://github.comdd/mysticatea/eslint-plugin-node
    "plugin:node/recommended",
    // https://github.com/benmosher/eslint-plugin-import
    "plugin:import/recommended",
    // https://github.com/nodesecurity/eslint-plugin-security
    "plugin:security/recommended",
    // https://github.com/xjamundx/eslint-plugin-promise
    "plugin:promise/recommended",
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
    "plugin:@typescript-eslint/recommended"
  ],
  plugins: [
    // https://github.com/mysticatea/eslint-plugin-node
    "node",
    // https://github.com/benmosher/eslint-plugin-import
    "import",
    // https://github.com/nodesecurity/eslint-plugin-security
    "security",
    // https://github.com/xjamundx/eslint-plugin-promise
    "promise",
    // https://github.com/sveltejs/eslint-plugin-svelte3
    "svelte3",
    // https://github.com/typescript-eslint
    "@typescript-eslint"
  ],
  ignorePatterns: ["*.cjs", "*.mjs"],
  overrides: [
    { 
      files: ["*.svelte", "*.svx"], 
      processor: "svelte3/svelte3"
    },
    {
      extends: ["plugin:cypress/recommended"],
      files: ["cypress/**/*"],
      env: {
        "cypress/globals": true,
      },
      plugins: ["cypress"],
    },
  ],
  settings: {
    // https://github.com/sveltejs/eslint-plugin-svelte3#configuration
    "svelte3/ignore-styles": () => true,
    "svelte3/typescript": require("typescript"),
    // https://github.com/benmosher/eslint-plugin-import#settings
    //"import/resolver": {
      // https://github.com/laysent/eslint-import-resolver-custom-alias#configuration
      // https://github.com/subwaytime/vite-aliase
    //  "custom-alias": {
    //    alias: require("vite-aliases")
    //      .getAliases({
            // Prefix Symbol for the aliases
    //        prefix: "~",
    //      })
    //      .reduce((acc, curr) => {
    //        return { ...acc, [curr.find]: curr.replacement };
    //      }, {}),

    //    extensions: [".js", ".json", ".svelte", ".svx"],
    //  },
    //},
  },
  rules: {
    ...rulesFromESLint,
    ...rulesFromPlugins,
  }
};
// https://github.com/xeho91/personal-website/blob/develop/.eslintrc.js
// https://github.com/happysalada/svelte.megzari.com/blob/master/.eslintrc.cjs
// https://github.com/lingrino/uptime/blob/main/.eslintrc.js
// https://github.com/kwangure/eslint-config-svelte/blob/master/.eslintrc.js