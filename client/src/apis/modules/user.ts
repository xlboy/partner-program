import request from '@/utils/request';
import { ApiFormat } from '../types/public';
import { ApiUserinfoResult, APIUserPlanGroupList } from '../types/user';

export const ApiUserLogin = (username: string, password: string) =>
  request<ApiFormat<ApiUserinfoResult>>({
    method: 'GET',
    url: '/user/login',
    data: { username, password }
  });


export const ApiGetUserinfo = () =>
  request<ApiFormat<ApiUserinfoResult>>({
    method: 'GET',
    url: '/user/getUserinfo'
  });


export const ApiGetUserPlanGroupList = () =>
  request<ApiFormat<APIUserPlanGroupList>>({
    method: 'GET',
    url: '/plan-group/getPlanGroupList'
  });