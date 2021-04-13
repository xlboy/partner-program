import ImPlanGroupMessageService from "app/services/imPlanGroupMessage.service";
import { MessageHandleParams } from ".";
import * as planGroupMembersRedis from 'app/redis/modules/planGroupMembers'
import { ContentType } from "app/constants/socket";
interface DataContent {
    groupId: number
}

export default async function (params: MessageHandleParams) {
    const { data, userWS, userinfo, onlineUsers } = params
    const content: DataContent = data.content
    const { groupId } = content
    const imPlanGroupMessageService = new ImPlanGroupMessageService()
    const createResult = await imPlanGroupMessageService.create(userinfo.id, groupId, data)

    if (createResult) {
        const planGroupMembers = await planGroupMembersRedis.get(groupId)
        if (!planGroupMembers || planGroupMembers.length === 0) {
            planGroupMembers.forEach(memberId => {
                onlineUsers[memberId].ws.send({
                    contentType: ContentType.GROUP_CHAT,
                    content: {
                        groupId,
                        sender: {
                            ...userinfo,
                        },
                    }
                })
            })
        }
    }
}