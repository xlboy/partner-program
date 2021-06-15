import request from '@/utils/request';
import { APIFormat } from '../typings/public';
import { APIiUserinfoResult } from '../typings/user';

export const APIUserLogin = (username: string, password: string) =>
  request<APIFormat<APIiUserinfoResult>>({
    method: 'POST',
    url: '/user/login',
    data: { username, password }
  });
export const APIUserReg = (username: string, password: string, nickname: string) =>
  request<APIFormat<APIiUserinfoResult>>({
    method: 'POST',
    url: '/user/reg',
    data: { username, password, nickname }
  });

export const APIGetUserinfo = () =>
  request<APIFormat<APIiUserinfoResult>>({
    method: 'GET',
    url: '/user/getUserinfo'
  });
