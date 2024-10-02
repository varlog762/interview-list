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
        name: 'Add',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'Interviews/:id',
        name: 'interviews',
        component: () => import('pages/InterviewsPage.vue'),
      },
      {
        path: 'statistics',
        name: 'Statistics',
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
        name: 'Login',
        component: () => import('pages/LoginPage.vue'),
      },
      {
        path: 'register',
        name: 'Register',
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
