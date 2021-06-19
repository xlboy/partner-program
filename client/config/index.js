import path from 'path'
const config = {
  projectName: 'taro-dva-ts',
  date: '2020-9-9',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: [],
  defineConstants: {},
  alias: {
    '@vant': path.resolve(__dirname, '..', 'src/components/VantWeApp/dist/'),
  },
  copy: {
    patterns: [
      { from: 'src/components/VantWeApp/dist/wxs', to: 'dist/weapp/components/VantWeApp/dist/wxs' },
      {
        from: 'src/components/VantWeApp/dist/common/style',
        to: 'dist/weapp/components/VantWeApp/dist/common/style',
      },
      {
        from: 'src/components/VantWeApp/dist/common/index.wxss',
        to: 'dist/weapp/components/VantWeApp/dist/common/index.wxss',
      },
      {
        from: 'src/components/VantWeApp/dist/button/index.wxs',
        to: 'dist/weapp/components/VantWeApp/dist/button/index.wxs',
      },
      {
        from: 'src/components/VantWeApp/dist/icon/index.wxs',
        to: 'dist/weapp/components/VantWeApp/dist/icon/index.wxs',
      },
      {
        from: 'src/components/VantWeApp/dist/loading/index.wxs',
        to: 'dist/weapp/components/VantWeApp/dist/loading/index.wxs',
      },
      {
        from: 'src/components/VantWeApp/dist/empty/index.wxs',
        to: 'dist/weapp/components/VantWeApp/dist/empty/index.wxs',
      },
    ],
    options: {},
  },
  framework: 'react',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: [/van-/],
        },
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    compile: {
      include: [path.resolve(__dirname, '..', 'src/static/images/icon_tab_chat.png')],
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    devServer: {
      port: 8090,
      useLocalIp: false,
    },
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
