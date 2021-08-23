<template>
  <navigation-bar :user="user"></navigation-bar>
  <p v-if="user.loggedIn">You are logged in!{{user.data}}</p>
  <div class="wrapper">
    <div class="container">
      <div class="rows">
        <div class="picture">
          <img src="../assets/default.png">
        </div>
        <div class="description">
          <h2>Timi Draghici</h2>
          <h4>Ajutor Programator</h4>
          <p>This is a description.This is a description.This is a description.This is a description.This is a description.This is a description.This is a description.This is a description.This is a description.This is a description.</p>
        </div>
      </div>
      <div class="rows">
        <div class="experience">
          Proiect1
          <br>Proiect2
          <br>Proiect3
          <br>Proiect4
        </div>
        <div class="education">
          Liceul Tehnologic Nr.1 Ludus
          <br><br>Informatica UMFST Facultatea de inginerie si Tehnologia Informatiei
        </div>
      </div>
      <div class="rows">
        <div class="skills">
          <div>HTML</div>
          <div>CSS</div>
          <div>Javascript</div>
          <div>VueJS</div>
          <div>Firebase</div>
          <div>Bootstrap</div>
        </div>
        <div class="hobbies">
          <div>Airsoft</div>
          <div>Fishing</div>
          <div>Off-road</div>
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
  width: 55%;
  border: solid black;
  border-radius:10px;
  padding: 5px;
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
  width: 50%;
  margin-left: 20px;
  border: solid black;
  border-radius:10px;
  padding: 5px;
}

.education {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 35%;
  margin-right: 20px;
  margin-left: auto;
  border: solid black;
  border-radius:10px;
  padding: 5px;
}

.skills {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 50%;
  margin-left: 20px;
  border: solid black;
  border-radius:10px;
  padding: 5px;
}

.skills  div{
  padding: 10px;
  background-color: black;
  color: white;
}

.hobbies {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 35%;
  margin-left: auto;
  margin-right: 20px;
  border: solid black;
  border-radius:10px;
  padding: 5px;
}

.hobbies div{
  padding: 10px;
  background-color: black;
  color: white;
}

.bottom-row {
  display: flex;
  flex-direction: row;
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  border: solid black;
  border-radius:10px;
  padding: 5px;
}

.bottom-left{
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}

.bottom-right{
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: 20px;
}

</style>
