<template>
  <form @submit="checkForm" class="form" action="">
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
      <router-link to="/signup">Créer un compte</router-link>
      <button class="btn" @submit="checkForm" type="submit">Se connecter</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      errorMsg: "",
    };
  },
  methods: {
    checkForm(e) {
      e.preventDefault();
      let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (this.email.length === 0) {
        this.errorMsg = "Veuillez saisir votre adresse mail";
        return;
      } else if (regex.test(this.email)) {
        if (this.password.length === 0) {
          this.errorMsg = "Veuillez saisir votre mot de passe";
          return;
        }
        this.loginEvent();
      } else {
        this.errorMsg = "Veuillez saisir une adresse mail valide";
      }
    },
    async loginEvent() {
      const user = {
        email: this.email,
        password: this.password,
      };
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(user),
      })
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      if (response) {
        localStorage.setItem("token", JSON.stringify(response));
        this.$router.push({ path: "/home" });
      } else {
        this.errorMsg = "Nom d'utilisateur ou mot de passe incorrect";
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
