<template>
  <div>
    <Header />
    <h1>Here is my Home page</h1>
    <Post />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Post from "../components/Post.vue";

export default {
  name: "Home",
  components: {
    Header,
    Post,
  },
};
</script>
