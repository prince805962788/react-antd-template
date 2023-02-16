import React from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import RouteTable, { SyncRoute } from './routes';

const syncRouter = (table: SyncRoute.Routes[]): RouteObject[] => {
  let routes: RouteObject[] = [];
  table.forEach((route) => {
    routes.push({
      path: route.path,
      element: (
        <React.Suspense fallback={<div>路由加载ing...</div>}>
          {route.component ? <route.component /> : ''}
        </React.Suspense>
      ),
      children: route.children && syncRouter(route.children),
    });
  });
  return routes;
};
export default () => useRoutes(syncRouter(RouteTable));
