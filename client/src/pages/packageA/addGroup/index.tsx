import React, { FC, useEffect, useMemo, useState } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import Taro, { login } from '@tarojs/taro'
import { AtDivider, AtListItem, AtSearchBar } from 'taro-ui'
import { APISearchPlantGroup } from '@/apis/modules/plantGroup'

const AddGroup: FC = () => {
  const [state, setState] = useState({
    searchVal: '',
    hasSearch: false,
    searchResult: [],
  })

  const isNotSearchResult = useMemo(
    () => state.hasSearch && state.searchResult.length === 0,
    [state.hasSearch, state.searchResult]
  )

  return (
    <View className='index'>
      <AtSearchBar
        maxLength={12}
        placeholder='组昵称/组号'
        value={state.searchVal}
        onChange={searchValChange.bind(null)}
        onActionClick={searchBtnClick}
      />
      <View className='search-result'>
        {isNotSearchResult && <AtDivider className='search-result__not' content='暂无搜索结果' />}
        {!isNotSearchResult &&
          state.searchResult.map(item => (
            <AtListItem
              title='标题文字'
              arrow='right'
              thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
            />
          ))}
      </View>
    </View>
  )

  function searchValChange(value: string): void {
    setState(state => ({ ...state, searchVal: value }))
  }

  async function searchBtnClick(): Promise<void> {
    const searchResult = await APISearchPlantGroup(state.searchVal)
    const { isFindGroupNum, result } = searchResult.data!
    if (isFindGroupNum) {
      console.log('直接搜到这个群号了，跳转到资料页')
    } else {
      if (result.length === 0) {
        setState(state => ({ ...state, hasSearch: true, searchResult: [] }))
      }
    }
  }
}

export default AddGroup
