import Login from '../pages/auth/Login/Login';
import Signup from '../pages/auth/Signup/Signup';

import Home from '../pages/Home/Home';

export const API_ENDPOINT = 'http:localhost:5000';

export const PUBLIC_ROUTES = [
  {
    name: 'Login',
    path: '/login',
    exact: true,
    component: Login,
  },
  {
    name: 'Register',
    path: '/register',
    exact: true,
    component: Signup,
  },
];

export const PRIVATE_ROUTES = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    exact: true,
    component: '',
  },
  {
    name: 'Home',
    path: '/home',
    exact: true,
    component: Home,
  },
];

export const SIDEBAR_ROUTES = [
  {
    name: 'Landing',
    path: '/',
    exact: true,
    component: '',
  },
  {
    name: 'Home',
    path: '/home',
    exact: true,
    component: Home,
  },
];
