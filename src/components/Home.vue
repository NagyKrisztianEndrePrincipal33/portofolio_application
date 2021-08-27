<template>
  <navigation-bar :user="user"></navigation-bar>
  <div class="body">
    <p v-if="user.loggedIn">You are logged in!{{ user.data }}</p>
  </div>
</template>

<script>
import NavigationBar from "./NavigationBar";
import { mapGetters } from "vuex";
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
};
</script>
<style scoped lang="scss">
.body {
  padding-top: 70px;
}
</style>
