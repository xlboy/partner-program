import envRun from '@/utils/envRun'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { AtActionSheet, AtActionSheetItem, AtFab, AtListItem } from 'taro-ui'
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
      <AtActionSheet isOpened>
        <AtActionSheetItem>按钮一</AtActionSheetItem>
        <AtActionSheetItem>按钮二</AtActionSheetItem>
      </AtActionSheet>
    </View>
  )

  function FloatAddBtn(): JSX.Element {
    return (
      <AtFab size='normal' className='float-btn__add' onClick={toAddGroupPage}>
        <Text className='at-fab__icon at-icon at-icon-add'></Text>
      </AtFab>
    )
  }
  function toAddGroupPage(): void {
    Taro.navigateTo({ url: '/pages/addGroup/index' })
  }
}

export default Index
