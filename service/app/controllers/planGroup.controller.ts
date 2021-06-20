import resultFormat from "app/helpers/resultFormat";
import {
  Body,
  Get,
  HeaderParam,
  JsonController,
  Post,
  QueryParam,
  Req,
  UseBefore,
} from "routing-controllers";
import { Inject } from "typedi";
import PlanGroupService from "../services/planGroup.service";
import validationInterceptor from "app/helpers/validationInterceptor";
import PlanGroup from "app/entities/planGroup.entity";
import { Request } from "koa";
import validateEntity from "app/helpers/validateEntity";
import { Result } from "app/@types/sys.type";
import { getUserinfoJWTFormat, verifUserJWT } from "app/helpers/jwt";

@JsonController()
export class PlanGroupController {
  @Inject()
  planGroupService: PlanGroupService;
  constructor() {}

  @Post("/plan-group/create")
  @UseBefore(validationInterceptor("USER_AUTHORIZE"))
  async create(
    @Body() planGroup: PlanGroup,
    @HeaderParam("authorization") authorization: string
  ): Promise<Result.Format> {
    try {
      await validateEntity(planGroup);
    } catch (error) {
      return resultFormat.error("DATA_WRONG", error);
    }

    try {
      const { id: founderId } = getUserinfoJWTFormat(authorization);
      return await this.planGroupService.create(planGroup, founderId);
    } catch (error) {
      return resultFormat.error("TOKEN_SERVICE_ERROR", error);
    }
  }

  @Get("/plan-group/getPlanGroupList")
  @UseBefore(validationInterceptor("USER_AUTHORIZE"))
  async getPlanGroupList(
    @HeaderParam("authorization") authorization: string
  ): Promise<Result.Format> {
    let founderId: number;

    try {
      ({ id: founderId } = getUserinfoJWTFormat(authorization));
    } catch (error) {
      return resultFormat.error("TOKEN_SERVICE_ERROR", error);
    }

    try {
      const planGroupList = await this.planGroupService.findUserGroupList(
        founderId
      );
      return resultFormat.success({ msg: "ok", data: planGroupList });
    } catch (error) {
      return resultFormat.error("SERVICE_NOT_ERROR", error);
    }
  }

  @Get("/plan-group/addPlanGroup")
  @UseBefore(validationInterceptor("USER_AUTHORIZE"))
  async addPlanGroup(
    @QueryParam("groupNum") groupNum: number,
    @Req() req: Request
  ) {}

  @Get("/plan-group/searchPlantGroup")
  @UseBefore(validationInterceptor("USER_AUTHORIZE"))
  async searchPlantGroup(@QueryParam("searchVal") searchVal: string) {
    const isAllNumber = /^\d+$/.test(searchVal);
    let findResult = {
      isFindGroupNum: false,
      result: [],
    };

    const findGroupNameKeys = async () => {
      const findGroupNameResult = await this.planGroupService.findPlantGroupName(
        searchVal
      );
      findResult.result = findGroupNameResult;
    };

    // 如若内容全为数字，则查群号。查不到群号就查昵称
    if (isAllNumber) {
      const findGroupNumResult = await this.planGroupService.findGroupNum(
        +searchVal
      );
      if (findGroupNumResult) {
        findResult.isFindGroupNum = true;
        findResult.result = [findGroupNumResult];
      } else await findGroupNameKeys();
    } else await findGroupNameKeys();

    return resultFormat.success({ msg: "ok", data: findResult });
  }

  @Get("/plan-group/findPlantGroupId")
  @UseBefore(validationInterceptor("USER_AUTHORIZE"))
  async getPlantGroupId(@QueryParam("id") id: string) {
    return resultFormat.success({
      msg: "ok",
      data: await this.planGroupService.findGroupId(+id),
    });
  }
}
