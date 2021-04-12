import { redisClient } from ".."

/**
 * @description 最后一条消息の哈希格式如下↓
 */
type imPlanGroupMessageId = number
interface HashPlanGroupLastMessage {
    [planGroupId: string]: imPlanGroupMessageId;
}

const moduleKey = 'PlanGroupLastMessage-Key'

export async function update(
    planGroupId: number,
    imPlanGroupMessageId: number
) {
    redisClient.hset(moduleKey, String(planGroupId), String(imPlanGroupMessageId))
}