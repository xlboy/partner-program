import Taro from '@tarojs/taro';
/**
 *
 * @param url ws连接地址
 * @returns 是否连接成功/已连接的实例
 */
export default async function(url: string): Promise<Taro.SocketTask | false> {
  try {
    const socketTask = await Taro.connectSocket({
      url,
      fail() {
        throw new Error('ws url error');
      }
    });
    return socketTask;
  } catch (error) {
    Taro.showToast({
      title: 'connect socket error -> ' + error.message
    });
    return false;
  }
}
