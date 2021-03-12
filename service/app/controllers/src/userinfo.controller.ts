import Userinfo from 'app/entities/userinfo.entity'
import statusFormat from 'app/helpers/statusFormat'
import { UserinfoService } from 'app/services'
import { Get, JsonController, QueryParams } from 'routing-controllers'
import { Inject } from 'typedi'

@JsonController()
export class UserinfoController {
  @Inject()
  userinfoService: UserinfoService
  constructor() { }

  @Get('/user/reg')
  async reg(@QueryParams() user: Userinfo): Promise<any> {
    const result = await this.userinfoService.create(user)
    return result
  }
}
