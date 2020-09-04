import axios, {AxiosInstance} from 'axios'
// import ReactDOM from 'react-dom'
// import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

// import { useContext } from 'react'
// import { GlobalContext } from '~/pages/_app'

// const globalContext: any = useContext(GlobalContext)
// console.log(globalContext, 'globalContext')
let requestCount = 0

// const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />


function showLoading () {
  if (requestCount === 0) {
    // const dom = document.createElement('div')
    // dom.setAttribute('id', 'loading')
    // document.body.appendChild(dom)
    // ReactDOM.render(<Spin tip="加载中..." size="large"/>, dom)

    requestCount ++
  }
}

function hideLoading () {
  requestCount--
  if (requestCount === 0) {
    // document.body.removeChild(document.getElementById('loading'))
  }
}

// @ts-ignore
const instance = axios.create({
  baseURL: '/api',
  headers: {
    "Cache-Control": "no-cache"
  },
  timeout: 3000,
})

const _interceptors = (instance: any) => {

  instance.interceptors.request.use(
    function(config: any) {
      showLoading()
      console.log(config, 'config')
      return config
    },
    function (error: any) {
      hideLoading()
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    function (response: any) {
      showLoading()
      console.log(response, 'response')
      return response
    },function(error: any) {
      hideLoading()
      return Promise.reject(error)
    }
  )
  return instance
}

export default _interceptors(instance)