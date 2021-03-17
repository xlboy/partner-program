
import resultFormat from 'app/helpers/resultFormat'
import { Get, JsonController, QueryParam, QueryParams, Req, UseBefore } from 'routing-controllers'
import { Inject } from 'typedi'
import PlanGroupService from '../services/planGroup.service';
import validationInterceptor from 'app/helpers/validationInterceptor';
import PlanGroup from 'app/entities/planGroup.entity'
import { Request } from 'koa';
import validateEntity from 'app/helpers/validateEntity';
import { Result } from 'app/@types/sys.type';
import { getUserinfoJWTFormat, verifUserJWT } from 'app/helpers/jwt';

@JsonController()
export class PlanGroupController {
  @Inject()
  planGroupService: PlanGroupService
  constructor() { }

  @Get('/plan-group/create')
  @UseBefore(validationInterceptor('USER_AUTHORIZE'))
  async create(
    @QueryParams() planGroup: PlanGroup,
    @Req() req: Request
  ): Promise<Result.Format> {
    try {
      await validateEntity(planGroup)
    } catch (error) {
      return resultFormat.error('DATA_WRONG', error)
    }

    try {
      const authorization = req.req.headers.authorization
      const { id: founderId } = getUserinfoJWTFormat(authorization)
      return await this.planGroupService.create(planGroup, founderId)
    } catch (error) {
      return resultFormat.error('TOKEN_SERVICE_ERROR', error)
    }
  }
}
