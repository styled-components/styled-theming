import uglify from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';

let dest;
let plugins = [commonjs()];

if (process.env.NODE_ENV === 'production') {
  dest = 'dist/styled-theming.min.js';
  plugins.push(uglify());
} else {
  dest = 'dist/styled-theming.js';
}

export default {
  entry: 'index.js',
  format: 'umd',
  moduleName: 'theme',
  plugins,
  dest,
};
