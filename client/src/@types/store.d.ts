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
    interface EffectsCommandMap {
      put: {
        (action: AnyAction): void;
        resolve: (action: AnyAction) => any;
      };
      call: Function;
      select: Function;
      take: Function;
      cancel: Function;
      [key: string]: any;
    }

    type Reducers<S = any, A = {}> = (state: S, action: { payload: A }) => S;
    type Effect<P = any> = (action: AnyAction<P>, effects: EffectsCommandMap) => any;
    type EffectWithType = [Effect, { type: EffectType }];
    interface Model<M extends Model = {}> {
      namespace?: string;
      state?: any;
      reducers?: {
        [k in keyof M['reducers']]: Reducers;
      };
      effects?: {
        [k in keyof M['effects']]: Effect | EffectWithType;
      };
      subscriptions?: SubscriptionsMapObject;
    }
  }
}

export {};
