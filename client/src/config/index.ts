// 请求连接前缀
export const apiUrl = process.env.NODE_ENV === 'production' ? 'https://xxx.com' : 'http://192.168.1.7:3000/api';

// WebSocket连接地址
export const wsUrl = process.env.NODE_ENV === 'production' ? 'https://xxx.com' : 'ws://192.168.1.7:3000/chat';

// 输出日志信息
export const noConsole = false;
