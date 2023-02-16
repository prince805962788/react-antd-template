import { Layout } from 'antd';
import { PropsWithChildren } from 'react';
import style from './style.module.less';
const { Header } = Layout;
const HeaderLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <Header className={style.headerLayout}> {children} </Header>;
};
export default HeaderLayout;
