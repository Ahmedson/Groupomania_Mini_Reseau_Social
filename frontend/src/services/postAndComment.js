export default {
  submitComment({state}, event){
    let commentValue =
        event.currentTarget.previousElementSibling.previousElementSibling.value;
      let postId = event.currentTarget.parentNode.parentNode.parentNode.id;
      let element = event.currentTarget.previousElementSibling.previousElementSibling;
      if (commentValue.length > 0) {
        fetch(`http://localhost:3000/comment/${state.tokenUserId}/create`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + state.tokenToken,
          },
          body: JSON.stringify({
            comment: commentValue,
            post_id: postId,
            user_id: state.tokenUserId,
          }),
        })
          .then(() => {
            location.reload();
            element.value = "";
          })
          .catch((error) => console.log(error));
      }
  },
  editPostOrComment({state}, postOrComment) {
    let id, div, fetchURL;
      let token = state.tokenToken;

      if (postOrComment === "comment") {
        id = event.currentTarget.parentNode.parentNode.parentNode.id;
        div =
          event.currentTarget.parentNode.parentNode.nextElementSibling.nextElementSibling;
        fetchURL = `http://localhost:3000/comment/${state.tokenUserId}/modify/${id}/`;
      } else if (postOrComment === "post") {
        id = event.currentTarget.parentNode.parentNode.parentNode.parentNode.id;
        div = event.currentTarget.parentNode.parentNode.parentNode.previousElementSibling;
        fetchURL = `http://localhost:3000/post/${state.tokenUserId}/modify/${id}/`;
      }

      if (div.getAttribute("data-state")) return;

      let text = div.textContent || div.innerHTML;
      let textarea = document.createElement("textarea");
      let btnValidModif = document.createElement("button");

      btnValidModif.textContent = "Valider les modifications";
      btnValidModif.classList.add("btn");

      textarea.style.border = 0;
      textarea.style.outline = "none";
      textarea.style.height = postOrComment === "post" ? "100px" : "200px";
      textarea.style.width = "100%";
      textarea.value = text;

      div.innerHTML = "";
      div.appendChild(textarea);
      div.setAttribute("data-state", "edit");

      textarea.focus();
      if (postOrComment === "comment") {
        textarea.parentNode.parentNode.appendChild(btnValidModif);
      } else {
        textarea.parentNode.insertBefore(btnValidModif, textarea.nextElementSibling);
      }

      textarea.onblur = function () {
        let body =
          postOrComment === "comment"
            ? { comment: textarea.value }
            : { post: textarea.value };
        this.parentNode.removeAttribute("data-state");
        // textarea.parentNode.parentNode.removeChild(btnValidModif);
        this.parentNode.innerHTML = textarea.value;
        fetch(fetchURL, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(body),
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
  deletePostOrComment({state}, postOrComment) {
    let commentId, postId, fetchURL;

    if (postOrComment === "comment") {
      commentId = event.currentTarget.parentNode.parentNode.parentNode.id;
      fetchURL = `http://localhost:3000/comment/${state.tokenUserId}/delete/${commentId}/`;
    } else if (postOrComment === "post") {
      postId = event.currentTarget.parentNode.parentNode.parentNode.parentNode.id;
      fetchURL = `http://localhost:3000/post/${state.tokenUserId}/delete/${postId}/`;
    }

    fetch(fetchURL, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + state.tokenToken,
      },
    })
      .then((res) => {
        if (res.ok) {
          location.reload();
          return res.json();
        }
      })
      .catch((error) => console.log(error));
    }
}