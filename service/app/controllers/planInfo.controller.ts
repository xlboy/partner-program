
import { Result } from 'app/@types/sys.type'
import resultFormat from 'app/common/resultFormat'
import validateEntity from 'app/common/validateEntity'
import PlanInfo from 'app/entities/planInfo.entity'
import PlanInfoService from 'app/services/planInfo.service'
import { Get, JsonController, QueryParam, QueryParams } from 'routing-controllers'
import { Inject } from 'typedi'

@JsonController()
export class PlanInfoController {
  @Inject()
  planInfoService: PlanInfoService
  constructor() { }

  @Get('/plan-info/create')
  async create(
    @QueryParams() planInfo: PlanInfo
  ): Promise<Result.Format> {
    try {
      await validateEntity(planInfo)
    } catch (error) {
      return resultFormat.error('DATA_WRONG', error)
    }
    return await this.planInfoService.create(planInfo)
  }
}
