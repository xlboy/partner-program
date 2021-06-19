export interface APIPlanGroup {
  id: number
  introduce: string
  groupName: string
  isNotify: boolean
  groupNum: number
  avatar: string
  userinfos: number[]
}
export interface APIUserPlanGroupList {
  myGroup: APIPlanGroup[]
  otherGroup: APIPlanGroup[]
}

export interface APISearchPlantGroup {
  isFindGroupNum: boolean
  result: APIPlanGroup[]
}
