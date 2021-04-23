// 此处不可import引入内容…否则会 taro Compiling...Unexpected identifier
const Pages = {
  Login: 'pages/login/index',
  Index: 'pages/index/index',
  Account: 'pages/account/index',
} as const

export default {
  pages: [Pages.Index, Pages.Login , Pages.Account],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
};
