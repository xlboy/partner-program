
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
import PlanGroupService from 'app/services/planGroup.service'

@JsonController()
export class PlanInfoController {
  @Inject()
  planInfoService: PlanInfoService

  @Inject()
  planGroupService: PlanGroupService
  constructor() { }

  @Get('/plan-info/create')
  @UseBefore(validationInterceptor('USER_AUTHORIZE'))
  async create(
    @QueryParams() params: { planGroupNum: number } & PlanInfo,
    @Req() req: Request,
  ): Promise<Result.Format> {
    const { planGroupNum, ...planInfo } = params
    let planGroupId: number

    try {
      await validateEntity(planInfo)
      if (!planGroupNum) {
        throw "请传递计划组号"
      }
      planGroupId = await (async () => {
        const findGroupResult = await this.planGroupService.findGroupNum(planGroupNum)
        if (findGroupResult) {
          return findGroupResult.id
        } else {
          throw "计划组号不存在"
        }
      })();

    } catch (error) {
      return resultFormat.error('DATA_WRONG', error)
    }

    try {
      const authorization = req.req.headers.authorization
      const { id: founderId } = getUserinfoJWTFormat(authorization)
      return await this.planInfoService.create(planInfo, founderId, planGroupId)
    } catch (error) {
      return resultFormat.error('TOKEN_SERVICE_ERROR', error)
    }
  }
}
