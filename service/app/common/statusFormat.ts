/**
 * @description 返回数据的状态格式
 */

import { Result } from "app/@types/sys.type"

function formatGenerate(): Result.Format {
    return {
        code: Result.Code.SUCCESS,
        msg: ''
    }
}

export default {
    success({ data = {}, msg = 'ok' }): Result.Format {
        const result = formatGenerate()
        result.data = data
        result.msg = msg
        return result
    },
    error({ msg = 'error', code }: { msg: string, code: Result.Code }): Result.Format {
        const result = formatGenerate()
        result.msg = msg
        result.code = code
        return result
    }
}