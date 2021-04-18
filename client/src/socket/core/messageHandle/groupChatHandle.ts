import { SocketType } from '@/@types/socket.type';
export default function(data: SocketType.DataParams) {
  console.log('有新的群消息来啦', data);
}
