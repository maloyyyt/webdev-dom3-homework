import { postComment } from "./api.js";
import { loadComments } from "./index.js";

export function initAddComment(user) {
  const form = document.querySelector(".add-form");

  const nameInput = document.querySelector(".add-form-name");
  const textInput = document.querySelector(".add-form-text");
  const button = document.querySelector(".add-form-button");

  if (!user) {
    form.innerHTML = `
      <a href="#">Чтобы добавить комментарий, авторизуйтесь</a>
    `;
    return;
  }

  nameInput.value = user.name;
  nameInput.readOnly = true;

  function validate() {
    if (
      nameInput.value.trim().length < 3 ||
      textInput.value.trim().length < 3
    ) {
      alert(
        "Имя и комментарий должны быть не короче 3 символов",
      );
      return false;
    }
    return true;
  }

  function addComment() {
    if (!validate()) return;

    form.style.display = "none";

    const loading = document.createElement("div");
    loading.textContent = "Комментарий добавляется...";
    form.parentElement.appendChild(loading);

    postComment({
      text: textInput.value.trim(),
    })
      .then(() => loadComments())
      .catch((err) => {
        if (err.message === "SERVER_ERROR") {
          alert("Сервер сломался, попробуй позже");
        } else {
          alert("Кажется, у вас сломался интернет, попробуйте позже");
        }
      })
      .finally(() => {
        form.style.display = "flex";
        loading.remove();
      });
  }

  button.addEventListener("click", addComment);

  textInput.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      addComment();
    }
  });
}