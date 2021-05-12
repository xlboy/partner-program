
import { MessageContent } from '@/socket/typings'
import { getAppStore } from '@/utils/dva'

export default function (content: MessageContent.GroupChat) {
  const appStore = getAppStore()
  appStore.dispatch({ type: 'chat/newChatMsgHandle', payload: content })
}