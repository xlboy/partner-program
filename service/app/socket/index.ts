import { ContentType } from 'app/constants/socket';
import WebSocket from 'ws'
import verifConnectUser from './common/verifConnectUser';
import PlanIM from './planIM';


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