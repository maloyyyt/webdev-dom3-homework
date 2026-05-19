import { escapeHtml } from "./escapeHtml.js";

import { postComment } from "./api.js";

import { loadComments } from "./index.js";

export function initAddComment() {
  const addForm =
    document.querySelector(
      ".add-form",
    );

  const nameInput =
    document.querySelector(
      ".add-form-name",
    );

  const textInput =
    document.querySelector(
      ".add-form-text",
    );

  const addButton =
    document.querySelector(
      ".add-form-button",
    );

  function validateForm() {
    if (
      nameInput.value.trim().length <
        3 ||
      textInput.value.trim().length <
        3
    ) {
      alert(
        "Имя и комментарий должны быть не короче 3 символов",
      );

      return false;
    }

    return true;
  }

  function addComment() {
    if (!validateForm()) {
      return;
    }

    addForm.style.display = "none";

    const loadingText =
      document.createElement("div");

    loadingText.textContent =
      "Комментарий добавляется...";

    loadingText.classList.add(
      "loading",
    );

    addForm.parentElement.appendChild(
      loadingText,
    );

    postComment({
      name: escapeHtml(
        nameInput.value.trim(),
      ),

      text: textInput.value.trim(),
    })

      .then(() => {
        return loadComments();
      })

      .then(() => {
        nameInput.value = "";

        textInput.value = "";
      })

      .catch((error) => {
        if (
          error.message ===
          "VALIDATION_ERROR"
        ) {
          alert(
            "Имя и комментарий должны быть не короче 3 символов",
          );
        } else if (
          error.message ===
          "SERVER_ERROR"
        ) {
          alert(
            "Сервер сломался, попробуй позже",
          );
        } else {
          alert(
            "Кажется, у вас сломался интернет, попробуйте позже",
          );
        }
      })

      .finally(() => {
        addForm.style.display =
          "flex";

        loadingText.remove();
      });
  }

  addButton.addEventListener(
    "click",
    addComment,
  );

  textInput.addEventListener(
    "keydown",
    (event) => {
      if (
        (event.ctrlKey ||
          event.metaKey) &&
        event.key === "Enter"
      ) {
        addComment();
      }
    },
  );
}