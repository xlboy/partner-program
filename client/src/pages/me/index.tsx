import { ConnectProps } from '@/models/typings/connect'
import { getAppStore } from '@/utils/dva'
import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/Taro'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

interface MeProps {}

interface MeDispatch {
  logout: () => void
}

const Me: React.FC<MeProps & MeDispatch> = props => {
  const { logout } = props
  useEffect(() => {
    verifLogin()
  }, [])

  return (
    <View className='index'>
      老子是Me
      <Button onClick={logout}>退出</Button>
    </View>
  )

  function verifLogin() {
    const appStore = getAppStore()
    appStore.dispatch({
      payload: {},
      type: 'user/initUserinfo',
    })
  }
}

export default connect<MeProps, MeDispatch>(null, (dispatch: any) => {
  const rootDispatch = dispatch as Store.RootDispatch
  return {
    logout: () => rootDispatch({ type: 'user/logout', payload: {} }),
  }
})(Me)
