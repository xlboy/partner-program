import { ConnectProps } from '@/models/typings/connect';
import { getAppStore } from '@/utils/dva';
import { View, Text, Button } from '@tarojs/components';
import Taro from '@tarojs/Taro';
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';

interface MeProps {

}

interface MeDispatch {
  logout: () => void
}


const Me: FC<MeProps & MeDispatch> = (props) => {
  const { logout } = props
  
  useEffect(() => {
    verifLogin()
  }, [])

  return (
    <View className="index">
      老子是Me
      <Button onClick={logout}>
        退出
      </Button>
    </View>
  );

  function verifLogin() {
    const appStore = getAppStore()
    appStore.dispatch({
      payload: {},
      type: 'user/initUserinfo'
    })
  }
};

export default connect<MeProps, MeDispatch, {}, Store.DefaultRootState>(
  null,
  (_dispatch: any) => {
    const dispatch = _dispatch as ConnectProps['dispatch']
    return {
      logout: () => dispatch({ type: 'user/logout', payload: {} }),
    }
  }
)(Me)