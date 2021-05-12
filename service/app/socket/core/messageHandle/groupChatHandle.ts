import ImPlanGroupMessageService from "app/services/imPlanGroupMessage.service";
import { MessageHandleParams } from ".";
import * as planGroupMemberRedis from 'app/redis/modules/planGroupMember'
import * as planGroupInfoRedis from 'app/redis/modules/planGroupInfo'
import { SocketContentType } from "app/constants/socket";
import socketUtils from "app/helpers/socket/socketUtils";
import PlanGroupService from "app/services/planGroup.service";
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
        const planGroupMembers = await planGroupMemberRedis.get(groupId)
        const planGroupInfo = (async () => {
            const info = await planGroupInfoRedis.get(groupId)
            if (info) {
                return info
            } else {
                const planGroupService = new PlanGroupService()
                const planGroupInfo = planGroupService.findGroupId(groupId)
                if (planGroupInfo) return planGroupInfo
                throw new Error('查询失败');
            }
        })();

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
                        groupInfo: planGroupInfo,
                        senderInfo: {
                            ...userinfo,
                        },
                        message,
                    }
                })
            })
        }
    }
}