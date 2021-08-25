<template>
  <nav class="navigation-bar sticky">
    <div class="mobile-nav" :class="{ open: showNav }" v-if="mobileView">
      <ul>
        <li v-if="user.loggedIn">
          <img
            class="profile-image-mobile"
            v-if="user.loggedIn"
            src="../assets/default.png"
            @click="redirectToProfile"
          />
        </li>
        <li>
          <router-link class="navigation-link-mobile" to="/">Home</router-link>
        </li>
        <li>
          <router-link class="navigation-link-mobile" to="/about"
            >About</router-link
          >
        </li>
        <li v-if="!user.loggedIn">
          <button @click="redirectToRegister" class="register-button">
            Register
          </button>
        </li>
        <li v-if="!user.loggedIn">
          <button @click="redirectToLogin" class="login-button">Login</button>
        </li>
        <li v-else>
          <button @click="logOut" class="log-out">Log out</button>
        </li>
      </ul>
    </div>

    <div class="left-side">
      <router-link class="navigation-link-logo" to="/"
        ><img class="logo" src="../assets/logo.png"
      /></router-link>
    </div>

    <div class="middle" v-if="!mobileView">
      <router-link class="navigation-link" to="/">Home</router-link>
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
      <router-link class="navigation-link" to="/about">About</router-link>
    </div>

    <div class="middle" v-if="mobileView && user.loggedIn">
      <div class="searchBox">
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
    </div>

    <div class="right-side" style="width: 228px;">
      <div
        id="right-side navigation-icon "
        v-if="mobileView"
        @click="showNav = !showNav"
      >
        <i class="fas fa-bars"></i>
      </div>
      <div class="login-register" v-else-if="!user.loggedIn">
        <button @click="redirectToRegister" class="register-button">
          Register
        </button>
        <button @click="redirectToLogin" class="login-button">Login</button>
      </div>

      <div class="right-side" v-if="!mobileView">
        <img
          class="profile-image"
          v-if="user.loggedIn"
          src="../assets/default.png"
          @click="redirectToProfile"
        />
        <div v-if="user.loggedIn" class="log-out-button">
          <i @click="logOut" class="fas fa-sign-out-alt"></i>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "../database/firebase";

export default {
  data() {
    return {
      mobileView: false,
      showNav: false,
    };
  },
  created() {
    this.handleView();
    window.addEventListener("resize", this.handleView);
  },
  name: "NavigationBar",
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),
  },
  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 800;
    },
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
      this.showNav = false;
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

* {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell,
    "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif;
}

.navigation-bar {
  font-size: 1.5rem;
  background-color: #2f9df7;
  color: white;
  display: flex;
  align-items: center;
  vertical-align: middle;
  justify-content: space-between;
  padding: 0 45px 0 0px;
  .navigation-link {
    text-decoration: none;
    color: white;
    font-size: 1.5rem;
    padding: 16.5px 15px 16.5px 15px;
  }
  .navigation-link:hover {
    padding-top: 16.5px;
    padding-bottom: 16.5px;
    background-color: rgba($color: #000000, $alpha: 0.1);
  }
  .middle .router-link-active {
    padding-top: 16.5px;
    padding-bottom: 16.5px;
    border-bottom: 5px solid #015073;
    background-color: rgba($color: #000000, $alpha: 0.1);
  }

  .navigation-link-logo {
    text-decoration: none;
    color: white;
    font-size: 1.5rem;
    padding: 10px 15px;
    background-color: transparent;
    border: none;
  }
  .login-register {
    display: flex;
    justify-content: space-between;
    padding: 0 10px 0 0;
    gap: 10px;

    .login-button {
      display: flex;
      text-align: center;
      vertical-align: middle;
      border-radius: 24px;
      border: none;
      background: transparent;
      color: white;
      font-size: 16px;
      font-weight: 500;
      font-family: inherit;
      letter-spacing: 0.75px;
      padding: 12px 24px 12px 24px;
      border: 1px solid #015073;
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
    .register-button {
      border-radius: 24px;
      border: none;
      background: transparent;
      color: white;
      font-size: 16px;
      font-weight: 500;
      font-family: inherit;
      letter-spacing: 0.75px;
      padding: 12px 24px 12px 24px;
      border: 1px transparent;
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
    .login-button:hover {
      cursor: pointer;
      background: #015073;
    }
    .register-button:hover {
      cursor: pointer;
      background: #015073;
    }
  }
  .left-side {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 228px;
    margin: auto 0;
  }
  .middle {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0 auto;
  }
  .right-side {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 15px 0 0;
  }
  .profile-image {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    cursor: pointer;
  }

  .profile-image-mobile {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    cursor: pointer;
  }

  .logo {
    width: 128px;
    vertical-align: middle;
  }
}

.log-out-button {
  i {
    font-size: 1.9rem;
    vertical-align: middle;
  }
  margin: 0 20px 0 20px;
}

.log-out-button:hover {
  color: darkred;
}

#navigation-icon {
  cursor: pointer;
  i {
    font-size: 2rem;
  }
}

.fa-bars:hover {
  cursor: pointer;
  color: #015073;
}

.sticky {
  position: fixed;
  top: 0;
  width: 100%;
  opacity: 1;
}

.mobile-nav {
  color: black;
  display: none;
  position: absolute;
  top: 70px;
  left: calc(100% - 328px);
  box-sizing: border-box;
  margin: 0;
  height: auto;
  width: 328px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}

.open {
  display: block;
  background: #fff;
  border-top: 1px solid #2f9df7;
  border-bottom: 8px solid #2f9df7;
  border-left: 8px solid #2f9df7;
  transform: translateY(-8px);
  border-bottom-left-radius: 20px;
  opacity: 1;
  padding-right: 65px;
}

.navigation-link-mobile {
  color: rgba($color: #000000, $alpha: 0.9);
  font-weight: 400;
  text-decoration: none;
}

ul {
  padding: 0;
  list-style-type: none;
  line-height: 4rem;
  li:not(:last-child) {
    text-align: center;
    border-bottom: 2px solid rgba($color: #015073, $alpha: 0.3);
    .router-link-active {
      color: #2f9df7;
      text-decoration: underline;
      font-weight: bold;
    }
  }

  .register-button,
  .login-button {
    border: none;
    background: transparent;
    font-size: 24px;
    cursor: pointer;
  }
}
.log-out {
  color: darkred;
  border: none;
  background: transparent;
  font-weight: 500;
  font-size: 1.5rem;
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
  justify-content: center;
  align-items: center;
  padding-right: 5px;
  padding-left: 5px;
  margin: auto 15px;
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
  .fa-search {
    font-size: 1.15rem;
  }
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
  border: 2px solid #2f9df7;
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
</style>
