<template>
    <div id="login-container">
        <div class="login-component">
            <h2>Login</h2>
<<<<<<< HEAD
            <form class="login-form" @submit.prevent="login">
                <p v-if="errors.length" class="error-field">
                    <b>Please correct the following error(s):</b>
                    <ul>
                        <li class="error-list-item" :key="error" v-for="error in errors">{{error}}</li>
                    </ul>
                    </p>
                <div class="form-row form-field">
                    <label>Email:</label>
                    <input type="email" placeholder="Email" v-model="email" required>
                </div>
                <div class="form-row form-field">
                    <label>Password:</label>
                    <input type="password" placeholder="Password" v-model="password" minlength="6" required>
=======
            <p>Are you new here? <router-link to="/register">Register</router-link></p>
            <form class="login-form" @submit.prevent="login">
                <div class="form-row form-field">
                    <label>Email:</label>
                    <input type="email" placeholder="Email" v-model="email">
                </div>
                <div class="form-row form-field">
                    <label>Password:</label>
                    <input type="password" placeholder="Password" v-model="password">
>>>>>>> 397836d231ecdc344bc6d4862d3eb1d6bb070996
                </div>
                <button class="btn btn-login form-field">Login <i class="fas fa-arrow-right"></i></button>
                
            </form>
<<<<<<< HEAD
            <p>Are you new here? <router-link to="/register">Register</router-link></p>
=======
>>>>>>> 397836d231ecdc344bc6d4862d3eb1d6bb070996
        </div>
    </div>
</template>

<script>
<<<<<<< HEAD
import firebase from "../database/firebase";
=======
>>>>>>> 397836d231ecdc344bc6d4862d3eb1d6bb070996
export default {
    name:"Login",
    data(){
        return{
            email:"",
            password:"",
<<<<<<< HEAD
            errors:[],
=======
>>>>>>> 397836d231ecdc344bc6d4862d3eb1d6bb070996
        }
    },
    methods:{
        login(){
<<<<<<< HEAD
            this.errors = [];
            // eslint-disable-next-line
            const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
            if (!emailReg.test(this.email)) {
                console.log("Email is not valid!");
                this.errors.push("Email is not valid!");
                return;
            }
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    console.log(user);
                    this.$store.commit("setAuthentication",true);
                    this.$router.push("/");
                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    console.log(errorCode);
                    var errorMessage = error.message;
                    this.errors.push(errorMessage);
                });
=======

>>>>>>> 397836d231ecdc344bc6d4862d3eb1d6bb070996
        }
    }
}
</script>
 
 <style scoped lang="scss">
 $fa-font-path: "~@fortawesome/fontawesome-free/webfonts";
@import "~@fortawesome/fontawesome-free/scss/fontawesome";
@import "~@fortawesome/fontawesome-free/scss/solid"; // fas
@import "~@fortawesome/fontawesome-free/scss/regular"; // far
@import "~@fortawesome/fontawesome-free/scss/brands"; // fab
    @import "./colors";
    #login-container{
        width:100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $third-color;

    }

    .login-component{
        min-width: 60vw;
        min-height: 60vh;
        background-color: white;
        border-radius: 25px;
        box-shadow: 2px 2px 10px rgba(0,0,0,0.5);
        padding:15px;
        h2{
            margin:10px auto;    
        }
        box-sizing: border-box;
    }

    .btn{
        padding:10px 15px;
        outline: none;
        border:none;
        border-radius: 25px;
        min-width: 30%;
        max-width: 70%;
        font-size: 1.25rem;
    }

    .form-field{
        margin:10px 0;
    }

    .form-row{
        display: flex;
        flex-direction: column;
        align-self: stretch;
        label{
            align-self: flex-start;
            margin: 5px 0;
            box-sizing: border-box;
<<<<<<< HEAD
            padding:10px;   
=======
            padding:10px;
>>>>>>> 397836d231ecdc344bc6d4862d3eb1d6bb070996
        }
        input{
            width: 100%;
            padding:10px;
            box-sizing: border-box;
            outline: none;
            border:none;
            border-radius: 25px;
            font-size: 1.25rem;
           box-shadow: 2px 2px 10px rgba(0,0,0,0.5);
        }
        box-sizing: border-box;
    }

    .btn-login{
        background-color: $third-color;
        color:white;
    }

    .login-form{
        display: flex;
        height: 100%;
        justify-content: space-evenly;
        flex-direction: column;
        box-sizing: border-box;
        align-items: center;
    }
<<<<<<< HEAD
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
=======
>>>>>>> 397836d231ecdc344bc6d4862d3eb1d6bb070996
 </style>