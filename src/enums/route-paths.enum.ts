export enum RoutePathsEnum {
  ROOT = '/',
  ADD = 'add',
  INTERVIEWS = 'interviews',
  INTERVIEW = 'interview/:id',
  STATISTICS = 'statistics',
  AUTH = '/auth',
  LOGIN = 'login',
  REGISTER = 'register',
  NOT_FOUND = '/:catchAll(.*)*',
}
