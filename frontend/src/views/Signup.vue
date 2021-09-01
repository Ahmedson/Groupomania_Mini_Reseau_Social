<template>
  <div class="form--div__bg">
    <img class="logoLogin" src="../assets/logoLogin.png" alt="" />
    <SignupForm />
  </div>
</template>

<script>
import SignupForm from "@/components/SignupForm.vue";

export default {
  name: "Signup",
  components: {
    SignupForm,
  },
};
</script>

<style lang="scss"></style>
