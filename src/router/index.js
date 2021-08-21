import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/Home.vue";
import About from "@/components/About.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import store from "../vuex";

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        component: About,
        beforeEnter: (to, from, next) => {
            if (store.state.user.loggedIn == false) {
                next('/login');
            } else {
                next();
            }
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter: (to, from, next) => {
            if (store.state.user.loggedIn == false) {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        beforeEnter: (to, from, next) => {
            if (store.state.user.loggedIn == false) {
                next();
            } else {
                next(false);
            }
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;