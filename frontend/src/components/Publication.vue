<template>
  <div>
    <article>
      <label for="title">Titre</label><br /><input
        v-model="titleArticle"
        name="title"
        type="text"
        id="title"
        placeholder="Écrivez le titre de votre article…"
      /><br />
      <label for="article">Article</label><br />
      <textarea
        v-model="contentArticle"
        name="article"
        placeholder="Écrivez votre article..."
        id="article"
      ></textarea
      ><br />
      <p v-if="notFull" class="warning">
        Veuillez remplir les champs "Titre" et "Article" avant de publier
      </p>
      <button @click="publishArticle" class="btn">Publier</button>
    </article>
  </div>
</template>

<script>
export default {
  name: "Publication",
  data() {
    return {
      titleArticle: "",
      contentArticle: "",
      notFull: false,
    };
  },
  methods: {
    publishArticle() {
      this.notFull = false;
      setTimeout(() => {
        if (this.titleArticle.length < 1 || this.contentArticle.length < 1) {
          this.notFull = true;
        } else {
          let token = JSON.parse(localStorage.getItem("token"));
          let tokenToken = token.token;
          let tokenUserId = token.userId;
          fetch("http://localhost:3000/post/", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json; charset=UTF-8",
              Authorization: "Bearer " + tokenToken,
            },
            body: JSON.stringify({
              title: this.titleArticle,
              post: this.contentArticle,
              user_id: tokenUserId,
            }),
          })
            .then((res) => {
              if (res.ok) {
                location.reload();
                return res.json();
              }
            })
            .catch((error) => console.log(error));
          location.reload();
        }
      }, 200);
    },
  },
};
</script>

<style scoped lang="scss">
article {
  label {
    font-weight: bold;
  }
  textarea,
  input {
    margin: 1rem auto 1rem;
    width: 80%;
    height: 10rem;
    white-space: pre;
    outline: none;
    border: 0;
    border-radius: 0.5rem;
    padding: 0.5rem;
  }
  input {
    height: 1rem;
  }
}

@media (max-width: 550px) {
  article {
    width: 85%;
  }
}
</style>
