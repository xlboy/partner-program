export namespace Result {
    export enum Code {
        /* 正常 */
        SUCCESS = 200,
        /* 数据有误 */
        DATA_WRONG = 40001,
        /* 数据重复 */
        DATA_REPEAT = 40002,
    }
    export interface Format {
        code: Code;
        msg: string;
        data?: {
            [key: string]: any
        }
    }
}

export namespace Router {
    export enum ValidationType {
        /* 用户jwt授权 */
        USER_AUTHORIZE = 'USER_AUTHORIZE',
        /* 文件限制，只允许IMG */
        FILE_IMG = 'FILE_IMG',
        FILE_EXECL = 'FILE_EXECL',
    }
}
