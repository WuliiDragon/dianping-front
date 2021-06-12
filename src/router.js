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
      path: '/plazascore/:user_id:plaza_id',
      name: 'plazascore',
      component: () => import('@/pages/plazascore')
    },
    {
      path: '/postscore/:user_id:post_id',
      name: 'postscore',
      component: () => import('@/pages/postscore')
    },
    {
      path: '/coursescore/:user_id:course_id',
      name: 'coursescore',
      component: () => import('@/pages/coursescore')
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
      path: '/plazadetail/:plaza_id',
      name: 'plazadetail',
      component: () => import('@/pages/plazadetail')
    },
    {
      path: '/coursedetail/:course_id',
      name: 'coursedetail',
      component: () => import('@/pages/coursedetail')
    },

    {
      path: '/mine',
      name: 'mine',
      meta: { auth: true },
      component: () => import('@/pages/mine')
    },
    {
      path: '/course',
      name: 'course',
      component: () => import('@/pages/course')
    },
    {
      path: '/addcourse/:user_id',
      name: 'addcourse',
      component: () => import('@/pages/addcourse')
    },
    {
      path: '/plaza',
      name: 'plaza',
      component: () => import('@/pages/plaza')
    },
    {
      path: '/gym',
      name: 'gym',
      component: () => import('@/pages/gym')
    },
    {
      path: '/addplaza/:user_id',
      name: 'addplaza',
      component: () => import('@/pages/addplaza')
    },
    {
      path: '/addgym/:user_id',
      name: 'addgym',
      component: () => import('@/pages/addgym')
    },
    {
      path: '/addpost/:user_id',
      name: 'addpost',
      component: () => import('@/pages/addpost')
    },
    {
      path: '/gymdetail/:gym_id',
      name: 'gymdetail',
      component: () => import('@/pages/gymdetail')
    },

    {
      path: '/postdetail/:post_id',
      name: 'postdetail',
      component: () => import('@/pages/postdetail')
    },

    {
      path: '/gymscore/:gym_id',
      name: 'gymscore',
      component: () => import('@/pages/scoregym')
    },
    {
      path: '/userrecord/:user_id',
      name: 'userrecord',
      component: () => import('@/pages/userrecord')
    },
    {
      path: '*',
      redirect: '/home'
    },

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
