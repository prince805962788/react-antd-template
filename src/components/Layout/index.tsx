import { Layout } from 'antd';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Account from '../Account';
import Header from './Header';
import Sider from './Sider';
import style from './style.module.less';

const { Content } = Layout;

const MenuLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // 路由守卫
  useEffect(() => {
    switch (pathname) {
      case '/':
        break;
      default:
        break;
    }
  }, [pathname]);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider />
      <Layout>
        <Header>
          <Account />
        </Header>
        <Content className={style.contentLayout}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MenuLayout;
