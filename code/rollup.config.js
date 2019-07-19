import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import { terser } from 'rollup-plugin-terser';

export default () => {
  const peerDependencies = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})];
  const input = 'src/index.ts';
  const external = peerDependencies;
  const extensions = ['.ts', '.js', '.mjs'];
  const globalDependencies = {};
  const resolveOptions = {
    mainFields: ['module', 'main'],
    preferBuiltins: true,
    extensions
  };
  const plugins = [
    globals(),
    json({
      exclude: 'node_modules/**',
      preferConst: true,
      indent: '  '
    }),
    nodeResolve(resolveOptions),
    typescript({ useTsconfigDeclarationDir: false }),
    commonjs(),
    builtins(),
    terser()
  ];

  return {
    input,
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        globals: globalDependencies
      },
      {
        file: pkg.module,
        format: 'es',
        globals: globalDependencies
      }
    ],
    plugins,
    external
  };
};
