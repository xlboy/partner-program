import { Socket } from "app/@types/socket.type";
import { ContentType, MessageType } from "app/constants/socket";
import { OnlineUsers } from "app/socket/planIM";
import WebSocket from "_@types_ws@7.4.1@@types/ws";
import chatHandle from "./chatHandle";
import planHandle from "./planHandle";


type MessageHandleMap = {
    [k in keyof typeof MessageType]: (data: Socket.Message, userWS: WebSocket, onlineUsers: OnlineUsers) => void
}


const messageHandleMap: MessageHandleMap = {
    [MessageType.CHAT]: chatHandle,
    [MessageType.PLAN]: planHandle
}

export default function (data: Socket.Message, userWS: WebSocket, onlineUsers: OnlineUsers) {
    if (messageHandleMap[data.type]) {
        messageHandleMap[data.type](data, userWS, onlineUsers)
    } else {
        userWS.send({ contentType: ContentType.SYSTEM, content: 'type不正确' })
    }
}