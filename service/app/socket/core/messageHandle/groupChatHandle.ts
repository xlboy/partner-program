import ImPlanGroupMessageService from "app/services/imPlanGroupMessage.service";
import { MessageHandleParams } from ".";
import * as planGroupMembersRedis from 'app/redis/modules/planGroupMembers'
import { ContentType } from "app/constants/socket";
interface DataContent {
    groupId: number;
    message: string;
    statusCode: string;

}

export default async function (params: MessageHandleParams) {
    const { data, userWS, userinfo, onlineUsers } = params
    const content: DataContent = data.content
    const { groupId, message, statusCode } = content
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
                        message,
                        sender: {
                            ...userinfo,
                        },
                    }
                })
            })
            // 将信息存入数据库后，并转发至群内了，再将此消息的成功码返给前端
            userWS.send({
                contentType: ContentType.MSG_STATUS,
                content: {
                    statusCode,
                    result: true,
                    msg: '发送成功'
                }
            })
        }
    }
}