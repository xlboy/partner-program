import { Provider } from 'react-redux';
import dva from './utils/dva';
import models from './models';
import 'taro-ui/dist/style/index.scss'
import './app.scss';
import { FC } from '@tarojs/taro';
import React from 'react';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
const dvaApp = dva.createApp({
  initialState: {},
  models
});
const store = dvaApp.getStore();

const App: FC = (props) => <Provider store={store}>{props.children}</Provider>;
export default App;
