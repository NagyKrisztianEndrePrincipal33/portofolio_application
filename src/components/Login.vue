<template>
  <div id="login-container">
    <div class="logo-holder">
      <router-link class="navigation-link-logo" to="/"
        ><img class="logo" src="../assets/logo.png"
      /></router-link>
    </div>
    <div class="login-component">
      <h1>Sign in</h1>
      <form class="login-form" @submit.prevent="login">
        <p v-if="errors.length" class="error-field">
            <b>Please correct the following error(s):</b>
            <ul>
                <li class="error-list-item" :key="error" v-for="error in errors">{{error}}</li>
            </ul>
        </p>
        <div class="form-row form-field">
          <input type="email" placeholder="Email" v-model="email" required />
        </div>
        <div class="form-row form-field">
          <input
            :type="type"
            placeholder="Password"
            v-model="password"
            minlength="6"
            required
          />
          <span class="btn-show-pass" @click="showHidePass">
            <i :class="showPassIcon"></i>
          </span>
        </div>
        <a href="#" class="forgot-password">Forgot password?</a>
        <div class="actions">
          <button class="btn btn-login form-field">Sign in</button>
        </div>
      </form>
      <p>
        Don't have an account? <router-link to="/register" class="link-in-login">Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import firebase from "../database/firebase";
export default {
  name: "Login",
  data() {
    return {
        type: "password",
        showPassIcon: "fas fa-eye-slash",
        email: "",
        password: "",
        errors: [],
    };
  },
  methods: {
    login() {
      this.errors = [];
      // eslint-disable-next-line
      const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
      if (!emailReg.test(this.email)) {
        console.log("Email is not valid!");
        this.errors.push("Email is not valid!");
        return;
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          console.log(user);
          this.$store.commit("setAuthentication", true);
          this.$router.push("/");
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          console.log(errorCode);
          var errorMessage = error.message;
          this.errors.push(errorMessage);
        });
    },
    showHidePass() {
      if (this.type == "password") {
        this.type = "text";
        this.showPassIcon = "fas fa-eye";
      } else {
        this.type = "password";
        this.showPassIcon = "fas fa-eye-slash";
      }
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
#login-container {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell,
    "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  flex-direction: column;
}

.noAccount {
  font-size: 13px;
  color: #333333;
  margin-top: 30px;
}

.login-component {
  width: 390px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
  padding: 33px 55px 33px 55px;
  border-radius: 10px;
  margin: 0 auto;
  background: #fff;
  h1 {
    font-size: 3.2rem;
    line-height: 1.25;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.9);
    padding: 0 0 24px 0;
    text-align: left;
    margin-bottom: 20px;
  }
}

.actions {
  display: flex;
  flex-direction: row;
  padding-top: 16px;
  width: 100%;
}

.btn {
  border-radius: 25px;
  border: 0;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-size: 1.6rem;
  font-weight: 600;
  width: 100%;
  font-family: inherit;
  padding: 10px;
  text-align: center;
  vertical-align: middle;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

    
#login-container{
    width:100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f2f2f2;
}

.btn:hover {
  background: #015073;
}

.forgot-password {
  font-size: 16px;
  font-weight: 600;
  position: relative;
  left: -8px;
  margin-bottom: 12px;
  text-decoration: none;
  color: #2f9df7;
  display: flex;
  align-self: flex-start;
  padding: 0 12px;
}

.forgot-password:hover {
  color: #015073;
}

.form-row {
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom: 2px solid #adadad;
  margin-bottom: 32px;
  input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    outline: none;
    border: none;

    font-size: 1.15rem;
    opacity: 0.8;
  }
  box-sizing: border-box;
}

.btn-login {
  background-color: #2f9df7;
  color: white;
}

.login-form {
  display: flex;
  height: 100%;
  justify-content: space-evenly;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
}
.error-field {
  margin: 0;
  b {
    font-size: 0.75rem;
  }
  ul {
    margin: 0;
    margin-bottom: 5px;
    padding: 0;
  }
}
.error-list-item {
  list-style: none;
  font-size: 1rem;
  color: red;
}
.btn-show-pass {
  font-size: 18px;
  color: #999999;
  margin: auto;
  margin-right: 8px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  height: 100%;
  top: 0;
  right: 0;
  padding-right: 5px;
  cursor: pointer;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}
.btn-show-pass:hover {
  color: #6a7dfe;
  color: -webkit-linear-gradient(left, #21d4fd, #b721ff);
  color: -o-linear-gradient(left, #21d4fd, #b721ff);
  color: -moz-linear-gradient(left, #21d4fd, #b721ff);
  color: linear-gradient(left, #21d4fd, #b721ff);
}
.btn-show-pass.active {
  color: #6a7dfe;
  color: -webkit-linear-gradient(left, #21d4fd, #b721ff);
  color: -o-linear-gradient(left, #21d4fd, #b721ff);
  color: -moz-linear-gradient(left, #21d4fd, #b721ff);
  color: linear-gradient(left, #21d4fd, #b721ff);
}

.link-in-login {
  color: #2f9df7;
  text-decoration: none;
}

.link-in-login:hover {
  text-decoration: underline;
}

.logo-holder {
  display: flex;
  padding-bottom: 15px;
}

.logo {
  width: 128px;
  padding: 10px;
  background-color: #2f9df7;
  border-radius: 15px;
}
</style>
