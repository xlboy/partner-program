import React from 'react';
import { View, Text } from '@tarojs/components';
import './index.scss';
import Taro from '@tarojs/taro';
// import { connectSocket } from '@/utils/socket';
import { AtButton } from 'taro-ui';
import { SocketContentType } from '@/constants/socket';

const Index = () => {
  return (
    <View className="index">
      <Text>就是？你可知道害一个人可以害一生</Text>
      <AtButton onClick={socket}>人心</AtButton>
    </View>
  );

  async function socket() {
    const socketTask = await connectSocket('ws://localhost:3000/chat');
    if (socketTask) {
      socketTask.onOpen(() => {
        Taro.showToast({ title: '调用TM的成功了' });
        socketTask.send({
          data: '我草了'
        });
      });
      socketTask.onMessage((msg) => {
        console.log('msg', msg);
      });
      socketTask.onClose(({ code }) => {
        let title: string = '';
        console.log('code', code);
        // switch (code) {
        //   case SocketContentType.TOKEN_ERROR:
        //     title = '请登陆后重新尝试';
        //     break;
        //   case SocketContentType.TOKEN_OVERDUE:
        //     title = '身份已过期，请重新登陆';
        //     break;
        // }
        Taro.showToast({ title, icon: 'none' });
      });
    }
  }
};

export default Index;
