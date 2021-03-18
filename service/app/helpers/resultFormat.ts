/**
 * @description 返回数据的状态格式
 */

import { Result } from "app/@types/sys.type"
import { ResultCode } from "app/constants/resultFormat"

export default {
    success({ data = {}, msg = 'ok' }): Result.Format {
        return {
            code: ResultCode.SUCCESS,
            msg,
            data,
        }
    },
    error(
        codeType: keyof typeof ResultCode,
        _msg: string | Error = 'error'
    ): Result.Format {
        const msg = _msg instanceof Error ? _msg.message : _msg
        return {
            code: ResultCode[codeType],
            msg
        }
    }
}