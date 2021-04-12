import { ContentType } from 'app/constants/socket';
import { redisClient } from 'app/redis';
import WebSocket from 'ws'
import verifConnectUser from './core/verifConnectUser';
import PlanIM from './planIM';

import * as userHasReadMessage from 'app/redis/modules/userHasReadMessage'
import * as planGroupLastMessage from 'app/redis/modules/planGroupLastMessage'

planGroupLastMessage.update(3, 4)

export default function (wss: WebSocket.Server) {
    wss.on('connection', (ws, req) => {
        const userResult = verifConnectUser(req.url)
        console.log('userResult', userResult)
        if (typeof userResult === 'number') {
            ws.send({ contentType: ContentType.SYSTEM, content: '未登陆' })
            ws.close(1010)
        } else {
            ws.send({ contentType: ContentType.SYSTEM, content: '连接成功' })
            PlanIM.add(ws, userResult)
        }
    });

}