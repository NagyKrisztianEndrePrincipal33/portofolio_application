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
          <h2>Timi Draghici</h2>
          <h4>Ajutor Programator</h4>
          <p>This is a description.This is a description.This is a description.This is a description.This is a description.This is a description.This is a description.This is a description.This is a description.This is a description.</p>
        </div>
      </div>
      <div class="rows">
        <div class="experience glow">
          Proiect1
          <br>Proiect2
          <br>Proiect3
          <br>Proiect4
        </div>
        <div class="education glow">
          Liceul Tehnologic Nr.1 Ludus
          <br><br>Informatica UMFST
        </div>
      </div>
      <div class="rows">
        <div class="grid-wrapper glow">
          <div class="title">
            <h2> Skills </h2>
          </div>
          <div class="skills">
            <div class="skills_div">HTML</div>
            <div class="skills_div">CSS</div>
            <div class="skills_div">Javascript</div>
            <div class="skills_div">VueJS</div>
            <div class="skills_div">Firebase</div>
            <div class="skills_div">Bootstrap</div>
            <div class="skills_div">Bootstrap</div>
          </div>
        </div>
        <div class="grid-wrapper glow">
          <div class="title">
            <h2> Hobbies </h2>
          </div>
          <div class="hobbies">
            <div>Airsoft</div>
            <div>Fishing</div>
            <div>Off-road</div>
          </div>
        </div>
      </div>
      <div class="bottom-row">
        <div class="bottom-left">
          SocialMedia
        </div>
        <div class="bottom-right">
          GITHUB
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from "./NavigationBar";
import {mapGetters} from "vuex";
export default {
  name: "Home",
  components: {
    NavigationBar,
  },
  computed:{
    ...mapGetters({
      user:"user",
    })
  }
};
</script>

<style scoped lang="scss">

.wrapper {
  height: 100%;
  display: flex;
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

.bottom-left {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}

.bottom-right {
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: 20px;
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

</style>
