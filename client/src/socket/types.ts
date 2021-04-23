import { ApiUserinfoResult } from '@/apis/types/user';
import { SocketContentType } from '@/constants/socket';

export namespace SocketType {
    export interface DataParams {
        contentType: SocketContentType;
        content: any;
    }
}

export namespace MessageContent {
    export interface GroupChat {
        groupId: number;
        message: string;
        sender: ApiUserinfoResult
    }
}
