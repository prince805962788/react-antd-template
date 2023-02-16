import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutChildren, SyncRoute } from 'router/routes';
import style from './style.module.less';

const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children: children?.length ? children : undefined,
    label,
  } as MenuItem;
}
function handleSub(route: SyncRoute.Routes, parent?: string): MenuItem {
  const { path, name, icon, children } = route;
  let newChildren: MenuItem[] = [];
  if (children && children.length > 0) {
    rootSubmenuKeys.push(path);
    newChildren = children.map((child) => handleSub(child, path));
  }
  return getItem(name, `${parent ? '/' + parent : ''}/${path}`, icon, newChildren);
}
function getOpenKey(pathname: string) {
  const arr = pathname.split('/');
  if (!arr.length) {
    return '';
  }
  const parent = arr.slice(0, arr.length - 1);
  return parent.join('/');
}
const rootSubmenuKeys: string[] = [];
const items: MenuItem[] = LayoutChildren.map((route) => handleSub(route));
const SiderLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [openKeys, setOpenKeys] = useState([getOpenKey(pathname)]);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div className={style.logo} />
      <Menu
        theme="dark"
        forceSubMenuRender={true}
        triggerSubMenuAction="click"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        defaultSelectedKeys={[pathname]}
        mode="inline"
        items={items}
        onClick={(e) => navigate(e.key)}
      />
    </Sider>
  );
};
export default SiderLayout;
