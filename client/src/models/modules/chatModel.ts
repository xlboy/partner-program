import Taro, { getStorageSync } from '@tarojs/taro';
import * as Api from '../../service/apiService';
import AppSocket from '@/socket/appSocket';
import { StorageHistoryChatSessionKey } from '@/constants/storage';
import { MessageContent } from '@/socket/typings';
import { SocketContentType } from '@/constants/socket';

export interface StateType {
  im: null;
  chatSession: Array<{
    avatar: string;
    name: string;
    type: SocketContentType;
    contentText: string;
    date: string;
  }>;
  latestInfo: {
    type: SocketContentType;
    content: {
      name: string;
      contentText: string;
      [other: string]: any;
    }
  } | null
}

export interface ModelType {
  namespace: string;
  state: StateType;
  reducerTypes: {
    SetChatSession: StateType['chatSession'];
    SetLatestInfo: StateType['latestInfo']
  },
  effectTypes: {
    getHistorySession: any;
    newChatMsgHandle: MessageContent.GroupChat;
  },
  effects: {}
}

const modelNamespace = 'chat';
const modelCore: Store.Model<ModelType> = {
  namespace: modelNamespace,
  state: {
    im: null,
    chatSession: [],
    latestInfo: null
  },
  effects: {
    *getHistorySession({ payload }, { put }) {
      const historyChatSession: undefined | StateType['chatSession'] = Taro.getStorageSync(StorageHistoryChatSessionKey)
      if (historyChatSession) {
        console.log('有历史信息哦')
        yield put({ type: 'SetChatSession', payload: historyChatSession })
      }
      console.log('historyChatSession', historyChatSession)
    },
    *newChatMsgHandle({ payload: messageContent }, { select, put }) {
      const state = select()
      const latestInfo = {
        type: SocketContentType.GROUP_CHAT,
        name: messageContent.groupId
      }
      yield put({ type: 'SetLatestInfo', payload: latestInfo })
      console.log('来新信息啦')
    }
  },
  reducers: {
    SetChatSession(state, { payload }) {
      return { ...state, chatSession: payload };
    },
    SetLatestInfo(state, { payload }) {
      return { ...state, latestInfo: payload };
    }
  }
};
export default {
  core: modelCore,
  namespace: modelNamespace
} as const;
