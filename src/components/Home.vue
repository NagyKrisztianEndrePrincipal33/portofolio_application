<template>
  <navigation-bar :user="user"></navigation-bar>
  <p v-if="user.loggedIn">You are logged in!{{user.data}}</p>
</template>

<script>
import NavigationBar from "./NavigationBar";
import {mapGetters} from "vuex";
export default {
  name: "Home",
  components: {
    NavigationBar,
  },
  computed:{
    ...mapGetters({
      user:"user",
    })
  }
};
</script>
