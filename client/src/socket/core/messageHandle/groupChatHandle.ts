import { appStore } from '@/app';
import { MessageContent } from '@/socket/types'

export default function (content: MessageContent.GroupChat) {
  appStore.dispatch({ type: 'chat/newChatMsgHandle', payload: content})
}
