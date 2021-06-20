import { FC, useMemo, useState } from 'react'
import { Image, ITouchEvent, Text, View } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { AtSearchBar, AtTag } from 'taro-ui'
import { APISearchPlantGroup } from '@/apis/modules/plantGroup'
import { APIPlanGroup } from '@/apis/typings/planGroup'
import { connect } from 'react-redux'
import getAppConfig from '@/utils/getAppConfig'
interface AddGroupState {
  searchVal: string
  hasSearch: boolean
  searchResult: APIPlanGroup[]
}
interface AddGroupStoreProps {
  currentUserId: number
}

const AddGroup: FC<AddGroupStoreProps> = props => {
  const { currentUserId } = props
  const [state, setState] = useState<AddGroupState>({
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
        placeholder='小组昵称/小组号'
        value={state.searchVal}
        onChange={searchValChange.bind(null)}
        onActionClick={searchBtnClick}
      />
      <View className='search-result'>
        {isNotSearchResult ? (
          <vant-empty image='search' description='没有搜索到您想要的...' />
        ) : (
          state.searchResult.map(item => <GroupItem {...item} />)
        )}
      </View>
    </View>
  )

  function GroupItem(props: APIPlanGroup): JSX.Element {
    const { avatar, groupName, introduce, userinfos } = props
    const isUserInGroup = useMemo(
      () => userinfos.some(({ id }) => id === currentUserId),
      [currentUserId]
    )
    return (
      <>
        <View className='group-item' onClick={() => toGroupInfoPage(props)}>
          <Image src={avatar} className='group-item__avatar' />
          <View className='group-item__info'>
            <View className='title'>
              {groupName}
              <AtTag size='small' customStyle={{ marginLeft: '5px' }}>
                {userinfos.length}/100
              </AtTag>
            </View>
            <Text className='introduce'>{introduce}</Text>
          </View>
          <View onClick={applyToJoin}>
            <AtTag active>{isUserInGroup ? '进入' : '申请'}</AtTag>
          </View>
        </View>
      </>
    )
  }

  function applyToJoin(ev: ITouchEvent): void {
    ev.stopPropagation()
  }

  function toGroupInfoPage(groupInfo: APIPlanGroup): void {
    Taro.navigateTo({ url: `${getAppConfig().AllPage.GroupInfo}?id=${groupInfo.id}` })
  }
  function searchValChange(value: string): void {
    setState(state => ({ ...state, searchVal: value }))
  }

  async function searchBtnClick(): Promise<void> {
    const searchResult = await APISearchPlantGroup(state.searchVal)
    const { isFindGroupNum, result } = searchResult.data!
    if (isFindGroupNum) {
      console.log('直接搜到这个群号了，跳转到资料页')
    } else {
      setState(state => ({
        ...state,
        hasSearch: result.length === 0,
        searchResult: result,
      }))
    }
  }
}

export default connect<AddGroupStoreProps>(state => {
  const rootState = state as Store.RootState
  return {
    currentUserId: rootState.user.info.id!,
  }
})(AddGroup)
