<template>
  <div>
    <Header />
    <h1>Groupomania Social Network</h1>
    <router-link to="/home">Textes</router-link> |
    <router-link to="/home/multimedia">Multimédia</router-link>
    <PublicationImg />
    <PostImg />
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import PostImg from "../components/PostImg.vue";
import PublicationImg from "../components/PublicationImg.vue";

export default {
  name: "Home",
  components: {
    Header,
    PublicationImg,
    PostImg,
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
  width: 70%;
  margin: auto;
  margin-top: 2rem;
  border-radius: $borderRadius;
  background-color: rgb(255, 245, 245);
  padding: 1rem;
}
</style>
