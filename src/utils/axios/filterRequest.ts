import axios, { InternalAxiosRequestConfig } from 'axios';

// 请求队列
const pendingRequests = new Map();

// 获取请求的唯一标识
export const getRequestKey = (config: InternalAxiosRequestConfig) => {
  return [
    config.method,
    config.url,
    JSON.stringify(config.params),
    JSON.stringify(config.data),
  ].join('&');
};

// 添加请求到队列
export const addRequest = (config: InternalAxiosRequestConfig) => {
  const requestKey = getRequestKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingRequests.has(requestKey)) {
        pendingRequests.set(requestKey, cancel);
      }
    });
};

// 从队列中移除请求
export const removeRequest = (config: InternalAxiosRequestConfig) => {
  const requestKey = getRequestKey(config);
  if (pendingRequests.has(requestKey)) {
    const cancel = pendingRequests.get(requestKey);
    cancel(requestKey);
    pendingRequests.delete(requestKey);
  }
};
