import { APIPlanGroup } from './planGroup'

export interface APIiUserinfoResult {
  id: number | null
  username: string
  nickname: string
  sex: boolean
  token: string
  age: null | number
  email: null | string
  avatar: string
}
