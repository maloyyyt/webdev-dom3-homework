import { comments } from "./data.js";
import { formatCommentText } from "./formatCommentText.js";
import { initLikeHandlers } from "./likeComment.js";
import { initReplyHandlers } from "./replyComment.js";

export function renderComments() {
  const commentsList =
    document.querySelector(".comments");

  let commentsHTML = "";

  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];

    const likeButtonClass =
      comment.isLiked
        ? "like-button -active-like"
        : "like-button";

    commentsHTML += `
      <li
        class="comment"
        data-comment-index="${i}"
      >

        <div class="comment-header">
          <div>${comment.name}</div>

          <div>${comment.date}</div>
        </div>

        <div class="comment-body">
          <div class="comment-text">
            ${formatCommentText(comment.text)}
          </div>
        </div>

        <div class="comment-footer">
          <div class="likes">

            <span class="likes-counter">
              ${comment.likes}
            </span>

            <button
              class="${likeButtonClass}"
              data-like-button="${i}"
            ></button>

          </div>
        </div>

      </li>
    `;
  }

  commentsList.innerHTML = commentsHTML;

  initLikeHandlers();
  initReplyHandlers();
}