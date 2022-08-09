import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import nestedRouter from './modules/nested'
// import tableRouter from './modules/table'
// import hotRouter from './modules/hot'
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },

  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // hotRouter,
  // {
  //   path: '/demo',
  //   component: Layout,
  //   meta: { title: 'demo', icon: 'user' },
  //   children: [
  //     // 系统管理
  //     {
  //       path: 'staff-manage',
  //       component: () => import('@/views/staff-manage/index'),
  //       name: 'StaffManage',
  //       meta: { title: '员工管理' }
  //     }
  //   ]
  // },
  // 员工管理
  {
    path: '/staff',
    component: Layout,
    meta: { title: '员工管理', icon: 'user' },
    children: [
      {
        path: 'my-task',
        component: () => import('@/views/my-task/index'),
        name: '我的任务',
        meta: { title: '我的任务' }
      },
      {
        path: 'staff-task',
        component: () => import('@/views/staff-task/index'),
        name: 'StaffTask',
        meta: { title: '任务分配' }
      },
      {
        path: 'staff-manage',
        component: () => import('@/views/staff-manage/index'),
        name: 'StaffManage',
        meta: { title: '员工管理' }
      },
      {
        path: 'staff-info',
        component: () => import('@/views/staff-info/index'),
        name: 'StaffInfo',
        meta: { title: '员工信息' }
      }
    ]
  },
  // 规范条目管理
  {
    path: '/standard',
    component: Layout,
    meta: { title: '字典管理', icon: 'user' },
    children: [
      {
        path: 'standard-entry',
        component: () => import('@/views/standard-entry/index'),
        name: 'StandardEntry',
        meta: { title: '规范条目管理' }
      },
      {
        path: 'standard-detail',
        component: () => import('@/views/standard-detail/index'),
        name: 'StandardDetail',
        meta: { title: '规范细则管理' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support 路由模式更改
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
