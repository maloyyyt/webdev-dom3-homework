import { renderComments } from "./render.js";

import { initAddComment } from "./addComment.js";

import { getComments } from "./api.js";

import { setComments } from "./data.js";

getComments().then((data) => {
  const appComments = data.comments.map(
    (comment) => {
      return {
        name: comment.author.name,

        date: new Date(
          comment.date,
        ).toLocaleString(),

        text: comment.text,

        likes: comment.likes,

        isLiked: false,
      };
    },
  );

  setComments(appComments);

  renderComments();
});

initAddComment();