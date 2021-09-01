<template>
  <div>
    <article v-for="post in posts" :key="post.post_id">
      <div class="post--header">
        <small class="info">
          <h3>Publié par : {{ userName(post.user_id) }}</h3>
          <p>Le : {{ timestampToDateAndHours(post.createdAt) }}</p>
        </small>
      </div>
      <h2 class="post post--title">{{ post.title }}</h2>
      <div class="post post--post">{{ post.post }}</div>
      <div>
        <div v-for="comment in comments" :key="comment.comment_id">
          <div class="post" v-if="post.post_id === comment.post_id">
            <p>
              <small>
                {{ userName(comment.user_id) }} --
                {{ timestampToDateAndHours(comment.createdAt) }}
              </small>
            </p>
            <p>{{ comment.comment }}</p>
          </div>
        </div>
        <div class="post">
          <textarea></textarea><br />
          <button type="submit">Commenter</button>
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
      comments: null,
    };
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

    // Récupère tous les commentaires de chaque post
    for (let i = 0; i < this.posts.length; i++) {
      fetch("http://localhost:3000/comment", {
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
          this.comments = comments;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
};
</script>

<style scoped lang="scss">
article {
  width: 70%;
  margin: auto;
  margin-top: 3rem;
  border-radius: 0.5rem;
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
  }
  .post {
    margin-top: 0.5rem;
    // border: 1px solid rgb(233, 67, 38);
    &--header {
      border-bottom: 1px solid rgb(233, 67, 38);
    }
    &--title {
      border-bottom: 1px solid rgb(233, 67, 38);
      width: 70%;
      margin: auto;
      margin-bottom: 2rem;
    }
    &--post {
      // text-align: left;
      padding-left: 1rem;
    }
  }
  textarea {
    margin: 1rem auto 0;
    width: 80%;
    height: 4rem;
  }
  button {
    margin-bottom: 0.5rem;
  }
}
</style>
