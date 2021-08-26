<template>
  <div id="register-container">
    <div class="register-component">
      <div class="logo-holder">
        <h1>Sign up</h1>
        <router-link class="navigation-link-logo" to="/"
          ><img class="logo" src="../assets/logo.png"
        /></router-link>
      </div>
      
      <form class="register-form" @submit.prevent="register">
        <p v-if="errors.length" class="error-field">
          <b>Please correct the following error(s):</b>
          <ul>
            <li class="error-list-item" :key="error" v-for="error in errors">{{error}}</li>
          </ul>
        </p>
        <div class="form-row">
          <input
            type="text"
            v-model="firstName"
            placeholder="First name"
            required
          />
        </div>
        <div class="form-row">
          <input
            type="text"
            v-model="lastName"
            placeholder="Last name"
            required
          />
        </div>
        <div class="form-row">
          <input type="email" v-model="email" required placeholder="Email" />
        </div>
        <div class="form-row">
          <input
            :type="type"
            v-model="password"
            required
            minlength="6"
            placeholder="Password"
          />
          <span class="btn-show-pass" @click="showHidePass">
            <i :class="showPassIcon"></i>
          </span>
        </div>
        <div class="form-row">
          <input
            :type="typeR"
            v-model="retypedPassword"
            required
            minlength="6"
            placeholder="Re-type password"
          />
          <span class="btn-show-pass" @click="showHideRPass">
            <i :class="showPassIconR"></i>
          </span>
        </div>
        <div class="terms">
          <p>
            By clicking Agree & Join, you agree to the
            <a href="#">User Agreement</a>, <a href="#">Privacy Policy</a>, and
            <a href="#">Cookie Policy</a>.
          </p>
        </div>
        <div class="actions">
          <button class="submit-button" :disabled="!submitIsActive">
            Agree & Join
          </button>
        </div>
      </form>
      <p>
        Do you allready have an account?
        <router-link to="/login" class="link-in-register">Sign in</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import firebase from "../database/firebase";

export default {
  name: "Register",
  data() {
    return {
      type: "password",
      typeR: "password",
      showPassIcon: "fas fa-eye-slash",
      showPassIconR: "fas fa-eye-slash",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      retypedPassword: "",
      submitIsActive: true,
      errors: [],
    };
  },
  watch: {
    retypedPassword(value) {
      if (value !== this.password) {
        this.submitIsActive = false;
        console.log("Error in wathcer:The two passwords should match!");
      } else {
        this.submitIsActive = true;
      }
    },
  },
  
  methods: {
    async register() {
      this.errors = [];
      console.log("register");
      // eslint-disable-next-line
      const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
      if (!emailReg.test(this.email)) {
        console.log("Email is not valid!");
        this.errors.push("Email is not valid!");
        return;
      }

      if (this.password !== this.retypedPassword) {
        console.log("The two passwords should match!");
        this.errors.push("The two password field should match!");
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(async (userCredential) => {
          // Signed in
          var user = userCredential.user;
          // ...
          let tempid = this.firstName.toLowerCase() + "."+this.lastName.toLowerCase();
          let res = await this.getMatches(tempid)
          let webid;
          if(res.size==0)
          {
            webid = this.firstName.toLowerCase()+"."+this.lastName.toLowerCase();
          }
          else
          {
            webid = this.firstName.toLowerCase()+"."+this.lastName.toLowerCase()+res.size;
          }
          console.log(webid);
          const data = {
            uid : user.uid,
            firstName : this.firstName,
            lastName : this.lastName,
            webid,
            createdAt : new Date()
          }
          firebase.firestore().collection('users').doc().set(data);
          
          this.$router.push("/login");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          this.errors.push(errorMessage);
          // ..
        });
     
    },
    async getMatches(id){
        return firebase.firestore().collection('users').where('webid',">=",id).get(); //await debug test case
        //
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
    showHideRPass() {
      if (this.typeR == "password") {
        this.typeR = "text";
        this.showPassIconR = "fas fa-eye";
      } else {
        this.typeR = "password";
        this.showPassIconR = "fas fa-eye-slash";
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

#register-container {
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
.register-component {
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
.register-form {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  .terms {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.65);
  }

  .terms a {
    text-decoration: none;
    color: #2f9df7;
  }

  .terms a:hover {
    text-decoration: underline;
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
      font-size: 1.05rem;
      opacity: 0.8;
    }
    box-sizing: border-box;
  }

  .actions {
    display: flex;
    flex-direction: row;
    padding-top: 16px;
    width: 100%;
  }
  .submit-button {
    border-radius: 25px;
    border: 0;
    background-color: #2f9df7;
    color: white;
    cursor: pointer;
    display: inline-block;
    font-size: 1.5rem;
    font-weight: 500;
    width: 100%;
    font-family: inherit;
    padding: 10px;
    text-align: center;
    vertical-align: middle;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  .submit-button:hover {
    background: #015073;
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
}

.link-in-register {
  color: #2f9df7;
  text-decoration: none;
}

.link-in-register:hover {
  text-decoration: underline;
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

.logo-holder {
  display: flex;
  padding-bottom: 15px;
  justify-content: space-between;
}

.navigation-link-logo {
  margin: auto 0;
}

.logo {
  width: 128px;
  padding: 10px;
  background-color: #2f9df7;
  border-radius: 15px;
}
</style>
