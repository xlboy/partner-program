
import { Result } from 'app/@types/sys.type'
import resultFormat from 'app/helpers/resultFormat'
import validateEntity from 'app/helpers/validateEntity'
import Userinfo from 'app/entities/userinfo.entity'
import UserinfoService from 'app/services/userinfo.service'
import { Get, JsonController, QueryParam, QueryParams, Req, UseBefore } from 'routing-controllers'
import { Inject } from 'typedi'
import { generateUserJWT, getUserinfoJWTFormat } from 'app/helpers/jwt'
import { Request } from 'koa'
import validationInterceptor from 'app/helpers/validationInterceptor'
@JsonController()
export class UserinfoController {
  @Inject()
  userinfoService: UserinfoService
  constructor() { }

  @Get('/user/reg')
  async reg(@QueryParams() user: Userinfo): Promise<Result.Format> {
    try {
      await validateEntity(user)
    } catch (error) {
      return resultFormat.error('DATA_WRONG', error)
    }
    return await this.userinfoService.create(user)
  }

  @Get('/user/login')
  async login(
    @QueryParam('username') username: string,
    @QueryParam('password') password: string
  ): Promise<Result.Format> {
    const findResult = await this.userinfoService.findUser({ username, password })

    if (findResult) {
      const { username, id } = findResult
      const token = generateUserJWT({ username, id }, '2d');
      return resultFormat.success({
        data: {
          token,
          ...findResult
        }
      })
    }

    return resultFormat.error('VERIF_ERROR', '账号或密码有误')
  }

  @Get('/user/getUserinfo')
  @UseBefore(validationInterceptor('USER_AUTHORIZE'))
  async getUserinfo(@Req() req: Request,): Promise<Result.Format> {
    try {
      const authorization = req.req.headers.authorization
      const { id: founderId } = getUserinfoJWTFormat(authorization)
      const findResult = await this.userinfoService.findUserOne(founderId)
      console.log('findResult', findResult)
      return resultFormat.success({
        data: {
          ...findResult
        }
      })
    } catch (error) {
      return resultFormat.error('DATA_WRONG', error)
    }
  }
}
