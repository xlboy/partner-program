import { ResultCode } from 'app/constants/resultFormat';
import { UserinfoJWTFormat, verifUserJWT } from '../../helpers/jwt';


/**
 * 
 * @param url ws的url地址
 * @description 验证用户token
 */
export default function (url: string): UserinfoJWTFormat | number {
    try {
        const token: string = (() => {
            const prefix = 'token='
            const startIndex = url.indexOf(prefix)
            if (startIndex !== -1) {
                return url.substr(startIndex + prefix.length)
            }
            throw ResultCode.DATA_WRONG
        })()
        const verifResult = verifUserJWT(token)
        if (verifResult) {
            return verifResult
        } else {
            throw ResultCode.TOKEN_OVERDUC
        }
    } catch (error) {
        return error as number
    }
}