<template>
  <navigation-bar :user="user"></navigation-bar>
  <div class="body">
    <p v-if="user.loggedIn">You are logged in!{{ user.data }}</p>
    <div v-if="user.loggedIn">
      <div v-if="newsFeed">
        <div class="person" v-for="news in newsFeed" :key="news">
          <div class="name">
            {{ news.lastName + " " + news.firstName }} just edited
            <div v-if="news.gender == male">his</div>
            <div v-else>her</div>
          </div>
          <div v-for="editField in lastEdited.slice(0, 3)" :key="editField">
            {{ editField }}
          </div>
          <div v-if="lastEdited.length > 3">and more! check it out.</div>
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
    console.log("Loaded");
    firebase
      .firestore()
      .collection("users")
      .orderBy("editedAt")
      .limit(5)
      .get()
      .then((doc) => {
        doc.forEach((doc) => {
          this.newsFeed.push(doc.data());
          this.lastEdited = doc.data().lastEdited;
          console.log(doc.data());
        });
      });
  },
};
</script>
<style scoped lang="scss">
.body {
  padding-top: 70px;
}

.person {
  display: block;
  justify-content: space-between;
  background-color: blue;
}

.name {
  background-color: blueviolet;
  padding-top: 12px;
}
</style>
