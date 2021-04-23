import { SocketContentType } from 'app/constants/socket';
import WebSocket from 'ws';
import _WebSocket from 'ws'
import verifConnectUser from './core/verifConnectUser';
import PlanIM from './planIM';
import socketUtils from 'app/helpers/socket/socketUtils'
export default function (wss: _WebSocket.Server) {
    wss.on('connection', (ws: WebSocket, req) => {
        const userResult = verifConnectUser(req.url)

        if (typeof userResult === 'number') {
            socketUtils.send(ws, { contentType: SocketContentType.SYSTEM, content: 'token有误' })
            ws.close()
        } else {
            socketUtils.send(ws, { contentType: SocketContentType.SYSTEM, content: '连接成功' })
            PlanIM.add(ws, userResult)
        }
    });

}
