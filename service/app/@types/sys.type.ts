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

