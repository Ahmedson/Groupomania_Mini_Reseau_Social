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
            <div
              :id="comment.comment_id"
              class="post post--comments"
              v-if="post.post_id === comment.post_id"
            >
              <div class="post post--deleteModify">
                <small>
                  <span @click="editComment">Modifier</span> /
                  <span @click="deleteComment">Supprimer</span> -
                  <span v-if="comment.createdAt === comment.updatedAt">
                    Le : {{ timestampToDateAndHours(comment.createdAt) }}</span
                  >
                  <span v-else
                    >Modifié le : {{ timestampToDateAndHours(comment.updatedAt) }}</span
                  >
                </small>
              </div>
              <p>{{ userName(comment.user_id) }} :</p>
              <p>- {{ comment.comment }}</p>
            </div>
          </div>
        </div>
        <form class="post">
          <textarea placeholder=" Entrez votre commentaire..."></textarea><br />
          <button @click="submitComment" class="btn" type="submit">Commenter</button>
        </form>
        <div class="post post--deleteModify">
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
      arrayCommentObject: [],
      comments: "",
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
    timestampToDateAndHours(timestamp) {
      let date = new Date(Date.parse(timestamp));
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let fullDate = `${day}-${month}-${year} à ${hours}:${minutes}:${seconds}`;
      return fullDate;
    },
    editPost(e) {
      let postId = e.currentTarget.parentNode.parentNode.parentNode.parentNode.id;
      let post = e.currentTarget.parentNode.parentNode.parentNode.previousElementSibling;
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
        fetch(`http://localhost:3000/post/modify/${postId}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            post: textarea.value,
          }),
        })
          .then((res) => {
            if (res.ok) {
              location.reload();
              return res.json();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      };
    },
    deletePost(e) {
      let postId = e.currentTarget.parentNode.parentNode.parentNode.parentNode.id;
      console.log(postId);
      fetch(`http://localhost:3000/post/delete/${postId}`, { method: "DELETE" })
        .then((res) => {
          if (res.ok) {
            location.reload();
            return res.json();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteComment(e) {
      let commentId = e.currentTarget.parentNode.parentNode.parentNode.id;
      fetch(`http://localhost:3000/comment/delete/${commentId}`, { method: "DELETE" })
        .then((res) => {
          if (res.ok) {
            location.reload();
            return res.json();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    editComment(e) {
      let commentId = e.currentTarget.parentNode.parentNode.parentNode.id;
      let comment =
        e.currentTarget.parentNode.parentNode.nextElementSibling.nextElementSibling;
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
      console.log(textarea.nextElementSibling);
      textarea.parentNode.parentNode.appendChild(btnValidModif);
      textarea.onblur = function () {
        this.parentNode.removeAttribute("data-state");
        textarea.parentNode.parentNode.removeChild(btnValidModif);
        this.parentNode.innerHTML = textarea.value;
        fetch(`http://localhost:3000/comment/modify/${commentId}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            comment: textarea.value,
          }),
        })
          .then((res) => {
            if (res.ok) {
              location.reload();
              return res.json();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      };
    },
    submitComment(e) {
      e.preventDefault();
      let commentValue =
        e.currentTarget.previousElementSibling.previousElementSibling.value;
      let postId = e.currentTarget.parentNode.parentNode.parentNode.id;
      if (commentValue.length > 0) {
        fetch("http://localhost:3000/comment/create", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            comment: commentValue,
            post_id: postId,
            user_id: 2,
          }),
        })
          .then((res) => {
            if (res.ok) {
              location.reload();
              return res.json();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
  async mounted() {
    // Récupère tous les posts
    await fetch("http://localhost:3000/post")
      .then((data) => {
        return data.json();
      })
      .then((posts) => {
        this.posts = posts.reverse();
      })
      .catch((error) => console.log(error));

    // Récupère tous les utilisateurs
    await fetch("http://localhost:3000/auth/users")
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
        },
        body: JSON.stringify({ post_id: this.posts[i].post_id }),
      })
        .then((res) => {
          if (res.ok) return res.json();
        })
        .then((comments) => {
          return (this.comments = comments);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
};
</script>

<style scoped lang="scss">
@mixin border-bottom() {
  border-bottom: 1px solid rgb(233, 67, 38);
}

article {
  width: 70%;
  margin: auto;
  margin-top: 2rem;
  border-radius: 0.5rem;
  background-color: rgb(255, 245, 245);
  padding: 1rem;
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
      padding: 1rem;
      margin-bottom: 1rem;
      white-space: pre-wrap;
    }
    &--comments {
      border-top: 1px solid rgb(233, 67, 38);
      width: 85%;
      margin: 1rem auto 0;
      white-space: pre-wrap;
      // div:nth-child(1) {
      //   // text-align: right;
      // }
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
      span:nth-child(3) {
        cursor: initial;
      }
    }
  }
  textarea {
    margin: 1rem auto 0;
    width: 80%;
    height: 3rem;
    white-space: pre;
  }
  button {
    margin-top: 0.5rem;
  }
}
</style>
