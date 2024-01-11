import request from '@/utils/request';

// 登录
interface userAccount {
  id?: number;
  username: string;
  password: string;
}
export const login = (data: userAccount): Promise<userAccount> =>
  request.request({
    url: '',
    method: 'POST',
    data,
  });
