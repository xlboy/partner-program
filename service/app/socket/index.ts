import { ContentType } from 'app/constants/socket';
import _WebSocket from 'ws'
import verifConnectUser from './core/verifConnectUser';
import PlanIM from './planIM';

export default function (wss: _WebSocket.Server) {
    wss.on('connection', (ws: WebSocket, req) => {
        const userResult = verifConnectUser(req.url)
        
        if (typeof userResult === 'number') {
            ws.send({ contentType: ContentType.SYSTEM, content: '未登陆' })
            ws.close(1010)
        } else {
            ws.send({ contentType: ContentType.SYSTEM, content: '连接成功' })
            PlanIM.add(ws, userResult)
        }
    });

}