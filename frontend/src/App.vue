<template>
  <router-view />
</template>

<style lang="scss">
html,
body,
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.logoLogin {
  // Logo /login & /signup
  height: 10rem;
  margin-bottom: 2rem;
}

// Style des formulaires LoginForm.vue & SignupForm.vue
.form {
  // background-color: #42b983;
  border: 2px solid rgb(233, 67, 38);
  padding: 3rem 7rem;
  border-radius: 0.5rem;
  margin: 0 auto;
  text-align: left;
  &--btn {
    border: 1px solid rgb(233, 67, 38);
    background-color: white;
    border-radius: 0.3rem;
    padding: 0.3rem 1rem;
    color: rgb(233, 67, 38);
    font-weight: bold;
    &:hover {
      cursor: pointer;
    }
  }
  &--input {
    margin-bottom: 1rem;
    width: 20rem;
    outline-color: rgb(233, 67, 38);
  }
  &--div {
    display: flex;
    justify-content: space-between;
    &__bg {
      // div qui prend tout le viewport et qui contient les formulaires
      height: 100vh;
      width: 100vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .warning {
    color: red;
    margin-bottom: 0.7rem;
  }
}
</style>
