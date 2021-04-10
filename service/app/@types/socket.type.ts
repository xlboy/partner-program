import { MessageType } from "app/constants/socket";

export namespace Socket {
    export interface Message {
        type: MessageType,
        content: any
    }
}

