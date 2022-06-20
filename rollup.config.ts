import fs from 'node:fs'
import path from 'node:path'

import babel, {
  getBabelInputPlugin,
  getBabelOutputPlugin,
} from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import typescriptPlugin from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'
import metablock from 'rollup-plugin-userscript-metablock'
import typescript from 'typescript'

import pkg from './package.json'

fs.mkdir('dist/', { recursive: true }, () => null)

export default defineConfig({
  input: 'src/index.tsx',
  output: {
    file: 'dist/bundle.user.js',
    format: 'iife',
    name: 'rollupUserScript',
    banner: () =>
      '\n/*\n' +
      fs.readFileSync('./LICENSE', 'utf8') +
      '*/\n\n/* globals React, ReactDOM */',
    sourcemap: true,
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
  plugins: [
    json(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      ENVIRONMENT: JSON.stringify('production'),
      preventAssignment: true,
    }),
    nodeResolve({ extensions: ['.js', '.ts', '.tsx'] }),
    typescriptPlugin({ typescript }),
    commonjs({
      include: ['node_modules/**'],
    }),
    babel({
      babelHelpers: 'bundled',
    }),
    metablock({
      file: './meta.json',
      override: {
        name: pkg.name,
        version: pkg.version,
        description: pkg.description,
        homepage: pkg.homepage,
        author: pkg.author,
        license: pkg.license,
      },
    } as any),
  ],
  external(id) {
    return /^react(-dom)?$/.test(id)
  },
})
