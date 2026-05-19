import { comments } from "./data.js";

import { renderComments } from "./render.js";

import { escapeHtml } from "./escapeHtml.js";

import { postComment } from "./api.js";

import { loadComments } from "./index.js";

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

  const addForm =
    document.querySelector(
      ".add-form",
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

    addForm.innerHTML =
      "Комментарий добавляется...";

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
        addForm.innerHTML = `
          <input
            type="text"
            class="add-form-name"
            placeholder="Введите ваше имя"
          />

          <textarea
            class="add-form-text"
            placeholder="Введите ваш комментарий"
            rows="4"
          ></textarea>

          <div class="add-form-row">
            <button class="add-form-button">
              Написать
            </button>
          </div>
        `;

        initAddComment();
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