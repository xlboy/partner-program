import { View, Text } from '@tarojs/components';
import './index.scss';
import Taro from '@tarojs/taro';
import { appStore } from '@/app';
import React from 'react';

void function veryifLogin() {
  appStore.dispatch({
    payload: {},
    type: 'user/initUserinfo'
  })
}();
const Index = () => {
  return (
    <View className="index">
      <Text>害怕，惹不起惹不起…我他吗害怕极了</Text>
    </View>
  );
};

export default Index;
