<template>
  <footer>
    <img src="../assets/logoG.png" alt="" />
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped lang="scss">
footer {
  display: flex;
  justify-content: center;
  // justify-content: space-between;
  // align-items: center;
  padding: 2rem 0 1rem;
  img {
    height: 3.5rem;
  }
}

@media (max-width: 550px) {
  img {
    height: 12rem;
  }
}
</style>
