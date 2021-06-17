import { getAppStore } from "@/utils/dva";
import Taro, { FC } from "@tarojs/taro";
import { Provider } from "react-redux";

// 为了解决小程序页面加载不出app.tsx的Provider
export default (Component: FC) => () => <Provider store={getAppStore() as any}><Component /></Provider>;