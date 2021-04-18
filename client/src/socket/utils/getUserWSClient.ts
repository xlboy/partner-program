import { appStore } from '@/app';

/**
 * @description 获取用户のWS端
 */
export default function(): Taro.SocketTask {
  return appStore.getState().user.im as Taro.SocketTask;
}
