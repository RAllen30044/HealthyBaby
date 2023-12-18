import { baseUrl } from "../../../Types";
const childUrl = `${baseUrl}/child`;
export type ChildInfoT = {
  name: string;
  age: string;
  weight: string;
  height: string;
  headSize: string;
  url: string;
  id: number;
};

export const getChildInfo = () =>
  fetch(childUrl)
    .then((res) => res.json())
    .then((data) => data);

export const postChildInfo = (childInfo: Omit<ChildInfoT, "id">) =>
  fetch(childUrl, {
    method: "POST",
    body: JSON.stringify(childInfo),
    headers: { "Content-type": "application/json" },
  });
export const deleteChildInfo = (id: number) =>
  fetch(`${childUrl}/${id}`, {
    method: "DELETE",
  });

export const updateChildPicture = (id:number, url:string) =>
  fetch(`${childUrl}/${id}`, {
    method: "PATCH",
    body: JSON.stringify({url:url}),
    headers: { "Content-type": "application/json" },
  });
