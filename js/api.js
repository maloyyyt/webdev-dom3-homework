const HOST =
  "https://webdev-hw-api.vercel.app/api/v1";

const STUDENT_NAME = "maloyyy";

export function getComments() {
  return fetch(
    `${HOST}/${STUDENT_NAME}/comments`,
  ).then((response) => {
    if (response.status === 500) {
      throw new Error("SERVER_ERROR");
    }

    return response.json();
  });
}

export function postComment({
  name,
  text,
}) {
  return fetch(
    `${HOST}/${STUDENT_NAME}/comments`,
    {
      method: "POST",

      body: JSON.stringify({
        name,
        text,

        forceError: true,
      }),
    },
  ).then((response) => {
    if (response.status === 400) {
      throw new Error("VALIDATION_ERROR");
    }

    if (response.status === 500) {
      throw new Error("SERVER_ERROR");
    }

    return response.json();
  });
}