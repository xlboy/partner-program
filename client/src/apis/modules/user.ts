import request from '@/utils/request';
import { ApiFormat } from '../typings/public';
import { ApiUserinfoResult, APIUserPlanGroupList } from '../typings/user';

export const ApiUserLogin = (username: string, password: string) =>
  request<ApiFormat<ApiUserinfoResult>>({
    method: 'GET',
    url: '/user/login',
    data: { username, password }
  });
export const ApiUserReg = (username: string, password: string, nickname: string) =>
  request<ApiFormat<ApiUserinfoResult>>({
    method: 'GET',
    url: '/user/reg',
    data: { username, password, nickname }
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