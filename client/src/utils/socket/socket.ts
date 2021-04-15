import Taro from '@tarojs/taro';
import connectSocket from './connectSocket';

export default class AppSocket {
  url: '';
  im: Taro.SocketTask;
  constructor() {
    connectSocket();
  }
}
