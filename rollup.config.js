import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import { terser } from 'rollup-plugin-terser';

function parseName(name) {
  return name
      .replace('@', '')
      .replace('/', '-')
      .split('-')
      .map((x, i) => (i > 0 ? x[0].toUpperCase() + x.slice(1) : x))
      .join('');
}

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
    external,
  };
}
