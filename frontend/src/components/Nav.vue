<template>
  <nav>
    <ul>
      <li>
        <slot></slot>
      </li>
      <li><router-link @click="disconnect" to="/">Déconnexion</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Nav",
  methods: {
    disconnect() {
      localStorage.clear();
    },
  },
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

@media (max-width: 550px) {
  ul {
    display: inline-block;
    // li:nth-child(2) {
    //   margin-top: 1rem;
    // }
  }
}
</style>
