/**
 * @description 用户授权验证
 */
import { verifUserJWT } from '../jwt'
import resultFormat from '../resultFormat'

export default function (...args: any[]) {
    return function (context: any, next: (err?: any) => Promise<any>): any {
        const authorization: string = context.request.header.authorization
        if (verifUserJWT(authorization)) {
            next()
        } else {
            context.res.statusCode = 403
            context.res.end(
                JSON.stringify(
                    resultFormat.error('TOKEN_OVERDUC', 'Token expired or does not exist')
                )
            )
        }
    }
}

