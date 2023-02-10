import { createRouter, createWebHashHistory } from 'vue-router'
import authRouter from "@/modules/auth/router";
import filmsRouter from "@/modules/films/router"
import isAuthtenticatedGuard from '@/modules/auth/router/auth-guard';

const routes = [
  {
    path: '/',
    redirect: () => 'top100Films'
  },
  {
    path: '/top100films',
    beforeEnter: [isAuthtenticatedGuard],
    ...filmsRouter

  },
  {
    path: '/auth',
    ...authRouter,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: () => '/top100films'
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
