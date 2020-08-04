import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

/* Layout */
import LayoutOuter from '@/layout/layout-outer'

import TplChildRouters from './mainModules/shop'

//不需要判断动态判断权限的路由（一些通用页面）

export const  constantRoutes = [
    //添加redirect跳转路由（tabs刷新当前页）
    {
        path: '/redirect',
        component: LayoutOuter,
        meta: { hidden: true },
        children : [
            {
                path : '/redirect/:path*',//为什么加个* 才能匹配到？？
                component: () => import('@/views/redirect/index'),
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        meta : { hidden: true }
    }
]

//需要根据用户角色 判断的路由
export const asyncRoutes = [
    {
        path : '/',
        component: LayoutOuter,
        redirect: '/shop',
        meta: { hiddenInNavbar : true }
    },
    {
        path : '/shop',
        component: LayoutOuter,
        redirect: '/shop/merchant',
        children : TplChildRouters,
        meta : {
            title : 'shop'
        }
    }
];


const createRouter = () => new Router({
    routes : constantRoutes,
    scrollBehavior : () => ({y : 0})
})

const router = createRouter();


export default router

