const webpack = require('webpack');
const path = require('path');

module.exports = function override(config, env) {
  // Add polyfills for missing dependencies
  config.resolve.fallback = {
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "buffer": require.resolve("buffer/")
  };

  // Add TypeScript support
  config.resolve.extensions.push('.ts', '.tsx');
  config.module.rules.push({
    test: /\.tsx?$/,
    loader: 'ts-loader',
    exclude: /node_modules/
  });

  return config;
};
