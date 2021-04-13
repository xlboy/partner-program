import { redisClient } from ".."

/**
 * @description 计划组成员の哈希格式如下↓
 * [planGroupId: string]: string[];
 */

const moduleKey = 'PlanGroupMembers-Key'

export function update(
    planGroupId: number,
    planGroupMembers: number[]
) {
    redisClient.hset(moduleKey, String(planGroupId), JSON.stringify(planGroupMembers))
}


export function get(planGroupId: number): Promise<number[]> {
    return new Promise(r => {
        redisClient.hget(moduleKey, String(planGroupId), (err, value) => {
            if (err) throw err
            try {
                r(value ? JSON.parse(value) : [])
            } catch (error) {
                r([])
            }
        })
    })
}