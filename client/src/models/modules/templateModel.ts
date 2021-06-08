import { MessageContent } from '@/socket/typings';
import { SocketContentType } from '@/constants/socket';

export interface StateType {
  template: null | string;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  reducers: {
    SetTemplate: { template: string };
  };
  effects: {
    getNextTemplate: { templateType: '0' | '1' };
  };
}

const modelNamespace = 'chat';
const modelCore: Store.Model<ModelType> = {
  namespace: modelNamespace,
  state: {
    template: null
  },
  effects: {
    *getNextTemplate({ payload }, { put }) {}
  },
  reducers: {
    SetTemplate(state, { payload }) {
      return { ...state, chatSession: payload };
    }
  }
};
