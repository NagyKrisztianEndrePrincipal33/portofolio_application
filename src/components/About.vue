<template>
  <navigation-bar v-if="!mobileView"></navigation-bar>
  <div class="body">
    <div class="about-header-container">
      <p class="about-header">About CVbook</p>
      <hr class="header-hr" />
      <p class="about-desc">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
    </div>
    <div class="about-img-container">
      <img
        class="about-img"
        src="https://static-exp1.licdn.com/sc/h/dxf91zhqd2z6b0bwg85ktm5s4"
      />
    </div>
  </div>
  <div class="targets">
    <div class="vision">
      <p class="target-title">Vision</p>
      <p class="target-desc">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis.
      </p>
      <hr />
    </div>
    <div class="mission">
      <p class="target-title">Mission</p>
      <p class="target-desc">
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
        fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
        sequi nesciunt.
      </p>
      <hr />
    </div>
    <div class="we">
      <p class="target-title">Who are we?</p>
      <p class="target-desc">
        Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
        suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
        <br /><br />
        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
        consectetur, adipisci velit, sed quia non numquam eius modi tempora
        incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
      </p>
    </div>
  </div>
  <!-- <div class="post-cv-container">
    <p class="post-cv">Post your CV for millions of people to see</p>
    <button class="post-cv-button" href="#">Post CV</button>
  </div> -->
  <div class="team-container">
    <div class="team-member">
      <img src="../assets/laszlo.png" />
      <p class="member-name">László Bakó</p>
      <p class="member-job">Ajutor programator</p>
      <p class="member-email">bakolaszlo999@gmail.com</p>
    </div>
    <div class="team-member">
      <img src="../assets/krisztian.png" />
      <p class="member-name">Krisztián-Endre Nagy</p>
      <p class="member-job">Ajutor programator</p>
      <p class="member-email">
        nagykrisztian.endre@gmail.com
      </p>
    </div>
    <div class="team-member">
      <img src="../assets/timi.jpg" />
      <p class="member-name">Septimiu Drăghici</p>
      <p class="member-job">Ajutor programator</p>
      <p class="member-email">draghiciseptimiu99@gmail.com</p>
    </div>
    <div class="team-member">
      <img src="../assets/tamas.png" />
      <p class="member-name">Tamás Csép</p>
      <p class="member-job">Ajutor programator</p>
      <p class="member-email">tamascsep@gmail.com</p>
    </div>
  </div>
</template>

<script>
import NavigationBar from "./NavigationBar.vue";

//This is only an example component
export default {
  name: "About",
  components: {
    NavigationBar,
  },
};
</script>

<style scoped lang="scss">
.body {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell,
    "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f2f2f2;
  padding-top: 70px;
}
.about-header {
  color: rgba(0, 0, 0, 0.85);
  font-weight: 200;
  line-height: 72px;
  font-size: 66px;
  margin-bottom: 0;
}

.about-desc {
  line-height: 28px;
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  padding: 0 5rem 0 5rem;
}

.about-img {
  display: flex;
  width: 100%;
  height: auto;
  width: 700px;
  height: 670px;
}

.about-img-container {
  display: flex;
}

@media (min-width: 1161px) {
  .about-img--desktop {
    z-index: -1;
    width: 700px;
    height: 670px;
    position: absolute;
    top: -10px;
    right: -150px;
  }
}
@media (max-width: 1200px) {
  .body {
    flex-wrap: wrap;
  }
  .about-img {
    width: 100%;
    height: auto;
  }
}

@media (max-width: 920px) {
  .about-img {
    width: 100%;
    height: auto;
  }
}

.targets {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}

.target-title {
  color: rgba(0, 0, 0, 0.85);
  font-weight: 200;
  font-size: 36px;
}

.target-desc {
  color: rgba(0, 0, 0, 0.85);
  font-size: 18px;
  padding: 0 20% 30px 20%;
}

hr {
  width: 30%;
  border: 1px solid #f2f2f2;
}

.header-hr {
  border: 5px solid #2f9df7;
  width: 20%;
  border-radius: 50px;
  margin: 2rem auto;
}

.post-cv-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-flow: row wrap;
  background-color: #2f9df7;
}

.post-cv {
  color: white;
  font-size: 40px;
  font-weight: 200;
  padding: 3%;
}

.post-cv-button {
  height: 50px;
  color: white;
  font-size: 1.4rem;
  font-weight: 200;
  background: transparent;
  box-shadow: none;
  border: 2px solid white;
  border-radius: 24px;
  padding: 0 32px;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.post-cv-button:hover {
  background-color: #015073;
}

@media (max-width: 986px) {
  .post-cv {
    margin: 1rem 1rem;
  }
  .post-cv-button {
    margin-bottom: 3rem;
  }
}

.team-container {
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
}

.team-member {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 1rem;
  padding: 2rem;
  border: 1px solid #f2f2f2;
  border-radius: 10px;
  box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
  img {
    width: 300px;
    border-radius: 50%;
    padding: 1rem;
  }
  .member-name {
    font-size: 24px;
    font-weight: 200;
  }
  .member-job {
    font-size: 20px;
    font-weight: 200;
    color: #2f9df7;
  }
  .member-email {
    font-size: 18px;
    font-weight: 200;
  }
}
</style>
