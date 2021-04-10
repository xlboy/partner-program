import { ResultCode } from 'app/constants/resultFormat';
import { UserinfoJWTFormat, verifUserJWT } from '../../helpers/jwt';


/**
 * 
 * @param url ws的url地址
 * @description 验证用户token
 */

enum TokenErrorCode {
    /**
     * token错误，未填写/有误
     */
    TOKEN_ERROR = 3001,
    /**
     * token过期，过期期
     */
    TOKEN_OVERDUE = 3003
}

export default function (url: string): UserinfoJWTFormat | number {
    try {
        const token: string = (() => {
            const prefix = 'token='
            const startIndex = url.indexOf(prefix)
            if (startIndex !== -1) {
                return url.substr(startIndex + prefix.length)
            }
            throw TokenErrorCode.TOKEN_ERROR
        })()
        const verifResult = verifUserJWT(token)
        if (verifResult) {
            return verifResult
        } else {
            throw TokenErrorCode.TOKEN_OVERDUE
        }
    } catch (error) {
        return error as number
    }
}