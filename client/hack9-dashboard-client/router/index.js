import Router from 'vue-router'
import DashboardApp from '../src/components/DashboardApp'
import AuthService from '../src/service/auth.service';
import ErrorComponent from '../src/components/Error';


// function requireAuth(to, from, next) {

//   if (!auth.auth.isUserSignedIn()) {
//     next({
//       path: '/login',
//       query: { redirect: to.fullPath }
//     });
//   } else {
//     UserInfoApi.getUserInfo().then(response => {
//       UserInfoStore.setLoggedIn(true);
//       UserInfoStore.setCognitoInfo(response);
//       next();
//     });

//   }
// }
export default new Router({
  mode: 'history',
  base: '/dev/',
  routes: [
    {
      path: '/',
      name: 'DashboardApp',
      component: DashboardApp,
      // beforeEnter: requireAuth
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
    }
  ]
})