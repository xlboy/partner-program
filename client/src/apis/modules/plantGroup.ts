import request from '@/utils/request'
import { APIUserPlanGroupList } from '../typings/planGroup'
import { APIFormat } from '../typings/public'

export const APIGetUserPlanGroupList = () =>
  request<APIFormat<APIUserPlanGroupList>>({
    method: 'GET',
    url: '/plan-group/getPlanGroupList',
  })

export const APISearchPlantGroup = (searchVal: string) =>
  request<APIFormat<APIUserPlanGroupList>>({
    method: 'GET',
    data: { searchVal },
    url: '/plan-group/searchPlantGroup',
  })
