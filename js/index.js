import { renderComments } from "./render.js";
import { initAddComment } from "./addComment.js";
import { getComments, setToken } from "./api.js";
import { setComments } from "./data.js";
import { getUser } from "./storage.js";
import { renderLogin } from "./login.js";

const loadingElement =
  document.querySelector(".loading");

function loadComments() {
  loadingElement?.classList.remove("hidden");

  return getComments()
    .then((data) => {
      setComments(data.comments);
      renderComments();
    })
    .catch((error) => {
      if (error.message === "SERVER_ERROR") {
        alert("Сервер сломался, попробуй позже");
      } else {
        alert("Проблемы с интернетом, попробуйте позже");
      }
    })
    .finally(() => {
      loadingElement?.classList.add("hidden");
    });
}

function startApp() {
  const user = getUser();

  if (!user) {
    renderLogin(startApp);
    return;
  }

  setToken(user.token);

  loadComments();
  initAddComment(user);
}

startApp();