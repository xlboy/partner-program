import envRun from '@/utils/envRun'
import getAppConfig from '@/utils/getAppConfig'
import { View, Text } from '@tarojs/components'
import Taro, { getApp } from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import {
  AtActionSheet,
  AtActionSheetItem,
  AtButton,
  AtFab,
  AtListItem,
  AtModal,
  AtModalContent,
} from 'taro-ui'
import './index.scss'
const Index: React.FC = () => {
  useEffect(() => {
    envRun().WEAPP(() => {
      document.title = '聊天'
    })
  }, [])
  return (
    <View className='index'>
      {/* <AtListItem
        title='标题文字'
        note='描述信息'
        extraText='详细信息'
        arrow='right'
        thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
      /> */}
      <FloatAddBtn />
    </View>
  )

  function FloatAddBtn(): JSX.Element {
    return (
      <>
        <AtModal isOpened>
          <AtModalContent>
            <AtButton>创建小组</AtButton>
            <AtButton customStyle={{ marginTop: '3px' }}>搜索小组</AtButton>
          </AtModalContent>
        </AtModal>
        <AtFab size='normal' className='float-btn__add' onClick={toAddGroupPage}>
          <Text className='at-fab__icon at-icon at-icon-add'></Text>
        </AtFab>
      </>
    )
  }
  function toAddGroupPage(): void {
    Taro.navigateTo({ url: getAppConfig().AllPage.AddGroup })
  }
}

export default Index
