/**
 * @description 验证数据的一个函数
 */
import { validate } from 'class-validator'

export default function (entity: object) {
    return new Promise<void | string>((resolve, reject) => {
        validate(entity).then(errors => {
            if (errors.length > 0) {
                const [[, errorInfo]] = Object.entries(errors[0].constraints)
                reject(errorInfo)
            } else {
                resolve()
            }
        })
    })
}