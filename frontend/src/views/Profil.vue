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
        <p class="editEmail--p" v-show="mailIsEditing">
          Nouvelle adresse Email :<br />
          <input
            class="editEmail--input"
            v-model="newEmail"
            type="text"
            :placeholder="theUser.email"
          /><br />
          <button @click="cancelEmailValidation" class="btn editEmail--btn" type="button">
            Annuler
          </button>
          <button @click="editEmailValidation" class="btn editEmail--btn" type="button">
            Valider
          </button>
        </p>
        <p v-if="emailAlreadyUsed && mailIsEditing" class="warning">
          Cette email existe déjà
        </p>
        <div v-if="!mailIsEditing">
          <button @click="editEmail" class="btn" type="button">
            Modifier adresse email
          </button>
          <button @click="deleteUser" class="btn" type="button">
            Supprimer mon compte
          </button>
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
      mailIsEditing: false,
      newEmail: null,
      emailAlreadyUsed: false,
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
    editEmail() {
      this.mailIsEditing = true;
      setTimeout(() => {
        let input = document.querySelector(".editEmail--input");
        input.focus();
      }, 200);
    },
    cancelEmailValidation() {
      this.mailIsEditing = false;
    },
    editEmailValidation() {
      fetch(`http://localhost:3000/auth/user/${this.theUserId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + this.theUserIdToken,
        },
        body: JSON.stringify({
          email: this.newEmail,
        }),
      })
        .then((res) => {
          console.log(res);
          if (!res.ok) {
            this.emailAlreadyUsed = true;
          } else {
            location.reload();
          }
        })
        .catch((error) => console.log(error));
    },
    deleteUser() {
      if (
        confirm(
          "Êtes-vous sûre de vouloir supprimer votre compte !? \r\n Cela supprimera tous vos postes et commentaires."
        )
      ) {
        fetch(`http://localhost:3000/auth/user/${this.theUserId}`, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + this.theUserIdToken,
          },
        })
          .then(() => {
            localStorage.removeItem("token");
            this.$router.push({ path: "/" });
          })
          .catch((error) => console.log(error));
      }
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
        if (user.error === true) {
          this.$router.push({ path: "/" });
        }
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
  height: 50vh;
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
  .editEmail {
    &--input {
      border: 0;
      outline: none;
      padding: 0.5rem;
      border-radius: 0.5rem;
    }
    &--btn {
      margin: 0.5rem 0.3rem 0;
    }
  }
}
//  *****************************************  MEDIA QUERIES  ********************************************** //
// Format Ipad et en dessous
@media (max-width: 770px) {
  h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  article {
    flex-direction: column;
    width: 90%;
    height: 70vh;
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
