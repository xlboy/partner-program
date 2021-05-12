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
  return new Promise(resolve => {
    Taro.request<T>({
      url: baseUrl + options.url,
      data: {
        ...options.data
      },
      header: {
        authorization: Taro.getStorageSync(StorageUserJWTKey),
        'Content-Type': 'application/json'
      },
      method: options.method.toUpperCase() as keyof Taro.request.method,
      async success(res) {
        const data = await successFailHandle(res)
          .catch(title => Taro.showToast({ title, icon: 'none' }))
        resolve(data)
      },
      async fail(res) {
        await successFailHandle(res).catch(title => Taro.showToast({ title, icon: 'none' }))
      }
    })


    /**
     * @description Taro.request的在各端的行为不统一…特殊处理(原因：小程序端用的ajax,h5端用的fetch…)
     * 服务器返回status状态码非200的情况下,H5/小程序会走进success与fail函数内…
     */
    async function successFailHandle(res) {
      setTimeout(() => {
        Taro.hideLoading();
      }, 100);
      let { statusCode, status, data } = res

      statusCode ??= status

      if (!noConsole) {
        console.log(`${new Date().toLocaleString('zh', { hour12: false })}【${options.url} 】【返回】`, data);
      }

      if (statusCode > 200 && statusCode < 300) {
        return Promise.reject('请求资源不存在');
      } else if (statusCode === 500) {
        return Promise.reject('服务端出现了问题');
      } else if (statusCode === 403) {
        return Promise.reject('没有权限访问');
      } else if (statusCode === 401) {
        Taro.setStorageSync(StorageUserJWTKey, '');
        setTimeout(() => {
          Taro.navigateTo({ url: '/pages/login/index' })
        }, 700);
        return Promise.reject('请登陆');
      } else if (statusCode === 200) {
        return Promise.resolve(data)
      } else {
        return Promise.reject('未知错误')
      }
    }
  })
};
