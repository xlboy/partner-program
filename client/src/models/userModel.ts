import { Action, Reducer } from 'redux';
import { Model } from 'dva';
import * as Api from '../service/apiService';
import AppSocket from '@/socket/appSocket';

export interface StateType {
  im: AppSocket | null;
  token: string;
  username: string;
  nickname: string;
}

interface ModelType {
  namespace: string;
  state: StateType;
  effects: {};
  reducers: {
    SaveIm: Reducer<StateType, Action & { payload: Pick<StateType, 'im'> }>;
  };
}

const ModelNamespace = 'user';
const model: Model & ModelType = {
  namespace: ModelNamespace,
  state: {
    im: null,
    token: '',
    username: '',
    nickname: ''
  },
  effects: {
    *connectSocket({ payload }, { call, put }) {
      const { token } = payload;
      if (token !== '') {
        const im = yield call(async (token: string) => {
          const im = new AppSocket(token);
          await im.initConnect();
          return im;
        }, token);
        yield put({ type: 'SaveIm', payload: { im } });
      }
    }
  },
  reducers: {
    SaveIm(state, { payload }) {
      return { ...state!, ...payload };
    }
  }
};

export default model;
