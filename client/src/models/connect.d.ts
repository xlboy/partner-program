import { Dispatch } from 'redux';
import { AllModelEffect } from '.';
import { StateType as AccountState } from './chatModel';

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
}

export interface ConnectProps {
  dispatch: Store.ConnectDispatch<Store.AnyAction<any, AllModelEffect>>;
}

export interface ConnectState {
  loading: Loading;
  account: AccountState;
}
