import { SocketContentType } from "app/constants/socket";

export namespace Socket {
    export interface Message {
        type: SocketContentType,
        content: any
    }
}

