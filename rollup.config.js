import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

const name = 'RollupTypeScriptBabel';

export default {
  input: './src/index.ts',
  //input: './src/transpiler.ts',

  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  // https://rollupjs.org/guide/en#external-e-external
  external: [],

  plugins: [
    // Allows node_modules resolution
    resolve({ extensions }),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),

    json(), 
    
    // Compile TypeScript/JavaScript files
    babel({ extensions, include: ['src/**/*'] }),
  ],

  output: [{
    file: 'lib/pkg.umd',
    format: 'umd',
    name: 'qsc',
    extend: true,
    globals: {}
  }, {
    file: 'lib/pkg.main',
    format: 'cjs',
  }, {
    file: 'lib/pkg.module',
    format: 'es',
  }, {
    file: 'lib/pkg.browser',
    format: 'iife',
    name,

    // https://rollupjs.org/guide/en#output-globals-g-globals
    globals: {},
  }],
};

