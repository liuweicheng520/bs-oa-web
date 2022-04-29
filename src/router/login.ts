const login = [
  {
    path: '/login',
    name: 'Login',
    component: () => import( '@/views/login/TheLogin.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import( '@/views/login/TheRegister.vue')
  },
];

export {login};