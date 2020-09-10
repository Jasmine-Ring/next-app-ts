import axios, {AxiosInstance} from 'axios'

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
      return config
    },
    function (error: any) {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    function (response: any) {
      return response
    },function(error: any) {
      return Promise.reject(error)
    }
  )
  return instance
}

export default _interceptors(instance)