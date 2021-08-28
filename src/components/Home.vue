<template>
  <navigation-bar :user="user"></navigation-bar>
  <div class="body">
    <!-- <p v-if="user.loggedIn">You are logged in!{{ user.data }}</p> -->
    <div v-if="user.loggedIn">
      <div v-if="newsFeed">
        <div v-for="news in newsFeed" :key="news">
          <div class="post">
            <div class="post-header">
              {{ news.firstName + " " + news.lastName }} just updated
              <div v-if="news.gender == 'male'">his</div>
              <div v-else>her</div>
              <div v-for="editField in lastEdited.slice(0, 3)" :key="editField">
                {{ editField }},
              </div>
              <div v-if="lastEdited.length > 3">and more! check it out.</div>
            </div>
            <hr />
            <div class="name-date">
              <img
                class="profile-pic"
                :src="news.profilePic"
                style="width: 50px; height: 50px;"
              />
              <div class="name-date-holder">
                <div class="name">
                  {{ news.firstName + " " + news.lastName }}
                </div>
                <div class="date">
                  {{ timePassed(news.editedAt.toDate()) }}
                </div>
              </div>
            </div>
            <div class="post-body"></div>
          </div>
          <!-- <div class="person">
            <img
              class="profilePic"
              :src="news.profilePic"
              style="width: 40px; height: 40px;"
            />
            <div class="name">
              <div class="time">
                {{ formatDate(new Date(news.editedAt.toDate())) }}
              </div>
              {{ news.lastName + " " + news.firstName }} just updated
            </div>
            <div v-if="news.gender == 'male'">his</div>
            <div v-else>her</div>
            <div v-for="editField in lastEdited.slice(0, 3)" :key="editField">
              {{ editField }}
            </div>
            <div v-if="lastEdited.length > 3">and more! check it out.</div>
          </div>
          <div class="post">
            <router-link
              class="navigation-link"
              :to="{ name: 'profile_page', params: { webid: news.webid } }"
              >post here</router-link
            >
          </div> -->
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
      newsFeed: [],
      lastEdited: [],
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
  created() {
    this.initLoad();
  },
  methods: {
    timePassed(dateEdited) {
      var today = new Date();
      var diffMs = today - dateEdited;
      var diffS = (today - dateEdited) / 1000; // sec
      var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
      var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
      var diffDays = Math.floor(diffMs / 86400000); // days

      if (diffS < 60) {
        return Math.trunc(diffS) + " seconds ago ";
      } else if (diffMins < 60) {
        return diffMins + " minutes ago ";
      } else if (diffHrs < 24) {
        return diffHrs + " hours ago ";
      } else {
        return diffDays + " days ago ";
      }
    },
    formatDate(date) {
      var d = new Date(date);
      const month = d.toLocaleString("En", { month: "long" });
      const day = d.getDate();
      const year = d.getFullYear();

      return (
        day + " " + month.charAt(0).toUpperCase() + month.slice(1) + " " + year
      );
    },
    initLoad() {
      console.log("Loaded");
      firebase
        .firestore()
        .collection("users")
        .orderBy("editedAt")
        .limit(5)
        .get()
        .then((doc) => {
          doc.forEach(async (doc) => {
            const data = doc.data();
            await firebase
              .storage()
              .ref()
              .child(doc.data().webid)
              .getDownloadURL()
              .then((url) => {
                data.profilePic = url;
                console.log(data.profilePic);
              });
            this.newsFeed.push(data);
            this.lastEdited = doc.data().lastEdited;
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
}

.post-body {
}
</style>
