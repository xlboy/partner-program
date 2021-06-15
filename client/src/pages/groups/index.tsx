import { APIGetUserPlanGroupList } from '@/apis/modules/plantGroup'
import { APIPlanGroup } from '@/apis/typings/planGroup'
import { APIUserPlanGroupList } from '@/apis/typings/planGroup'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { useEffect, useRef, useState } from 'react'
import { AtIndexes, AtTabs, AtTabsPane } from 'taro-ui'
import { ListItem } from 'taro-ui/types/indexes'
import { TabItem } from 'taro-ui/types/tabs'
import C2Pin from 'c2pin'


const Groups: React.FC = () => {
  const [userPlantGroup, setUserPlantGroup] = useState<APIUserPlanGroupList | null>(null)
  const [currentTab, setCurrentTab] = useState<number>(0)
  const tabList = useRef<(TabItem & { plantGroupKey: keyof APIUserPlanGroupList })[]>([
    { title: '我管理的', plantGroupKey: 'myGroup' },
    { title: '我加入的', plantGroupKey: 'otherGroup' },
  ])

  useEffect(() => {
    APIGetUserPlanGroupList().then(res => {
      setUserPlantGroup(res.data!)
      convertPlantGroup(res.data!.myGroup)
      function convertPlantGroup(plantGroupList: APIPlanGroup[]): ListItem[] {
        plantGroupList.forEach(item => {
          console.log('C2Pin', C2Pin.firstChar(item.groupName))
        })
      }
    })
  }, [])

  return (
    <View className='index'>
      <AtTabs current={currentTab} tabList={tabList.current} onClick={index => switchTab(index)}>
        {tabList.current.map((tab, index) => {
          return (
            <AtTabsPane current={currentTab} index={index}>
              <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>
                {userPlantGroup && <AtIndexes list={userPlantGroup[tab.plantGroupKey]} />}
              </View>
            </AtTabsPane>
          )
        })}
      </AtTabs>
      {/*  */}
    </View>
  )

  function switchTab(index: number): void {
    setCurrentTab(index)
  }
}

export default Groups
