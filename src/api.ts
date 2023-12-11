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

export const getInfo = (url: string, type: typeof Object[]): Promise<(typeof Object[])> => {
  return fetch(url)
    .then((res) => res.json())
    .then((data:typeof type) => data);
};

export const postInfo = (object: Omit<typeof Object, "id">, url: string) => {
  return fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(object),
  });
};
