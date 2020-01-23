import { CognitoAuth } from 'amazon-cognito-auth-js';
import IndexRouter from '../../router/index';
import jwt_decode from 'jwt-decode'

const authData = {
  ClientId: process.env.VUE_APP_CLIENT_ID,
  AppWebDomain: process.env.VUE_APP_APP_DOMAIN,
  TokenScopesArray: ['openid'],
  RedirectUriSignIn: process.env.VUE_APP_REDIRECT_URI,
  RedirectUriSignOut: process.env.VUE_APP_REDIRECT_URI,
  UserPoolId: process.env.VUE_APP_USER_POOL_ID,
  IdentityProvider: process.env.VUE_APP_IDENTITY_PROVIDER,
}

const auth = new CognitoAuth(authData);

auth.userhandler = {
  onSuccess: function () { },
  onFailure: function (err) {
    IndexRouter.go({ path: '/error', query: { message: 'Login failed due to ' + err } });
  }
};

function isUserAdmin() {
  const token = auth.getSignInUserSession().getIdToken().jwtToken;
  return token ? jwt_decode(token).role === 'admin' : false;
}

function getUserEmail() {
  const token = auth.getSignInUserSession().getIdToken().jwtToken;
  return token ? jwt_decode(token).email : null;
}

function login() {
  auth.getSession();
}

function logout() {
  if (auth.getSignInUserSession().getIdToken().jwtToken) {
    auth.signOut();
  }
}

function parseCognitoWebResponse() {
  const currUrl = window.location.href;
  auth.parseCognitoWebResponse(currUrl);
}

function isUserAuthenticated() {
  return !!auth.getSignInUserSession().getIdToken().jwtToken;
}

export default {
  auth,
  login,
  logout,
  isUserAdmin,
  getUserEmail,
  parseCognitoWebResponse,
  isUserAuthenticated
};