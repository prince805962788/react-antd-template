import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from 'axios';
import LocalStorage from '../localStorage';
import { addRequest, removeRequest } from './filterRequest';

export const codeMsgMap: Record<number, string> = {
  400: '参数不正确',
  401: '您未登录，或者登录已经超时，请先登录',
  403: '拒绝访问',
  404: '请求地址出错',
  408: '请求超时',
  500: '服务器内部错误',
  501: '服务未实现',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
  505: 'HTTP版本不受支持',
};

export interface AxiosProps {
  axiosConfig?: CreateAxiosDefaults;
  filter?: boolean;
  setToken?: (config: InternalAxiosRequestConfig) => void;
  onMessage?: (e: any, response: AxiosResponse) => Promise<any>;
  onError?: (e: string, err: AxiosError) => void;
}
const defaultsetToken = (config: InternalAxiosRequestConfig) => {
  const access = LocalStorage.get('access_token');
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
};
const requestResolve = (props: {
  config: InternalAxiosRequestConfig;
  filter?: boolean;
  setToken?: (axiosConfig: InternalAxiosRequestConfig) => void;
}) => {
  const { config, filter, setToken } = props;
  // 过滤同时重复请求
  if (filter) {
    removeRequest(config);
    addRequest(config);
  }
  if (setToken !== undefined) {
    setToken(config);
  }
  return config;
};
export const requestReject = (err: any) => {
  return Promise.reject(err);
};
// 2xx 范围内的状态码都会触发该函数。
const responseResolve = (props: {
  response: AxiosResponse;
  onMessage?: (e: any, response: AxiosResponse) => Promise<any>;
}) => {
  const { response, onMessage } = props;
  const { data } = response;
  if (onMessage instanceof Function) {
    return onMessage(data, response);
  } else {
    let result;
    if (response.status === 200 && data.code === 200) {
      result = data.data;
    } else if (response.status === 200) {
      result = data;
    } else {
      result = data.msg || '接口请求出错，请重试或者联系产品经理';
    }
    return Promise.resolve(result);
  }
};
// 超出 2xx 范围的状态码都会触发该函数。
const responseReject = (props: {
  err: AxiosError;
  onError?: (e: string, err: AxiosError) => void;
}) => {
  const { err, onError } = props;
  let errMsg = '未知错误';
  const { response, message = '' } = err;
  if (response) {
    const { status } = response;
    errMsg = codeMsgMap[status] || errMsg;
  }
  if (message.includes('timeout')) {
    errMsg = '网络请求超时';
  }
  if (message.includes('Network')) {
    errMsg = window.navigator.onLine ? '服务端异常' : '已断网';
  }
  onError && onError(errMsg, err);
  return Promise.reject(err);
};
export function createAxiosInstance(props: AxiosProps = {}) {
  const { axiosConfig, filter, setToken = defaultsetToken, onMessage, onError } = props;
  // 创建实例
  const instance = axios.create({
    baseURL: '/',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
    ...axiosConfig,
  });
  // request 处理
  instance.interceptors.request.use(
    (config) => requestResolve({ config, filter, setToken }),
    (err) => requestReject(err),
  );
  // response 处理
  instance.interceptors.response.use(
    (response) => responseResolve({ response, onMessage }),
    (err) => responseReject({ err, onError }),
  );

  return instance;
}
export default createAxiosInstance;
