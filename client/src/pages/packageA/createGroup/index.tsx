import { FC, useState } from 'react'
import { View } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { AtButton, AtInput, AtTextarea } from 'taro-ui'
import { APICreatePlantGroup } from '@/apis/modules/plantGroup'

interface CreateGroupForm {
  introduce: string
  groupName: string
}

const CreateGroup: FC = () => {
  const [form, setForm] = useState<CreateGroupForm>({
    introduce: '',
    groupName: '',
  })

  return (
    <View className='index'>
      <AtInput
        name='groupName'
        title='组名'
        maxlength={15}
        type='text'
        value={form.groupName}
        onChange={onFormChange.bind(null, 'groupName')}
      />
      <AtTextarea
        value={form.introduce}
        onChange={onFormChange.bind(null, 'introduce')}
        maxLength={30}
        placeholder='群简介...'
      />
      <View className='at-row' style='margin-top: 20px;'>
        <AtButton type='primary' customStyle={{ width: '100%' }} onClick={onSubmitForm}>
          创建
        </AtButton>
      </View>
    </View>
  )

  async function onSubmitForm(): Promise<void> {
    await APICreatePlantGroup(form)
    Taro.atMessage({
      message: '创建成功',
      type: 'success',
    })
    Taro.navigateBack()
  }

  function onFormChange(key: keyof CreateGroupForm, val: string): void {
    setForm(state => ({ ...state, [key]: val }))
  }
}

export default CreateGroup
