<template>
  <div class="form--div__bg">
    <img class="logoLogin" src="../assets/logoLogin.png" alt="" />
    <LoginForm />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "Login",
  components: {
    LoginForm,
  },
};
</script>

<style scoped lang="scss"></style>
