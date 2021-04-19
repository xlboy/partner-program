import Taro from '@tarojs/taro';
import * as Api from '../service/apiService';
import AppSocket from '@/socket/appSocket';
import { ApiUserLogin } from '@/apis/modules/user';
import { ApiFormat } from '@/apis/types/public';
import { ApiUserLoginResult } from '@/apis/types/user';

export interface StateType {
  im: AppSocket | null;
  username: string;
  nickname: string;
  sex: boolean;
  token: string;
  age: null | number;
  email: null | string;
}

interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Store.Effect<{
      username: string;
      password: string;
    }>;
    connectSocket: Store.Effect;
  };
  reducers: {
    SetIM: Store.Reducers<StateType, Pick<StateType, 'im'>>;
    SetUserinfo: Store.Reducers<StateType, StateType>;
  };
}

const modelNamespace = 'user' as const;
const model: Store.Model & ModelType = {
  namespace: 'user' as const,
  state: {
    im: null,
    token: '',
    username: '',
    nickname: 'nickname',
    age: null,
    email: null,
    sex: false
  },
  effects: {
    *login({ payload }, { call, put }) {
      const { username, password } = payload;
      const loginResult: ApiFormat<ApiUserLoginResult> = yield call(ApiUserLogin, username, password);
      if (loginResult.code === 200) {
        Taro.showToast({ title: '登陆成功' });
        yield put({ type: 'SetUserinfo', payload: { ...loginResult.data } });
        put.resolve({ type: 'connectSocket', payload: { token: loginResult.data?.token } });
      } else {
        Taro.showToast({ title: '账号或密码有误' });
      }
    },
    *connectSocket({ payload }, { call, put, select }) {
      const token = yield select((state) => state[modelNamespace].token);
      if (token !== '') {
        const im = yield call(async (token: string) => {
          const im = new AppSocket(token);
          await im.initConnect();
          return im;
        }, token);
        yield put({ type: 'SetIM', payload: { im } });
      }
    }
  },
  reducers: {
    SetIM(state, { payload }) {
      return { ...state, ...payload };
    },
    SetUserinfo(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
export default {
  core: model,
  namespace: modelNamespace
};
