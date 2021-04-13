import { redisClient } from ".."

/**
 * @description 用户已读消息の哈希格式如下↓
 * type imPlanGroupMessageId = number
 * [userId: string]: {
 *  [planGroupId: string]: imPlanGroupMessageId;
 * }
 */
const moduleKey = 'UserHasReadMessage-Key'

export async function update(
    userId: number,
    planGroupId: number,
    imPlanGroupMessageId: number
) {
    redisClient.hexists(moduleKey, String(userId), (err, isExists) => {
        if (err) throw err
        if (!isExists) {
            redisClient.hset(moduleKey, String(userId), JSON.stringify({ [planGroupId]: imPlanGroupMessageId }))
        } else {
            redisClient.hget(moduleKey, String(userId), (err, value) => {
                if (err) throw err
                try {
                    const userReadMessage = JSON.parse(value)
                    userReadMessage[planGroupId] = imPlanGroupMessageId
                    redisClient.hset(moduleKey, String(userId), JSON.stringify(userReadMessage))
                } catch (error) {
                    throw error
                }
            })
        }
    })
}