export enum ResultCode {
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
    VERIF_ERROR = 40005,
    /**
     * token过期或不存在
     */
    TOKEN_OVERDUC = 40003,
    /**
     * 服务器内部处理TOKEN有误…
     */
    TOKEN_SERVICE_ERROR = 50003,
    /**
     * 内部未知错误…
     */
    SERVICE_NOT_ERROR = 50000
}
