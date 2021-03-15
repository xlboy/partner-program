import { Result } from 'app/@types/sys.type'
import resultFormat from 'app/common/resultFormat'
import { Get, JsonController, QueryParam, QueryParams, Req, UseBefore } from 'routing-controllers'
import { Inject } from 'typedi'
import PlanGroupService from '../services/planGroup.service';
import validationInterceptor from 'app/common/validationInterceptor';
import PlanGroup from 'app/entities/planGroup.entity'
import { Request } from 'koa';
import UserinfoService from 'app/services/userinfo.service';
import { UserPrivateKey } from 'app/constants/user'
import jwt from 'jsonwebtoken'
import validateEntity from 'app/common/validateEntity';

@JsonController()
export class PlanGroupController {
  @Inject()
  planGroupService: PlanGroupService
  @Inject()
  userinfoService: UserinfoService
  constructor() { }

  @Get('/plan-group/create')
  @UseBefore(validationInterceptor('USER_AUTHORIZE'))
  async create(
    @QueryParams() planGroup: PlanGroup,// Pick<PlanGroup, 'groupName' | 'introduce'>,
    @Req() req: Request
  ): Promise<Result.Format> {
    try {
      await validateEntity(planGroup)
    } catch (error) {
      return resultFormat.error('DATA_WRONG', error)
    }

    try {
      const founderId = (() => {
        const authorization = req.req.headers.authorization
        const userJWT = jwt.verify(authorization, UserPrivateKey)
        return userJWT.id
      })();
      return await this.planGroupService.create(planGroup, founderId)
    } catch (error) {
      return resultFormat.error('TOKEN_SERVICE_ERROR', error)
    }

  }
}
