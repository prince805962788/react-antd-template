import { DatabaseOutlined } from '@ant-design/icons';
import React, { lazy } from 'react';
export interface Routes {
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
  name?: string;
  icon?: React.ReactNode;
  hidden?: boolean;
  children?: Routes[];
  redirect?: React.LazyExoticComponent<() => JSX.Element>;
}
export const LayoutChildren: Routes[] = [
  {
    path: 'home',
    name: '首页',
    icon: <DatabaseOutlined />,
    component: lazy(() => import('@/pages/Home')),
  },
  {
    path: 'parent',
    name: '分页',
    icon: <DatabaseOutlined />,
    component: lazy(() => import('components/Layout/Empty')),
    children: [
      {
        path: 'childA',
        name: '子页A',
        icon: <DatabaseOutlined />,
        component: lazy(() => import('@/pages/ChildA')),
      },
      {
        path: 'childB',
        name: '子页B',
        icon: <DatabaseOutlined />,
        component: lazy(() => import('@/pages/ChildB')),
      },
      {
        path: 'childB',
        name: '子页C',
        hidden: true,
        icon: <DatabaseOutlined />,
        component: lazy(() => import('@/pages/ChildB')),
      },
    ],
  },
];
const RouteTable: Routes[] = [
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
