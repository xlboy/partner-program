import { StorageUserJWTKey } from '@/constants/storage';
import Taro from '@tarojs/taro';
import { baseUrl, noConsole } from '../config';
import interceptors from './interceptors';

// j儿用，服务器报错都走不进去
// interceptors.forEach((interceptorItem) => Taro.addInterceptor(interceptorItem));

interface OptionsType {
  method: 'GET' | 'POST' | 'PUT';
  data?: any;
  url: string;
  noLoading?: boolean;
}
export default <T = any>(options: OptionsType = { method: 'GET', data: {}, url: '', noLoading: false }): Promise<T> => {
  if (!options.noLoading) {
    Taro.showLoading({
      title: '加载中'
    });
  }
  if (!noConsole) {
    console.log(`${new Date().toLocaleString()}【 URL=${options.url} 】PARAM=${JSON.stringify(options.data)}`);
  }
  for (const key in options.data) {
    if (options.data.hasOwnProperty(key) && (options.data[key] === undefined || options.data[key] == null)) {
      delete options.data[key];
    }
  }
  return Taro.request<T>({
    url: baseUrl + options.url,
    data: {
      ...options.data
    },
    header: {
      authorization: Taro.getStorageSync(StorageUserJWTKey),
      'Content-Type': 'application/json'
    },
    method: options.method.toUpperCase() as keyof Taro.request.method
  })
    .then((res) => {
      setTimeout(() => {
        Taro.hideLoading();
      }, 100);
      if (!noConsole) {
        console.log(`${new Date().toLocaleString('zh', { hour12: false })}【${options.url} 】【返回】`, res.data);
      }
      return res.data;
    })
    .catch((error) => {
      if (error instanceof Response) {
        const res = error
        if (res.status > 200 && res.status < 300) {
          return Promise.reject('请求资源不存在');
        } else if (res.status === 500) {
          return Promise.reject('服务端出现了问题');
        } else if (res.status === 403) {
          return Promise.reject('没有权限访问');
        } else if (res.status === 401) {
          Taro.showToast({ title: '账户已过期，请重新登陆', icon: 'none' })
          Taro.setStorageSync(StorageUserJWTKey, '');
          setTimeout(() => {
            Taro.navigateTo({ url: '/pages/login/index' })
          }, 500);
          return Promise.reject('需要鉴权');
        }
      }
      throw error;
    });
};
