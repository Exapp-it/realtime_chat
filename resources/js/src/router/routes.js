import Index from '../pages/home/Index.vue'
import Login from '../pages/auth/Login.vue'
import Register from '../pages/auth/Register.vue'
import Dashboard from '../pages/dashboard/Index.vue'
import Error404 from '../pages/errors/Error_404.vue';

const routes = [
    { path: '/', component: Index, name: 'home.index' },
    { path: '/auth/login', component: Login, name: 'auth.login' },
    { path: '/auth/register', component: Register, name: 'auth.register' },
    { path: '/dashboard', component: Dashboard, name: 'dashboard.index' },
    { path: '/:pathMatch(.*)*', component: Error404, name: 'error' }
];

export default routes;
