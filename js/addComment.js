import { comments } from "./data.js";

import { renderComments } from "./render.js";

import { getCurrentDateTime } from "./formatDate.js";

import { escapeHtml } from "./escapeHtml.js";

export function initAddComment() {
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
      nameInput.value.trim() === ""
    ) {
      alert("Введите имя");

      return false;
    }

    if (
      textInput.value.trim() === ""
    ) {
      alert(
        "Введите комментарий",
      );

      return false;
    }

    return true;
  }

  function addComment() {
    if (!validateForm()) {
      return;
    }

    comments.push({
      name: escapeHtml(
        nameInput.value.trim(),
      ),

      date: getCurrentDateTime(),

      text: textInput.value.trim(),

      likes: 0,

      isLiked: false,
    });

    nameInput.value = "";

    textInput.value = "";

    renderComments();
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