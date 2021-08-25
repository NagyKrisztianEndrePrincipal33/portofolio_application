import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/Home.vue";
import About from "@/components/About.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import ProfilePage from "@/components/ProfilePage.vue";
import EditPage from "@/components/EditPage.vue";
import SearchPage from "@/components/SearchPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/CV/:webid",
    name: "profile_page",
    component: ProfilePage,
  },
  {
    path: "/edit/:webid",
    name: "edit_page",
    component: EditPage,
  },
  {
    path: "/search/:searchText",
    name: "search_page",
    component: SearchPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
