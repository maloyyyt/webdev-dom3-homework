const HOST =
  "https://webdev-hw-api.vercel.app/api/v2";

let token = null;

export function setToken(newToken) {
  token = newToken;
}

export function getComments() {
  return fetch(`${HOST}/comments`).then(
    (res) => {
      if (res.status === 500) {
        throw new Error("SERVER_ERROR");
      }
      return res.json();
    },
  );
}

export function postComment({ text }) {
  return fetch(`${HOST}/comments`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      text,
    }),
  }).then((res) => {
    if (res.status === 400) {
      throw new Error("VALIDATION_ERROR");
    }
    if (res.status === 500) {
      throw new Error("SERVER_ERROR");
    }
    return res.json();
  });
}

export function loginRequest({ login, password }) {
  return fetch(`${HOST}/login`, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((res) => res.json());
}