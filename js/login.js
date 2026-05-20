import {
  loginRequest,
} from "./api.js";

import {
  saveUser,
} from "./storage.js";

import {
  setToken,
} from "./api.js";

export function renderLogin(onSuccess) {
  document.body.innerHTML = `
    <div class="login">
      <input class="login-input" placeholder="login" />
      <input class="password-input" type="password" placeholder="password" />
      <button class="login-button">Войти</button>
    </div>
  `;

  const loginInput =
    document.querySelector(".login-input");

  const passwordInput =
    document.querySelector(".password-input");

  const button =
    document.querySelector(".login-button");

  button.addEventListener("click", () => {
    loginRequest({
      login: loginInput.value,
      password: passwordInput.value,
    })
      .then((res) => {
        if (res.error) {
          alert("Неверный логин или пароль");
          return;
        }

        saveUser(res.user);
        setToken(`Bearer ${res.token}`);

        onSuccess();
      })
      .catch(() => {
        alert("Ошибка сети");
      });
  });
}