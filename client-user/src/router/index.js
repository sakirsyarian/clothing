import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'

import Template from '../components/Template.vue'

const routes = [
    {
        path: '/signin',
        name: 'Sign in',
        component: SignIn
    },
    {
        path: '/signup',
        name: 'Sihn up',
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
                path: 'about',
                name: 'About',
                component: About
            }
        ]
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router