import WebSocket from "ws";
import { SocketContentType } from "app/constants/socket";

interface WebSocketSendParams {
    contentType: SocketContentType,
    content: any
}

export default {
    send(ws: WebSocket, params: WebSocketSendParams): void {
        ws.send(JSON.stringify(params))
    }
}