import Taro, { getStorageSync } from '@tarojs/taro';
// import * as Api from '../service/apiService';
import AppSocket from '@/socket/appSocket';
import { ApiGetUserinfo, ApiUserLogin, ApiUserReg } from '@/apis/modules/user';
import { ApiFormat } from '@/apis/typings/public';
import { ApiUserinfoResult } from '@/apis/typings/user';
import { StorageUserJWTKey } from '@/constants/storage';
import _ from 'loadsh'
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
    reg: {
      username: string;
      password: string;
      nickname: string;
    };
    connectSocket: { token: string };
    logout: {};
  };
  reducerTypes: {
    SetIM: Pick<StateType, 'im'>;
    SetUserinfo: StateType['info'];
  };
  effects: {};
}

const stateModel = {
  im: null,
  info: {
    token: '',
    avatar: '',
    username: '',
    nickname: '',
    age: null,
    email: null,
    sex: false
  }
}

const modelNamespace = 'user';
const modelCore: Store.Model<ModelType> = {
  namespace: modelNamespace,
  state: _.cloneDeep(stateModel),
  effects: {
    *initUserinfo({ }, { call, put }) {
      const userinfo: StateType['info'] = yield call(async () => {
        const result = await ApiGetUserinfo()
        return result.data
      })
      if (userinfo) {
        yield put({ type: 'SetUserinfo', payload: userinfo });
        yield put.resolve({
          type: 'connectSocket',
          payload: {
            token: getStorageSync(StorageUserJWTKey)
          }
        })
      }
    },
    *login({ payload }, { call, put }) {
      const { username, password } = payload;
      const loginResult: ApiFormat<StateType['info']> = yield call(ApiUserLogin, username, password);
      if (loginResult.code === 200) {
        const { token } = loginResult.data!
        Taro.showToast({ title: '登陆成功', icon: 'none' });
        Taro.setStorageSync(StorageUserJWTKey, token)
        yield put({ type: 'SetUserinfo', payload: { ...loginResult.data! } });
        yield put.resolve({ type: 'connectSocket', payload: { token } });
        setTimeout(() => {
          Taro.switchTab({ url: '/pages/me/index' })
        }, 500);
      } else {
        Taro.showToast({ title: '账号或密码有误', icon: 'none' });
      }
    },
    *reg({ payload }, { call }) {
      const { username, password, nickname } = payload;
      const regResult: ApiFormat<StateType['info']> = yield call(ApiUserReg, username, password, nickname);
      if (regResult.code !== 200) {
        Taro.showToast({ title: regResult.msg, icon: 'none' })
      } else {
        Taro.showToast({ title: '注册成功，快登陆吧！', icon: 'none' })
      }
    },
    *connectSocket({ payload }, { call, put }) {
      const { token } = payload;
      const im = new AppSocket(token);
      const connectResult = yield call(async () => await im.initConnect())
      if (connectResult) {
        yield put({ type: 'SetIM', payload: { im } });
      }
    },
    *logout({ }, { put, select }) {
      yield put({
        type: 'SetUserinfo', payload: _.cloneDeep(stateModel.info)
      })
      Taro.setStorageSync(StorageUserJWTKey, '')
      Taro.showToast({ title: '退出成功', icon: 'none' })
      // const { im } = select()
      console.log('im', select())
      // im?.closeConnect()
      setTimeout(() => {
        Taro.navigateTo({ url: '/pages/login/index' })
      }, 600);
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
}
export default {
  core: modelCore,
  namespace: modelNamespace
} as const;
