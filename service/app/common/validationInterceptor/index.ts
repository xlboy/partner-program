import authorization from './authorization'
import fileVerif from './fileVerif'

enum ValidationType {
    /* 用户jwt授权 */
    USER_AUTHORIZE = 'USER_AUTHORIZE',
    /* 文件限制，只允许IMG */
    FILE_IMG = 'FILE_IMG',
    FILE_EXECL = 'FILE_EXECL',
}


type ValidationTypeObj = {
    [key in ValidationType]: (...args: any[]) => (context: any, next: (err?: any) => Promise<any>) => any;
};

const validationType: ValidationTypeObj = {
    [ValidationType.USER_AUTHORIZE]: authorization,
    [ValidationType.FILE_IMG]: fileVerif,
    [ValidationType.FILE_EXECL]: fileVerif
}


export default function (type: keyof typeof ValidationType, ...args: any[]) {
    return validationType[type](...args)
}