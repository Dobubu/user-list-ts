/**
 * @typedef { import("@vue/cli-service").ProjectOptions } Options
 * @typedef { import("@vue/cli-service").ProjectOptions['pages'] } Options
 * @typedef { import("webpack-chain") ChainWebpack }
 */
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

/**
 * @type { Options }
 */
module.exports = {
  publicPath: './',
  productionSourceMap: false,
  css: {
    sourceMap: true,
  },
};
