import Taro from '@tarojs/taro'
class EnvRun {
  constructor() {}
  [Taro.ENV_TYPE.ALIPAY](fn: () => void): this {
    if (Taro.getEnv() === Taro.ENV_TYPE.ALIPAY) {
      fn()
    }
    return this
  }
  [Taro.ENV_TYPE.JD](fn: () => void): this {
    if (Taro.getEnv() === Taro.ENV_TYPE.JD) {
      fn()
    }
    return this
  }
  [Taro.ENV_TYPE.QQ](fn: () => void): this {
    if (Taro.getEnv() === Taro.ENV_TYPE.QQ) {
      fn()
    }
    return this
  }
  [Taro.ENV_TYPE.RN](fn: () => void): this {
    if (Taro.getEnv() === Taro.ENV_TYPE.RN) {
      fn()
    }
    return this
  }
  [Taro.ENV_TYPE.SWAN](fn: () => void): this {
    if (Taro.getEnv() === Taro.ENV_TYPE.SWAN) {
      fn()
    }
    return this
  }
  [Taro.ENV_TYPE.TT](fn: () => void): this {
    if (Taro.getEnv() === Taro.ENV_TYPE.TT) {
      fn()
    }
    return this
  }
  [Taro.ENV_TYPE.WEAPP](fn: () => void): this {
    if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
      fn()
    }
    return this
  }
  [Taro.ENV_TYPE.WEB](fn: () => void): this {
    if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
      fn()
    }
    return this
  }
}

export default function () {
  return new EnvRun()
}
