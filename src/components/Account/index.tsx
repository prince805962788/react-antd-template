import LocalStorage from '@/utils/localStorage';
import { Avatar, Dropdown, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import style from './style.module.less';
const Account = () => {
  const navigate = useNavigate();
  const items: MenuProps['items'] = [
    {
      key: 'account',
      label: <span>退出登录</span>,
      onClick: () => {
        navigate('/login');
      },
    },
  ];
  const username = LocalStorage.get('username');
  return (
    <div className={style.accountContainer}>
      <Dropdown menu={{ items }} placement="bottomRight">
        <Avatar className={style.avatar}>{username}</Avatar>
      </Dropdown>
    </div>
  );
};
export default Account;
