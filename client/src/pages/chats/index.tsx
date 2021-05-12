import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useState } from 'react';
import { AtListItem } from 'taro-ui';

const Index = () => {
  return (
    <View className="index">
      <AtListItem
        title='标题文字'
        note='描述信息'
        extraText='详细信息'
        arrow='right'
        thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
      />
      {window.navigator.userAgent}
    </View>
  );
};

export default Index;
