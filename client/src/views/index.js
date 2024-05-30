import {createWebHistory, createRouter} from 'vue-router'

import HomeView from './HomeView.vue'
import ProductsView from './ProductsView.vue'
import LoginView from './LoginView.vue'
import RegisterView from "@/views/RegisterView.vue";
import {useUser} from "@/store/store.js";
import NotFound from "@/views/NotFound.vue";
import CheckoutView from "@/views/CheckoutView.vue";
import AddProductView from "@/views/AddProductView.vue";

const routes = [
    {path: '/', component: HomeView},
    {path: '/products', component: ProductsView},
    {path: '/contact', component: ProductsView},
    {path: '/auth/login', component: LoginView},
    {path: '/auth/register', component: RegisterView},
    {path: '/checkout', component: CheckoutView},
    {path: '/logout', component: LoginView},
    {
        path: '/admin/',
        children: [
            {
                path: 'add-product',
                component: AddProductView,
            },
        ],
    },
    {path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const user = useUser()

    if (to.path.startsWith('/auth/') && user.user?.token) {
        next('/')
    } else if (to.path === '/logout' && user.user?.token) {
        user.logout()
        next('/')
    } else {
        next()
    }
})

export default router