import Taro, { getStorageSync } from '@tarojs/taro';
import * as Api from '../service/apiService';
import AppSocket from '@/socket/appSocket';
import { ApiGetUserinfo, ApiUserLogin } from '@/apis/modules/user';
import { ApiFormat } from '@/apis/types/public';
import { ApiUserinfoResult } from '@/apis/types/user';
import { StorageUserJWTKey } from '@/constants/storage';

export interface StateType {
  info: ApiUserinfoResult & { token: string };
  im: AppSocket | null;
}

type ModelType = {
  namespace: string;
  state: StateType;
  effectTypes: {
    initUserinfo: {};
    login: {
      username: string;
      password: string;
    };
    connectSocket: { token: string };
  };
  reducerTypes: {
    SetIM: Pick<StateType, 'im'>;
    SetUserinfo: StateType['info'];
  };
  effects: {};
}

const modelNamespace = 'user';
const modelCore: Store.Model<ModelType> = {
  namespace: modelNamespace,
  state: {
    im: null,
    info: {
      token: '',
      avatar: '',
      username: '',
      nickname: 'nickname',
      age: null,
      email: null,
      sex: false
    }
  },
  effects: {
    *initUserinfo({ payload }, { call, put }) {
      const userinfo: StateType['info'] = yield call(async () => {
        const result = await ApiGetUserinfo()
        return result.data
      })
      yield put({ type: 'SetUserinfo', payload: userinfo });
      yield put.resolve({
        type: 'connectSocket',
        payload: {
          token: getStorageSync(StorageUserJWTKey)
        }
      })
    },
    *login({ payload }, { call, put }) {
      const { username, password } = payload;
      const loginResult: ApiFormat<StateType['info']> = yield call(ApiUserLogin, username, password);
      const a = yield call(ApiUserLogin, username, password)
      if (loginResult.code === 200) {
        const { token } = loginResult.data!
        Taro.showToast({ title: '登陆成功', icon: 'none' });
        Taro.setStorageSync(StorageUserJWTKey, token)
        yield put({ type: 'SetUserinfo', payload: { ...loginResult.data! } });
        yield put.resolve({ type: 'connectSocket', payload: { token } });
        setTimeout(() => {
          Taro.navigateTo({ url: '/pages/index/index' })
        }, 500);
      } else {
        Taro.showToast({ title: '账号或密码有误', icon: 'none' });
      }
    },
    *connectSocket({ payload }, { call, put }) {
      const { token } = payload;
      const im = new AppSocket(token);
      const connectResult = yield call(async () => await im.initConnect())
      if (connectResult) {
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
} as const;
export default {
  core: modelCore,
  namespace: modelNamespace
} as const;
