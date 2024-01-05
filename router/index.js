import { createRouter, createWebHistory } from 'vue-router'
import { JWTService } from '@/services/jwt.service'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      name: 'sign-in',
      path: '/sign-in',
      component: () => import('@/views/auth/SignInView.vue'),
      meta: {
        layout: 'AuthLayout',
        auth: true
      }
    },
    {
      name: 'sign-up',
      path: '/sign-up',
      component: () => import('@/views/auth/SignUpView.vue'),
      meta: {
        layout: 'AuthLayout',
        auth: true
      }
    },
    {
      name: 'home',
      path: '/home',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        layout: 'UserLayout'
      }
    },
  ]
})

export default router

router.afterEach((to) => {
  document.title = to.name || 'Project-A'
})

router.beforeEach((to, from, next) => {
  const token = JWTService.getToken()

  if (!to.meta.auth && !token) {
    next({ name: 'sign-in' })
  }
  else if (to.meta.auth && token) {
    next({ name: 'home' })
  }
  else {
    next()
  }
})