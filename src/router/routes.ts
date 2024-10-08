import { RouteRecordRaw } from 'vue-router';

import { RoutePaths, RouteNames } from 'src/enums';
import MainLayout from 'layouts/MainLayout.vue';
import AuthLayout from 'layouts/AuthLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: RoutePaths.ROOT,
    name: RouteNames.ROOT,
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: RoutePaths.ADD,
        name: RouteNames.ADD,
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: RoutePaths.INTERVIEWS,
        name: RouteNames.INTERVIEWS,
        component: () => import('pages/InterviewsPage.vue'),
      },
      {
        path: RoutePaths.STATISTICS,
        name: RouteNames.STATISTICS,
        component: () => import('pages/StatisticsPage.vue'),
      },
    ],
  },
  {
    path: RoutePaths.AUTH,
    name: RouteNames.AUTH,
    redirect: `${RoutePaths.AUTH}/${RoutePaths.LOGIN}`,
    component: AuthLayout,
    children: [
      {
        path: RoutePaths.LOGIN,
        name: RouteNames.LOGIN,
        component: () => import('pages/LoginPage.vue'),
      },
      {
        path: RoutePaths.REGISTER,
        name: RouteNames.REGISTER,
        component: () => import('pages/RegisterPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: RoutePaths.NOT_FOUND,
    name: RouteNames.NOT_FOUND,
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
