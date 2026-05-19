import { comments } from "./data.js";
import { renderComments } from "./render.js";

export function initLikeHandlers() {
  const likeButtons =
    document.querySelectorAll(
      "[data-like-button]",
    );

  for (const button of likeButtons) {
    button.addEventListener(
      "click",
      (event) => {
        event.stopPropagation();

        const commentIndex = parseInt(
          button.getAttribute(
            "data-like-button",
          ),
        );

        if (
          comments[commentIndex].isLiked
        ) {
          comments[commentIndex].isLiked =
            false;

          comments[commentIndex].likes -= 1;
        } else {
          comments[commentIndex].isLiked =
            true;

          comments[commentIndex].likes += 1;
        }

        renderComments();
      },
    );
  }
}