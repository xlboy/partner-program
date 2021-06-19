import { FC, useMemo, useState } from 'react'
import { Image, Text, View } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { AtSearchBar, AtTag } from 'taro-ui'
import { APISearchPlantGroup } from '@/apis/modules/plantGroup'
import { APIPlanGroup } from '@/apis/typings/planGroup'
import { connect } from 'react-redux'
interface AddGroupState {
  searchVal: string
  hasSearch: boolean
  searchResult: APIPlanGroup[]
}
type GroupItem = Pick<APIPlanGroup, 'avatar' | 'userinfos' | 'groupName' | 'introduce'>
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
        placeholder='组昵称/组号'
        value={state.searchVal}
        onChange={searchValChange.bind(null)}
        onActionClick={searchBtnClick}
      />
      <View className='search-result'>
        {isNotSearchResult && <vant-empty image='search' description='没有搜索到您想要的...' />}
        {!isNotSearchResult && state.searchResult.map(item => <GroupItem {...item} />)}
      </View>
    </View>
  )

  function GroupItem(props: GroupItem): JSX.Element {
    const { avatar, groupName, introduce, userinfos } = props

    const applyToJoin = () => {}

    return (
      <>
        <View className='group-item'>
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
          <View>
            <AtTag active onClick={applyToJoin}>
              {userinfos.includes(currentUserId) && '进入'}
              {!userinfos.includes(currentUserId) && '申请'}
            </AtTag>
          </View>
        </View>
      </>
    )
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
