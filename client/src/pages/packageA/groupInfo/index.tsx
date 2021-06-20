import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { Image, View, Text } from '@tarojs/components'
import './index.scss'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { APIPlanGroup } from '@/apis/typings/planGroup'
import { APIFindPlantGroupId } from '@/apis/modules/plantGroup'
import { connect } from 'react-redux'

interface GroupInfoStoreState {
  currentUserId: number
}

const GroupInfo: FC<GroupInfoStoreState> = props => {
  const { currentUserId } = props
  const [groupInfo, setGroupInfo] = useState<APIPlanGroup | null>(null)

  useMemo(() => {
    const { id } = getCurrentInstance().router!.params
    APIFindPlantGroupId(id!).then(res => {
      setGroupInfo(res.data! ?? null)
    })
  }, [])

  const isUserInGroup = useMemo(
    () => groupInfo?.userinfos.some(({ id }) => id === currentUserId),
    [currentUserId, groupInfo]
  )

  return (
    <View className='index'>
      {groupInfo && (
        <>
          <Image src={require('@/static/images/bg_group_info.jpg')} className='group-bg' />
          <View className='group-info'>
            <View className='group-info__wrapper'>
              <Image
                src={require('@/static/images/bg_group_info.jpg')}
                className='group-info__avatar'
              />
              <View className='group-info__base'>
                <Text className='group-info__base-name'>{groupInfo.groupName}</Text>
                <Text className='group-info__base-number'>小组号： {groupInfo.groupNum}</Text>
              </View>
            </View>
            <View className='group-info__row'>
              <Text className='group-info__row-title'>简介</Text>
              <Text className='group-info__row-content'>{groupInfo.introduce}</Text>
            </View>
            <View className='group-info__member'>
              <View className='group-info__member-top'>
                <Text className='group-info__member-top-title'>小组成员</Text>
                <Text className='group-info__member-top-number'>
                  {groupInfo.userinfos.length}/100
                </Text>
              </View>
              <View className='group-info__member-content'>
                {groupInfo.userinfos.map(item => (
                  <View className='group-info__member-content-item'>
                    <Image src={item.avatar} className='user-avatar' />
                    <View className='user-name'>{item.nickname}</View>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <View className='group-join'>
            <vant-button class='group-join__btn' type={isUserInGroup ? 'info' : 'primary'}>
              {isUserInGroup ? '进入' : '申请加入'}
            </vant-button>
          </View>
        </>
      )}
    </View>
  )
}

export default connect<GroupInfoStoreState>(state => {
  const rootState = state as Store.RootState
  return {
    currentUserId: rootState.user.info.id!,
  }
})(GroupInfo)
