import React, { FC } from 'react';
import { View, Text, Button } from '@tarojs/components';
import './index.scss';
import Taro from '@tarojs/taro';
import { ConnectProps } from '@/models/connect';
import { connect } from 'dva';
import { AtButton, AtInput } from 'taro-ui';

interface IndexProps extends ConnectProps {
  token: number;
  nickname: string;
}

const Index: FC<IndexProps> = (props) => {
  const { dispatch, nickname } = props;
  const loginForm = {
    username: '',
    password: ''
  };
  return (
    <View className="index">
      <AtInput name="value" title="用户名" type="text" placeholder="请输入登陆用户名" onChange={formChange.bind(null, 'username')} />
      <AtInput name="value" title="密码" type="password" placeholder="请输入密码" onChange={formChange.bind(null, 'password')} />
      <View className="at-row">
        <View className="at-col">
          <AtButton type="primary" onClick={onLogin}>
            登陆
          </AtButton>
        </View>
        <View className="at-col">
          <AtButton type="primary" onClick={onReg}>
            注册
          </AtButton>
        </View>
      </View>
    </View>
  );

  function formChange(changeKey: keyof typeof loginForm, val: string) {
    loginForm[changeKey] = val;
  }

  async function onLogin() {
    const isSuccess = await dispatch<boolean>({
      type: 'user/login',
      payload: loginForm
    });
    if (isSuccess) {
      
    }
  }

  async function onReg() {}
};

export default connect((state) => {
  return {
    nickname: state.user.nickname
  };
})(Index);
