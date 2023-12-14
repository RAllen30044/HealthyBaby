import { baseUrl } from "../../../Types";

const illnessUrl = `${baseUrl}/illness`;
export type IllnessType = {
  id: number;
  date: string;
  time: string;
  sicknessType: string;
  symptoms: string;
  medicineGiven: string;
  oz: string;
};

export const getIllnessHistory = (): Promise<IllnessType[]> =>
  fetch(illnessUrl)
    .then((res) => res.json())
    .then((data) => data);

export const postIllnessHistory = (
  illnesHistoryInfo: Omit<IllnessType, "id">
) =>
  fetch(illnessUrl, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(illnesHistoryInfo),
  });
export const deleteIllnessHistory = (id: number) =>
  fetch(`${illnessUrl}/${id}`, {
    method: "DELETE",
  });
