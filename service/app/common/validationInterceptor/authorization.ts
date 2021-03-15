/**
 * @description 用户授权验证
 */
import { UserPrivateKey } from 'app/constants/user'
import jwt from 'jsonwebtoken'
import resultFormat from '../resultFormat'

export default function (...args: any[]) {
    return function (context: any, next: (err?: any) => Promise<any>): any {
        const authorization: string = context.request.header.authorization
        try {
            // jwt.verif验证token，如过期或token存在问题，则会直接进入catch处理异常错误
            jwt.verify(authorization, UserPrivateKey)
            return next()
        } catch (error) {
            context.res.statusCode = 403
            context.res.end(
                JSON.stringify(
                    resultFormat.error('TOKEN_OVERDUC', 'Token expired or does not exist')
                )
            )
        }
    }
}

