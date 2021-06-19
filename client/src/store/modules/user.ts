import Taro, { getStorageSync } from '@tarojs/taro'
// import * as Api from '../service/apiService';
import AppSocket from '@/socket/appSocket'
import { APIGetUserinfo, APIUserLogin, APIUserReg } from '@/apis/modules/user'
import { APIFormat } from '@/apis/typings/public'
import { APIiUserinfoResult } from '@/apis/typings/user'
import { StorageUserJWTKey } from '@/constants/storage'
import _ from 'loadsh'
import envRun from '@/utils/envRun'
import getAppConfig from '@/utils/getAppConfig'
import { APIPlanGroup } from '@/apis/typings/planGroup'
import { APIGetUserPlanGroupList } from '@/apis/modules/plantGroup'
import apiErrorListener from '@/apis/utils/apiErrorListener'
export interface StateType {
  info: APIiUserinfoResult & { token: string }
  im: AppSocket | null
  group: Record<'my' | 'other', APIPlanGroup[]>
}

interface ModelType {
  namespace: string
  state: StateType
  effects: {
    initUserinfo: {}
    login: {
      username: string
      password: string
    }
    reg: {
      username: string
      password: string
      nickname: string
    }
    connectSocket: { token: string }
    logout: {}
    initUserGroup: {}
  }
  reducers: {
    SetIM: StateType['im']
    SetUserinfo: StateType['info']
    SetGroup: StateType['group']
  }
}

const stateModel: StateType = {
  im: null,
  info: {
    id: null,
    token: '',
    avatar: '',
    username: '',
    nickname: '',
    age: null,
    email: null,
    sex: false,
  },
  group: {
    my: [],
    other: [],
  },
}

const modelNamespace = 'user'
const modelCore: Store.Model<ModelType> = {
  namespace: modelNamespace,
  state: _.cloneDeep(stateModel) as StateType,
  effects: {
    *initUserinfo({}, { call, put }) {
      const userinfo: StateType['info'] = yield call(async () => {
        const result = await APIGetUserinfo()
        return result.data
      })
      if (userinfo) {
        yield put({ type: 'SetUserinfo', payload: userinfo })
        yield put.resolve({
          type: 'connectSocket',
          payload: {
            token: getStorageSync(StorageUserJWTKey),
          },
        })
        yield put.resolve({
          type: 'initUserGroup',
          payload: {},
        })
      }
    },
    *initUserGroup({}, { call, put }) {
      const userGroup: StateType['group'] = yield call(async () => {
        try {
          const result = await apiErrorListener(APIGetUserPlanGroupList)
          return {
            my: result.data!.myGroup,
            other: result.data!.otherGroup,
          } as StateType['group']
        } catch (error) {
          return {
            my: [],
            other: [],
          } as StateType['group']
        }
      })
      yield put({ type: 'SetGroup', payload: userGroup })
    },
    *login({ payload }, { call, put }) {
      const { username, password } = payload
      const loginResult: APIFormat<StateType['info']> = yield call(() =>
        APIUserLogin(username, password).catch(res => res)
      )
      if (loginResult.code === 200) {
        const { token } = loginResult.data!
        Taro.showToast({ title: '登陆成功', icon: 'none' })
        Taro.setStorageSync(StorageUserJWTKey, token)
        yield put({ type: 'SetUserinfo', payload: { ...loginResult.data! } })
        yield put.resolve({ type: 'connectSocket', payload: { token } })
        yield put.resolve({ type: 'initUserinfo', payload: {} })
        setTimeout(() => {
          envRun()
            .WEB(() => Taro.navigateTo({ url: '/pages/me/index' }))
            .WEAPP(() => Taro.switchTab({ url: '/pages/me/index' }))
        }, 500)
      } else {
        Taro.showToast({ title: '账号或密码有误', icon: 'none' })
      }
    },
    *reg({ payload }, { call }) {
      const { username, password, nickname } = payload
      const regResult: APIFormat<StateType['info']> = yield call(
        APIUserReg,
        username,
        password,
        nickname
      )
      if (regResult.code !== 200) {
        Taro.showToast({ title: regResult.msg, icon: 'none' })
      } else {
        Taro.showToast({ title: '注册成功，快登陆吧！', icon: 'none' })
      }
    },
    *connectSocket({ payload }, { call, put }) {
      const { token } = payload
      const im = new AppSocket(token)
      const connectResult = yield call(async () => await im.initConnect())
      if (connectResult) {
        yield put({ type: 'SetIM', payload: im })
      }
    },
    *logout({}, { put, select }) {
      yield put({
        type: 'SetUserinfo',
        payload: _.cloneDeep(stateModel.info),
      })
      Taro.setStorageSync(StorageUserJWTKey, '')
      Taro.showToast({ title: '退出成功', icon: 'none' })
      const { user } = (yield select()) as Store.RootState
      user.im?.closeConnect()
      setTimeout(() => {
        Taro.navigateTo({ url: getAppConfig().AllPage.Login })
      }, 600)
    },
  },
  reducers: {
    SetIM(state, { payload }) {
      return { ...state, im: payload }
    },
    SetUserinfo(state, { payload }) {
      return { ...state, info: payload }
    },
    SetGroup(state, { payload }) {
      return { ...state, group: payload }
    },
  },
}
export default {
  core: modelCore,
  namespace: modelNamespace,
} as const
