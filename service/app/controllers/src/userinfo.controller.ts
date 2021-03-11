import Userinfo from 'app/entities/userinfo.entity'
import { UserinfoService } from 'app/services'
import { Get, JsonController, QueryParam } from 'routing-controllers'
import { Inject } from 'typedi'

@JsonController()
export class UserinfoController {
  @Inject()
  userinfoService: UserinfoService
  constructor() {}

  @Get('/user/reg')
  async reg(): Promise<any> {
    console.log('来注册啦')
    const userinfo = new Userinfo()
    userinfo.username = '111'
    const result = await this.userinfoService.create(userinfo)
    return result
  }
}
