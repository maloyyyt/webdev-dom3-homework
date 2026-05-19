import { comments } from "./data.js";

import { renderComments } from "./render.js";

import { escapeHtml } from "./escapeHtml.js";

import {
  postComment,
  getComments,
} from "./api.js";

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

    addButton.disabled = true;

    postComment({
      name: escapeHtml(
        nameInput.value.trim(),
      ),

      text: textInput.value.trim(),
    })
      .then(() => {
        return getComments();
      })

      .then((data) => {
        const appComments =
          data.comments.map(
            (comment) => {
              return {
                name:
                  comment.author.name,

                date: new Date(
                  comment.date,
                ).toLocaleString(),

                text: comment.text,

                likes: comment.likes,

                isLiked: false,
              };
            },
          );

        comments.length = 0;

        comments.push(...appComments);

        renderComments();

        nameInput.value = "";

        textInput.value = "";
      })

      .finally(() => {
        addButton.disabled = false;
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