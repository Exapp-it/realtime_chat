import { createRouter, createWebHistory } from "vue-router";
import routes from './routes.js'

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    routes,
});

const checkAccess = (to, from, next) => {
    const accessToken = localStorage.accessToken;

    if (to.name !== 'auth.login' && to.name !== 'auth.register') {
        if (!accessToken) {
            return next({
                name: 'auth.login'
            });
        }
    }

    if ((to.name === 'auth.login' || to.name === 'auth.register') && accessToken) {
        return next({
            name: 'dashboard.index'
        });
    }

    next();
};

router.beforeEach(checkAccess);

export default router;
