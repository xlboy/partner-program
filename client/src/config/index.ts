// 请求连接前缀
export const apiUrl = process.env.NODE_ENV === 'production' ? 'http://192.168.1.3:3000/api' : 'http://192.168.1.3:3000/api';

// WebSocket连接地址
export const wsUrl = process.env.NODE_ENV === 'production' ? 'ws://192.168.1.3:3000/chat' : 'ws://192.168.1.3:3000/chat';

// 输出日志信息
export const noConsole = false;
