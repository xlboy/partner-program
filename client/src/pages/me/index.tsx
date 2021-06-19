import { View, Button } from '@tarojs/components'
import Taro from '@tarojs/Taro'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { AtTag } from 'taro-ui'
interface MeStoreProps {
  userinfo: Store.RootState['user']['info']
}
interface MeStoreDispatch {
  logout: () => void
  initUserinfo: () => void
}
const Me: React.FC<MeStoreProps & MeStoreDispatch> = props => {
  const { logout, initUserinfo, userinfo } = props
  useEffect(() => {
    initUserinfo()
  }, [])

  return (
    <View className='index'>
      <AtTag>nickname是{userinfo.nickname}</AtTag>
      <AtTag>username是{userinfo.username}</AtTag>
      <Button onClick={logout}>退出</Button>
    </View>
  )
}

export default connect<MeStoreProps, MeStoreDispatch>(
  state => {
    const rootState = state as Store.RootState
    return {
      userinfo: rootState.user.info,
    }
  },
  dispatch => {
    const rootDispatch = dispatch as Store.RootDispatch
    return {
      logout: () => rootDispatch({ type: 'user/logout', payload: {} }),
      initUserinfo: () => rootDispatch({ type: 'user/initUserinfo', payload: {} }),
    }
  }
)(Me)
