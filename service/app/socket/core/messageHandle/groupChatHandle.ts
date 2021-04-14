import ImPlanGroupMessageService from "app/services/imPlanGroupMessage.service";
import { MessageHandleParams } from ".";
import * as planGroupMembersRedis from 'app/redis/modules/planGroupMembers'
import { SocketContentType } from "app/constants/socket";
import socketUtils from "app/helpers/socket/socketUtils";
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
            // 将信息存入数据库后，再将此消息的成功码返给前端
            socketUtils.send(userWS, {
                contentType: SocketContentType.MSG_STATUS,
                content: {
                    statusCode,
                    result: true,
                    msg: '发送成功'
                }
            })
            planGroupMembers.forEach(memberId => {
                socketUtils.send(onlineUsers[memberId].ws, {
                    contentType: SocketContentType.GROUP_CHAT,
                    content: {
                        groupId,
                        message,
                        sender: {
                            ...userinfo,
                        },
                    }
                })
            })
        }
    }
}