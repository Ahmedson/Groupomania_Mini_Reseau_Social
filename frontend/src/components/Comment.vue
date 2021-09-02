<template>
  <div>
    <div v-for="commentObject in arrayCommentObject" :key="commentObject.comment_id">
      <div v-for="comment in commentObject" :key="comment.comment_id">
        <div class="post post--comments" v-if="postId === comment.post_id">
          <p>
            <!-- {{ arrayComment }} -->
            <small>
              <!-- {{ bigArray }} -->
              <!-- {{ userName(comment.user_id) }} -- Le :
              {{ timestampToDateAndHours(comment.createdAt) }} -->
            </small>
          </p>
          <p>{{ comment.comment }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: ["postId"],
  data() {
    return {
      comments: null,
      arrayCommentObject: [],
      posts: null,
    };
  },
  watch: {
    comments(newValue) {
      return this.arrayCommentObject.push(newValue);
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

    // // Récupère tous les commentaires de chaque post
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
