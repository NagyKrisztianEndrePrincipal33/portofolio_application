<template>
  <navigation-bar :user="user"></navigation-bar>
  <div class="initial-padding"></div>

  <div v-for="result in searchResult" :key="result">
    <div v-if="result.job || result.skills">
      <div class="post">
        {{ grouping(result) }}
        <div class="name">
          <div class="img-name">
            <router-link
              class="navigation-link"
              :to="{
                name: 'profile_page',
                params: { webid: result.webid },
              }"
            >
              <img
                class="profile-pic"
                :src="result.profilePic"
                style="width: 50px; height: 50px;"
            /></router-link>
            <router-link
              class="navigation-link"
              :to="{
                name: 'profile_page',
                params: { webid: result.webid },
              }"
              ><div class="name">
                {{ result.firstName + " " + result.lastName }}
              </div></router-link
            >
          </div>
          <div class="job-holder">
            <div class="job">{{ result.job }}</div>
          </div>
        </div>

        <hr />

        <h2 v-if="result.skills" class="h4 mb-3 text-left">
          Professional Skills
        </h2>

        <div
          class="skills"
          v-if="
            result.skills && result.skills.length != 0 && result.skillExperience
          "
        >
          {{
            sortSkills(
              this.$route.params.searchText.replace("!skill", "").trim()
            )
          }}
          <div
            class="col-md-5"
            v-for="(skill, index) in combinedSkills.slice(0, 3)"
            :key="index"
          >
            <p
              class="mb-2"
              :class="
                skill.skillName ==
                this.$route.params.searchText.replace('!skill', '').trim()
                  ? 'searched-result-text'
                  : ''
              "
            >
              {{ skill.skillName }}
            </p>
            <div class="progress my-1">
              <div
                class="progress-bar"
                role="progressbar"
                :style="{ width: skill.skillExp }"
                :aria-valuenow="{ width: skill.skillExp }"
                aria-valuemin="0"
                aria-valuemax="100"
                :class="
                  skill.skillName ==
                  this.$route.params.searchText.replace('!skill', '').trim()
                    ? 'searched-result'
                    : ''
                "
              ></div>
            </div>
          </div>
        </div>

        <div class="button">
          <button class="view-more">Visit profile</button>
        </div>
      </div>
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
      combinedSkills: [],
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
    sortSkills(text) {
      this.combinedSkills = this.combinedSkills.sort((a, b) => {
        if (
          a.skillName.toLowerCase().indexOf(text.toLowerCase()) >
          b.skillName.toLowerCase().indexOf(text.toLowerCase())
        ) {
          return -1;
        } else if (
          a.skillName.toLowerCase().indexOf(text.toLowerCase()) <
          b.skillName.toLowerCase().indexOf(text.toLowerCase())
        ) {
          return 1;
        } else {
          if (a.name > b.name) return 1;
          else return -1;
        }
      });
    },
    grouping(result) {
      this.combinedSkills = result.skills.map((x, i) => {
        return { skillName: x, skillExp: result.skillExperience[i] };
      });
    },
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
    async searchSkill(text) {
      text = text.replace("!skill", "");
      text = text.toLowerCase();
      text = text.trim();

      await firebase
        .firestore()
        .collection("users")
        .where("skills_lowercase", "array-contains", text)
        .get()
        .then(async (doc) => {
          doc.forEach(async (element) => {
            const data = {
              firstName: element.data().firstName,
              lastName: element.data().lastName,
              skills: element.data().skills,
              skillExperience: element.data().skillExperience,
              job: element.data().job,
              webid: element.data().webid,
            };
            await firebase
              .storage()
              .ref()
              .child(element.data().webid)
              .getDownloadURL()
              .then(async (url) => {
                data.profilePic = url;
              });
            this.searchResult.push(data);
          });
        });

      this.combinedSkills = this.sortSkills(text);
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
.post {
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  margin: 0 auto;
  padding: auto;
  margin-top: 2rem;
  background-color: #fff;
  max-width: 800px;
}

.navigation-link {
  color: rgba($color: #000000, $alpha: 0.8);
  text-decoration: none;
}

.navigation-link:hover {
  cursor: pointer;
  text-decoration: underline;
}

.name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px;
}

.name-holder {
  margin-left: 10px;
  text-align: left;
}

.profile-pic {
  display: flex;
  width: 300;
  height: auto;
  border-radius: 50%;
}
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

.text-left {
  text-align: left;
  margin-left: 15px;
}

hr {
  margin: 0px 15px 15px 15px;
  opacity: 0.15;
}

.img-name {
  display: flex;
  align-items: center;
}

.job-holder {
  display: flex;
}

.my-1 {
  margin-top: 0.5rem !important;
  margin-bottom: 0.5rem !important;
  transition: width 3s ease;
}

.progress {
  display: flex;
  height: 1rem;
  overflow: hidden;
  font-size: 0.75rem;
  background-color: #e9ecef;
  border-radius: 0.25rem;
  transition: width 3s ease;
}

.progress-bar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  background-color: #4a89dc;
  transition: width 3s ease;
  animation: progress-bar-stripes 2s linear;
}

.button {
  display: flex;
  justify-content: center;
}

.view-more {
  border-radius: 20px;
  border: none;
  background-color: #4a89dc;
  color: #fff;
  padding: 10px 24px;
  margin-top: 30px;
  margin-bottom: 30px;
  font-weight: 400;
  letter-spacing: 0.8px;
  transition: 0.3s ease-in-out;
}

.view-more:hover {
  background-color: #00acee;
}

.searched-result {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  background-color: #94f18b;
  transition: width 3s ease;
  animation: progress-bar-stripes 2s linear;
}

.searched-result-text {
  font-weight: bold;
}

.progress-bar:hover {
  background-color: #2f9df7;
}

@keyframes progress-bar-stripes {
  0% {
    width: 0%;
    left: 0;
    right: 0;
  }
}

.skills {
  display: flex;
  flex-direction: column;
  flex-flow: column wrap;
  align-items: center;
}
</style>
