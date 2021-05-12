
import { StorageUserJWTKey } from '@/constants/storage';
import Taro, { Chain } from '@tarojs/taro';

enum HTTP_STATUS {
  /** 正常 */
  SUCCESS = 200,
  /** 没有权限访问 */
  FORBIDDEN = 403,
  /** 需要鉴权，TOKEN过期等 */
  AUTHENTICATE = 401,
  /** 服务器内部未知错误… */
  SERVICE_NOT_ERROR = 500
}
// 服了，个der addInterceptor, j毛用没有
const rspInterceptor = (chain: Chain) => {
  const requestParams = chain.requestParams;

  return chain.proceed(requestParams).then((res) => {
    console.log('来看看,哪个进来的快？？？？')
    if (res.statusCode > 200 && res.statusCode < 300) {
      return Promise.reject('请求资源不存在');
    } else if (res.statusCode === HTTP_STATUS.SERVICE_NOT_ERROR) {
      return Promise.reject('服务端出现了问题');
    } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
      return Promise.reject('没有权限访问');
    } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
      Taro.showToast({ title: '账户已过期，请重新登陆', icon: 'none' })
      Taro.setStorageSync(StorageUserJWTKey, '');
      setTimeout(() => {
        Taro.navigateTo({ url: 'pages/login/index' })
      }, 500);
      return Promise.reject('需要鉴权');
    } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
      return res;
    }
  });
};

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
const interceptors = [rspInterceptor];

export default interceptors;
