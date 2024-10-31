import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: {
      css: 'prettier',
      html: 'prettier',
      xml: 'prettier',
      svg: 'prettier',
      md: 'prettier',
    },
    astro: true,
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: false,
    },
    typescript: {
      tsconfigPath: './tsconfig.json',
    },
    jsonc: true,
    yaml: true,
    ignores: [
      'node_modules/**',
      '.dev/**',
    ],
  },
  {
    files: ['**/*.astro'],
    rules: {
      'antfu/no-top-level-await': 'off',
    },
  },
)
