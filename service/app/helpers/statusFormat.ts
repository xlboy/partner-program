/**
 * @description 返回数据的状态格式
 */

export enum StatusCode {
    // 正常
    SUCCESS = 0,
    // 数据有误
    DATA_WRONG = -1,
    // 数据重复
    DATA_REPEAT = -2,
}

interface StatusFormat {
    code: StatusCode;
    msg: string;
    data: any
}

function formatGenerate(): StatusFormat {
    return {
        code: StatusCode.SUCCESS,
        msg: '',
        data: null
    }
}

export default {
    success({ data = null, msg = 'ok' }) {
        const result = formatGenerate()
        result.data = data
        result.msg = msg
        return result
    },
    error({ msg = 'error', code }: { msg: string, code: StatusCode }) {
        const result = formatGenerate()
        result.msg = msg
        result.code = code
        return result
    }
}