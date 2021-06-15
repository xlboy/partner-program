import { ConnectProps } from '@/models/typings/connect'
import { getAppStore } from '@/utils/dva'
import envRun from '@/utils/envRun'
import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/Taro'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

interface MeProps {}

interface MeDispatch {
  logout: () => void
  initUserinfo: () => void
}

const Me: React.FC<MeProps & MeDispatch> = props => {
  const { logout, initUserinfo } = props
  useEffect(() => {
    initUserinfo()
    envRun().WEAPP(() => {
      document.title = '我的资料'
    })
  }, [])

  return (
    <View className='index'>
      老子是Me
      <Button onClick={logout}>退出</Button>
    </View>
  )
}

export default connect<MeProps, MeDispatch>(null, (dispatch: any) => {
  const rootDispatch = dispatch as Store.RootDispatch
  return {
    logout: () => rootDispatch({ type: 'user/logout', payload: {} }),
    initUserinfo: () => rootDispatch({ type: 'user/initUserinfo', payload: {} }),
  }
})(Me)
