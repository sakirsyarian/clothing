import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'
import About from '../views/About.vue'
import Favorite from '../views/Favorite.vue'
import Shop from '../views/Shop.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import NotFound from '../views/NotFound.vue'

import Template from '../components/Template.vue'

const routes = [
    {
        path: '/:pathMatch(.*)*',
        component: NotFound
    },
    {
        path: '/signin',
        name: 'SignIn',
        component: SignIn
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/',
        name: 'Template',
        component: Template,
        children: [
            {
                path: '',
                name: 'Home',
                component: Home
            },
            {
                path: 'detail/:id',
                name: 'Detail',
                component: Detail
            },
            {
                path: 'about',
                name: 'About',
                component: About
            },
            {
                path: 'favorite',
                name: 'Favorite',
                component: Favorite
            },
            {
                path: 'shop',
                name: 'Shopping',
                component: Shop
            }
        ]
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from) => {
    const access_token = localStorage.getItem('access_token')

    if (!access_token && to.name === 'Home') {
        return { name: 'SignIn' }
    }

    if (access_token && to.name === 'SignIn') {
        return '/'
    }

    if (access_token && to.name === 'SignUp') {
        return '/'
    }
})

export default router