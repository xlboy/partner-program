import * as chatModel from '@/models/modules/chatModel'
import * as userModel from '@/models/modules/userModel'
import { EffectType, SubscriptionsMapObject } from 'dva'

export interface StoreModelDefine {
  namespace: string
  state: any
  reducers: Record<string, any>
  effects: Record<string, any>
  subscriptions?: SubscriptionsMapObject
}

declare global {
  namespace Store {
    interface Action<T = any> {
      type: T
    }
    interface AnyAction<P = any, T = any> {
      payload: P
      type: T
    }

    type ConnectDispatch<A = AnyAction> = <T = any>(action: A) => Promise<T>
    interface EffectsCommandMap<
      State,
      EffectTypes,
      ReducerTypes,
      EffectKeys extends keyof EffectTypes = keyof EffectTypes,
      ReducerKeys extends keyof ReducerTypes = keyof ReducerTypes
    > {
      put: {
        (action: AnyAction<ReducerTypes[ReducerKeys], ReducerKeys>): void
        resolve: (action: AnyAction<EffectTypes[EffectKeys], EffectKeys>) => any
      }
      call: <T extends (...args: any[]) => any>(fun: T, ...args: any[]) => ReturnType<T>
      select: <F = void>(fun?: (state: any) => F) => F extends void ? State : F
      take: Function
      cancel: Function
      [key: string]: any
    }

    type Reducers<S = any, A = any> = (state: S, action: { payload: A }) => S

    type Model<M extends StoreModelDefine> = {
      namespace: string
      state: M['state']
      effects: {
        [EffectKey in keyof M['effects']]:
          | ((
              action: AnyAction<M['effects'][EffectKey]>,
              effects: EffectsCommandMap<M['state'], M['effects'], M['reducers']>
            ) => any)
          | [
              (
                action: AnyAction<M['effects'][EffectKey]>,
                effects: EffectsCommandMap<M['state'], M['effects'], M['reducers']>
              ) => any,
              { type: EffectType }
            ]
      }
      reducers: {
        [K in keyof M['reducers']]: Reducers<M['state'], M['reducers'][K]>
      }
      subscriptions?: SubscriptionsMapObject
      ModelTypeDefine?: [M, never]
    }

    interface DefaultRootState {
      [chatModel.default.namespace]: chatModel.StateType
      [userModel.default.namespace]: userModel.StateType
    }
  }
}

export {}
