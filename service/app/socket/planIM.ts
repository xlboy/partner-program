/**
 * @description 连接成功的处理
 */

import { Socket } from "app/@types/socket.type";
import { SocketContentType } from "app/constants/socket";
import { UserinfoJWTFormat } from "app/helpers/jwt";
import WebSocket from "ws";
import messageHandle from "./core/messageHandle";
import { OnlineUsers } from "./typings";



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
        this.listenMessage(userWS, userinfo)
    }

    listenClose(userWS: WebSocket, userinfo: UserinfoJWTFormat) {
        userWS.on('close', (code: number, reason: string) => {
            console.log(`🆚 表示遗憾，又有一人离线...`)
            delete this.onlineUsers[userinfo.id]
        })
    }

    listenMessage(userWS: WebSocket, userinfo: UserinfoJWTFormat) {
        userWS.on('message', data => {
            console.log('来信息了,艹', data)
            const messageResult = verifMessageFormat(String(data))
            if (!messageResult) {
                userWS.send({ contentType: SocketContentType.SYSTEM, content: '传输の数据格式有误，type/content' })
            } else {
                messageHandle({ data: messageResult, userWS, userinfo, onlineUsers: this.onlineUsers })
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