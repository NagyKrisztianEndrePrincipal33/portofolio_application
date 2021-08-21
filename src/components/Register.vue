<template>
  <div id="register-container">
    <div class="register-component">
      <h1>Register</h1>
      <form class="register-form" @submit.prevent="register">
        <p v-if="errors.length" class="error-field">
          <b>Please correct the following error(s):</b>
          <ul>
            <li class="error-list-item" :key="error" v-for="error in errors">{{error}}</li>
          </ul>
        </p>
        <div class="form-row">
          <label>Email:</label>
          <input type="email" v-model="email" required placeholder="Email"/>
        </div>
        <div class="form-row">
        <label>Password:</label>
        <input type="password" v-model="password" required minlength="6" placeholder="Password"/>
        </div>
        <div class="form-row">
        <label>Re-type password:</label>
        <input
          type="password"
          v-model="retypedPassword"
          required
          minlength="6"
          placeholder="Retype password"
        />
        </div>
        <button class="submit-button" :disabled="!submitIsActive">Submit</button>
      </form>
      <p>Do you allready have an account? <router-link to="/login" class="link-in-register">Login</router-link></p>
    </div>
  </div>
</template>

<script>
import firebase from "../database/firebase";

export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      retypedPassword: "",
      submitIsActive: true,
      errors:[],
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
    register() {
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
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          console.log(user);
          this.$router.push("/login");
          // ...
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
  },
};
</script>

<style scoped lang="scss">
@import "./colors";

#register-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.register-component {
  display: flex;
  flex-direction: column;
  height: auto;
  background-color: $first-color;
  padding: 15px;
  border-radius: 25px;
  color: white;
  min-width: 50vw;
  min-height: 50vh;
  font-size: 1.5rem;
}
.register-form{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .form-row{
    display: flex;
    flex-direction: column;
    margin: 5px 0;
    input{
      margin-top:5px;
      padding:10px;
      border-radius: 25px;
      border:none;
      outline:none;
    }
    label{
      text-align: start;
    }
  }
  .submit-button{
      margin:15px 0;
      padding:15px;
      font-size: 2rem;
      border-radius: 25px;
      border:none;
  }
  
 .error-field{
   margin:0;
   b{
     font-size: 0.75rem;
   }
   ul{
     margin:0;
    margin-bottom:5px;
    padding:0;
   }
 } 
      .error-list-item{
        list-style: none;
        font-size: 1rem;
        color:red;
      }
}

.link-in-register{
  color:cyan;
}
</style>
