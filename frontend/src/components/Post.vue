<template>
  <div>
    <article :id="post.post_id" v-for="post in posts" :key="post.post_id">
      <div class="post--header">
        <small class="info">
          <h3>
            <img
              v-if="userPicture(post.user_id)"
              :src="userPicture(post.user_id)"
              alt=""
            />
            <img v-else src="../assets/profil.png" alt="" />
            Publié par : {{ userName(post.user_id) }}
          </h3>
          <p v-if="post.createdAt === post.updatedAt">
            Le : {{ timestampToDateAndHours(post.createdAt) }}
          </p>
          <p v-else>Modifié le : {{ timestampToDateAndHours(post.updatedAt) }}</p>
        </small>
      </div>
      <h2 class="post post--title">{{ post.title }}</h2>
      <div class="post post--post">{{ post.post }}</div>
      <div>
        <div v-for="commentObject in arrayCommentObject" :key="commentObject.comment_id">
          <div v-for="comment in commentObject" :key="comment.comment_id">
            <!-- Commentaires -->
            <div
              :id="comment.comment_id"
              class="post post--comments"
              v-if="post.post_id === comment.post_id"
            >
              <div class="post post--deleteModify">
                <small>
                  <template v-if="comment.user_id === tokenUserId || tokenUserId === 1">
                    <span @click="editPostOrComment('comment')">Modifier</span> /
                    <span @click="deletePostOrComment('comment')">Supprimer</span> -
                  </template>
                  <span v-if="comment.createdAt === comment.updatedAt" class="date-heure">
                    Le : {{ timestampToDateAndHours(comment.createdAt) }}</span
                  >
                  <span v-else class="date-heure"
                    >Modifié le : {{ timestampToDateAndHours(comment.updatedAt) }}</span
                  >
                </small>
              </div>
              <p>
                <img
                  v-if="userPicture(comment.user_id)"
                  :src="userPicture(comment.user_id)"
                  alt=""
                />
                <img v-else src="../assets/profil.png" alt="" />{{
                  userName(comment.user_id)
                }}
                :
              </p>
              <p>- {{ comment.comment }}</p>
            </div>
          </div>
        </div>
        <div class="separateur"></div>
        <!-- Zone d'écriture des commentaires -->
        <form class="post">
          <textarea placeholder="Écrivez votre commentaire..."></textarea>
          <br />
          <button @click="submitComment" class="btn" type="submit">Commenter</button>
        </form>
        <div
          v-if="post.user_id === tokenUserId || tokenUserId === 1"
          class="post post--deleteModify"
        >
          <small
            ><span @click="editPostOrComment('post')">Modifier</span> /
            <span @click="deletePostOrComment('post')">Supprimer</span>
          </small>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Post",
  data() {
    return {
      arrayCommentObject: [],
      comments: "",
    };
  },
  computed: {
    ...mapState(["posts", "users", "tokenToken", "tokenUserId"]),
  },
  watch: {
    comments(newValue) {
      return this.arrayCommentObject.push(newValue);
    },
  },
  methods: {
    userPicture(userId) {
      if (this.$store.state.users !== null) {
        for (let user of this.$store.state.users) {
          if (user.user_id === userId) {
            return user.picture;
          }
        }
      }
    },
    userName(userId) {
      if (this.$store.state.users !== null) {
        for (let user of this.$store.state.users) {
          if (user.user_id === userId) {
            return user.firstName;
          }
        }
      }
    },
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
    deletePostOrComment(postOrComment) {
      this.$store.dispatch("deletePostOrCommentStore", postOrComment);
    },
    editPostOrComment(postOrComment) {
      this.$store.dispatch("editPostOrCommentStore", postOrComment);
    },
    submitComment(event) {
      event.preventDefault();
      this.$store.dispatch("submitCommentStore", event);
    },
  },
  async mounted() {
    await this.$store.dispatch("getToken");
    await this.$store.dispatch("getPosts");
    await this.$store.dispatch("getUsers");

    // RÉCUPÈRATION DES COMMENTAIRES DE CHAQUE ARTICLES
    for (let i = 0; i < this.$store.state.posts.length; i++) {
      await fetch(
        `http://localhost:3000/comment/${this.$store.state.posts[i].post_id}/`,
        {
          headers: {
            Authorization: "Bearer " + this.$store.state.tokenToken,
          },
        }
      )
        .then((res) => {
          if (res.ok) return res.json();
        })
        .then((comments) => {
          return (this.comments = comments);
        })
        .catch((error) => console.log(error));
    }
  },
};
</script>

<style scoped lang="scss">
@mixin border-bottom() {
  border-bottom: 1px solid rgb(233, 67, 38);
}

article {
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
  }
  .post {
    margin-top: 0.5rem;
    &--header {
      @include border-bottom;
      img {
        border-radius: 50%;
        max-height: 2rem;
        max-width: 2rem;
      }
    }
    &--title {
      @include border-bottom;
      width: 70%;
      margin: auto;
      margin-bottom: 1rem;
    }
    &--post {
      background-color: white;
      text-align: center;
      padding: 1rem;
      margin-bottom: 1rem;
      white-space: pre-wrap;
      border-radius: 0.5rem;
      word-wrap: break-word;
    }
    &--comments {
      border-top: 1px solid rgb(233, 67, 38);
      width: 85%;
      margin: 1rem auto 0;
      white-space: pre-wrap;
      p:nth-child(2),
      p:nth-child(3) {
        text-align: left;
      }
      p:nth-child(2) {
        font-weight: bold;
      }
      img {
        border-radius: 50%;
        max-height: 2rem;
        max-width: 2rem;
      }
    }
    &--deleteModify {
      text-align: right;
      span {
        cursor: pointer;
        text-decoration: underline;
      }
      span.date-heure {
        cursor: initial;
        text-decoration: none;
      }
    }
  }
  .separateur {
    height: 1px;
    background-color: rgb(233, 67, 38);
    width: 85%;
    margin: auto;
    margin-top: 1rem;
  }
  textarea {
    margin: 1rem auto 0;
    width: 80%;
    height: 3rem;
    white-space: pre;
    outline: none;
    border: 0;
    border-radius: 0.5rem;
    padding: 0.5rem;
  }
  button {
    margin-top: 0.5rem;
  }
}

@media (max-width: 550px) {
  article {
    width: 85%;
  }
}
</style>
