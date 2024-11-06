/** @type {import("prettier").Config} */
export default {
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  jsxSingleQuote: true,
  printWidth: 80,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  requirePragma: false,
  singleAttributePerLine: false,
  trailingComma: 'es5',
  vueIndentScriptAndStyle: false,
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.ts',
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
