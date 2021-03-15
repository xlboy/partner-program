import { Result } from 'app/@types/sys.type'
import resultFormat from 'app/common/resultFormat'
import Userinfo from 'app/entities/userinfo.entity'
import UserinfoService from 'app/services/userinfo.service'
import { Get, JsonController, QueryParam, QueryParams } from 'routing-controllers'
import { Inject } from 'typedi'

@JsonController()
export class UserinfoController {
  @Inject()
  userinfoService: UserinfoService
  constructor() { }

  @Get('/user/reg')
  async reg(@QueryParams() user: Userinfo): Promise<Result.Format> {
    return await this.userinfoService.create(user)
  }

  @Get('/user/login')
  async login(
    @QueryParam('username') username: string,
    @QueryParam('password') password: string
  ): Promise<Result.Format> {
    const findResult = await this.userinfoService.findUser({ username, password })

    if (findResult) {
      return resultFormat.success({
        data: {
          token: this.userinfoService.generateJWT(findResult),
          ...findResult
        }
      })
    }

    return resultFormat.error('VERIF_ERROR', '账号或密码有误')
  }
}
