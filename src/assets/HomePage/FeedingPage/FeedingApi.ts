import { baseUrl } from "../../../Types";

export type breastFeedingInfoType = {
  time: string;
  date: string;
  id: number;
  feedingTimeLength: string;
};
export type bottleFeedingInfoType = {
  time: string;
  date: string;
  id: number;
  oz: string;
  ozLeft: string;
};

export type InfoTypeT = Omit<bottleFeedingInfoType,"id"> | Omit<breastFeedingInfoType,"id">

const breastFeedingHistoryUrl = `${baseUrl}/breastFeedingHistory`;
const bottleFeedingHistoryUrl = `${baseUrl}/bottleFeedingHistory`;

export const postFeedingInfo = (
  breastfeedingInfo: InfoTypeT, url:string
) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(breastfeedingInfo),
  });

export const getBreastFeedingHistoryInfo = (): Promise<
  breastFeedingInfoType[]
> =>
  fetch(breastFeedingHistoryUrl)
    .then((res) => res.json())
    .then((data) => data);

export const deleteBreastFeedingHistory = (id: number) =>
  fetch(`${breastFeedingHistoryUrl}/${id}`, {
    method: "DELETE",
  });
export const deleteBottleFeedingHistory = (id: number) =>
  fetch(`${bottleFeedingHistoryUrl}/${id}`, {
    method: "DELETE",
  });

export const postBottleFeedingInfo = (
  breastfeedingInfo: InfoTypeT,url:string
) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(breastfeedingInfo),
  });

export const getBottleFeedingHistoryInfo = (): Promise<
  bottleFeedingInfoType[]
> =>
  fetch(bottleFeedingHistoryUrl)
    .then((res) => res.json())
    .then((data) => data);
