<template>
  <nav class="navigation-bar">
    <i class="fas fa-users"></i>
    <router-link class="navigation-link" to="/">Home</router-link>
    <router-link class="navigation-link" to="/about">About</router-link>
    <div class="login-register" v-if="!user.loggedIn">
      <button @click="redirectToLogin">Login</button>
      <button @click="redirectToRegister">Register</button>
    </div>
    <div v-else>
      <button @click="logOut">Log out</button>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "../database/firebase";
export default {
  name: "NavigationBar",
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),
  },
  methods: {
    redirectToLogin() {
      this.$router.replace({ name: "login" });
    },
    redirectToRegister() {
      this.$router.replace({ name: "register" });
    },
    logOut() {
      console.log("Loggin out!");
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("Logged out!");
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    },
  },
};
</script>

<style scoped lang="scss">
$fa-font-path: "~@fortawesome/fontawesome-free/webfonts";
@import "~@fortawesome/fontawesome-free/scss/fontawesome";
@import "~@fortawesome/fontawesome-free/scss/solid"; // fas
@import "~@fortawesome/fontawesome-free/scss/regular"; // far
@import "~@fortawesome/fontawesome-free/scss/brands"; // fab
@import "./colors";

.navigation-bar {
  font-size: 1.5rem;
  background-color: $second-color;
  color: white;
  padding: 15px 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  .navigation-link {
    text-decoration: none;
    color: white;
    font-family: "sans-serif", cursive;
    font-size: 2rem;
  }
  .login-register {
    justify-self: end;
    display: flex;
    padding: 0 10px;
    gap: 10px;
    button {
      height: 100%;
      border-radius: 25px;
      border: none;
      padding: 10px;
    }
  }
}
</style>
