import { wsUrl } from '@/config'
import { SocketContentType } from '@/constants/socket'
import Taro from '@tarojs/taro'
import connectSocket from './core/connectSocket'
import messageHandle from './core/messageHandle'
import { SocketType } from './typings'
export default class AppSocket {
  private url = wsUrl
  private im: Taro.SocketTask

  constructor(private readonly token: string) {}

  initConnect(): Promise<boolean> {
    return new Promise(async resolve => {
      if (this.im !== undefined) {
        resolve(false)
      }
      let ws = await connectSocket(`${this.url}?token=${this.token}`)
      if (ws) {
        ws.onMessage(wsMessageHandle.bind(this, resolve, ws))
      } else {
        resolve(false)
      }
    })

    function wsMessageHandle(
      this: AppSocket,
      resolve: Function,
      ws: Taro.SocketTask | null,
      result: any
    ): void {
      try {
        const data: SocketType.DataParams = JSON.parse(result.data)
        if (initLoginHandle(data)) {
          resolve(true)
          this.im = ws!
          this.im.onMessage(result => {
            try {
              messageHandle(JSON.parse(result.data) as SocketType.DataParams)
            } catch (error) {
              Taro.showToast({ title: 'service ws params error' })
            }
          })
          ws = null
        } else {
          resolve(false)
        }
      } catch (error) {
        Taro.showToast({ title: 'service ws params error' })
      }

      function initLoginHandle(data: SocketType.DataParams): boolean {
        if (data.contentType === SocketContentType.SYSTEM) {
          const isLoginContent = ['连接成功', 'token有误'].indexOf(data.content)
          if (isLoginContent !== -1) {
            isLoginContent ? loginErrorHandle() : loginSuccessHandle()
            return !isLoginContent
          }
        }
        return false

        function loginSuccessHandle() {
          Taro.showToast({ title: '连接成功啦' })
        }

        function loginErrorHandle() {
          Taro.showToast({ title: 'token有误…' })
        }
      }
    }
  }

  closeConnect() {
    this.im.close({})
  }
}
