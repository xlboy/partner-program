import { APIFormat } from '@/apis/typings/public'
import { StorageUserJWTKey } from '@/constants/storage'
import Taro from '@tarojs/taro'
import { apiUrl, noConsole } from '../config'
import getAppConfig from './getAppConfig'

interface OptionsType {
  method: 'GET' | 'POST' | 'PUT'
  data?: any
  url: string
  noLoading?: boolean
}
export default <T extends APIFormat>(
  options: OptionsType = { method: 'GET', data: {}, url: '', noLoading: false }
): Promise<T> => {
  if (!options.noLoading) {
    Taro.showLoading({
      title: '加载中',
    })
  }
  if (!noConsole) {
    console.log(
      `${new Date().toLocaleString()}【 URL=${options.url} 】PARAM=${JSON.stringify(options.data)}`
    )
  }
  for (const key in options.data) {
    if (
      options.data.hasOwnProperty(key) &&
      (options.data[key] === undefined || options.data[key] == null)
    ) {
      delete options.data[key]
    }
  }
  return new Promise((resolve, reject) => {
    Taro.request<T>({
      url: apiUrl + options.url,
      data: {
        ...options.data,
      },
      header: {
        authorization: Taro.getStorageSync(StorageUserJWTKey),
        'Content-Type': 'application/json',
      },
      method: options.method.toUpperCase() as keyof Taro.request.method,
      async success(res) {
        try {
          const data = await successFailHandle<T>(res)
          if (data.code === 200) resolve(data)
          else reject(data)
        } catch (error) {
          Taro.showToast({ title: error, icon: 'none' })
        }
      },
      async fail(res) {
        successFailHandle(res).catch(title => Taro.showToast({ title, icon: 'none' }))
      },
    })

    /**
     * @description Taro.request的在各端的行为不统一…特殊处理(原因：小程序端用的ajax,h5端用的fetch…)
     * 服务器返回status状态码非200的情况下,H5/小程序会走进success与fail函数内…
     */
    async function successFailHandle<T>(res): Promise<never | T> {
      setTimeout(() => {
        Taro.hideLoading()
      }, 100)
      if (res instanceof Error) {
        return Promise.reject('服务端出现了问题')
      }
      let { statusCode, status, data, statusText } = res

      statusCode ??= status

      if (!noConsole) {
        console.log(
          `${new Date().toLocaleString('zh', { hour12: false })}【${options.url} 】【返回】`,
          data
        )
      }
      if (statusCode > 200 && statusCode < 300) {
        return Promise.reject('请求资源不存在')
      } else if (statusCode === 500) {
        return Promise.reject('服务端出现了问题')
      } else if (statusCode === 403) {
        return Promise.reject('没有权限访问')
      } else if (statusCode === 401) {
        Taro.setStorageSync(StorageUserJWTKey, '')
        setTimeout(() => {
          Taro.navigateTo({ url: getAppConfig().AllPage.Login })
        }, 700)
        return Promise.reject('请登陆')
      } else if (statusCode === 200) {
        return Promise.resolve(data)
      } else {
        return Promise.reject(`未知错误：statusCode:${statusCode} - statusText: ${statusText}`)
      }
    }
  })
}
