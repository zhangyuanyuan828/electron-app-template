import jseslint from '@eslint/js'
import prettier from 'eslint-plugin-prettier/recommended'
import react from 'eslint-plugin-react'
import hooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default tseslint.config({
  files: ['src/**/*.{ts,tsx}'],
  extends: [
    jseslint.configs.recommended,
    ...tseslint.configs.recommended,
    react.configs.flat.recommended,
    react.configs.flat['jsx-runtime'],
    hooks.configs['recommended-latest'],
    prettier
  ],
  settings: {
    react: {
      version: 'detect'
    }
  }
})
