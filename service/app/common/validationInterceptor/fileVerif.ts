/**
 * @description 文件上传验证
 */
import { Request, Response } from "koa"


export default function (context: any, next: (err?: any) => Promise<any>) {
    // console.log('来了哦，用户验证哦', context)
    // const authorization = context.request.header.authorization
    // console.log('authorization', request, response, next)
    return Promise.resolve({
        code: 0
    })
}