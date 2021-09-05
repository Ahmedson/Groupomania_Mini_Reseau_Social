<template>
  <header>
    <img src="../assets/logoG.png" alt="" />
    <Navigation>
      <template v-if="$route.path === '/profil'">
        <router-link to="/home">Home</router-link>
      </template>
      <template v-else>
        <router-link to="/profil">Profil</router-link>
      </template>
    </Navigation>
  </header>
</template>

<script>
import Navigation from "./Nav.vue";
export default {
  components: { Navigation },
  name: "Header",
};
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 5rem;
  img {
    height: 3rem;
  }
  a {
    text-decoration: none;
    color: black;
    font-weight: bold;
  }
}

@media (max-width: 550px) {
  header {
    padding-left: 1rem;
    padding-right: 0;
    img {
      height: 2.5rem;
    }
  }
}
</style>
