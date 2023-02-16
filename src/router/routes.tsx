import { FileOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import React, { lazy } from 'react';
export namespace SyncRoute {
  export type Routes = {
    path: string;
    component: React.LazyExoticComponent<() => JSX.Element>;
    name?: string;
    icon?: React.ReactNode;
    hidden?: boolean;
    children?: Routes[];
  };
}
export const LayoutChildren: SyncRoute.Routes[] = [
  {
    path: 'home',
    name: '首页',
    icon: <HomeOutlined />,
    component: lazy(() => import('@/pages/Home')),
  },
  {
    path: 'parent',
    name: '分页',
    icon: <UserOutlined />,
    component: lazy(() => import('components/Layout/Empty')),
    children: [
      {
        path: 'childA',
        name: '子页A',
        icon: <FileOutlined />,
        component: lazy(() => import('@/pages/ChildA')),
      },
      {
        path: 'childB',
        name: '子页B',
        icon: <FileOutlined />,
        component: lazy(() => import('@/pages/ChildB')),
      },
    ],
  },
];
const RouteTable: SyncRoute.Routes[] = [
  {
    path: '/',
    component: lazy(() => import('components/Layout')),
    children: LayoutChildren,
  },
  {
    path: '/login',
    component: lazy(() => import('@/pages/Login')),
  },
];
export default RouteTable;
