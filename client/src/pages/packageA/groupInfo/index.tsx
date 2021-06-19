import { FC, useEffect, useState } from 'react'
import { Image, View } from '@tarojs/components'
import './index.scss'
import Taro, { getCurrentInstance } from '@tarojs/taro'

const GroupInfo: FC = () => {
  useEffect(() => {
    console.log('getCurrentInstance', getCurrentInstance().router!.params)
  })
  return (
    <View className='index'>
      <Image src={require('@/static/images/bg_group_info.jpg')} className='top-bg-img' />
      <View className='group-info'>

      </View>
    </View>
  )
}

export default GroupInfo
