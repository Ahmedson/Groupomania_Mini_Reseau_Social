<template>
  <form @submit="checkForm" class="form" action="">
    <label for="firstName">Prénom</label><br /><input
      v-model="firstName"
      class="form--input"
      type="text"
      name="firstName"
      id="firstName"
    /><br />
    <label for="lastName">Nom</label><br /><input
      v-model="lastName"
      class="form--input"
      type="text"
      name="lastName"
      id="lastName"
    /><br />
    <label for="email">Email</label><br /><input
      v-model="email"
      class="form--input"
      type="text"
      name="email"
      id="email"
    /><br />
    <label for="password">Mot de passe</label><br /><input
      v-model="password"
      class="form--input"
      type="password"
      name="password"
      id="password"
    /><br />
    <p v-if="errorMsg" class="warning">{{ errorMsg }}</p>
    <div class="form--div">
      <router-link to="/">je possède déjà un compte</router-link>
      <button class="btn" @click="checkForm" type="submit">S'inscrire</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "SignupForm",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      errorMsg: null,
    };
  },
  methods: {
    checkForm(e) {
      e.preventDefault();
      let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (this.firstName.length < 2) {
        this.errorMsg = "Votre prénom doit comporter au moins 2 caractères";
        return;
      } else if (this.lastName.length < 2) {
        this.errorMsg = "Votre nom doit comporter au moins 2 caractères";
        return;
      } else if (this.email.length === 0) {
        this.errorMsg = "Veuillez saisir votre adresse mail";
        return;
      } else if (regex.test(this.email)) {
        if (this.password.length === 0) {
          this.errorMsg = "Veuillez saisir votre mot de passe";
          return;
        }
      } else {
        this.errorMsg = "Veuillez saisir une adresse mail valide";
        return;
      }
      this.signupEvent();
    },
    async signupEvent() {
      let firstName = this.firstName;
      let lastName = this.lastName;
      let email = this.email;
      let password = this.password;

      const user = {
        firstName,
        lastName,
        email,
        password,
      };
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(user),
      })
        .then(function (res) {
          return res.json();
        })
        .catch(function (error) {
          console.log(error);
        });
      if (response.emailAlreadyUsed) {
        this.errorMsg = "Adresse mail déjà utilisée";
      } else if (response.error === "unauthorized request") {
        this.errorMsg =
          "Mot de passe requis : au moins 8 caractères dont une majuscule, une minuscule, un chiffre et un caractère spéciale";
      } else {
        localStorage.setItem("token", JSON.stringify(response));
        this.$router.push({ path: "/home" });
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
