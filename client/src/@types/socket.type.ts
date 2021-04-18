import { SocketContentType } from '@/constants/socket';

export namespace SocketType {
  export interface DataParams {
    contentType: SocketContentType;
    content: any;
  }
}
