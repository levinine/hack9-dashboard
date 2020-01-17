import Router from 'vue-router'
import Results from '../src/components/Results'
import AuthService from '../src/service/auth.service';
import ErrorComponent from '../src/components/Error';
import Messages from '../src/components/Messages';


function requireAuth(to, from, next) {

  if (!AuthService.isUserAuthenticated()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
}
export default new Router({
  mode: 'history',
  base: '/dev/',
  routes: [
    {
      path: '/',
      name: 'Results',
      component: Results,
    },
    {
      path: '/login', beforeEnter() {
        AuthService.login();
      }
    },
    {
      path: '/authorize', beforeEnter(to, from, next) {
        AuthService.parseCognitoWebResponse();
        next('/');
      }
    },
    {
      path: '/logout', beforeEnter() {
        AuthService.logout();
      }

    },
    {
      path: '/error', component: ErrorComponent
    },
    {
      path: '/messages',
      name: 'Messages',
      component: Messages,
      props: true,
      beforeEnter: requireAuth
    },
  ]
})