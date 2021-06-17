import request from '@/utils/request'
import { APIUserPlanGroupList } from '../typings/planGroup'
import { APIFormat } from '../typings/public'
import { APISearchPlantGroup as IAPISearchPlantGroup } from '../typings/planGroup'
export const APIGetUserPlanGroupList = () =>
  request<APIFormat<APIUserPlanGroupList>>({
    method: 'GET',
    url: '/plan-group/getPlanGroupList',
  })

export const APISearchPlantGroup = (searchVal: string) =>
  request<APIFormat<IAPISearchPlantGroup>>({
    method: 'GET',
    data: { searchVal },
    url: '/plan-group/searchPlantGroup',
  })

export const APICreatePlantGroup = (params: { introduce: string; groupName: string }) =>
  request<APIFormat<IAPISearchPlantGroup>>({
    method: 'POST',
    data: params,
    url: '/plan-group/create',
  })
