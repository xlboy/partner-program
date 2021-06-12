// 请求连接前缀
export const apiUrl = process.env.NODE_ENV === 'production' ? 'https://xxx.com' : 'http://127.0.0.1:3000/api';

// WebSocket连接地址
export const wsUrl = process.env.NODE_ENV === 'production' ? 'https://xxx.com' : 'ws://127.0.0.1:3000/chat';

// 输出日志信息
export const noConsole = false;
