
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

  @Get('/plan-group/getPlanGroupList')
  @UseBefore(validationInterceptor('USER_AUTHORIZE'))
  async getPlanGroupList(
    @Req() req: Request
  ): Promise<Result.Format> {
    let founderId: number

    try {
      const authorization = req.req.headers.authorization;
      ({ id: founderId } = getUserinfoJWTFormat(authorization));
    } catch (error) {
      return resultFormat.error('TOKEN_SERVICE_ERROR', error)
    }

    try {
      const planGroupList = await this.planGroupService.findUserGroupList(founderId)
      return resultFormat.success({ msg: 'ok', data: planGroupList })
    } catch (error) {
      return resultFormat.error('SERVICE_NOT_ERROR', error)
    }
  }
  
  @Get('/plan-group/addPlanGroup')
  @UseBefore(validationInterceptor('USER_AUTHORIZE'))
  async addPlanGroup(
    @QueryParam('groupNum') groupNum: number,
    @Req() req: Request
  ) {
    console.log('你添加个几把呢，草泥马小逼崽子噢')
  }
}
