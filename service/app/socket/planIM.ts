/**
 * @description 连接成功的处理
 */

import { Socket } from "app/@types/socket.type";
import { ContentType } from "app/constants/socket";
import { UserinfoJWTFormat } from "app/helpers/jwt";
import WebSocket from "ws";
import messageHandle from "./core/messageHandle";

export interface OnlineUsers {
    [userId: number]: {
        ws: WebSocket,
        userinfo: UserinfoJWTFormat
    }
}

class PlanIM {
    onlineUsers: OnlineUsers = {}

    constructor() { }

    add(userWS: WebSocket, userinfo: UserinfoJWTFormat) {
        const userId = userinfo.id
        this.onlineUsers[userId] = { ws: userWS, userinfo }
        this.initNewUserWS(userWS, userinfo)
    }

    initNewUserWS(userWS: WebSocket, userinfo: UserinfoJWTFormat) {
        this.listenClose(userWS, userinfo)
    }

    listenClose(userWS: WebSocket, userinfo: UserinfoJWTFormat) {
        userWS.on('close', (code: number, reason: string) => {
            console.log(`🆚 表示遗憾，又有一人离线...`)
            delete this.onlineUsers[userinfo.id]
        })
    }

    listenMessage(userWS: WebSocket) {
        userWS.on('message', data => {
            console.log('来信息了,艹', data)
            const messageResult = verifMessageFormat(String(data))
            if (!messageResult) {
                userWS.send({ contentType: ContentType.SYSTEM, content: '传输の数据格式有误，type/content' })
            } else {
                messageHandle(messageResult, userWS, this.onlineUsers)
            }
        })

        function verifMessageFormat(data: string): Socket.Message | false {
            try {
                const { type, content } = JSON.parse(data)
                if (!type || !content) {
                    return false
                }
                return { type, content }
            } catch (error) {
                return false
            }
        }
    }
}

export default new PlanIM()