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
    <div v-if="user.loggedIn" class="searchBox">
      <input
        class="searchInput"
        type="text"
        name=""
        placeholder="Search"
        v-model="searchText"
      />
      <button
        class="searchButton"
        href="#"
        @click="redirectToSearch(searchText)"
      >
        <i class="fas fa-search"></i>
      </button>
    </div>
    <div class="right-side">
      <button @click="redirectToEdit">Edit</button>
      <img
        class="profile-image"
        src="../assets/default.png"
        @click="redirectToProfile"
      />
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "../database/firebase";
import { mdiAccountSearchOutline } from "@mdi/js";

export default {
  data: () => ({
    icons: {
      mdiAccountSearchOutline,
    },
  }),
  name: "NavigationBar",
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),
  },
  methods: {
    redirectToSearch(searchText) {
      this.$router.replace({
        name: "search_page",
        params: { searchText: searchText },
      });
    },

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
    redirectToProfile() {
      console.log(this.user);
      console.log(this.user.data.uid);
      firebase
        .firestore()
        .collection("users")
        .where("uid", "==", this.user.data.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.$router.replace("/CV/" + doc.data().webid);
          });
        });
    },
    redirectToEdit() {
      firebase
        .firestore()
        .collection("users")
        .where("uid", "==", this.user.data.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.$router.replace("/edit/" + doc.data().webid);
          });
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
  .right-side {
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: 5px;
  }
  .profile-image {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    cursor: pointer;
  }

  /*Search bar part*/
  .searchBox {
    display: flex;
    flex-wrap: nowrap;
    background: #165572;
    height: 50px;
    border-radius: 50px;
    vertical-align: middle;
    justify-items: center;
    align-items: center;
    padding-right: 5px;
    padding-left: 5px;
  }

  .searchBox:hover > .searchInput,
  .searchInput:focus {
    width: 240px;
    padding: 0 6px;
  }

  .searchInput:focus + .searchButton,
  .searchBox:hover > .searchButton {
    background: white;
    color: #165572;
  }

  .searchBox:focus-within {
    padding-right: 0;
  }

  .searchInput:focus + .searchButton {
    width: 50px;
    height: 50px;
  }

  .searchButton {
    color: white;
    float: right;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #165572;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.4s;
    border: 2px solid #4498be;
  }

  .searchInput {
    border: none;
    background: none;
    outline: none;
    float: left;
    padding: 0;
    color: white;
    font-size: 16px;
    transition: 0.4s;
    line-height: 40px;
    width: 0px;
  }

  @media screen and (max-width: 620px) {
    .searchBox:hover > .searchInput,
    .searchInput:focus {
      width: 150px;
      padding: 0 6px;
    }
  }
  /*Search bar part end*/
}
</style>
