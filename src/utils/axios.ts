import { message } from 'antd';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import localStorage from './localStorage';

const pendingMap = new Map();

function getPendingKey(config: AxiosRequestConfig) {
  const { url, method, params } = config;
  let { data } = config;
  if (typeof data === 'string') {
    data = JSON.parse(data);
  }
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&');
}
// 判断重复请求并储存进队列
function addPending(config: AxiosRequestConfig) {
  const pendingKey = getPendingKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel); // 键：当前config的字符串，值：取消回调函数cancel
      }
    });
}
//   删除重复的请求
function removePending(config: AxiosRequestConfig) {
  const pendingKey = getPendingKey(config);
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey);
    cancelToken(pendingKey);
    pendingMap.delete(pendingKey);
  }
}

const instance = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? '/api' : '/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    removePending(config);
    addPending(config);
    const access = localStorage.get('access_token');
    config.headers = config.headers || {};
    if (access) {
      config.headers.Authorization = access;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;
    if (data.code === 200) {
      return Promise.resolve(data.data);
    } else {
      message.error(data.msg);
      return Promise.reject(data);
    }
  },
  (error) => {
    handleError(error);
  },
);
function handleError(err: AxiosError) {
  let errMsg = '';
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        errMsg = '参数不正确';
        break;
      case 401:
        errMsg = '您未登录，或者登录已经超时，请先登录';
        window.location.href = '/login';
        break;
      case 403:
        errMsg = '拒绝访问';
        break;
      case 404:
        errMsg = '请求地址出错';
        break;
      case 408:
        errMsg = '请求超时';
        break;
      case 500:
        errMsg = '服务器内部错误';
        break;
      case 501:
        errMsg = '服务未实现';
        break;
      case 502:
        errMsg = '网关错误';
        break;
      case 503:
        errMsg = '服务不可用';
        break;
      case 504:
        errMsg = '网关超时';
        break;
      case 505:
        errMsg = 'HTTP版本不受支持';
        break;
      default:
        errMsg = '未知错误';
        break;
    }
    if (err.message.includes('timeout')) {
      errMsg = '网络请求超时';
    }
    if (err.message.includes('Network')) {
      errMsg = window.navigator.onLine ? '服务端异常' : '已断网';
    }
    message.error(errMsg);
  }
}

export default instance;
