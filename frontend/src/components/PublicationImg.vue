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
      <label for="file">Image</label><br />
      <input type="file" id="file" name="file" @change="onFileChange" />
      <br />
      <p v-if="notFull" class="warning">
        Veuillez remplir les champs "Titre" et "Article" avant de publier
      </p>
      <button @click="publishPostImg" class="btn">Publier</button>
    </article>
  </div>
</template>

<script>
export default {
  name: "Publication",
  data() {
    return {
      titleArticle: "",
      selectedFile: "",
      notFull: false,
    };
  },
  methods: {
    onFileChange(e) {
      const selectedFile = e.target.files[0];
      this.selectedFile = selectedFile;
    },
    publishPostImg() {
      this.notFull = false;
      // setTimeout(() => {
      const formData = new FormData();
      formData.append("title", this.titleArticle);
      formData.append("image", this.selectedFile);

      console.log(this.selectedFile);
      // if (this.titleArticle.length < 1) {
      //   this.notFull = true;
      // } else {
      let token = JSON.parse(localStorage.getItem("token"));
      let tokenToken = token.token;
      let tokenUserId = token.userId;

      fetch(`http://localhost:3000/postImg/${tokenUserId}/`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + tokenToken,
        },
        body: formData,
      })
        .then((res) => {
          if (res.ok) {
            location.reload();
            return res.json();
          }
        })
        .catch((error) => console.log(error));
      // }
      // }, 200);
    },
  },
};
</script>

<style scoped lang="scss">
article {
  label {
    font-weight: bold;
  }
  input {
    margin: 1rem auto 1rem;
    width: 80%;
    height: 1rem;
    white-space: pre;
    outline: none;
    border: 0;
    border-radius: 0.5rem;
    padding: 0.5rem;
    &#file {
      width: auto;
    }
  }
}

@media (max-width: 550px) {
  article {
    width: 85%;
  }
}
</style>
