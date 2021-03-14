export namespace Result {
    export enum Code {
        /**
         * 正常
         */
        SUCCESS = 200,
        /**
         * 数据有误
         */
        DATA_WRONG = 40001,
        /**
         * 数据重复
         */
        DATA_REPEAT = 40002,
        /**
         * 验证有误
         */
        VERIF_ERROR = 40003,
        /**
         * token过期或不存在
         */
        TOKEN_OVERDUC = 40004,

    }
    export interface Format {
        code: Code;
        msg: string;
        data?: {
            [key: string]: any
        }
    }
}

