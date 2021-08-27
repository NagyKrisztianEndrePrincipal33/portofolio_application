<template>
  <navigation-bar :user="user"></navigation-bar>
  <div class="body">
    <p v-if="user.loggedIn">You are logged in!{{ user.data }}</p>
  </div>
</template>

<script>
import NavigationBar from "./NavigationBar";
import { mapGetters } from "vuex";
import storageRef from '../database/storageRef';
export default {
  name: "Home",
  components: {
    NavigationBar,
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  created () {
    this.getPicture()
  },
  methods: {
    async getPicture () {
      let picURL = ""
      await storageRef.child(this.user.data.uid).getDownloadURL().then((url) => {
          picURL = url;
      }).catch(()=>{
        storageRef.child('default.png').getDownloadURL().then((url) => {
          picURL = url;
        })
      })
      window.localStorage.setItem("picURL", picURL);
    },
  }
};
</script>
<style scoped lang="scss">
.body {
  padding-top: 70px;
}
</style>
