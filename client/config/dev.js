const path = require('path');
module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {},
  mini: {},
  h5: {
    esnextModules: ['taro-ui']
  },
  alias: {
    '@': path.resolve(__dirname, '..', 'src/'),
    'appConfig': path.resolve(__dirname, '..', 'src/app.config.js')
  }
};
