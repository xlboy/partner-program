import { SocketContentType } from '@/constants/socket';
import Taro from '@tarojs/taro';
import connectSocket from './core/connectSocket';
import messageHandle from './core/messageHandle';
import { SocketType } from './typings';

export default class AppSocket {
  url = 'ws://192.168.1.2:3000/chat';
  // status:
  im: Taro.SocketTask;

  constructor(readonly token: string) {}

  initConnect(): Promise<boolean> {
    return new Promise(async resolve => {
      let ws = await connectSocket(`${this.url}?token=${this.token}`);
      if (ws) {
        ws.onMessage(wsMessageHandle.bind(this, resolve, ws));
      }
    })

    function wsMessageHandle(
      this: AppSocket,
      resolve: Function,
      ws: Taro.SocketTask | null,
      result: any
    ): void {
      try {
        const data: SocketType.DataParams = JSON.parse(result.data);
        console.log('data', data)
        if (initLoginHandle(data)) {
          resolve(true)
          this.im = ws!
          this.im.onMessage(result => {
            try {
              messageHandle(JSON.parse(result.data) as SocketType.DataParams)
            } catch (error) {
              Taro.showToast({ title: 'service ws params error' });
            }
          })
          ws = null
        } else {
          resolve(false)
        }
      } catch (error) {
        Taro.showToast({ title: 'service ws params error' });
      }

      function initLoginHandle(data: SocketType.DataParams): boolean {
        if (data.contentType === SocketContentType.SYSTEM) {
          const isLoginContent = ['连接成功', 'token有误'].indexOf(data.content);
          if (isLoginContent !== -1) {
            isLoginContent ? loginErrorHandle() : loginSuccessHandle();
            return !isLoginContent;
          }
        }
        return false

        function loginSuccessHandle() {
          Taro.showToast({ title: '连接成功啦' });
        }

        function loginErrorHandle() {
          Taro.showToast({ title: 'token有误…' });
        }
      }
    }
  }
}
