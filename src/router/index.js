import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/Home.vue";
import About from "@/components/About.vue";
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
            if (store.state.authenticated == false) {
                next('/login');
            } else {
                next();
            }
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;