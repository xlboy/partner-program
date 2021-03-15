import { Authorized, Get, JsonController, QueryParam, UseBefore } from 'routing-controllers'
import Environment from 'configs/environments'
import SessionsService from 'app/services/sessions.service'
import { Inject } from 'typedi'
import validationInterceptor from 'app/common/validationInterceptor'

@JsonController()
export class SessionsController {
  @Inject()
  sessionsService: SessionsService
  constructor() {}
  
  @Get('/sessions')
  @UseBefore(validationInterceptor('USER_AUTHORIZE'))
  async session(@QueryParam('username') username: string): Promise<any> {
    // console.log('SessionsService', this.sessionsService.create({
    //   username, token: ''
    // }))
    console.log('先走了这里哦,小逼崽子')
    return `hello on ${Environment.identity}.${username}`
  }
}
