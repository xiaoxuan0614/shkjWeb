import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: '/',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  // ✅ 关键：所有 200~599 状态都进入成功回调，不再直接抛错
  validateStatus(status) {
    return status >= 200 && status < 600
  }
})

// 请求拦截器
request.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const status = response.status
    const data = response.data

    // 成功请求，直接返回数据
    if (status === 200) {
      return data
    }

    // ========== 统一状态码处理 ==========
    if (status === 400) {
      ElMessage.error(data.message || '参数校验失败')
      return Promise.reject(data)
    }
    if (status === 500) {
      ElMessage.error(data.message || '数据库异常，请联系管理员')
      return Promise.reject(data)
    }

    // 其他 http 错误 404/403 等兜底
    ElMessage.error(data.message || `请求错误[${status}]`)
    return Promise.reject(data)
  },
  (error) => {
    // 走到这里代表真正网络异常：断网、跨域、无法连接服务器
    // console.error('API Error:', error.message)
    ElMessage.error('网络错误，请稍后重试')
    return Promise.reject(error)
  },
)

export default request