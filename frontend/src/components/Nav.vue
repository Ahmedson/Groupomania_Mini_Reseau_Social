<template>
  <nav>
    <ul>
      <li>
        <slot></slot>
      </li>
      <li><router-link to="/">Déconnexion</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Nav",
};
</script>

<style scoped lang="scss">
ul {
  display: flex;
  list-style-type: none;
  li {
    margin-right: 1rem;
    a {
      text-decoration: none;
      color: black;
      font-weight: bold;
    }
  }
}
</style>
