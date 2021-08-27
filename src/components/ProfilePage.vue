<template>
  <navigation-bar
    v-if="loadedData"
    :user="user"
    :pic="picURL"
    class="fade-in-navbar"
  ></navigation-bar>
  <edit-personal-data v-if="showEditPersonalData" style="overflow-y: scroll;">
    <template #header>
      <h5 class="modal-title">
        Edit information
      </h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        style="background-color: transparent; border: none; margin: 0; padding: 5px 15px 0 5px"
        @click="closeModal"
      >
        <span style="font-size: 2rem;">&times;</span>
      </button>
    </template>
    <template #default>
      <div class="modal-body">
        <div class="col-lg-10">
          <label>First name</label>
          <input
            type="text"
            class="form-control"
            v-model="profileInfo.firstName"
            required
          />
        </div>
        <div class="col-lg-10">
          <label>Last name</label>
          <input
            type="text"
            class="form-control"
            v-model="profileInfo.lastName"
            required
          />
        </div>
        <div class="col-lg-10">
          <label>Job title</label>
          <input type="text" class="form-control" v-model="profileInfo.job" />
        </div>
        <div class="col-lg-10">
          <label>Description</label>
          <textarea
            style="min-height: 10rem;"
            class="form-control"
            v-model="profileInfo.description"
          />
        </div>
        <div class="col-lg-10">
          <label>Age</label>
          <input
            type="number"
            min="18"
            max="100"
            class="form-control"
            v-model="profileInfo.age"
          />
        </div>
        <div class="col-lg-10">
          <label>Contact</label>
          <input
            type="email"
            class="form-control"
            v-model="profileInfo.contact"
          />
        </div>
        <div class="col-lg-10">
          <label>Phone number</label>
          <input
            type="tel"
            v-on:keypress="isNumber($event)"
            class="form-control"
            v-model="profileInfo.phone"
          />
        </div>
        <div class="col-lg-10">
          <label>Address</label>
          <input
            type="text"
            class="form-control"
            v-model="profileInfo.address"
          />
        </div>
      </div>
    </template>
    <template #actions>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="closeModal">
          Close
        </button>
        <button
          type="button"
          class="btn btn-primary"
          v-if="
            !isPending &&
              profileInfo.firstName != '' &&
              profileInfo.lastName != ''
          "
          @click="updateProfileInfo"
        >
          Save changes
        </button>
        <button type="button" class="btn btn-primary" v-else disabled>
          Save changes
        </button>
      </div>
    </template>
  </edit-personal-data>
  <edit-skills v-if="showEditSkills">
    <template #header>
      <h5 class="modal-title">
        Edit information
      </h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        style="background-color: transparent; border: none; margin: 0; padding: 5px 15px 0 5px"
        @click="closeSkillsModal"
      >
        <span style="font-size: 2rem;">&times;</span>
      </button>
    </template>
    <template #default>
      <i class="fas fa-plus-circle"></i>
    </template>
    <template #actions>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          @click="closeSkillsModal"
        >
          Close
        </button>
        <button
          type="button"
          class="btn btn-primary"
          v-if="!isPending"
          @click="updateProfileInfo"
        >
          Save changes
        </button>
        <button type="button" class="btn btn-primary" v-else disabled>
          Save changes
        </button>
      </div>
    </template>
  </edit-skills>
  <div v-if="loadedData" class="contact fade-in" style="margin-top: 100px">
    <div class="name">
      <h2 class="site-title mb-0">{{ firstName + " " + lastName }}</h2>
    </div>
    <div class="links">
      <div class="facebook" v-if="facebook">
        <a :href="facebook" target="_blank"><i class="fab fa-facebook"></i></a>
      </div>
      <div class="instagram" v-if="instagram">
        <a :href="instagram" target="_blank"
          ><i class="fab fa-instagram"></i
        ></a>
      </div>
      <div class="github" v-if="github">
        <a :href="github" target="_blank"><i class="fab fa-github"></i></a>
      </div>
      <div class="linkedin" v-if="linkedin">
        <a :href="linkedin" target="_blank"><i class="fab fa-linkedin"></i></a>
      </div>
    </div>
  </div>
  <div v-if="loadedData" class="container fade-in">
    <div class="header p-3 p-lg-4 text-white">
      <div class="row" style="justify-content: space-between">
        <div class="col-lg-4 col-md-5">
          <div class="avatar p-1">
            <div v-if="!loadedImage" class="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <img v-if="loadedImage" :src="picURL" @click="$refs.file.click()" />
            <input
              type="file"
              ref="file"
              @change="UploadImage($refs.file.files[0])"
              style="display: none"
            />
          </div>
        </div>
        <div
          class="col-lg-8 col-md-7 text-center text-md-start name-job-holder"
        >
          <div style="display: flex; justify-content: space-between;">
            <h2>{{ firstName + " " + lastName }}</h2>
            <i @click="editPersonalData()" class="fas fa-user-edit"></i>
          </div>

          <p>{{ job }}</p>

          <a class="btn btn-success shadow-sm mt-1" href="#contact">Contact</a>
        </div>
      </div>
    </div>
    <div class="about-section">
      <div class="row">
        <div class="col-md-6 text-left">
          <h2 class="h3 mb-3">About me</h2>
          <p>{{ description }}</p>
        </div>
        <div class="col-md-6 short-info">
          <div class="row mt-2">
            <div class="col-sm-4">
              <div class="pb-1">Age</div>
            </div>
            <div class="col-sm-8">
              <div class="pb-1 text-secondary">{{ age }}</div>
            </div>
            <div class="col-sm-4">
              <div class="pb-1">Contact</div>
            </div>
            <div class="col-sm-8">
              <div class="pb-1 text-secondary">{{ contact }}</div>
            </div>
            <div class="col-sm-4">
              <div class="pb-1">Phone</div>
            </div>
            <div class="col-sm-8">
              <div class="pb-1 text-secondary">{{ phone }}</div>
            </div>
            <div class="col-sm-4">
              <div class="pb-1">Address</div>
            </div>
            <div class="col-sm-8">
              <div class="pb-1 text-secondary">
                {{ address }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="px-3 px-lg-5 skills-section ">
      <div class="skills-edit">
        <h2 class="h3 mb-3 text-left">Professional Skills</h2>
        <i @click="editSkills()" class="fas fa-edit"></i>
      </div>

      <div class="skills">
        <div class="col-md-5" v-for="skill in skills" :key="skill">
          <div class="mb-2">{{ skill }}</div>
          <div class="progress my-1">
            <div
              class="progress-bar"
              role="progressbar"
              style="width: 90%"
              aria-valuenow="90"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="work-experience-section px-3 px-lg-5">
      <h2 class="h3 mb-4 text-left">Work experience</h2>
      <div class="timeline">
        <div
          class="timeline-card timeline-card-primary card shadow-sm text-left"
          v-for="(item, index) in experience"
          :key="index"
        >
          <div class="card-body">
            <div class="h5 mb-1">
              {{ experience[index] }}
              <span class="text-muted h6">at Creative Agency</span>
            </div>
            <div class="text-muted text-small mb-2">May, 2015 - Present</div>
            <div>
              Leverage agile frameworks to provide a robust synopsis for high
              level overviews. Iterative approaches to corporate strategy foster
              collaborative thinking to further the overall value proposition.
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="education-section px-3 px-lg-5">
      <h2 class="h3 mb-4 text-left">Education</h2>
      <div class="timeline">
        <div
          class="timeline-card timeline-card-success card shadow-sm text-left"
          v-for="(item, index) in education"
          :key="index"
        >
          <div class="card-body">
            <div class="h5 mb-1">
              {{ education[index] }}
              <span class="text-muted h6">from {{ educationAt[index] }}</span>
            </div>
            <div class="text-muted text-small mb-2">
              {{ educationPeriod[index] }}
            </div>
            <div>
              {{ educationArea[index] }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="hobbies-section px-3 px-lg-5">
      <h2 class="h3 mb-4 text-left">Hobbies</h2>
      <div class="hobbies">
        <div class="hobby" v-for="(hobby, index) in hobbies" :key="index">
          {{ hobby }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from "./NavigationBar";
import { mapGetters } from "vuex";
import firebase from "../database/firebase";
import storageRef from "../database/storageRef";
import EditPersonalData from "./edit/editPersonalData.vue";
import EditSkills from "./edit/editSkills.vue";
export default {
  name: "Home",
  emits: ["edit"],
  data() {
    return {
      userID: "",
      isPending: false,
      profileInfo: {},
      showEditPersonalData: false,
      showEditSkills: false,
      loadedData: false,
      loadedImage: false,
      firstName: "",
      lastName: "",
      job: "",
      age: "",
      phone: "",
      address: "",
      description: "",
      experience: [],
      education: [],
      educationAt: [],
      educationPeriod: [],
      educationArea: [],
      skills: [],
      hobbies: [],
      github: "",
      instagram: "",
      linkedin: "",
      facebook: "",
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
    EditPersonalData,
    EditSkills,
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
    async updateProfileInfo() {
      if (this.validateForm()) {
        if (this.somethingChanged()) {
          this.isPending = true;
          this.firstName = this.profileInfo.firstName;
          this.lastName = this.profileInfo.lastName;
          this.job = this.profileInfo.job;
          this.description = this.profileInfo.description;
          this.age = this.profileInfo.age;
          this.contact = this.profileInfo.contact;
          this.phone = this.profileInfo.phone;
          this.address = this.profileInfo.address;
          await firebase
            .firestore()
            .collection("users")
            .doc(this.userID)
            .update({
              firstName: this.firstName,
              lastName: this.lastName,
              job: this.job,
              description: this.description,
              age: this.age,
              contact: this.contact,
              phone: this.phone,
              address: this.address,
              dateModified: new Date(),
            });
          this.isPending = false;
        }
        this.closeModal();
      } else {
        alert("Check your fields!");
      }
    },
    async editPersonalData() {
      this.showEditPersonalData = !this.showEditPersonalData;
    },
    async editSkills() {
      this.showEditSkills = !this.showEditSkills;
    },
    closeModal() {
      this.showEditPersonalData = false;
    },
    closeSkillsModal() {
      this.showEditSkills = false;
    },
    isNumber(e) {
      let char = String.fromCharCode(e.keyCode);
      if (/[0-9]/.test(char)) return true;
      else e.preventDefault();
    },
    validateForm() {
      //Validate First name & Last name
      let char = String(this.profileInfo.firstName);
      if (
        !/^[a-zA-ZàáâäãățșåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
          char
        )
      )
        return false;

      char = String(this.profileInfo.lastName);
      if (
        !/^[a-zA-ZàáâățșäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
          char
        )
      )
        return false;

      //Validate Phone
      char = String(this.profileInfo.phone);
      if (!/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(char))
        return false;
      //Validate Age
      char = String(this.profileInfo.age);
      if (!/[0-9]/.test(char)) return false;
      if (this.profileInfo.age < 18 || this.profileInfo.age > 100) return false;
      //Validate email
      const re = /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
      if (!re.test(String(this.profileInfo.contact))) return false;
      return true;
    },
    somethingChanged() {
      if (this.firstName != this.profileInfo.firstName) return true;
      if (this.lastName != this.profileInfo.lastName) return true;
      if (this.job != this.profileInfo.job) return true;
      if (this.description != this.profileInfo.description) return true;
      if (this.age != this.profileInfo.age) return true;
      if (this.contact != this.profileInfo.contact) return true;
      if (this.phone != this.profileInfo.phone) return true;
      if (this.address != this.profileInfo.address) return true;
      return false;
    },
    async GetData() {
      this.loadedData = false;
      this.getPicture();
      await firebase
        .firestore()
        .collection("users")
        .where("webid", "==", this.$route.params.webid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.userID = doc.id;
            this.firstName = doc.data().firstName;
            this.lastName = doc.data().lastName;
            this.job = doc.data().job;
            this.phone = doc.data().phone;
            this.address = doc.data().address;
            this.description = doc.data().description;
            this.experience = doc.data().experience;
            this.education = doc.data().education;
            this.educationAt = doc.data().educationAt;
            this.educationPeriod = doc.data().educationPeriod;
            this.educationArea = doc.data().educationArea;
            this.skills = doc.data().skills;
            this.hobbies = doc.data().hobbies;
            this.github = doc.data().github;
            this.instagram = doc.data().instagram;
            this.linkedin = doc.data().linkedin;
            this.facebook = doc.data().facebook;
            this.contact = doc.data().contact;
            this.age = doc.data().age;
            this.profileInfo = doc.data();
          });
        });
      this.loadedData = true;
    },
    async UploadImage(image) {
      if (image != null) {
        let metadata = {
          contentType: "image/jpeg",
        };
        await storageRef
          .child(this.$route.params.webid)
          .put(image, metadata)
          .then(() => {
            console.log("file uploaded!");
          });
        this.getPicture();
      }
    },
    async getPicture() {
      this.loadedImage = false;
      await storageRef
        .child(this.$route.params.webid)
        .getDownloadURL()
        .then((url) => {
          this.picURL = url;
          window.localStorage.setItem("picURL", this.picURL);
        })
        .catch(() => {
          storageRef
            .child("default.png")
            .getDownloadURL()
            .then((url) => {
              this.picURL = url;
              window.localStorage.setItem("picURL", this.picURL);
            });
        });
      this.loadedImage = true;
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

* {
  font-family: Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
}

.container {
  max-width: 720px;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
  padding: 0;
  margin-bottom: 5em;
}

.header {
  background-color: #4a89dc;
  border-radius: 10px 10px 0 0;
  color: #fff;
  width: 100%;
}

.row {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(var(--bs-gutter-y) * -1);
  margin-left: 0px;
  margin-right: 0px;
}

.row > * {
  padding-right: calc(var(--bs-gutter-x) / 2);
  padding-left: calc(var(--bs-gutter-x) / 2);
  margin-top: var(--bs-gutter-y);
}

.image-holder {
  position: relative;
  top: 60px;
  left: 5px;
}

.name-job-holder {
  text-align: left;
  width: 50%;
  align-self: center;
  margin-left: 1rem;
  margin-top: 0px;
  p {
    font-weight: 500;
    font-size: 16px;
    letter-spacing: 1px;
  }
}

label {
  display: flex;
  margin: 5px 5px;
}

h2 {
  font-size: calc(1.5rem + 1.5vw);
  margin-bottom: 1rem;
  font-weight: 600;
  line-height: 1.2;
  position: relative;
}

.fade-in {
  animation: fadein 1.2s;
}

.fade-in-navbar {
  animation: fadein 0.5s;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

p {
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 1rem;
}

img {
  width: 200px;
  aspect-ratio: auto 200 / 200;
  height: 200px;
  border: 8px solid #fff;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.05);
  transition: transform ease 300ms;
}

img:hover {
  -moz-transform: translate(0, -4px);
  -ms-transform: translate(0, -4px);
  -o-transform: translate(0, -4px);
  -webkit-transform: translate(0, -4px);
  transform: translate(0, -4px);
}

.col-md-5 {
  align-self: center;
  text-align: left;
  margin-left: 0px;
}

.about-section {
  padding: 3rem 2rem 0 2rem;
}

.mb-3 {
  margin-bottom: 2rem !important;
}

.h3,
h3 {
  font-size: calc(1.3rem + 0.6vw);
}

hr {
  margin: 2rem 0;
  color: #adb5bd;
  background-color: currentColor;
  border: 0;
  opacity: 0.25;
}

.skills {
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
  justify-content: space-between;
}

.text-left {
  text-align: left;
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
.short-info {
  text-align: left;
  align-self: center;
}

.timeline {
  border-left: 2px solid #e6e9ed;
  padding: 1rem 0;
}

.timeline-card-primary {
  border-left-color: #4a89dc;
}

.timeline-card {
  position: relative;
  margin-left: 31px;
  border-left: 2px solid;
  margin-bottom: 2rem;
}

.btn-success {
  border-radius: 25px;
  padding: 8px 24px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1.5px;
  transition: 0.3s ease-in-out;
}

.btn-success:hover {
  -moz-transform: translate(0, -4px);
  -ms-transform: translate(0, -4px);
  -o-transform: translate(0, -4px);
  -webkit-transform: translate(0, -4px);
  transform: translate(0, -4px);
}

@media (min-width: 48em) {
  .avatar {
    max-width: 216px;
    max-height: 216px;
    margin-top: 20px;
    margin-bottom: -50px;
    margin-left: 0;
  }
}

.shadow-sm {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 2px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

.timeline-card-primary:before {
  border-color: #4a89dc;
}

.timeline-card-primary {
  border-left-color: #4a89dc;
}

.skills-edit {
  display: flex;
  justify-content: space-between;
}

.timeline-card:before {
  content: "";
  display: inline-block;
  position: absolute;
  background-color: #fff;
  border-radius: 10px;
  width: 12px;
  height: 12px;
  top: 20px;
  left: -41px;
  border: 2px solid;
  z-index: 2;
  border-color: #4a89dc;
}

.timeline-card-primary:after {
  background-color: #4a89dc;
}
.timeline-card:after {
  content: "";
  display: inline-block;
  position: absolute;
  background-color: currentColor;
  width: 29px;
  height: 2px;
  top: 25px;
  left: -29px;
  z-index: 1;
  background-color: #4a89dc;
}

.timeline-card-success {
  border-left-color: #37bc9b;
}

.timeline-card-success:before {
  border-color: #37bc9b;
}

.timeline-card-success:after {
  background-color: #37bc9b;
}

.site-title {
  font-size: 1.25rem;
  line-height: 2.5rem;
}

.contact {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 0 20px 20px 20px;
}

.links {
  display: flex;
  justify-content: center;
  align-self: center;
}

.close {
  padding: 1rem;
  margin: 0rem 0rem 0rem auto;
}

.close:hover {
  color: gray;
}

h5 {
  margin: 0;
  margin-left: 1em;
  line-height: 1.5;
}

.links div {
  margin: 0 10px;
}

.fab {
  color: #4a89dc;
  font-size: 24px;
}

.fab:hover {
  color: #2f9df7;
}

@media (min-width: 1200px) {
  .container {
    width: 920px;
  }
}

@media (max-width: 992px) {
  .col-md-5 {
    margin: auto;
  }
}

@media (max-width: 767px) {
  .row {
    justify-content: center;
  }
  .col-md-5 {
    text-align-last: center;
    padding-top: 30px;
  }
  .skills {
    display: block;
  }

  .skills-section,
  .work-experience-section,
  .education-section {
    margin: 0 32px;
  }
}

@media (max-width: 800px) {
  .contact {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }
}

.hobbies {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-top: 1rem;
  padding-bottom: 3rem;
}

.hobby {
  border-radius: 25px;
  color: white;
  border: 5px solid #4a89dc;
  background-color: #4a89dc;
  padding: 10px 20px;
  transition: 0.2s ease-in-out;
  margin: 20px;
}

.hobby:hover {
  cursor: default;
  -moz-transform: translate(0, -4px);
  -ms-transform: translate(0, -4px);
  -o-transform: translate(0, -4px);
  -webkit-transform: translate(0, -4px);
  transform: translate(0, -4px);
}

.lds-ring {
  display: flex;
  justify-content: center;
  background-color: grey;
  align-items: center;
  position: relative;
  width: 80px;
  height: 80px;
  width: 200px;
  aspect-ratio: auto 200 / 200;
  height: 200px;
  border: 8px solid #fff;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.05);
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.fa-user-edit,
.fa-edit {
  font-size: 24px;
  color: darkslategray;
  display: flex;
  justify-content: flex-end;
  transition: 0.2s ease-in-out;
}

.fa-user-edit:hover {
  color: #fff;
  cursor: pointer;
}

.fa-edit:hover {
  color: #4a89dc;
  cursor: pointer;
}

.col-lg-10 {
  margin: 10px auto;
}
</style>
