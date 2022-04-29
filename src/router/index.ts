import Vue from 'vue'
import VueRouter from 'vue-router'
import {login} from "@/router/login";
import {home} from "@/router/home";
import {admin} from "@/router/admin";

Vue.use(VueRouter);

const routes = [
  ...login,
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import( '@/views/home/TheHome.vue'),
    children: [...home]
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import( '@/views/home/TheAdmin.vue'),
    children: [...admin]
  },
  {
    path: '*',
    component: () => import('@/views/TheError404.vue')
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router
