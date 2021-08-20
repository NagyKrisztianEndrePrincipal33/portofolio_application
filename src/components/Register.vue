<template>
  <div id="register-container">
    <div class="register-component">
      <form @submit.prevent="register">
        <label>Email:</label>
        <input type="email" v-model="email" required />
        <label>Password:</label>
        <input type="password" v-model="password" required />
        <label>Re-type password:</label>
        <input type="password" v-model="retypedPassword" required />
        <button :disabled="!submitIsActive">Submit</button>
      </form>
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
      console.log("register");
    //   const re = /^(([^<>()[].,;:\s@"]+(.[^<>()[].,;:\s@"]+)*)|(".+"))@(([^<>()[].,;:\s@"]+.)+[^<>()[].,;:\s@"]{2,})$/i;
    //   if (!re.test(this.email)) {
    //     console.log("Email is not valid!");
    //     return;
    //   }

      if (this.password !== this.retypedPassword) {
        console.log("The two passwords should match!");
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
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
  flex-direction: row;
  height: auto;
  background-color: $first-color;
  padding: 15px;
  border-radius: 25px;
  color: white;
}
</style>
