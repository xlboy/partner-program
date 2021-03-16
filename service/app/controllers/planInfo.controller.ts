
import { Result } from 'app/@types/sys.type'
import resultFormat from 'app/helpers/resultFormat'
import validateEntity from 'app/helpers/validateEntity'
import PlanInfo from 'app/entities/planInfo.entity'
import PlanInfoService from 'app/services/planInfo.service'
import { Get, JsonController, QueryParam, QueryParams, Req, UseBefore } from 'routing-controllers'
import { Inject } from 'typedi'
import validationInterceptor from 'app/helpers/validationInterceptor'
import { Request } from 'koa'
import { getUserinfoJWTFormat } from 'app/helpers/jwt'

@JsonController()
export class PlanInfoController {
  @Inject()
  planInfoService: PlanInfoService
  constructor() { }

  @Get('/plan-info/create')
  @UseBefore(validationInterceptor('USER_AUTHORIZE'))
  async create(
    @QueryParams() planInfo: PlanInfo,
    planGroupNum: number,
    @Req() req: Request
  ): Promise<Result.Format> {
    try {
      await validateEntity(planInfo)
    } catch (error) {
      return resultFormat.error('DATA_WRONG', error)
    }
    try {
      const authorization = req.req.headers.authorization
      const { id: founderId } = getUserinfoJWTFormat(authorization)
      return await this.planInfoService.create(planInfo, founderId, planGroupNum)
    } catch (error) {
      return resultFormat.error('TOKEN_SERVICE_ERROR', error)
    }
  }
}
