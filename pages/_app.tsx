import React, {useEffect, useReducer} from 'react'
import {useRouter} from 'next/router'
import index, {defaultState} from '~/reducer/index'
import '~/styles/globals.css'
import 'antd/dist/antd.css'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

export const GlobalContext = React.createContext({})

// @ts-ignore
const MyApp: React.FC<{}> = ({ Component, pageProps }) => {
  const router = useRouter()
  const [indexState, indexDispatch] = useReducer(index, defaultState)
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      console.log("路由发生了改变", url)
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.on('routeChangeStart', handleRouteChange)
    }
  }, [])

  return (
    <ConfigProvider locale={zhCN}>
      <GlobalContext.Provider value={{ indexState, dispatch: indexDispatch }}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </ConfigProvider>
  )
  // return <Component {...pageProps} />
  
}

export default MyApp
