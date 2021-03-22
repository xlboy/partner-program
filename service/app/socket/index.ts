import WebSocket from 'ws'
import verifConnectUser from './common/verifConnectUser';


export default function (wss: WebSocket.Server) {
    wss.on('connection', (ws, req) => {
        const userResult = verifConnectUser(req.url)
        if (userResult instanceof Number) {
            ws.close(+userResult, 'token error')
        } else {
            ws.on('message', message => {
                console.log('received: %s', message);
            });
        }
        // console.log('ws', req.url)

        // console.log('there is a user connect again', ws)
        // ws.send('something');

    });

}