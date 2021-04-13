import { ContentType } from "app/constants/socket";

export namespace Socket {
    export interface Message {
        type: ContentType,
        content: any
    }
}

