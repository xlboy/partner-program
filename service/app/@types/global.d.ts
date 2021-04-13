import { ContentType } from "app/constants/socket";
import _WebSocket from "ws";

declare global {
    class WebSocket extends _WebSocket {
        send(params: { contentType: ContentType, content: any }): void;
    }
}