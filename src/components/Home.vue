<template>
  <navigation-bar :user="user"></navigation-bar>
  <div class="body">
    <!-- <p v-if="user.loggedIn">You are logged in!{{ user.data }}</p> -->
    <div v-if="user.loggedIn">
      <div v-if="newsFeed">
        <div v-for="news in newsFeed" :key="news">
          {{ grouping(news) }}
          <div class="post">
            <div class="post-header">
              {{ news.firstName + " " + news.lastName }} just updated
              <div v-if="news.gender == 'male'">his</div>
              <div v-else>her</div>
              <div
                v-for="editField in news.lastEdited.slice(0, 3)"
                :key="editField"
              >
                {{ editField }}<span v-if="news.lastEdited.length == 0">,</span>
              </div>
              <div v-if="news.lastEdited.length > 3">
                and more! check it out.
              </div>
            </div>
            <hr />
            <div class="name-date">
              <router-link
                class="navigation-link"
                :to="{
                  name: 'profile_page',
                  params: { webid: news.webid },
                }"
              >
                <img
                  class="profile-pic"
                  :src="news.profilePic"
                  style="width: 50px; height: 50px;"
              /></router-link>
              <div class="name-date-holder">
                <router-link
                  class="navigation-link"
                  :to="{
                    name: 'profile_page',
                    params: { webid: news.webid },
                  }"
                  ><div class="name">
                    {{ news.firstName + " " + news.lastName }}
                  </div></router-link
                >
                <div class="date">
                  {{ timePassed(news.editedAt.toDate()) }}
                </div>
              </div>
            </div>
            <div class="post-body">
              <div class="description">
                {{ news.description }}
              </div>
              <div class="skills" v-if="news.lastEdited.includes('skills')">
                <div
                  class="col-md-5"
                  v-for="(skill, index) in this.combinedSkills
                    .sort(function(a, b) {
                      return b.skillExp.match(/\d+/) - a.skillExp.match(/\d+/);
                    })
                    .slice(0, 3)"
                  :key="index"
                >
                  <p class="mb-2">{{ skill.skillName }}</p>
                  <div class="progress my-1">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      :style="{ width: skill.skillExp }"
                      :aria-valuenow="{ width: skill.skillExp }"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
              <button>Visit profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from "./NavigationBar";
import { mapGetters } from "vuex";
import firebase from "../database/firebase";
export default {
  name: "Home",
  data() {
    return {
      topSkills: [],
      newsFeed: [],
      lastEdited: [],
      combinedSkills: [],
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
  async created() {
    await this.initLoad();
  },
  methods: {
    grouping(news) {
      if (!news.sklils) {
        return;
      }
      this.combinedSkills = news.skills.map((x, i) => {
        return { skillName: x, skillExp: news.skillExperience[i] };
      });
    },
    timePassed(dateEdited) {
      var seconds = Math.floor((new Date() - dateEdited) / 1000);
      var interval = seconds / 31536000;

      if (interval > 1) {
        return Math.floor(interval) == 1
          ? Math.floor(interval) + " year ago"
          : Math.floor(interval) + " years ago";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) == 1
          ? Math.floor(interval) + " month ago"
          : Math.floor(interval) + " months ago";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) == 1
          ? Math.floor(interval) + " day ago"
          : Math.floor(interval) + " days ago";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) == 1
          ? Math.floor(interval) + " hour ago"
          : Math.floor(interval) + " hours ago";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) == 1
          ? Math.floor(interval) + " minute ago"
          : Math.floor(interval) + " minutes ago";
      }
      return Math.floor(interval) == 1
        ? Math.floor(interval) + " second ago"
        : Math.floor(interval) + " seconds ago";
    },
    compareLastEdited(a, b) {
      if (a.lastEdited < b.lastEdited) {
        return -1;
      }
      if (a.lastEdited > b.lastEdited) {
        return 1;
      }
      return 0;
    },
    async initLoad() {
      await firebase
        .firestore()
        .collection("users")
        .orderBy("editedAt", "desc")
        .limit(5)
        .get()
        .then(async (doc) => {
          doc.forEach(async (doc) => {
            const data = doc.data();
            data.lastEdited = doc.data().lastEdited;
            await firebase
              .storage()
              .ref()
              .child(doc.data().webid)
              .getDownloadURL()
              .then((url) => {
                data.profilePic = url;
              });
            this.newsFeed.push(data);
            this.newsFeed.sort(this.compareLastEdited);
          });
        });
    },
  },
};
</script>
<style scoped lang="scss">
.body {
  padding-top: 70px;
  width: 100%;
}

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

.description {
  display: flex;
  margin: 5px 0px 10px 20px;
  text-align: left;
}

.post-header {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  gap: 4px;
  padding: 10px;
  margin-left: 10px;
  font-size: 13px;
  color: darkgray;
}

.profile-pic {
  display: flex;
  width: 300;
  height: auto;
  border-radius: 50%;
  margin: 0px 5px 10px 20px;
}

.name-date {
  display: flex;
}

.name-date-holder {
  margin-left: 10px;
  text-align: left;
}

.date {
  color: darkgray;
  font-size: 13px;
}

hr {
  margin: 0px 20px 15px 20px;
  opacity: 0.15;
}

.post-body {
}

.navigation-link {
  color: rgba($color: #000000, $alpha: 0.8);
  text-decoration: none;
}

.navigation-link:hover {
  cursor: pointer;
  text-decoration: underline;
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

.skills {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
