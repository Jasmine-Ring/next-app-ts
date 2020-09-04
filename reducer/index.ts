import * as Types from '~/types/types'

export const defaultState = {
  activeMenu: 'index',
  username: 'admin',
  password: 'admin',
  remember: true,
  curTreeDataItem: null
}

const reducerGlobal = (state: any, action: any) => {
  switch(action.type) {
    case Types.SET_ACTIVE_MENU:
      return {
        ...state,
        activeMenu: action.activeMenu,
      }
    case Types.SET_LOGIN_USER:
      return {
        ...state,
        ...action.loginUser,
      }
    case Types.SET_CUR_TREE_DATA_ITEM:
      return {
        ...state,
        curTreeDataItem: action.curTreeDataItem
      }
    default:
      return state
  }
}

export default  reducerGlobal