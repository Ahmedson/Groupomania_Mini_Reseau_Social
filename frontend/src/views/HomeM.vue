<template>
  <div>
    <Header />
    <h1>Groupomania Social Network</h1>
    <router-link to="/home">Textes</router-link> |
    <router-link to="/home/multimedia">Multimédia</router-link>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  name: "HomeM",
  components: {
    Header,
  },
};
</script>

<style scoped lang="scss">
h1 {
  margin-bottom: 1rem;
}
a {
  font-weight: bold;
  color: #2c3e50;

  &.router-link-exact-active {
    color: rgb(233, 67, 38);
  }
}
</style>
