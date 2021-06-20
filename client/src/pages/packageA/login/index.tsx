import React, { FC, useState } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { AtButton, AtInput } from 'taro-ui'

interface LoginProps {
  nickname: string
}
interface LoginDispatch {
  userLogin: (loginForm: { username: string; password: string }) => Promise<boolean>
  userReg: (loginForm: { username: string; password: string; nickname: string }) => Promise<boolean>
}

const Login: FC<LoginProps & LoginDispatch> = props => {
  const { userLogin, userReg } = props
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  })

  return (
    <View className='index'>
      <AtInput
        name='username'
        title='用户名'
        type='text'
        value={loginForm.username}
        placeholder='请输入登陆用户名'
        onChange={(val: string) => onFormChange('username', val)}
      />
      <AtInput
        name='password'
        title='密码'
        type='password'
        value={loginForm.password}
        placeholder='请输入密码'
        onChange={(val: string) => onFormChange('password', val)}
      />
      <View className='at-row' style='margin-top: 20px;'>
        <View className='at-col'>
          <AtButton circle type='primary' onClick={() => onSubmitForm('login')}>
            登陆
          </AtButton>
        </View>
        <View className='at-col'>
          <AtButton circle type='primary' onClick={() => onSubmitForm('reg')}>
            注册
          </AtButton>
        </View>
      </View>
    </View>
  )

  function onFormChange(changeKey: keyof typeof loginForm, val: string): void {
    setLoginForm(state => ({ ...state, [changeKey]: val }))
  }

  function onSubmitForm(action: 'reg' | 'login'): void {
    const { username, password } = loginForm
    if (username && password) {
      if (action === 'reg') reg()
      else login()
    } else {
      Taro.showToast({ title: '账号或密码不可为空', icon: 'none' })
    }

    async function login(): Promise<void> {
      await userLogin(loginForm)
    }

    async function reg(): Promise<void> {
      await userReg({ ...loginForm, nickname: `加油吧少年${Math.floor(Math.random() * 500000)}` })
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
