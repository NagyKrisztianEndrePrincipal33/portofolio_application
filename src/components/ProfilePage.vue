<template>
  <navigation-bar
    v-if="loadedData"
    :user="user"
    class="fade-in-navbar"
  ></navigation-bar>
  <edit-personal-data v-if="showEditPersonalData" style="overflow-y: scroll;">
    <template #header>
      <h5 class="modal-title">
        Edit Your informations.
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
        <button
          type="button"
          class="btn btn-secondary"
          @click="closeWorkExperienceModal"
        >
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
  <edit-skills v-if="showEditSkills" style="overflow-y: scroll;">
    <template #header>
      <h5 class="modal-title">
        Edit Your skills.
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
      <i @click="addInputField" class="fas fa-plus-circle"></i>
      <div
        class="skills-input"
        v-for="(skill, index) in toAddSkills"
        :key="index"
      >
        <input type="text" v-model="toAddSkills[index]" />
        <select
          class="btn btn-primary dropdown-toggle"
          style="background-color: #4A89DC"
          v-model="toAddSkillExp[index]"
          name="skill-exp"
          id="skill-exp"
        >
          <option
            class="dropdown-item"
            style="background-color: #fff"
            value="20%"
            >Beginner</option
          >
          <option
            class="dropdown-item"
            style="background-color: #fff"
            value="40%"
            >Entry-Level</option
          >
          <option
            class="dropdown-item"
            style="background-color: #fff"
            value="60%"
            >Mid-Level</option
          >
          <option
            class="dropdown-item"
            style="background-color: #fff"
            value="80%"
            >Senior-Level
          </option>
          <option
            class="dropdown-item"
            style="background-color: #fff"
            value="100%"
            >Expert</option
          >
        </select>
      </div>
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
          @click="updateSkills"
        >
          Save changes
        </button>
        <button type="button" class="btn btn-primary" v-else disabled>
          Saving changes...
        </button>
      </div>
    </template>
  </edit-skills>
  <edit-work-experience
    v-if="showEditWorkExperience"
    style="overflow-y: scroll;"
  >
    <template #header>
      <h5 class="modal-title">
        Edit Your work experience information.
      </h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        style="background-color: transparent; border: none; margin: 0; padding: 5px 15px 0 5px"
        @click="closeWorkExperienceModal"
      >
        <span style="font-size: 2rem;">&times;</span>
      </button>
    </template>
    <div class="modal-body">
      <i @click="addExperienceField" class="fas fa-plus-circle"></i>
      <div
        class="col-lg-10 domain-title"
        v-for="(item, index) in experienceCopy.experience"
        :key="index"
      >
        <div class="element-body">
          <div class="domain-location">
            <div class="domain">
              <label>Domain</label>
              <input
                type="text"
                class="form-control"
                v-model="experienceCopy.experience[index]"
                required
              />
            </div>
            <div class="location">
              <label> At </label>
              <input
                type="text"
                class="form-control"
                v-model="experienceCopy.experienceLocation[index]"
                required
              />
            </div>
          </div>

          <div class="dates">
            <div class="start-date">
              <label>Start Date</label>
              <input
                type="date"
                class="form-control"
                v-model="experienceCopy.experienceStartDate[index]"
                required
              />
            </div>

            <div>
              <label>End Date</label>
              <div class="end-date">
                <input
                  type="date"
                  class="form-control"
                  v-model="experienceCopy.experienceEndDate[index]"
                  :disabled="experienceCopy.isPresent[index]"
                  :required="!experienceCopy.isPresent[index]"
                />
                <div class="checkbox">
                  <input
                    type="checkbox"
                    class="checkbox-chk"
                    v-model="experienceCopy.isPresent[index]"
                  />
                  <label>
                    Present
                  </label>
                </div>
              </div>
            </div>
          </div>

          <label>Tell us about your Experience in this domain</label>

          <input
            type="text"
            class="form-control"
            v-model="experienceCopy.aboutExperience[index]"
          />
        </div>
      </div>
    </div>
    <template #actions>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          @click="closeWorkExperienceModal"
        >
          Close
        </button>
        <button
          type="button"
          class="btn btn-primary"
          v-if="!isPending"
          @click="updateWorkExperienceModal"
        >
          Save changes
        </button>
        <button type="button" class="btn btn-primary" v-else disabled>
          Saving changes...
        </button>
      </div>
    </template>
  </edit-work-experience>
  <edit-education v-if="showEditEducation" style="overflow-y: scroll;">
    <template #header>
      <h5 class="modal-title">
        Edit Your education.
      </h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        style="background-color: transparent; border: none; margin: 0; padding: 5px 15px 0 5px"
        @click="closeEditEducation"
      >
        <span style="font-size: 2rem;">&times;</span>
      </button>
    </template>
    <div class="modal-body">
      <i @click="addEducationField" class="fas fa-plus-circle"></i>
      <div
        class="col-lg-10 domain-title"
        v-for="(item, index) in educationCopy"
        :key="index"
      >
        <div class="element-body">
          <div>
            <div>
              <label>Education</label>
              <input
                type="text"
                class="form-control"
                v-model="educationCopy[index]"
                required
              />
            </div>
            <div class="location">
              <label> From </label>
              <input
                type="text"
                class="form-control"
                v-model="educationAtCopy[index]"
                required
              />
            </div>
          </div>

          <div>
            <div>
              <label class="edu-label">Start Date</label>
              <select v-model="educationStartPeriodCopy[index]">
                <option
                  v-for="n in range(1950, new Date().getFullYear())"
                  :value="n"
                  :key="n"
                  >{{ n }}</option
                >
                <option>Present</option>
              </select>
            </div>
            <label class="edu-label">End Date</label>
            <select v-model="educationEndPeriodCopy[index]">
              <option
                v-for="n in range(1950, new Date().getFullYear())"
                :value="n"
                :key="n"
                >{{ n }}</option
              >
              <option>Present</option>
            </select>
          </div>

          <div class="location">
            <label>Education Field</label>
            <input
              type="text"
              class="form-control"
              v-model="educationAreaCopy[index]"
              required
            />
          </div>
        </div>
      </div>
    </div>
    <template #actions>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          @click="closeEditEducation"
        >
          Close
        </button>
        <button
          type="button"
          class="btn btn-primary"
          v-if="!isPending"
          @click="updateEducation"
        >
          Save changes
        </button>
        <button type="button" class="btn btn-primary" v-else disabled>
          Saving changes...
        </button>
      </div>
    </template>
  </edit-education>
  <edit-hobbies v-if="showEditHobbies" style="overflow-y: scroll;">
    <template #header>
      <h5 class="modal-title">
        Edit Your hobbies.
      </h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        style="background-color: transparent; border: none; margin: 0; padding: 5px 15px 0 5px"
        @click="closeEditHobby"
      >
        <span style="font-size: 2rem;">&times;</span>
      </button>
    </template>

    <div class="modal-body">
      <i @click="addHobbyField" class="fas fa-plus-circle"></i>
      <div
        class="col-lg-10 domain-title"
        v-for="(item, index) in hobbies"
        :key="index"
      >
        <div class="element-body">
          <div>
            <div>
              <label>Hobby</label>
              <input
                type="text"
                class="form-control"
                v-model="hobbies[index]"
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #actions>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="closeEditHobby">
          Close
        </button>
        <button
          type="button"
          class="btn btn-primary"
          v-if="!isPending"
          @click="updateHobbies"
        >
          Save changes
        </button>
        <button type="button" class="btn btn-primary" v-else disabled>
          Saving changes...
        </button>
      </div>
    </template>
  </edit-hobbies>
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
          <h2>{{ firstName + " " + lastName }}</h2>
          <div
            v-if="isCurrUserProfile"
            style="display: flex; justify-content: space-between;"
          ></div>
          <i @click="editPersonalData()" class="fas fa-user-edit"></i>
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
    <div v-if="isCurrUserProfile" class="px-3 px-lg-5 skills-section ">
      <div class="skills-edit">
        <h2 class="h3 mb-3 text-left">Professional Skills</h2>
        <i @click="editSkills()" class="fas fa-edit"></i>
      </div>

      <div class="skills">
        <div class="col-md-5" v-for="(skill, index) in skills" :key="index">
          <div class="mb-2">
            {{ skill }}
            <div class="test-class">
              {{
                "(" +
                  levels[
                    skillExperience[index].substring(
                      0,
                      skillExperience[index].length - 1
                    )
                  ] +
                  ")"
              }}
            </div>
          </div>
          <div class="progress my-1">
            <div
              class="progress-bar"
              role="progressbar"
              :style="{ width: skillExperience[index] }"
              :aria-valuenow="{ width: skillExperience[index] }"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="work-experience-section px-3 px-lg-5">
      <div class="skills-edit">
        <h2 class="h3 mb-4 text-left">Work experience</h2>
        <i @click="editWorkExperience()" class="fas fa-edit"></i>
      </div>
      <div class="timeline">
        <div
          class="timeline-card timeline-card-primary card shadow-sm text-left"
          v-for="(item, index) in experience"
          :key="index"
        >
          <div class="card-body">
            <div class="h5 mb-1">
              {{ experience[index] }}
              <span class="text-muted h6"
                >at {{ experienceLocation[index] }}</span
              >
            </div>
            <div class="text-muted text-small mb-2">
              {{ experienceDate[index] }}
            </div>
            <div>
              {{ aboutExperience[index] }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="education-section px-3 px-lg-5">
      <div class="skills-edit">
        <h2 class="h3 mb-4 text-left">Education</h2>
        <i @click="editEducation()" class="fas fa-edit"></i>
      </div>
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
      <div class="skills-edit">
        <h2 class="h3 mb-4 text-left">Hobbies</h2>
        <i @click="editHobbies()" class="fas fa-edit"></i>
      </div>
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
import EditWorkExperience from "./edit/editWorkExperience.vue";
import EditEducation from "./edit/editEducation.vue";
import EditHobbies from "./edit/editHobbies.vue";
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
      webid: "",
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
      skillExperience: [],
      toAddSkills: [],
      toAddSkillExp: [],
      hobbies: [],
      github: "",
      instagram: "",
      linkedin: "",
      facebook: "",
      contact: "",
      picURL: "",
      educationCopy: [],
      educationAtCopy: [],
      educationStartPeriodCopy: [],
      educationEndPeriodCopy: [],
      educationAreaCopy: [],
      isCurrUserProfile: false,
      showEditWorkExperience: false,
      showEditEducation: false,
      showEditHobbies: false,
      copySaveExperience: [],
      lastEdited: [],
      skillsChanged: false,
      experienceCopy: [],
      levels: {
        20: "Beginner",
        40: "Entry-Level",
        60: "Mid-Level",
        80: "Senior-Level",
        100: "Expert",
      },
    };
  },
  components: {
    NavigationBar,
    EditPersonalData,
    EditSkills,
    EditWorkExperience,
    EditEducation,
    EditHobbies,
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  mounted() {
    this.webid = this.$route.params.webid;
    this.GetData();
  },
  beforeRouteUpdate(to, from, next) {
    this.webid = to.params.webid;
    this.GetData();
    next();
  },
  methods: {
    addInputField() {
      if (!this.toAddSkills) {
        this.toAddSkills = [""];
        this.toAddSkillExp = ["20%"];
      } else {
        this.toAddSkills.unshift("");
        this.toAddSkillExp.unshift("20%");
      }

      console.log("Skills:", this.skills);
      console.log("Skills to update:", this.toAddSkills);
    },
    addHobbyField() {
      if (!this.hobbies) {
        this.hobbies = [];
      }
      this.hobbies.unshift("");
    },
    updateHobbies() {
      firebase
        .firestore()
        .collection("users")
        .doc(this.userID)
        .set(
          {
            hobbies: this.hobbies,
            lastEdited: ["hobbies"],
            editedAt: new Date(),
          },
          { merge: true }
        );
    },
    addEducationField() {
      console.log("what");
      if (!this.educationCopy) {
        this.educationCopy = [];
        this.educationAtCopy = [];
        this.educationStartPeriodCopy = [];
        this.educationEndPeriodCopy = [];
        this.educationAreaCopy = [];
      }
      this.educationCopy.unshift("");
      this.educationAtCopy.unshift("");
      this.educationStartPeriodCopy.unshift("2021");
      this.educationEndPeriodCopy.unshift("Present");
      this.educationAreaCopy.unshift("");
    },
    addExperienceField() {
      if (!this.experienceCopy.experience) {
        this.experienceCopy.experience = [];
        this.experienceCopy.experienceLocation = [];
        this.experienceCopy.experienceStartDate = [];
        this.experienceCopy.experienceEndDate = [];
        this.experienceCopy.isPresent = [];
        this.experienceCopy.aboutExperience = [];
      }
      this.experienceCopy.experience.unshift("");
      this.experienceCopy.experienceLocation.unshift("");
      this.experienceCopy.experienceStartDate.unshift("");
      this.experienceCopy.experienceEndDate.unshift("");
      this.experienceCopy.isPresent.unshift(true);
      this.experienceCopy.aboutExperience.unshift("");
    },

    updateEducation() {
      if (
        this.educationCopy == this.education &&
        this.educationAt == this.educationAtCopy &&
        this.educationPeriod == this.formatDateForEducationUpload()
      ) {
        console.log(this.educationCopy, "copy");
        console.log(this.education);
        console.log("No change");
        return;
      }

      this.education = this.educationCopy;
      this.educationAt = this.educationAtCopy;
      this.educationPeriod = this.formatDateForEducationUpload();
      this.educationArea = this.educationAreaCopy;
      firebase
        .firestore()
        .collection("users")
        .doc(this.userID)
        .set(
          {
            education: this.education,
            educationAt: this.educationAt,
            educationPeriod: this.educationPeriod,
            educationArea: this.educationArea,
            editedAt: new Date(),
            lastEdited: ["education"],
          },
          { merge: true }
        );
      this.closeEditEducation();
      console.log("Updated.");
    },
    formatDateForEducationUpload() {
      let obj = [];
      for (
        let index = 0;
        index < this.educationStartPeriodCopy.length;
        index++
      ) {
        const startYear = this.educationStartPeriodCopy[index];
        const endYear = this.educationEndPeriodCopy[index];
        obj.push(startYear + " - " + endYear);
      }
      return obj;
    },
    updateWorkExperienceModal() {
      let dates = this.formatExperienceDate();
      firebase
        .firestore()
        .collection("users")
        .doc(this.userID)
        .set(
          {
            experience: this.experienceCopy.experience,
            experienceLocation: this.experienceCopy.experienceLocation,
            aboutExperience: this.experienceCopy.aboutExperience,
            experienceDate: dates,
            lastEdited: "experience",
            editedAt: new Date(),
          },
          { merge: true }
        );
      this.closeWorkExperienceModal();
      this.experience = this.experienceCopy.experience;
      this.experienceLocation = this.experienceCopy.experienceLocation;
      this.experienceDate = dates;
      this.aboutExperience = this.experienceCopy.aboutExperience;

      console.log("Changes done");
    },
    formatExperienceDate() {
      let obj = [];
      for (
        let index = 0;
        index < this.experienceCopy.experienceStartDate.length;
        index++
      ) {
        const elementStart = new Date(
          this.experienceCopy.experienceStartDate[index]
        );
        let endDate;
        if (this.experienceCopy.isPresent[index]) {
          endDate = " - Present";
        } else {
          endDate = new Date(this.experienceCopy.experienceEndDate[index]);
          let endYear = endDate.getFullYear();
          let endMonth = endDate.toLocaleString("En", { month: "long" });
          endDate = " - " + endMonth + ", " + endYear;
        }
        let startYear = elementStart.getFullYear();
        let startMonth = elementStart.toLocaleString("En", { month: "long" });
        obj.push(startMonth + ", " + startYear + endDate);
      }
      return obj;
    },
    async updateSkills() {
      if (this.somethingChanged()) {
        this.skillsChanged = true;
        this.skills = this.toAddSkills;
        this.skillExperience = this.toAddSkillExp;
        this.isPending = true;
        await firebase
          .firestore()
          .collection("users")
          .doc(this.userID)
          .set(
            {
              skills: this.skills,
              skillExperience: this.skillExperience,
              skills_lowercase: this.skills.map((v) => v.toLowerCase()),
              editedAt: new Date(),
              lastEdited: this.lastEdited,
            },
            { merge: true }
          );
      }
      this.showEditSkills = false;
      this.isPending = false;
    },
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
            .set(
              {
                firstName: this.firstName,
                lastName: this.lastName,
                job: this.job,
                description: this.description,
                age: this.age,
                contact: this.contact,
                phone: this.phone,
                address: this.address,
                editedAt: new Date(),
                lastEdited: this.lastEdited,
              },
              { merge: true }
            );
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
    editHobbies() {
      this.showEditHobbies = !this.showEditHobbies;
    },
    editSkills() {
      this.showEditSkills = !this.showEditSkills;
    },
    closeModal() {
      this.showEditPersonalData = false;
    },
    closeSkillsModal() {
      this.showEditSkills = false;
    },
    editWorkExperience() {
      this.experienceCopy = {
        experience: this.profileInfo.experience,
        experienceLocation: this.profileInfo.experienceLocation,
        experienceStartDate: this.profileInfo.experienceStartDate,
        experienceEndDate: this.profileInfo.experienceEndDate,
        isPresent: this.profileInfo.isPresent,
        aboutExperience: this.profileInfo.aboutExperience,
      };
      this.copySaveExperience = this.experienceCopy;
      this.showEditWorkExperience = !this.showEditWorkExperience;
    },
    editEducation() {
      this.educationCopy = this.education;
      this.educationAtCopy = this.educationAt;
      this.educationStartPeriodCopy = this.formatStartEducationDate();
      this.educationEndPeriodCopy = this.formatEndEducationDate();
      this.educationAreaCopy = this.educationArea;
      this.showEditEducation = !this.showEditEducation;
    },
    formatStartEducationDate() {
      if (!this.educationPeriod) {
        return "";
      }
      let obj = [];
      for (let index = 0; index < this.educationPeriod.length; index++) {
        let temp = this.educationPeriod[index];
        temp = temp.split(" - ");
        obj.push(temp[0]);
      }
      return obj;
    },
    formatEndEducationDate() {
      if (!this.educationPeriod) {
        return "";
      }
      let obj = [];
      for (let index = 0; index < this.educationPeriod.length; index++) {
        let temp = this.educationPeriod[index];
        temp = temp.split(" - ");
        obj.push(temp[1]);
      }
      return obj;
    },
    closeEditEducation() {
      this.showEditEducation = false;
    },
    closeWorkExperienceModal() {
      this.showEditWorkExperience = false;
    },
    range(start, end) {
      return Array(end - start + 1)
        .fill()
        .map((_, idx) => start + idx);
    },
    getStartDate(date) {
      if (!date) {
        return;
      }
      this.profileInfo.experienceStartDate = [];
      for (let index = 0; index < date.length; index++) {
        let temp = date[index].split("-");
        let tempDate = new Date(temp[0]);
        let year = tempDate.getFullYear();
        let month = tempDate.getMonth() + 1;
        if (month < 10) {
          month = "0" + month;
        }
        console.log(this.profileInfo.experienceStartDate);
        this.profileInfo.experienceStartDate.push(year + "-" + month + "-01");
      }
    },
    getEndDate(date) {
      if (!date) {
        return;
      }
      this.profileInfo.experienceEndDate = [];
      this.profileInfo.isPresent = [];
      for (let index = 0; index < date.length; index++) {
        let temp = date[index].split("-");
        console.log(temp[1]);
        if (temp[1] == " Present") {
          this.profileInfo.isPresent.push(true);
          continue;
        }
        let tempDate = new Date(temp[0]);
        let year = tempDate.getFullYear();
        let month = tempDate.getMonth() + 1;
        if (month < 10) {
          month = "0" + month;
        }
        this.profileInfo.experienceEndDate.push(year + "-" + month + "-01");
        this.profileInfo.isPresent.push(false);
      }
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
      let edited = false;
      this.lastEdited = [];
      if (this.firstName != this.profileInfo.firstName) {
        this.lastEdited.push("first name");
        edited = true;
      }

      if (this.lastName != this.profileInfo.lastName) {
        this.lastEdited.push("last name");
        edited = true;
      }

      if (this.job != this.profileInfo.job) {
        this.lastEdited.push("job");
        edited = true;
      }

      if (this.description != this.profileInfo.description) {
        this.lastEdited.push("description");
        edited = true;
      }

      if (this.age != this.profileInfo.age) {
        this.lastEdited.push("age");
        edited = true;
      }

      if (this.contact != this.profileInfo.contact) {
        this.lastEdited.push("contact");
        edited = true;
      }

      if (this.phone != this.profileInfo.phone) {
        this.lastEdited.push("phone");
        edited = true;
      }

      if (this.address != this.profileInfo.address) {
        this.lastEdited.push("address");
        edited = true;
      }
      if (this.skillsChanged) {
        this.skillsChanged = false;
        this.lastEdited.push("skills");
        console.log("Pushing skills");
        edited = true;
      }
      return edited;
    },

    async GetData() {
      let currUserWebid = window.localStorage.getItem("currUserWebid");
      console.log(this.webid, "hi");
      this.isCurrUserProfile = false;
      this.loadedData = false;
      try {
        await firebase
          .firestore()
          .collection("users")
          .where("webid", "==", this.webid)
          .get()
          .then((querySnapshot) => {
            console.log("here", this.webid);
            querySnapshot.forEach((doc) => {
              if (currUserWebid == doc.data().webid) {
                this.isCurrUserProfile = true;
              }

              this.userID = doc.id;
              this.firstName = doc.data().firstName;
              this.lastName = doc.data().lastName;
              this.job = doc.data().job;
              this.phone = doc.data().phone;
              this.address = doc.data().address;
              this.description = doc.data().description;
              this.experience = doc.data().experience;
              this.experienceLocation = doc.data().experienceLocation;
              this.experienceDate = doc.data().experienceDate;
              this.aboutExperience = doc.data().aboutExperience;
              this.education = doc.data().education;
              this.educationAt = doc.data().educationAt;
              this.educationPeriod = doc.data().educationPeriod;
              this.educationArea = doc.data().educationArea;
              this.skills = doc.data().skills;
              this.skillExperience = doc.data().skillExperience;
              this.hobbies = doc.data().hobbies;
              this.github = doc.data().github;
              this.instagram = doc.data().instagram;
              this.linkedin = doc.data().linkedin;
              this.facebook = doc.data().facebook;
              this.contact = doc.data().contact;
              this.age = doc.data().age;
              this.profileInfo = doc.data();
              this.getStartDate(doc.data().experienceDate);
              this.getEndDate(doc.data().experienceDate);
              this.webid = doc.data().webid;
              this.toAddSkills = doc.data().skills;
              this.toAddSkillExp = doc.data().skillExperience;
            });
          })
          .catch();
      } catch {
        console.log("what");
      }
      await this.getPicture();
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
      }
    },
    async getPicture() {
      try {
        await storageRef
          .child(this.webid)
          .getDownloadURL()
          .then((url) => {
            this.picURL = url;
          })
          .catch(
            await storageRef
              .child("default.png")
              .getDownloadURL()
              .then((url) => {
                this.picURL = url;
              })
          );
      } catch {
        await storageRef
          .child("default.png")
          .getDownloadURL()
          .then((url) => {
            this.picURL = url;
          });
      }
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

.test-class {
  display: inline;
  color: darkgray;
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

.skills-input {
  margin: 20px auto;
  display: flex;
  justify-content: center;
  gap: 10px;
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

.fa-plus-circle {
  font-size: 24px;
  color: darkslategray;
  display: flex;
  justify-content: center;
  transition: 0.2s ease-in-out;
  padding: 10px 0;
}

.fa-user-edit:hover {
  color: #fff;
  cursor: pointer;
}

.fa-edit:hover,
.fa-plus-circle:hover {
  color: #4a89dc;
  cursor: pointer;
}

.col-lg-10 {
  margin: 10px auto;
}

.domain-location {
  display: flex;
  justify-content: center;
}

.domain {
  padding-right: 10px;
}

.dates {
  display: flex;
  justify-content: center;
}
.start-date {
  padding-right: 10px;
}

.checkbox {
  display: flex;
  align-items: center;
  padding-left: 10px;
}

.checkbox-chk:checked {
  display: block;
}

.end-date {
  display: flex;
}

.element-body {
  padding-bottom: 20px;
}

.edu-label {
  padding-top: 10px;
  display: inline-block;
}
</style>
