import Vue from 'vue';
import Router from 'vue-router';
import session from '@/utils/storage';
import Home from '@/pages/home';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/address',
      name: 'address',
      component: () => import('@/pages/address')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/pages/search')
    },
    {
      path: '/score/:user_id:canteen_id',
      name: 'score',
      component: () => import('@/pages/score')
    },
    {
      path: '/add/:user_id',
      name: 'add',
      component: () => import('@/pages/add')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login')
    },
    {
      path: '/regist',
      name: 'regist',
      component: () => import('@/pages/regist')
    },
    {
      path: '/detail/:canteen_id',
      name: 'detail',
      component: () => import('@/pages/detail')
    },

    {
      path: '/mine',
      name: 'mine',
      meta: { auth: true },
      component: () => import('@/pages/mine')
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
});

router.beforeEach((to, from, next) => {
  // 此处做权限拦截
  if (to.meta.auth && !session.get('isLogin', 0)) {
    return next({ name: 'login' });
  }
  next();
});

export default router;
