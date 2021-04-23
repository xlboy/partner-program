import { AllModelEffect } from '@/models';
import { EffectType, SubscriptionsMapObject } from 'dva';

declare global {
  namespace Store {
    interface Action<T = any> {
      type: T;
    }
    interface AnyAction<P = any, T = any> {
      payload: P;
      type: T;
    }

    type ConnectDispatch<A = AnyAction> = <T = any>(action: A) => Promise<T>;
    interface EffectsCommandMap<
      State,
      EffectTypes,
      ReducerTypes,
      EffectKeys extends keyof EffectTypes,
      ReducerKeys extends keyof ReducerTypes
      > {
      put: {
        (action: AnyAction<ReducerTypes[ReducerKeys], ReducerKeys>): void;
        resolve: (action: AnyAction<EffectTypes[EffectKeys], EffectKeys>) => any;
      };
      call: <T extends (...args: any[]) => any>(fun: T, ...args: any[]) => ReturnType<T>;
      select: <F = void>(fun?: (state: any) => F) => F extends void ? State : F;
      take: Function;
      cancel: Function;
      [key: string]: any;
    }

    type Reducers<S = any, A = {}> = (state: S, action: { payload: A }) => S;
    interface Model<
      M extends Model<any>,
      TReducer = any,
      TEffect = any,
      State = M['state'],
      EffectTypes = M['effectTypes'],
      ReducerTypes = M['reducerTypes'],
      > {
      namespace?: string;
      state?: any;
      reducerTypes?: {
        [k: string]: TReducer
      };
      effectTypes?: {
        [k: string]: TEffect
      };
      reducers?: {
        [k in keyof ReducerTypes]: Reducers<State, ReducerTypes[k]>
      };
      effects: {
        [k in keyof EffectTypes]:
        ((
          action: AnyAction<EffectTypes[k]>,
          effects: EffectsCommandMap<State, EffectTypes, ReducerTypes, keyof EffectTypes, keyof ReducerTypes>
        ) => any) |
        [(
          action: AnyAction<EffectTypes[k]>,
          effects: EffectsCommandMap<State, EffectTypes, ReducerTypes, keyof EffectTypes, keyof ReducerTypes>
        ) => any, { type: EffectType }]
      };
      subscriptions?: SubscriptionsMapObject;
    }
  }
}

export { };
