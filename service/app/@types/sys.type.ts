import { ResultCode } from '../constants/resultFormat';
export namespace Result {
    export interface Format {
        code: ResultCode;
        msg: string;
        data?: {
            [key: string]: any
        }
    }
}

