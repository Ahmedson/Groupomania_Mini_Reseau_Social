import { createStore } from 'vuex'
import postAndComment from '../services/postAndComment';
import postAndCommentImg from '../services/postAndCommentImg';

export default createStore({
  state: {
    posts: null,
    postsImg: null,
    users: null,
    tokenToken: null,
    tokenUserId: null,
  },
  mutations: {
    GET_TOKEN(state, token) {
      state.tokenToken = token.token;
      state.tokenUserId = token.userId;
    },
    GET_POSTS(state, posts) {
      state.posts = posts.reverse();
    },
    GET_POSTS_IMG(state, posts) {
      state.postsImg = posts.reverse();
    },
    GET_USERS(state, users) {
      state.users = users;
    },
  },
  actions: {
    // RÉCUPÈRE LE TOKEN ***********
    getToken({ commit}){
      let token = JSON.parse(localStorage.getItem("token"));
      commit('GET_TOKEN', token)
    },
    // RÉCUPÈRE TOUS LES POSTS ***********
    async getPosts({ commit, state }){
      await fetch("http://localhost:3000/post", {
        headers: { Authorization: "Bearer " + state.tokenToken },
      })
      .then((data) => {
        return data.json();
      })
      .then((posts) => {
        if (posts.error === true) {
          this.$router.push({ path: "/" });
        }
        commit('GET_POSTS', posts)
      })
      .catch((error) => console.log(error));
    },
    // RÉCUPÈRE TOUS LES POSTS AVEC IMAGES***********
    async getPostsImg({ commit, state }){
      await fetch("http://localhost:3000/postImg", {
        headers: { Authorization: "Bearer " + state.tokenToken },
      })
      .then((data) => {
        return data.json();
      })
      .then((posts) => {
        if (posts.error === true) {
          this.$router.push({ path: "/" });
        }
        commit('GET_POSTS_IMG', posts)
      })
      .catch((error) => console.log(error));
    },
    // RÉCUPÈRE TOUS LES USERS  ***********
    async getUsers({commit, state}){
      await fetch(`http://localhost:3000/auth/users`, {
        headers: { Authorization: "Bearer " + state.tokenToken },
      })
        .then((data) => {
          return data.json();
        })
        .then((users) => {
          commit('GET_USERS', users);
        })
        .catch((error) => console.log(error));
    },
    // T SOUMET UN COMMENTAIRE DANS LE FORUM TEXTES ****************************
    submitCommentStore({state}, event){
      postAndComment.submitComment({state}, event)
    },
    // T MODIFIE UN POSTE OU UN COMMENTAIRE DANS LE FORUM TEXTES ****************************
    editPostOrCommentStore({state}, postOrComment){
      postAndComment.editPostOrComment({state}, postOrComment)
    },
    // T SUPPRIME UN POSTE OU UN COMMENTAIRE DANS LE FORUM TEXTES ****************************
    deletePostOrCommentStore({state}, postOrComment){
      postAndComment.deletePostOrComment({state}, postOrComment)
    },
    // M SOUMET UN COMMENTAIRE DANS LE FORUM MULTIMEDIA ****************************
    submitCommentImgStore({state}, event){
      postAndCommentImg.submitComment({state}, event)
    },
    // M MODIFIE UN COMMENTAIRE DANS LE FORUM MULTIMEDIA ****************************
    editCommentImgStore({state}, event){
      postAndCommentImg.editComment({state}, event)
    },
    // M MODIFIE UN POSTE  DANS LE FORUM MULTIMEDIA ****************************
    editPostImgStore({state}, event){
      postAndCommentImg.editPost({state}, event)
    },
    // M SUPPRIME UN POSTE OU UN COMMENTAIRE DANS LE FORUM MULTIMEDIA ****************************
    deletePostOrCommentImgStore({state}, event){
      postAndCommentImg.deletePostOrComment({state}, event)
    },
  },
  modules: {
  },
})
