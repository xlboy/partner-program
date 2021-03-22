import Taro from '@tarojs/taro';
export async function connectSocket(url: string): Promise<Taro.SocketTask | false> {
    try {
        const socketTask = await Taro.connectSocket({
            url,
            fail() {
                throw new Error("ws url error");
            }
        })
        return socketTask

    } catch (error) {
        Taro.showToast({
            title: 'connect socket error -> ' + error.message
        })
        return false
    }

}