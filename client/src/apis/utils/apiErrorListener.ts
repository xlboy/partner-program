import request from '@/utils/request'
import Taro from '@tarojs/taro'

/**
 * @description request数据时，接口返回状态码非200情况下的统一处理
 */

import { APIFormat } from '../typings/public'

export default async function apiErrorListener<T extends () => ReturnType<typeof request>>(
  fn: T
): Promise<ReturnType<T> | never> {
  try {
    return await fn()
  } catch (error) {
    const errorText = (error as APIFormat).msg || `${fn.name} 请求函数异常`
    Taro.showToast({ title: errorText, icon: 'none' })
    throw new Error(errorText)
  }
}
