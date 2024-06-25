/** @typedef  {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig*/
/** @typedef  {import("prettier").Config} PrettierConfig*/

/** @type { PrettierConfig | SortImportsConfig  } */
const config = {
  arrowParens: 'always',
  printWidth: 140,
  useTabs: false,
  singleQuote: true,
  jsxSingleQuote: false,
  semi: true,
  bracketSpacing: true,
  bracketSameLine: false,
  trailingComma: 'none',
  tabWidth: 2,
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '^(react/(.*)$)|^(react$)|^(react-native(.*)$)',
    '<THIRD_PARTY_MODULES>',
    '^@/common/(.*)$',
    '^@/components/(.*)$',
    '^@/data/(.*)$',
    '^@/layouts/(.*)$',
    '^@/pages/(.*)$',
    '^@/styles/(.*)$',
    '^@/store/(.*)$',
    '^@/utils/(.*)$',
    '^@/(.*)$',
    '^[./]',
    ''
  ]
};

export default config;
