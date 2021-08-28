<template>
  <navigation-bar :user="user"></navigation-bar>
  <div class="initial-padding"></div>

  <div v-for="result in searchResult" :key="result">
    <div v-if="result.job || result.skills" class="row">
      <div class="post">
        <router-link
          class="navigation-link"
          :to="{ name: 'profile_page', params: { webid: result.webid } }"
          ><div class="name">
            {{ result.firstName + " " + result.lastName }}
          </div></router-link
        >
      </div>

      <label v-if="result.skills" class="skill-label">
        Skills:
      </label>
      <div
        v-if="result.skills && result.skills.length != 0"
        class="skill-container"
      >
        <div v-for="skill in result.skills" :key="skill">
          <div class="skill">
            {{ skill }}
          </div>
        </div>
      </div>
      <label v-if="result.job" class="job-label">
        Current Job:
      </label>
      <div class="job">{{ result.job }}</div>
    </div>
  </div>
</template>

<script>
import NavigationBar from "./NavigationBar";
import firebase from "../database/firebase";
import { FireSQL } from "firesql";

export default {
  name: "SearchPage",
  data() {
    return {
      searchResult: [],
    };
  },
  components: { NavigationBar },
  mounted() {
    this.search(this.$route.params.searchText);
  },

  beforeRouteUpdate(to, from, next) {
    this.searchText = to.params.searchText;
    this.search(to.params.searchText);
    next();
  },
  methods: {
    search(text) {
      text = text[0].toUpperCase() + text.substring(1);
      this.searchResult = [];
      console.log("word", text);
      if (text.includes("!skill")) {
        console.log(text);
        this.searchSkill(text);
      } else {
        this.searchName(text);
      }
    },
    searchSkill(text) {
      text = text.replace("!skill", "");
      text = text.toLowerCase();
      text = text.trim();
      console.log(text);
      firebase
        .firestore()
        .collection("users")
        .where("skills_lowercase", "array-contains", text)
        .get()
        .then((doc) => {
          doc.forEach((element) => {
            console.log(element.data());

            const data = {
              firstName: element.data().firstName,
              lastName: element.data().lastName,
              skills: element.data().skills,
              job: element.data().job,
              webid: element.data().webid,
            };
            this.searchResult.push(data);
          });
        });
    },
    getLength() {
      return this.searchResult.length;
    },
    searchName(text) {
      const fireSQL = new FireSQL(firebase.firestore());
      const usersPromis = fireSQL.query(
        `SELECT firstName,lastName, skills, job, webid
            FROM users
            WHERE firstName like '${text}%'
            OR lastName like '${text}%'`
      );
      usersPromis.then((users) => {
        for (const user of users) {
          console.log(`${user.firstName}, ${user.skills}`);
          this.searchResult.push(user);
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.row {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  border: solid black;
  border-radius: 10px;
  padding: 5px;
  width: 80%;
  margin-top: 20px;
}

.skill-container {
  display: grid;
  grid-template-columns: repeat(4, 3fr);
}

.skill {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  -webkit-box-shadow: 0 0 20px grey;
  -moz-box-shadow: 0 0 20px grey;
  box-shadow: 0 0 20px grey;
  border-radius: 10px;
}

.name {
  padding-right: 1em;
}

label {
  padding-right: 1em;
}

.initial-padding {
  padding-top: 90px;
}
</style>
