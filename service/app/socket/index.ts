import WebSocket from 'ws'
import verifConnectUser from './common/verifConnectUser';


export default function (wss: WebSocket.Server) {
    wss.on('connection', (ws, req) => {
        const userResult = verifConnectUser(req.url)
        console.log('userResult', userResult)
        if (typeof userResult === 'number') {
            ws.close(1010, '我服了')
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