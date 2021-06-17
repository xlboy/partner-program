import { AllModelEffectPayload, AllModelState } from '@/store/typings'
import { ModelEffectPayloadToAction } from '@/store/typings/utils'
import { EffectType, SubscriptionsMapObject } from 'dva'


interface AnyAction<P = any, T = any> {
  payload: P
  type: T
}

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
declare global {
  namespace Store {
    interface ModelDefine {
      namespace: string
      state: any
      reducers: Record<string, any>
      effects: Record<string, any>
      subscriptions?: SubscriptionsMapObject
    }
    type Model<M extends ModelDefine> = {
      namespace: string
      state: M['state']
      effects: {
        [EffectKey in keyof M['effects']]:
          | ((
              action: AnyAction<M['effects'][EffectKey]>,
              effects: EffectsCommandMap<RootState, M['effects'], M['reducers']>
            ) => any)
          | [
              (
                action: AnyAction<M['effects'][EffectKey]>,
                effects: EffectsCommandMap<RootState, M['effects'], M['reducers']>
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

    type RootState = AllModelState
    type RootDispatch = (action: ModelEffectPayloadToAction<AllModelEffectPayload>) => void
  }
}

export {}
