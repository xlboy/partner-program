import { SocketType } from '@/@types/socket.type';
import { SocketContentType } from '@/constants/socket';
import systemHandle from './systemHandle';

type MessageHandleMap = {
  [k in keyof typeof SocketContentType]?: (data: SocketType.DataParams) => any;
};

const messageHandleMap: MessageHandleMap = {
  [SocketContentType.SYSTEM]: systemHandle
};

export default function(data: SocketType.DataParams) {
  messageHandleMap[data.contentType]?.(data);
}
