/**
 * @description 连接成功的处理
 */

import { ContentType } from "app/constants/socket";
import { UserinfoJWTFormat } from "app/helpers/jwt";
import WebSocket from "ws";

interface OnlineUser {
    ws: WebSocket,
    userinfo: UserinfoJWTFormat
}

class PlanIM {
    onlineUsers: OnlineUser[] = []
    constructor() { }
    add(userWS: WebSocket, userinfo: UserinfoJWTFormat) {
        this.onlineUsers.push({ ws: userWS, userinfo })
        this.initNewUserWS(userWS, userinfo)
    }
    initNewUserWS(userWS: WebSocket, userinfo: UserinfoJWTFormat) {
        this.listenClose(userWS, userinfo)
    }
    listenClose(userWS: WebSocket, userinfo: UserinfoJWTFormat) {
        const removeOnlineUser = () => {
            const userIndex = this.onlineUsers.findIndex(u => u.userinfo.id === userinfo.id)
            this.onlineUsers.splice(userIndex, 1)
        }
        userWS.on('close', (code: number, reason: string) => {
            console.log(`🆚 表示遗憾，又有一人离线...`)
            removeOnlineUser()
        })
    }
    listenMessage(userWS: WebSocket) {
        userWS.on('message', data => {
            console.log('来信息了,艹', data)
            const messageResult = verifMessageFormat(String(data))
            if (!messageResult) {
                userWS.send({ contentType: ContentType.SYSTEM, content: '传输的数据有误' })
            } else {
                
            }
        })

        function verifMessageFormat(data: string): { type: any, content: any } | false {
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