import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/Home.vue";
import About from "@/components/About.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import ProfilePage from "@/components/ProfilePage.vue";
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
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/CV/:profile_id',
        name: 'profile_page',
        component: ProfilePage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;