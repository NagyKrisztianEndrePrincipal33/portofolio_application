<template>
  <navigation-bar :user="user"></navigation-bar>
  <div class="body">
    <p v-if="user.loggedIn">You are logged in!{{ user.data }}</p>
    <div v-if="user.loggedIn">
      <div v-if="newsFeed">
        <div v-for="news in newsFeed" :key="news">
          {{ news }}
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
    console.log("Loaded");
    firebase
      .firestore()
      .collection("users")
      //.orderBy("editedAt")
      .limit(5)
      .get()
      .then((doc) => {
        doc.forEach((doc) => {
          this.newsFeed.push(doc.data());
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
</style>
