import Login from '../pages/auth/Login/Login';
import Signup from '../pages/auth/Signup/Signup';

import Home from '../pages/Home/Home';
import Schedules from '../pages/Project/Schedule/Schedules';
import CreateScheduleForm from '../pages/Project/Schedule/CreateScheduleForm/CreateScheduleForm';

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
    name: 'Schedule',
    path: '/project/:projectId',
    exact: true,
    component: Schedules,
  },
  {
    name: 'Home',
    path: '/',
    exact: true,
    component: Home,
  },
  {
    name: 'Schedule',
    path: '/schedule',
    exact: true,
    component: Schedules,
  },
  {
    name: 'Schedule',
    path: '/project/:projectId/schedule/create',
    exact: true,
    component: CreateScheduleForm,
  },
];

export const SIDEBAR_ROUTES = [
  {
    name: 'Home',
    path: '/',
    exact: true,
    component: Home,
  },
  {
    name: 'Schedule',
    path: '/schedule',
    exact: true,
    component: Schedules,
  },
];
