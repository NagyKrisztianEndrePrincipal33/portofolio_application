<template>
  <navigation-bar :user="user"></navigation-bar>
  <div class="wrapper">
    <div class="container glow">
      <div class="rows">
        <div class="picture">
          <img :src="picURL" @click="$refs.file.click()" />
          <input type="file" ref="file" @change="UploadImage($refs.file.files[0])" style="display: none" />
        </div>
        <div class="description glow">
          <h2>{{ firstName + " " + lastName }}</h2>
          <h4>{{ job }}</h4>
          <p>{{ description }}</p>
        </div>
      </div>
      <div class="rows">
        <div v-if="edit_experience == false" class="experience glow">
          <div class="title">
            <h2>
              Experience
              <i
                class="fas fa-user-edit edit-icon"
                @click="edit_experience = true"
              ></i>
            </h2>
          </div>
          <div v-for="item in experience" :key="item">
            {{ item }}
          </div>
        </div>
        <div v-if="edit_experience == true" class="experience glow">
          <div class="title">
            <h2>
              Experience
              <i
                class="fas fa-check-circle edit-icon"
                @click="submitExperience"
              ></i>
            </h2>
          </div>
          <form>
            <div v-for="(item, index) in experience" :key="index">
              <input type="text" v-model="experience[index]" />
            </div>
          </form>
        </div>
        <div v-if="edit_education == false" class="education glow">
          <div class="title">
            <h2>
              Education
              <i
                class="fas fa-user-edit edit-icon"
                @click="edit_education = true"
              ></i>
            </h2>
          </div>
          <div v-for="item in education" :key="item">
            {{ item }}
          </div>
        </div>
        <div v-if="edit_education == true" class="education glow">
          <div class="title">
            <h2>
              Education
              <i
                class="fas fa-check-circle edit-icon"
                @click="submitEducation"
              ></i>
            </h2>
          </div>
          <form>
            <div v-for="(item, index) in education" :key="index">
              <input type="text" v-model="education[index]" />
            </div>
          </form>
        </div>
      </div>
      <div class="rows">
        <div v-if="edit_skills == false" class="grid-wrapper glow">
          <div class="title">
            <h2>
              Skills
              <i
                class="fas fa-user-edit edit-icon"
                @click="edit_skills = true"
              ></i>
            </h2>
          </div>
          <div class="skills">
            <div v-for="item in skills" :key="item">
              {{ item }}
            </div>
          </div>
        </div>
        <div v-if="edit_skills == true" class="grid-wrapper glow">
          <div class="title">
            <h2>
              Skills
              <i
                class="fas fa-check-circle edit-icon"
                @click="edit_skills = false"
              ></i>
            </h2>
          </div>
          <div class="skills">
            <form>
              <div v-for="(item, index) in skills" :key="index">
                <input type="text" v-model="skills[index]" />
              </div>
            </form>
          </div>
        </div>
        <div v-if="edit_hobbies == false" class="grid-wrapper glow">
          <div class="title">
            <h2>
              Hobbies
              <i
                class="fas fa-user-edit edit-icon"
                @click="edit_hobbies = true"
              ></i>
            </h2>
          </div>
          <div class="hobbies">
            <div v-for="item in hobbies" :key="item">
              {{ item }}
            </div>
          </div>
        </div>
        <div v-if="edit_hobbies == true" class="grid-wrapper glow">
          <div class="title">
            <h2>
              Hobbies
              <i
                class="fas fa-check-circle edit-icon"
                @click="edit_hobbies = false"
              ></i>
            </h2>
          </div>
          <div class="hobbies">
            <form>
              <div v-for="(item, index) in hobbies" :key="index">
                <input type="text" v-model="hobbies[index]" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="bottom-row">
        <div class="bottom-left">
          <img src="../assets/email.png" />
          {{ contact }}
        </div>
        <div class="bottom-right">
          <img src="../assets/github_logo.png" />
          <a :href="github">{{ github }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from "./NavigationBar";
import { mapGetters } from "vuex";
import firebase from "../database/firebase";
import storageRef from '../database/storageRef';
export default {
  name: "Home",
  data() {
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
      picURL: "",
      edit_experience: false,
      edit_education: false,
      edit_skills: false,
      edit_hobbies: false,
    };
  },
  components: {
    NavigationBar,
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  mounted() {
    this.GetData();
  },
  methods: {
    async GetData() {
      this.getPicture()
      await firebase
        .firestore()
        .collection("users")
        .where("webid", "==", this.$route.params.webid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.firstName = doc.data().firstName;
            this.lastName = doc.data().lastName;
            this.job = doc.data().job;
            this.description = doc.data().description;
            this.experience = doc.data().experience;
            this.education = doc.data().education;
            this.skills = doc.data().skills;
            this.hobbies = doc.data().hobbies;
            this.github = doc.data().github;
            this.contact = doc.data().contact;
          });
        });
    },
    async submitExperience() {
      this.edit_experience = false;
      let docid = "";
      await firebase
        .firestore()
        .collection("users")
        .where("webid", "==", this.$route.params.webid)
        .get()
        .then((doc) => {
          doc.forEach((doc) => {
            docid = doc.id;
          });
        });
      await firebase
        .firestore()
        .collection("users")
        .doc(docid)
        .update({ experience: this.experience })
        .then(() => {
          console.log("Experience Updated");
        });
    },
    async submitEducation() {
      this.edit_education = false;
      let docid = "";
      await firebase
        .firestore()
        .collection("users")
        .where("webid", "==", this.$route.params.webid)
        .get()
        .then((doc) => {
          doc.forEach((doc) => {
            docid = doc.id;
          });
        });
      await firebase
        .firestore()
        .collection("users")
        .doc(docid)
        .update({ education: this.education })
        .then(() => {
          console.log("Education Updated");
        });
    },
    submitSkills() {
      this.edit_skills = false;
    },
    submitHobbies() {
      this.edit_hobbies = false;
    },
    async UploadImage (image) {
      if(image != null) {
        let metadata = {
            contentType: "image/jpeg",
        };
        await storageRef.child(this.$route.params.webid).put(image, metadata).then(() => {
            console.log("file uploaded!");
        });
        this.getPicture()
      }
    },
    async getPicture () {
      await storageRef.child(this.$route.params.webid).getDownloadURL().then((url) => {
          this.picURL = url;
      }).catch(()=>{
        storageRef.child('default.png').getDownloadURL().then((url) => {
          this.picURL = url;
        })
      })
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
.wrapper {
  height: 100%;
  display: flex;
  font-size: 14px;
  padding-top: 8rem;
}

.container {
  width: 600px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  border: solid black;
  border-radius: 10px;
  padding: 5px;
}

.rows {
  display: flex;
  flex-direction: row;
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
  border-radius: 10px;
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
  width: 40%;
  border-radius: 10px;
  padding: 15px;
  margin-left: 20px;
}

.education {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 40%;
  border-radius: 10px;
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
  -webkit-box-shadow: 0 0 20px grey;
  -moz-box-shadow: 0 0 20px grey;
  box-shadow: 0 0 20px grey;
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
  -webkit-box-shadow: 0 0 20px grey;
  -moz-box-shadow: 0 0 20px grey;
  box-shadow: 0 0 20px grey;
  border-radius: 10px;
}

.bottom-row {
  display: flex;
  flex-direction: row;
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  border: solid black;
  border-radius: 10px;
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
  -webkit-box-shadow: 0 0 20px grey;
  -moz-box-shadow: 0 0 20px grey;
  box-shadow: 0 0 20px grey;
}

.title h2 {
  display: flex;
  margin-top: 0px;
}

.edit-icon {
  margin-left: 10px;
}

@media only screen and (max-width: 620px) {
  .wrapper {
    font-size: 10px;
  }
}
</style>
