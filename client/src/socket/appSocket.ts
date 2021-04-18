import { SocketType } from '@/@types/socket.type';
import { SocketContentType } from '@/constants/socket';
import Taro from '@tarojs/taro';
import connectSocket from './core/connectSocket';
import messageHandle from './core/messageHandle';

export default class AppSocket {
  url = 'ws://192.168.1.5:3000/chat';
  // status:
  im: Taro.SocketTask;

  constructor(readonly token: string) {
    console.log('tokentokentoken', token);
  }

  async initConnect() {
    const ws = await connectSocket(`${this.url}?token=${this.token}`);
    if (ws) {
      this.im = ws;
      this.im.onMessage(wsMessageHandle.bind(this));
    }
    return this.im;

    function wsMessageHandle(this: AppSocket, result: any): void {
      try {
        const data: SocketType.DataParams = JSON.parse(result.data);
        if (!isLoginMessageAndHandle(data)) {
          messageHandle(data);
        }
      } catch (error) {
        Taro.showToast({ title: 'service ws params error' });
      }

      function isLoginMessageAndHandle(data: SocketType.DataParams): boolean {
        if (data.contentType === SocketContentType.SYSTEM) {
          const isLoginContent = ['连接成功', 'token有误'].indexOf(data.content);
          if (isLoginContent !== -1) {
            isLoginContent ? loginErrorHandle() : loginSuccessHandle();
            return true;
          }
        }
        return false;

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
