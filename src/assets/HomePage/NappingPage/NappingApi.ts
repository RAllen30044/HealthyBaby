import { baseUrl } from "../../../Types";

const nappingUrl = `${baseUrl}/napHistory`;
export type nappingType = {
  id: number;
  date: string;
  time: string;
  lengthOfTime: string;
};

export const getNappingHistory = ()=>
  fetch(nappingUrl)
    .then((res) => res.json())
    .then((data) => data);

export const postNappingHistory = (
  nappingHistoryInfo: Omit<nappingType, "id">
) =>
  fetch(nappingUrl, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(nappingHistoryInfo),
  });
export const deleteNappingHistory = (id: number) =>
  fetch(`${nappingUrl}/${id}`, {
    method: "DELETE",
  });
