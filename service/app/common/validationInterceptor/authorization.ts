/**
 * @description 用户授权验证
 */

export default function (...args: any[]) {
    // console.log('来了哦，用户验证哦', context)
    // context.res.body = 'wcnmdb'
    // console.log('authorization', context.res.end('wcnmdb'))

    // return {
    //     code: 1
    // }
    // return next(). 
    return function (context: any, next: (err?: any) => Promise<any>) {
        const authorization = context.request.header.Authorization
        context.res.end('wcnmdb')
    }
}

