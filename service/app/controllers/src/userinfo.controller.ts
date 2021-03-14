import { Result } from 'app/@types/sys.type'
import statusFormat from 'app/common/statusFormat'
import Userinfo from 'app/entities/userinfo.entity'
import { UserinfoService } from 'app/services'
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
      return statusFormat.success({
        msg: '登陆成功',
        data: {
          token: this.userinfoService.generateJWT(findResult),
          ...findResult
        }
      })
    }

    return statusFormat.error({
      code: Result.Code.VERIF_ERROR,
      msg: '账号或密码有误'
    })
  }
}
