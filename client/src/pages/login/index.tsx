import React, { FC } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import Taro, { login } from '@tarojs/taro'
import { ConnectProps } from '@/models/typings/connect'
import { connect } from 'react-redux'
import { AtButton, AtInput } from 'taro-ui'
import { mergeProvider } from '@/models'
import { getAppStore } from '@/utils/dva'
import { StateType } from '@/models/modules/userModel'

interface LoginProps {
  nickname: string
}
interface LoginDispatch {
  userLogin: (loginForm: { username: string; password: string }) => Promise<boolean>
  userReg: (loginForm: { username: string; password: string; nickname: string }) => Promise<boolean>
}

const Login: FC<LoginProps & LoginDispatch> = props => {
  const { userLogin, userReg } = props
  const loginForm = {
    username: '',
    password: '',
  }

  return (
    <View className='index'>
      <AtInput
        name='username'
        title='用户名'
        type='text'
        placeholder='请输入登陆用户名'
        onChange={(val: string) => formChange('username', val)}
      />
      <AtInput
        name='password'
        title='密码'
        type='password'
        placeholder='请输入密码'
        onChange={(val: string) => formChange('password', val)}
      />
      <View className='at-row' style='margin-top: 20px;'>
        <View className='at-col'>
          <AtButton circle type='primary' onClick={() => submitForm('login')}>
            登陆
          </AtButton>
        </View>
        <View className='at-col'>
          <AtButton circle type='primary' onClick={() => submitForm('reg')}>
            注册
          </AtButton>
        </View>
      </View>
    </View>
  )

  function formChange(changeKey: keyof typeof loginForm, val: string) {
    loginForm[changeKey] = val
  }

  function submitForm(action: 'reg' | 'login') {
    const { username, password } = loginForm
    if (username && password) {
      if (action === 'reg') reg()
      else login()
    } else {
      return Taro.showToast({ title: '账号或密码不可为空', icon: 'none' })
    }

    async function login() {
      await userLogin(loginForm)
    }

    async function reg() {
      await userReg({ ...loginForm, nickname: `卡夫卡${Math.floor(Math.random() * 500000)}` })
    }
  }
}

export default connect<LoginProps, LoginDispatch, {}, Store.RootState>(
  state => ({
    nickname: state.user.info.nickname,
  }),
  (dispatch: any) => {
    const rootDispatch = dispatch as Store.RootDispatch
    return {
      userLogin: (...args) => rootDispatch({ type: 'user/login', payload: args[0] }),
      userReg: (...args) => rootDispatch({ type: 'user/reg', payload: args[0] }),
    }
  }
)(Login)
