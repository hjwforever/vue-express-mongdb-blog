import Vue from "vue"
import Router from "vue-router"
import Home from '@/components/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';

Vue.use(Router);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/profile',
        name: 'profile',
        // lazy-loaded
        component: () => import('@/views/Profile.vue')
    },
    {
        path: '/admin',
        name: 'admin',
        // lazy-loaded
        component: () => import('@/views/BoardAdmin.vue')
    },
    {
        path: '/mod',
        name: 'moderator',
        // lazy-loaded
        component: () => import('@/views/BoardModerator.vue')
    },
    {
        path: '/user',
        name: 'user',
        // lazy-loaded
        component: () => import('@/views/BoardUser.vue')
    },
    {
        path: "/",
        alias: "/posts",
        name: "posts",
        component: () => import("@/components/PostsList")
    },
    {
        path: "/posts/:id",
        name: "posts-details",
        component: () => import("@/components/Post")
    },
]

const router = new Router({
    // mode: "history",
    routes
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/home'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // 未登录则重定向至登录页
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;
