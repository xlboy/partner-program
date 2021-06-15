import { Result } from "app/@types/sys.type";
import resultFormat from "app/helpers/resultFormat";
import validateEntity from "app/helpers/validateEntity";
import Userinfo from "app/entities/userinfo.entity";
import UserinfoService from "app/services/userinfo.service";
import {
  Body,
  BodyParam,
  Get,
  HeaderParam,
  JsonController,
  Post,
  QueryParam,
  QueryParams,
  Req,
  UseBefore,
} from "routing-controllers";
import { Inject } from "typedi";
import { generateUserJWT, getUserinfoJWTFormat } from "app/helpers/jwt";
import { Request } from "koa";
import validationInterceptor from "app/helpers/validationInterceptor";
@JsonController()
export class UserinfoController {
  @Inject()
  userinfoService: UserinfoService;
  constructor() {}

  @Post("/user/reg")
  async reg(@Body() user: Userinfo): Promise<Result.Format> {
    try {
      await validateEntity(user);
    } catch (error) {
      return resultFormat.error("DATA_WRONG", error);
    }
    return await this.userinfoService.create(user);
  }

  @Post("/user/login")
  async login(
    @BodyParam("username") username: string,
    @BodyParam("password") password: string
  ): Promise<Result.Format> {
    const findResult = await this.userinfoService.findUser({
      username,
      password,
    });

    if (findResult) {
      const { username, id } = findResult;
      const token = generateUserJWT({ username, id }, "2d");
      return resultFormat.success({
        data: {
          token,
          ...findResult,
        },
      });
    }

    return resultFormat.error("VERIF_ERROR", "账号或密码有误");
  }

  @Get("/user/getUserinfo")
  @UseBefore(validationInterceptor("USER_AUTHORIZE"))
  async getUserinfo(@HeaderParam("authorization") authorization: string): Promise<Result.Format> {
    try {
      const { id: founderId } = getUserinfoJWTFormat(authorization);
      const findResult = await this.userinfoService.findUserOne(founderId);

      return resultFormat.success({
        data: {
          ...findResult,
        },
      });
    } catch (error) {
      return resultFormat.error("DATA_WRONG", error);
    }
  }
}
