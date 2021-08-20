<template>
    <nav class="navigation-bar">
        <i class="fas fa-users"></i>
        <router-link class="navigation-link" to="/">Home</router-link> 
      <router-link class="navigation-link" to="/about">About</router-link>
    </nav>
</template>

<script>
export default {
    name:"NavigationBar",
}
</script>

<style scoped lang="scss">
$fa-font-path: "~@fortawesome/fontawesome-free/webfonts";
@import "~@fortawesome/fontawesome-free/scss/fontawesome";
@import "~@fortawesome/fontawesome-free/scss/solid"; // fas
@import "~@fortawesome/fontawesome-free/scss/regular"; // far
@import "~@fortawesome/fontawesome-free/scss/brands"; // fab
@import "./colors";

    .navigation-bar{
        font-size:1.5rem;
        background-color:$second-color;
        color:white;
        padding:15px 10px;
        display:flex;
        align-items: center;
        gap:10px;
        .navigation-link{
            text-decoration: none;
            color:white;
            font-family: "sans-serif", cursive;
            font-size:2rem;
        }
    }
</style>