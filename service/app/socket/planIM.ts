/**
 * @description 连接成功的处理
 */

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
        })
    }
}

export default new PlanIM()