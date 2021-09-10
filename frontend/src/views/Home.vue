<template>
  <div>
    <Header />
    <h1>Groupomania Social Network</h1>
    <router-link to="/home">Textes</router-link> |
    <router-link to="/home/multimedia">Multimédia</router-link>
    <Publication />
    <Posts />
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Posts from "../components/Post.vue";
import Publication from "../components/Publication.vue";

export default {
  name: "Home",
  components: {
    Header,
    Publication,
    Posts,
    Footer,
  },
};
</script>

<style lang="scss">
$borderRadius: 0.5rem;

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
article {
  box-shadow: 0rem 0rem 0.3rem rgba(233, 67, 38, 1);
  width: 70%;
  margin: auto;
  margin-top: 2rem;
  border-radius: $borderRadius;
  background-color: rgb(255, 245, 245);
  padding: 1rem;
}
</style>
