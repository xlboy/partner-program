import { ConnectProps } from '@/models/typings/connect';
import Taro from '@tarojs/taro';
import { create } from 'dva-core';
import createLoading from 'dva-loading';
import sadImg from '../static/images/sad.png';

let app;
let appStore;

export function createApp(opt) {
  // redux日志
  // opt.onAction = [createLogger()];
  opt.onError = (err) => {
    // console.error(err);
    // Taro.hideLoading();
    // Taro.showToast({ title: '服务器错误', image: sadImg });
  };
  app = create(opt);
  app.use(createLoading({}));

  // 适配支付宝小程序
  if (Taro.getEnv() === Taro.ENV_TYPE.ALIPAY) {
    global = {};
  }

  if (!global.registered) {
    global.registered = true;
    opt.models.forEach((model) => app.model(model));
  }
  app.start();

  appStore = app._store;
  app.getStore = () => appStore
  return app;
}

export function getAppStore(): {
  dispatch: ConnectProps['dispatch'],
  [other: string]: any
} {
  return appStore
}
