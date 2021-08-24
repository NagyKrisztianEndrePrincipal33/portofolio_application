<template>
  <navigation-bar :user="user"></navigation-bar>
  <p v-if="user.loggedIn">You are logged in!{{user.data}}</p>
  <div class="wrapper">
    <div class="container glow">
      <div class="rows">
        <div class="picture">
          <img src="../assets/default.png">
        </div>
        <div class="description glow">
          <h2>{{firstName + " " + lastName}}</h2>
          <h4>{{job}}</h4>
          <p>{{description}}</p>
        </div>
      </div>
      <div class="rows">
        <div class="experience glow">
          <div v-for="item in experience" :key="item">
            {{item}}
          </div>
        </div>
        <div class="education glow">
          <div v-for="item in education" :key="item">
            {{item}}
          </div>
        </div>
      </div>
      <div class="rows">
        <div class="grid-wrapper glow">
          <div class="title">
            <h2> Skills </h2>
          </div>
          <div class="skills">
            <div v-for="item in skills" :key="item">
              {{item}}
            </div>
          </div>
        </div>
        <div class="grid-wrapper glow">
          <div class="title">
            <h2> Hobbies </h2>
          </div>
          <div class="hobbies">
            <div v-for="item in hobbies" :key="item">
              {{item}}
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-row">
        <div class="bottom-left">
          <img src="../assets/email.png">
          {{contact}}
        </div>
        <div class="bottom-right">
          <img src="../assets/github_logo.png">
          <a :href="github">{{github}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from "./NavigationBar";
import {mapGetters} from "vuex";
import firebase from "../database/firebase";
export default {
  name: "Home",
  data () {
    return {
      firstName: "",
      lastName: "",
      job: "",
      description: "",
      experience: [],
      education: [],
      skills: [],
      hobbies: [],
      github: "",
      contact: "",
    }
  },
  components: {
    NavigationBar,
  },
  computed:{
    ...mapGetters({
      user:"user",
    })
  },
  mounted () {
    this.GetData()
  },
  methods: {
    async GetData () {
      setTimeout(function () { this.GetData() }.bind(this), 500)
      if(this.user.data.uid != null) {
        await firebase.firestore().collection('users').where('uid','==',this.user.data.uid).get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.firstName = doc.data().firstName
            this.lastName = doc.data().lastName
            this.job = doc.data().job
            this.description = doc.data().description
            this.experience = doc.data().experience
            this.education = doc.data().education
            this.skills = doc.data().skills
            this.hobbies = doc.data().hobbies
            this.github = doc.data().github
            this.contact = doc.data().contact
          })
        })
      }
    }
  }
};
</script>

<style scoped lang="scss">

.wrapper {
  height: 100%;
  display: flex;
  font-size: 14px;
}

.container {
  width: 600px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  border: solid black;
  border-radius:10px;
  padding: 5px;
}

.rows {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 20px;
}

.picture {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.picture img {
  width: 200px;
  height: 200px;
  border-radius: 100%;
}

.description {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: auto;
  width: 50%;
  border-radius:10px;
  padding: 15px;
  margin-right: 20px;
}

.description h4 {
  margin-top: 0px;
  padding-top: 0px;
}

.description p {
  text-align: start;
}

.experience {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 40%;
  border-radius:10px;
  padding: 15px;
  margin-left: 20px;
}

.education {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 40%;
  border-radius:10px;
  padding: 15px;
  margin-left: 20px;
}

.grid-wrapper {
  display: flex;
  flex-direction: column;
  width: 40%;
  border-radius: 10px;
  padding: 15px;
  margin-left: 20px;
}

.skills {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.skills div {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  -webkit-box-shadow:0 0 20px grey; 
  -moz-box-shadow: 0 0 20px grey; 
  box-shadow:0 0 20px grey;
  border-radius: 10px;
}

.hobbies {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.hobbies div {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  -webkit-box-shadow:0 0 20px grey; 
  -moz-box-shadow: 0 0 20px grey; 
  box-shadow:0 0 20px grey;
  border-radius: 10px;
}

.bottom-row {
  display: flex;
  flex-direction: row;
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  border: solid black;
  border-radius:10px;
  padding: 15px;
}

.bottom-row img {
  width: 30px;
  height: 30px;
}

.bottom-left {
  display: flex;
  align-items: center;
  margin-left: 5px;
}

.bottom-right {
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 5px;
}

.glow {
  -webkit-box-shadow:0 0 20px grey;
  -moz-box-shadow: 0 0 20px grey; 
  box-shadow:0 0 20px grey;
}

.title  h2{
  display: flex;
  margin-top: 0px;
}

@media only screen and (max-width: 620px) {

   .wrapper { 
      font-size: 10px; 
   }
}
</style>
