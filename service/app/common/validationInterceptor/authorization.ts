/**
 * @description 用户授权验证
 */
import { Result } from 'app/@types/sys.type'
import { secretOrPrivateKey } from 'app/constants/user'
import jwt from 'jsonwebtoken'
import statusFormat from '../statusFormat'

export default function (...args: any[]) {
    return function (context: any, next: (err?: any) => Promise<any>): any {
        const authorization: string = context.request.header.authorization
        try {
            // jwt.verif验证token，如过期或token存在问题，则会直接进入catch处理异常错误
            jwt.verify(authorization, secretOrPrivateKey)
            return next()
        } catch (error) {
            context.res.end(
                JSON.stringify(
                    statusFormat.error({
                        msg: 'token已过期或不存在',
                        code: Result.Code.TOKEN_OVERDUC
                    })
                )
            )
        }
    }
}

