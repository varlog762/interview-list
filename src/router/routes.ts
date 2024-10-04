import { RouteRecordRaw } from 'vue-router';
import MainLayout from 'layouts/MainLayout.vue';
import AuthLayout from 'layouts/AuthLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'add',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'interviews',
        name: 'interviews',
        component: () => import('pages/InterviewsPage.vue'),
      },
      {
        path: 'statistics',
        name: 'statistics',
        component: () => import('pages/StatisticsPage.vue'),
      },
    ],
  },
  {
    path: '/auth',
    redirect: '/auth/login',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/LoginPage.vue'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('pages/RegisterPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
