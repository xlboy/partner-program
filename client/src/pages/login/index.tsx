import React, { FC } from 'react';
import { View, Text, Button } from '@tarojs/components';
import './index.scss';
import Taro from '@tarojs/taro';
import { connect } from '_dva@2.4.1@dva';
import { ConnectProps } from '@/models/connect';
import getUserWSClient from '@/socket/utils/getUserWSClient';
import { ApiUserLogin } from '@/apis/modules/user';

interface IndexProps extends ConnectProps {
  token: number;
}

const Index: FC<IndexProps> = (props) => {
  const { token, dispatch } = props;
  return (
    <View className="index">
      <Text>token -- {token}</Text>
      <Button onClick={onClick}>我知个der啊</Button>
    </View>
  );

  async function onClick() {
    const loginResult = await ApiUserLogin('xlboy', '2');
    if (loginResult.code === 200) {
      Taro.showToast({ title: '登陆成功' });
    } else {
      Taro.showToast({ title: '账号或密码有误' });
    }
    // if (result.data)
    // dispatch({ type: 'user/connectSocket', payload: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InhsYm95IiwiaWQiOjEsImRhdGUiOjE2MTg2MzYzMjgsImlhdCI6MTYxODYzNjMyOCwiZXhwIjoxNjE4ODA5MTI4fQ.bb_uuAUArZJCENhqQP6q6ioAaMfr05fTLJRHvFozBYI' } })
  }
};

export default connect((state) => {
  return state;
})(Index);
