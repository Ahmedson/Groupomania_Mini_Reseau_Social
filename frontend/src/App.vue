<template>
  <router-view />
</template>

<style lang="scss">
body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

// Style des formulaires LoginForm.vue & SignupForm.vue
.form {
  background-color: #42b983;
  padding: 3rem 7rem;
  border-radius: 0.5rem;
  margin: auto;
  text-align: left;
  &--input {
    margin-bottom: 1rem;
    width: 20rem;
  }
  &--div {
    display: flex;
    justify-content: space-between;
  }
}
</style>
