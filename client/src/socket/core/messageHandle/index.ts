import { SocketContentType } from '@/constants/socket';
import { SocketType } from '@/socket/types';
import groupChatHandle from './groupChatHandle';
import systemHandle from './systemHandle';

type MessageHandleMap = {
  [k in keyof typeof SocketContentType]?: (data: SocketType.DataParams['content']) => any;
};

const messageHandleMap: MessageHandleMap = {
  [SocketContentType.SYSTEM]: systemHandle,
  [SocketContentType.GROUP_CHAT]: groupChatHandle
};

export default function(data: SocketType.DataParams) {
  messageHandleMap[data.contentType]?.(data.content);
}
