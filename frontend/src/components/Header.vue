<template>
  <header>
    <img src="../assets/logoG.png" alt="" />
    <nav>
      <ul>
        <li><router-link to="/home">Profil</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoper lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 5rem;
  // background-color: brown;
  img {
    height: 3rem;
  }
  ul {
    list-style-type: none;
  }
  a {
    text-decoration: none;
    color: black;
    font-weight: bold;
  }
}
</style>
