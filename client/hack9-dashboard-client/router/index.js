import Router from 'vue-router'
import Results from '../src/components/Results'
import AuthService from '../src/service/auth.service';
import ErrorComponent from '../src/components/Error';
import Messages from '../src/components/Messages';
import MessageForm from '../src/components/MessageForm';
import Spinner from '../src/components/Spinner';
import store from "../src/store";


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

function requireAdminAccess(to, from, next) {
  if (!AuthService.isUserAdmin()) {
    next({
      path: '/error',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
}

const router = new Router({
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
      path: '/authorize', 
      component: Spinner,
      beforeEnter(to, from, next) {
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
    {
      path: '/newMessage',
      name: 'MessageForm',
      component: MessageForm,
      props: true,
      beforeEnter: requireAdminAccess
    },
  ]
});

router.beforeEach((to, from, next) => {
  store.state.loading = true;
  next();
});

router.afterEach(() => {
  store.state.loading = false;
});

export default router;