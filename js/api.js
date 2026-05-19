const HOST =
  "https://webdev-hw-api.vercel.app/api/v1";

const STUDENT_NAME = "artem";

export function getComments() {
  return fetch(
    `${HOST}/${STUDENT_NAME}/comments`,
  ).then((response) => {
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
      }),
    },
  ).then((response) => {
    return response.json();
  });
}