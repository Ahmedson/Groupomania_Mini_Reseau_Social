import { createStore } from 'vuex'
import postAndComment from '../services/postAndComment';

export default createStore({
  state: {
    posts: null,
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
    // SOUMET UN COMMENTAIRE ****************************
    submitCommentStore({state}, event){
      postAndComment.submitComment({state}, event)
    },
    // MODIFIE UN POSTE OU UN COMMENTAIRE ****************************
    editPostOrCommentStore({state}, postOrComment){
      postAndComment.editPostOrComment({state}, postOrComment)
    },
    // SUPPRIME UN POSTE OU UN COMMENTAIRE ****************************
    deletePostOrCommentStore({state}, postOrComment){
      postAndComment.deletePostOrComment({state}, postOrComment)
    }
  },
  modules: {
  },
})
