const path = require('path');

console.log('当爱情只剩眼睛，少了耳朵，就变的你只看到你怕看的', path.resolve(__dirname, '..', 'src/'))
module.exports = {
  env: {
    NODE_ENV: '"production"',
  },
  defineConstants: {},
  mini: {},
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  },
  alias: {
    '@': path.resolve(__dirname, '..', 'src/')
  }
};
 