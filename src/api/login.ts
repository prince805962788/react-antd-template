import { AxiosResponse } from 'axios';
import request from 'utils/axios';
// 登录
interface userAccount {
  id?: number;
  username: string;
  password: string;
}
export const login = (data: userAccount): Promise<AxiosResponse<userAccount>> =>
  request({
    url: '',
    method: 'POST',
    data,
  });
