import { UserinfoJWTFormat } from "app/helpers/jwt";
import WebSocket from "ws";

export interface OnlineUsers {
    [userId: number]: {
        ws: WebSocket,
        userinfo: UserinfoJWTFormat
    }
}