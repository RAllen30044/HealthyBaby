import { User } from "./Types";

const url = "http://localhost:3000/user";

const getUser = (): Promise<User[]> =>
  fetch(url)
    .then((response) => response.json())
    .then((data: User[]) => data);
const postUser = (user: Omit<User, "id">) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(user),
  });

export const Request = {
  getUser,
  postUser,
};
