import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./vuex";
import firebase from "./database/firebase";

firebase.auth().onAuthStateChanged((user) => {
  store.dispatch("fetchUser", user);
});

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
