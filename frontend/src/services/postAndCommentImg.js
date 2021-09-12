export default {
  submitComment({state}, event){
    let commentValue =
        event.currentTarget.previousElementSibling.previousElementSibling.value;
      let postId = event.currentTarget.parentNode.parentNode.parentNode.id;
      let element = event.currentTarget.previousElementSibling.previousElementSibling;

      if (commentValue.length > 0) {
        fetch(`http://localhost:3000/commentImg/${state.tokenUserId}/create`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + state.tokenToken,
          },
          body: JSON.stringify({
            comment: commentValue,
            postImg_id: postId,
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
  editPost({state}, event){
    let id = event.currentTarget.parentNode.parentNode.parentNode.parentNode.id;
    let div = event.currentTarget.parentNode.parentNode.parentNode.previousElementSibling;

    if (div.getAttribute("data-state")) return;

    let input = document.createElement("input");
    input.setAttribute('type', 'file');
    input.setAttribute('id', 'fileM');
    input.style.marginBottom = "1rem"

    let btnValidModif = document.createElement("button");
    btnValidModif.textContent = "Télécharger la nouvelle image";
    btnValidModif.classList.add("btn");
  
    div.appendChild(input);
    div.setAttribute("data-state", "edit");

    input.focus();
    div.appendChild(btnValidModif);

    let selectedFile;

    let input2 = document.getElementById('fileM')

    input2.addEventListener('change', function(e) {
      selectedFile = e.target.files[0];
    })

    btnValidModif.onclick = function () {

      const formData = new FormData();
      formData.append("image", selectedFile);
      console.log(formData)
      this.parentNode.removeAttribute("data-state");

      fetch(`http://localhost:3000/postImg/${state.tokenUserId}/modify/${id}/`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + state.tokenToken,
        },
        body: formData,
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
  editComment({state}, event) {
    let token = state.tokenToken;
    let id = event.currentTarget.parentNode.parentNode.parentNode.id;
    let div = event.currentTarget.parentNode.parentNode.nextElementSibling.nextElementSibling;
      
    if (div.getAttribute("data-state")) return;

    let text = div.textContent || div.innerHTML;
    let textarea = document.createElement("textarea");
    let btnValidModif = document.createElement("button");

    btnValidModif.textContent = "Valider les modifications";
    btnValidModif.classList.add("btn");

    textarea.style.border = 0;
    textarea.style.outline = "none";
    textarea.style.height = "100px";
    textarea.style.width = "100%";
    textarea.value = text;

    div.innerHTML = "";
    div.appendChild(textarea);
    div.setAttribute("data-state", "edit");

    textarea.focus();
    textarea.parentNode.parentNode.appendChild(btnValidModif);
      
    textarea.onblur = function () {
      this.parentNode.removeAttribute("data-state");
      textarea.parentNode.parentNode.removeChild(btnValidModif);
      this.parentNode.innerHTML = textarea.value;
      fetch(`http://localhost:3000/commentImg/${state.tokenUserId}/modify/${id}/`, {
        method: "PUT",
        headers: {
        Accept: "application/json",
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({comment: textarea.value }),
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
      fetchURL = `http://localhost:3000/commentImg/${state.tokenUserId}/delete/${commentId}/`;
    } else if (postOrComment === "post") {
      postId = event.currentTarget.parentNode.parentNode.parentNode.parentNode.id;
      fetchURL = `http://localhost:3000/postImg/${state.tokenUserId}/delete/${postId}/`;
    }

    fetch(fetchURL, {
      method: "DELETE",
      headers: {
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