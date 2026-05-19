import { renderComments } from "./render.js";

import { initAddComment } from "./addComment.js";

import { getComments } from "./api.js";

import { setComments } from "./data.js";

const loadingElement =
  document.querySelector(".loading");

export function loadComments() {
  loadingElement.classList.remove(
    "hidden",
  );

  return getComments()

    .then((data) => {
      const appComments =
        data.comments.map((comment) => {
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
        });

      setComments(appComments);

      renderComments();
    })

    .catch((error) => {
      if (
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
      loadingElement.classList.add(
        "hidden",
      );
    });
}

loadComments();

initAddComment();