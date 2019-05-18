import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import store from './store';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if(to.meta.requireAuth) {
//     if (store.stste.token) {
//       next()
//     }
//     else {
//       next('/login')  // 跳转到登陆
//     }
//   }
// })

export default router