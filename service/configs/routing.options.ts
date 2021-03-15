import { RoutingControllersOptions } from 'routing-controllers'
import * as middlewares from './routing.middlewares'
import * as interceptors from './interceptors'
import authorizationChecker from './authorizationChecker'
import { dictToArray } from './utils'
import path from 'path'

const controllersPath = path.resolve(__dirname, '../') + '/app/controllers/*.controller.{ts,js}'


export const routingConfigs: RoutingControllersOptions = {
  // controllers: dictToArray(controllers),
  controllers: [controllersPath],
  // middlewares: dictToArray(middlewares),

  // interceptors: dictToArray(interceptors), // 全局拦截器

  // router prefix
  // e.g. api => http://hostname:port/{routePrefix}/{controller.method}
  routePrefix: '/api',

  // auto validate entity item
  // learn more: https://github.com/typestack/class-validator
  validation: false,

  // 权限管理
  // authorizationChecker
}
