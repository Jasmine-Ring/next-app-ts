import * as Types from '~/types/types'
export interface LoginUser {
  username: string
  password: string
  remember: boolean
}

export interface TreeDataItem {
  title: string
  key: string
  children?: Array<TreeDataItem>
}

export const setActiveMenu = (activeMenu: string) => ({
  type: Types.SET_ACTIVE_MENU,
  activeMenu
})

export const setLoginUser = (loginUser: LoginUser) => ({
  type: Types.SET_LOGIN_USER,
  loginUser,
})

export const setCurTreeDataItem = (curTreeDataItem: TreeDataItem) => ({
  type: Types.SET_CUR_TREE_DATA_ITEM,
  curTreeDataItem,
})
