import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sider from './Sider';
import style from './style.module.less';

const { Content } = Layout;

const App = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider />
      <Layout>
        <Header />
        <Content className={style.contentLayout}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
