import { APIiUserinfoResult } from "./user";

export interface APIPlanGroup {
  id: number
  introduce: string
  groupName: string
  isNotify: boolean
  groupNum: number
  avatar: string
  userinfos: APIiUserinfoResult[]
}
export interface APIUserPlanGroupList {
  myGroup: APIPlanGroup[]
  otherGroup: APIPlanGroup[]
}

export interface APISearchPlantGroup {
  isFindGroupNum: boolean
  result: APIPlanGroup[]
}
