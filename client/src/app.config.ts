const MainPages = {
  Me: 'pages/me/index',
  Login: 'pages/login/index',
  Groups: 'pages/groups/index',
  Chats: 'pages/chats/index',
} as const
const PackagePages = {
  AddGroup: 'pages/packageA/addGroup/index',
} as const

const appConfig = {
  AllPage: (() => {
    const srouce = { ...MainPages, ...PackagePages }
    const result = {}
    Object.entries(srouce).forEach(([k, v]) => {
      result[k] = `/${v}`
    })
    type SrouceType = typeof srouce
    type ResultType = {
      [K in keyof SrouceType]: `/${SrouceType[K]}`
    }
    return result as ResultType
  })(),
  pages: Object.values(MainPages),
  subPackages: (() => {
    const rootMap: Record<string, string[]> = {}
    Object.values(PackagePages).forEach(path => {
      const [root] = path.match(/^((.+?\/){2})/)!
      const [page] = path.match(/[^\/]+\/[^\/]+$/)!
      if (rootMap[root]) {
        rootMap[root].push(page)
      } else {
        rootMap[root] = [page]
      }
    })
    return Object.entries(rootMap).map(([k, v]) => ({ root: k, pages: v }))
  })(),
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    color: '#333333',
    selectedColor: '#6190E8',
    backgroundColor: '#fff',
    list: [
      {
        pagePath: MainPages.Chats,
        text: 'Chats',
        iconPath: './static/images/icon_tab_chat.png',
        selectedIconPath: './static/images/icon_tab_chat_select.png',
      },
      {
        pagePath: MainPages.Groups,
        text: 'Groups',
        iconPath: './static/images/icon_tab_groups.png',
        selectedIconPath: './static/images/icon_tab_groups_select.png',
      },
      {
        pagePath: MainPages.Me,
        text: 'Me',
        iconPath: './static/images/icon_tab_me.png',
        selectedIconPath: './static/images/icon_tab_me_select.png',
      },
    ],
  },
} as const

declare global {
  type AppConfig = typeof appConfig
}

export default appConfig