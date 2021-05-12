// 此处不可import引入内容…否则会 taro Compiling...Unexpected identifier

const Pages = {
  Login: 'pages/login/index',
  Index: 'pages/index/index',
  Chats: 'pages/chats/index',
  Groups: 'pages/groups/index',
  Me: 'pages/me/index',
  Account: 'pages/account/index',
}

export default {
  pages: [Pages.Me, Pages.Chats, Pages.Groups, Pages.Index, Pages.Login],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#333333',
    selectedColor: '#6190E8',
    backgroundColor: '#fff',
    list: [
      {
        pagePath: Pages.Chats,
        text: 'Chats',
        iconPath: './static/images/icon_tab_chat.png',
        selectedIconPath: './static/images/icon_tab_chat_select.png'
      },
      {
        pagePath: Pages.Groups,
        text: 'Groups',
        iconPath: './static/images/icon_tab_groups.png',
        selectedIconPath: './static/images/icon_tab_groups_select.png'
      },
      {
        pagePath: Pages.Me,
        text: 'Me',
        iconPath: './static/images/icon_tab_me.png',
        selectedIconPath: './static/images/icon_tab_me_select.png'
      }]
  }
};
