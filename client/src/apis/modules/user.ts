import request from '@/utils/request';
import { ApiFormat } from '../types/public';
import { ApiUserLoginResult } from '../types/user';

export const ApiUserLogin = (username: string, password: string) =>
  request<ApiFormat<ApiUserLoginResult>>({
    method: 'GET',
    url: '/user/login',
    data: { username, password }
  });
