import { Get, JsonController, QueryParam } from 'routing-controllers'
import Environment from 'configs/environments'
import { SessionsService } from 'app/services/src/sessions.service'
import { Inject } from 'typedi'

@JsonController()
export class SessionsController {
  @Inject()
  sessionsService: SessionsService
  constructor() {}

  @Get('/sessions')
  async session(@QueryParam('username') username: string): Promise<any> {
    // console.log('SessionsService', this.sessionsService.create({
    //   username, token: ''
    // }))
    return `hello on ${Environment.identity}.${username}`
  }
}
