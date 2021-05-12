import PlanGroup from "app/entities/planGroup.entity"
import { redisClient } from ".."

/**
 * @description 计划组信息の哈希格式如下↓
 * [planGroupId: string]: string[];
 */

const moduleKey = 'PlanGroupMembers-Key'

export function update(
    planGroupId: number,
    planGroupInfo: PlanGroup[]
) {
    redisClient.hset(moduleKey, String(planGroupId), JSON.stringify(planGroupInfo))
}


/**
 * 
 * @param planGroupId 计划组ID
 * @returns 此计划组的信息
 */
export function get(planGroupId: number): Promise<PlanGroup | false> {
    return new Promise(r => {
        redisClient.hget(moduleKey, String(planGroupId), (err, value) => {
            if (err) throw err
            try {
                r(value ? JSON.parse(value) : false)
            } catch (error) {
                r(false)
            }
        })
    })
}