/**
 * @description 用户授权验证
 */


export default function (context: any, next: (err?: any) => Promise<any>) {
    // console.log('来了哦，用户验证哦', context)
    // const authorization = context.request.header.authorization
    // context.res.body = 'wcnmdb'
    console.log('authorization', context.res.end('wcnmdb'))
    
    // return {
    //     code: 1
    // }
    // return next(). 
}

