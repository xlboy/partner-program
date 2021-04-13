import { Socket } from "app/@types/socket.type";
import { ContentType } from "app/constants/socket";
import { UserinfoJWTFormat } from "app/helpers/jwt";
import { OnlineUsers } from "app/socket/planIM";
import groupChatHandle from "./groupChatHandle";

export interface MessageHandleParams {
    data: Socket.Message;
    userWS: WebSocket;
    userinfo: UserinfoJWTFormat;
    onlineUsers: OnlineUsers
}

type MessageHandleMap = {
    [k in keyof typeof ContentType]?: (params: MessageHandleParams) => void
}


const messageHandleMap: MessageHandleMap = {
    [ContentType.GROUP_CHAT]: groupChatHandle
}

export default function (params: MessageHandleParams) {
    const { data, userWS } = params
    if (messageHandleMap[data.type]) {
        messageHandleMap[data.type](params)
    } else {
        userWS.send({ contentType: ContentType.SYSTEM, content: 'type不正确' })
    }
}