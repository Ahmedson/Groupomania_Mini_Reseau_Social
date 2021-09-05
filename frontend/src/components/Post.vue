<template>
  <div>
    <article :id="post.post_id" v-for="post in posts" :key="post.post_id">
      <div class="post--header">
        <small class="info">
          <h3>Publié par : {{ userName(post.user_id) }}</h3>
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
                  <template v-if="comment.user_id === tokenUserId || tokenUserId === 6">
                    <span @click="editComment">Modifier</span> /
                    <span @click="deleteComment">Supprimer</span> -
                  </template>
                  <span v-if="comment.createdAt === comment.updatedAt" class="date-heure">
                    Le : {{ timestampToDateAndHours(comment.createdAt) }}</span
                  >
                  <span v-else class="date-heure"
                    >Modifié le : {{ timestampToDateAndHours(comment.updatedAt) }}</span
                  >
                </small>
              </div>
              <p>{{ userName(comment.user_id) }} :</p>
              <p>- {{ comment.comment }}</p>
            </div>
          </div>
        </div>
        <!-- Affichage du dernier commentaire -->
        <div v-for="lastComment in arrayLastComments" :key="lastComment.comment_id">
          <div
            class="post post--comments"
            v-if="lastComment && post.post_id === lastComment.post_id"
          >
            <div class="post post--deleteModify">
              <small>
                <template v-if="lastComment.user_id === tokenUserId">
                  <span @click="editComment">Modifier</span> /
                  <span @click="deleteComment">Supprimer</span> -
                </template>
                <span
                  v-if="lastComment.createdAt === lastComment.updatedAt"
                  class="date-heure"
                >
                  Le : {{ timestampToDateAndHours(lastComment.createdAt) }}</span
                >
                <span v-else class="date-heure"
                  >Modifié le : {{ timestampToDateAndHours(lastComment.updatedAt) }}</span
                >
              </small>
            </div>
            <p>{{ userName(lastComment.user_id) }} :</p>
            <p>- {{ lastComment.comment }}</p>
          </div>
        </div>
        <div class="separateur"></div>
        <!-- Zone d'écriture des commentaires -->
        <form class="post">
          <textarea wrap="hard" placeholder="Écrivez votre commentaire..."></textarea>
          <br />
          <button @click="submitComment" class="btn" type="submit">Commenter</button>
        </form>
        <div
          v-if="post.user_id === tokenUserId || tokenUserId === 6"
          class="post post--deleteModify"
        >
          <small
            ><span @click="editPost">Modifier</span> /
            <span @click="deletePost">Supprimer</span>
          </small>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "Post",
  data() {
    return {
      posts: null,
      users: null,
      tokenToken: null,
      tokenUserId: null,
      arrayCommentObject: [],
      comments: "",
      arrayLastComments: [],
    };
  },
  watch: {
    comments(newValue) {
      return this.arrayCommentObject.push(newValue);
    },
  },
  methods: {
    userName(userId) {
      if (this.users !== null) {
        for (let user of this.users) {
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
    editPost(e) {
      let postId = e.currentTarget.parentNode.parentNode.parentNode.parentNode.id;
      let post = e.currentTarget.parentNode.parentNode.parentNode.previousElementSibling;
      let token = this.tokenToken;
      let userId = this.tokenUserId;
      if (post.getAttribute("data-state")) return;

      let text = post.textContent || post.innerHTML;
      let textarea = document.createElement("textarea");
      let btnValidModif = document.createElement("button");

      btnValidModif.textContent = "Valider les modifications";
      btnValidModif.classList.add("btn");

      textarea.style.border = 0;
      textarea.style.outline = "none";
      textarea.style.height = "200px";
      textarea.style.width = "100%";
      textarea.value = text;

      post.innerHTML = "";
      post.appendChild(textarea);
      post.setAttribute("data-state", "edit");

      textarea.focus();
      textarea.parentNode.insertBefore(btnValidModif, textarea.nextElementSibling);

      textarea.onblur = function () {
        this.parentNode.removeAttribute("data-state");
        this.parentNode.innerHTML = textarea.value;
        fetch(`http://localhost:3000/post/${userId}/modify/${postId}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ post: textarea.value }),
        })
          .then((res) => {
            if (res.ok) {
              location.reload();
              return res.json();
            }
          })
          .catch((error) => console.log(error));
      };
    },
    deletePost(e) {
      let postId = e.currentTarget.parentNode.parentNode.parentNode.parentNode.id;
      fetch(`http://localhost:3000/post/${this.tokenUserId}/delete/${postId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + this.tokenToken,
        },
      })
        .then((res) => {
          if (res.ok) {
            location.reload();
            return res.json();
          }
        })
        .catch((error) => console.log(error));
    },
    deleteComment(e) {
      let commentId = e.currentTarget.parentNode.parentNode.parentNode.id;
      // let token = this.tokenToken;
      fetch(`http://localhost:3000/comment/${this.tokenUserId}/delete/${commentId}/`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + this.tokenToken,
        },
      })
        .then((res) => {
          if (res.ok) {
            location.reload();
            return res.json();
          }
        })
        .catch((error) => console.log(error));
    },
    editComment(e) {
      let commentId = e.currentTarget.parentNode.parentNode.parentNode.id;
      let comment =
        e.currentTarget.parentNode.parentNode.nextElementSibling.nextElementSibling;
      let token = this.tokenToken;
      let userId = this.tokenUserId;
      if (comment.getAttribute("data-state")) return;

      let text = comment.textContent || comment.innerHTML;
      let textarea = document.createElement("textarea");
      let btnValidModif = document.createElement("button");

      btnValidModif.textContent = "Valider les modifications";
      btnValidModif.classList.add("btn");

      textarea.style.border = 0;
      textarea.style.outline = "none";
      textarea.style.height = "100px";
      textarea.style.width = "100%";
      textarea.value = text;

      comment.innerHTML = "";
      comment.appendChild(textarea);
      comment.setAttribute("data-state", "edit");

      textarea.focus();
      textarea.parentNode.parentNode.appendChild(btnValidModif);
      textarea.onblur = function () {
        this.parentNode.removeAttribute("data-state");
        textarea.parentNode.parentNode.removeChild(btnValidModif);
        this.parentNode.innerHTML = textarea.value;
        fetch(`http://localhost:3000/comment/${userId}/modify/${commentId}/`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ comment: textarea.value }),
        })
          .then((res) => {
            if (res.ok) {
              location.reload();
              return res.json();
            }
          })
          .catch((error) => console.log(error));
      };
    },
    submitComment(e) {
      e.preventDefault();
      let commentValue =
        e.currentTarget.previousElementSibling.previousElementSibling.value;
      let postId = e.currentTarget.parentNode.parentNode.parentNode.id;
      let element = e.currentTarget.previousElementSibling.previousElementSibling;
      if (commentValue.length > 0) {
        fetch(`http://localhost:3000/comment/${this.tokenUserId}/create`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + this.tokenToken,
          },
          body: JSON.stringify({
            comment: commentValue,
            post_id: postId,
            user_id: this.tokenUserId,
          }),
        })
          .then((res) => {
            return res.json();
          })
          .then(async (response) => {
            await fetch(`http://localhost:3000/comment/${response.comment_id}`, {
              headers: { Authorization: "Bearer " + this.tokenToken },
            })
              .then(async (res) => {
                return await res.json();
              })
              .then(async (lastComment) => {
                await this.arrayLastComments.push(lastComment);
                element.value = "";
              });
          })
          .catch((error) => console.log(error));
      }
    },
  },
  async mounted() {
    let token = JSON.parse(localStorage.getItem("token"));
    this.tokenToken = token.token;
    this.tokenUserId = token.userId;
    // Récupère tous les posts
    await fetch("http://localhost:3000/post", {
      headers: { Authorization: "Bearer " + this.tokenToken },
    })
      .then((data) => {
        return data.json();
      })
      .then((posts) => {
        if (posts.error === true) {
          this.$router.push({ path: "/" });
        }
        this.posts = posts.reverse();
      })
      .catch((error) => console.log(error));

    // Récupère tous les utilisateurs
    await fetch(`http://localhost:3000/auth/users`, {
      headers: { Authorization: "Bearer " + this.tokenToken },
    })
      .then((data) => {
        return data.json();
      })
      .then((users) => {
        this.users = users;
      })
      .catch((error) => console.log(error));

    for (let i = 0; i < this.posts.length; i++) {
      await fetch("http://localhost:3000/comment", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + this.tokenToken,
        },
        body: JSON.stringify({ post_id: this.posts[i].post_id }),
      })
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
