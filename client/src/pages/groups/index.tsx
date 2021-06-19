import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { useRef, useState } from 'react'
import { AtListItem, AtTabs, AtTabsPane } from 'taro-ui'
import { TabItem } from 'taro-ui/types/tabs'
import { connect } from 'react-redux'
import { APIPlanGroup } from '@/apis/typings/planGroup'
import getAppConfig from '@/utils/getAppConfig'

interface GroupsStoreProps {
  userGroup: Store.RootState['user']['group']
}

const Groups: React.FC<GroupsStoreProps> = props => {
  const { userGroup } = props
  const [currentTab, setCurrentTab] = useState<number>(0)
  const tabList = useRef<(TabItem & { plantGroupKey: keyof typeof userGroup })[]>([
    { title: '我管理的', plantGroupKey: 'my' },
    { title: '我加入的', plantGroupKey: 'other' },
  ])

  return (
    <View className='index'>
      <AtTabs current={currentTab} tabList={tabList.current} onClick={index => switchTab(index)}>
        {tabList.current.map((tab, index) => {
          return (
            <AtTabsPane current={currentTab} index={index}>
              {userGroup[tab.plantGroupKey].map(info => (
                <AtListItem
                  title={info.groupName}
                  thumb={info.avatar}
                  onClick={() => toGroupInfoPage(info)}
                />
              ))}
              {userGroup[tab.plantGroupKey].length === 0 && (
                <vant-empty image='search' description='快去添加小组吧！' />
              )}
            </AtTabsPane>
          )
        })}
      </AtTabs>
    </View>
  )

  function toGroupInfoPage(groupInfo: APIPlanGroup): void {
    Taro.navigateTo({ url: `${getAppConfig().AllPage.GroupInfo}?id=${groupInfo.id}` })
  }

  function switchTab(index: number): void {
    setCurrentTab(index)
  }
}

export default connect<GroupsStoreProps>(state => {
  const rootState = state as Store.RootState
  return {
    userGroup: rootState.user.group,
  }
})(Groups)
