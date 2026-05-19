import { comments } from "./data.js";

export function initReplyHandlers() {
  const nameInput =
    document.querySelector(
      ".add-form-name",
    );

  const textInput =
    document.querySelector(
      ".add-form-text",
    );

  const commentElements =
    document.querySelectorAll(".comment");

  for (const element of commentElements) {
    element.addEventListener(
      "click",
      () => {
        const commentIndex = parseInt(
          element.getAttribute(
            "data-comment-index",
          ),
        );

        const comment =
          comments[commentIndex];

        nameInput.value = "";

        textInput.value = `> ${comment.name}: ${comment.text}\n\n`;

        textInput.focus();
      },
    );
  }
}