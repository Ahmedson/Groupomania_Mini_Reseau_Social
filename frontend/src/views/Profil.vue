<template>
  <div v-if="theUser">
    <Header />
    <h1>Groupomania Social Network</h1>
    <h2>Profil de {{ theUser.firstName }} {{ theUser.lastName }}</h2>
    <article>
      <div class="div-photo">
        <div>PHOTO DE PROFIL</div>
        <div class="photo">PHOTO</div>
        <div>
          <button class="btn" type="button">Modifier la photo</button>
        </div>
      </div>
      <div>
        <h3>Informations personnelles</h3>
        <p>Date de création : {{ timestampToDateAndHours(theUser.createdAt) }}</p>
        <p>Nom : {{ theUser.lastName }}</p>
        <p>Prénom : {{ theUser.firstName }}</p>
        <p>Adresse email : {{ theUser.email }}</p>
        <div>
          <button class="btn" type="button">Modifier adresse email</button>
          <button class="btn" type="button">Supprimer mon compte</button>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  name: "Profil",
  components: { Header },
  data() {
    return {
      theUser: null,
      theUserId: null,
      theUserIdToken: null,
    };
  },
  methods: {
    addZero(value) {
      return String(value).length === 1 ? 0 + "" + value : value;
    },
    timestampToDateAndHours(timestamp) {
      let date = new Date(Date.parse(timestamp));
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let fullDate = `${this.addZero(day)}/${this.addZero(
        month
      )}/${year} à ${this.addZero(hours)}:${this.addZero(minutes)}:${this.addZero(
        seconds
      )}`;
      return fullDate;
    },
  },
  async mounted() {
    let token = JSON.parse(localStorage.getItem("token"));
    this.theUserIdToken = token.token;
    this.theUserId = token.userId;

    await fetch(`http://localhost:3000/auth/user/${this.theUserId}`, {
      headers: {
        Authorization: "Bearer " + this.theUserIdToken,
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((user) => {
        this.theUser = user;
      })
      .catch((error) => console.log(error));
  },
};
</script>

<style scoped lang="scss">
article {
  display: flex;
  justify-content: space-around;
  width: 70%;
  margin: auto;
  padding: 1rem;
  height: 50vh;
  margin-top: 2rem;
  border-radius: 0.5rem;
  background-color: rgb(255, 245, 245);
  .div-photo {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .photo {
      max-height: 70%;
      background-color: red;
    }
  }
  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    button:nth-child(1) {
      margin-right: 2rem;
    }
  }
}

@media (max-width: 770px) {
  h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  article {
    flex-direction: column;
    width: 90%;
    height: 60vh;
    .div-photo {
      height: 50%;
    }
    div:nth-child(2) {
      height: 50%;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        button {
          width: 50%;
        }
        button:nth-child(1) {
          margin-bottom: 1rem;
          margin-right: 0;
        }
      }
    }
  }
}
</style>
